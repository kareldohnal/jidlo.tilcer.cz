import {MealDto, MealPlanPostDto} from "../model/dto/mealPlan.dto.ts";
import {DateType} from "../model/types.ts";
import {Button, Card, Divider, List, Modal, Select} from "antd";
import {getDayOfWeek} from "../utils/getDayOfWeek.ts";
import {getFormatedDate} from "../utils/getFormatedDate.ts";
import {useAtomValue} from "jotai/react";
import {tokenAtom} from "../atomStore.ts";
import {isJwtValid} from "../utils/isJwtValid.ts";
import {MEALTIME} from "../model/enums.ts";
import {useState} from "react";
import {translateMealtime} from "../utils/translateMealtime.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchRecipes} from "../api/fetchRecipes.ts";
import {RecipeDto} from "../model/dto/recipe.dto.ts";
import {deleteMealPlan, postMealPlan} from "../api/mealPlan.ts";
import MealPlanCard from "./MealPlanCard.tsx";

type Props = {
    data: MealDto[];
    selectedWeek: DateType[]
}

const WeeklyMealPlan = ({data, selectedWeek}: Props) => {
    const [dialogSetting, setDialogSetting] = useState<{ date: DateType, mealtime: MEALTIME } | null>(null);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState<RecipeDto | null>(null);
    const token = useAtomValue(tokenAtom);
    const isTokenValid = isJwtValid(token);
    const queryClient = useQueryClient()

    const postMealPlanMutation = useMutation({
        mutationFn: (mealPlan: MealPlanPostDto) => postMealPlan(token, mealPlan),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['mealPlan']})
        },
    })

    const deleteMealPlanMutation = useMutation({
        mutationFn: (mealPlanDocumentId: string) => deleteMealPlan(token, mealPlanDocumentId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['mealPlan']})
        },
    })

    const {data: meals} = useQuery({
        queryKey: ['recipes'],
        queryFn: () => fetchRecipes(),
    })

    const handleClickAddMeal = ({date, mealtime}: { date: DateType, mealtime: MEALTIME }) => () => {
        setDialogSetting({date, mealtime});
        setIsDialogVisible(true)
    }

    const handleCloseDialog = () => {
        setIsDialogVisible(false)
        setSelectedMeal(null)
    }

    const handleMealChange = (value: string) => {
        setSelectedMeal(meals?.find((meal: RecipeDto) => meal.documentId === value) ?? null)
    }

    const addMeal = (recipe: RecipeDto) => () => {
        if (dialogSetting?.date && dialogSetting?.mealtime && recipe) {
            postMealPlanMutation.mutate({
                date: dialogSetting.date,
                mealtime: dialogSetting.mealtime,
                recipe: recipe.id
            })
        }
        setSelectedMeal(null)
        setIsDialogVisible(false)
    }

    const removeMeal = (mealPlanDocumentId: string) => () => {
        deleteMealPlanMutation.mutate(mealPlanDocumentId)
    }

    return (
        <div>
            <List
                grid={{column: 1}}
                dataSource={selectedWeek}
                renderItem={(item) => (
                    <List.Item>
                        <Card title={`${getDayOfWeek(item)} ${getFormatedDate(item)}`}>
                            {(!!data.filter((meal: MealDto) => meal.date === item).filter((meal: MealDto) => meal.mealtime === "breakfast").length || isTokenValid) && (
                                <Divider orientation="left" style={{fontSize: "10px"}}>Snídaně</Divider>
                            )}
                            {data.filter((meal: MealDto) => meal.date === item).filter((meal: MealDto) => meal.mealtime === "breakfast").map((meal: MealDto) => {
                                return (
                                    <MealPlanCard key={meal.id} {...{meal, removeMeal}} />
                                )
                            })}
                            {isTokenValid && <Button type={"primary"} block={true} onClick={handleClickAddMeal({
                                date: item,
                                mealtime: MEALTIME.BREAKFAST
                            })}>+</Button>}
                            {(!!data.filter((meal: MealDto) => meal.date === item).filter((meal: MealDto) => meal.mealtime === "lunch").length || isTokenValid) && (
                                <Divider orientation="left" style={{fontSize: "10px"}}>Oběd</Divider>
                            )}
                            {data.filter((meal: MealDto) => meal.date === item).filter((meal: MealDto) => meal.mealtime === "lunch").map((meal: MealDto) => {
                                return (
                                    <MealPlanCard key={meal.id} {...{meal, removeMeal}} />
                                )
                            })}
                            {isTokenValid && <Button type={"primary"} block={true} onClick={handleClickAddMeal({
                                date: item,
                                mealtime: MEALTIME.LUNCH
                            })}>+</Button>}
                            {(!!data.filter((meal: MealDto) => meal.date === item).filter((meal: MealDto) => meal.mealtime === "dinner").length || isTokenValid) && (
                                <Divider orientation="left" style={{fontSize: "10px"}}>Večeře</Divider>
                            )}
                            {data.filter((meal: MealDto) => meal.date === item).filter((meal: MealDto) => meal.mealtime === "dinner").map((meal: MealDto) => {
                                return (
                                    <MealPlanCard key={meal.id} {...{meal, removeMeal}} />
                                )
                            })}
                            {isTokenValid && <Button type={"primary"} block={true} onClick={handleClickAddMeal({
                                date: item,
                                mealtime: MEALTIME.DINNER
                            })}>+</Button>}
                        </Card>
                    </List.Item>
                )}
            />
            <Modal
                title={`Přidat ${dialogSetting?.mealtime ? translateMealtime(dialogSetting.mealtime, 2) : ""} ${dialogSetting?.date ? getFormatedDate(dialogSetting.date) : ""}`}
                open={isDialogVisible}
                onOk={addMeal(selectedMeal)}
                onCancel={handleCloseDialog}
                okButtonProps={{disabled: !selectedMeal}}
                destroyOnClose={true}
            >
                <Select
                    showSearch
                    placeholder="Vyber jídlo"
                    optionFilterProp="label"
                    size={"large"}
                    onChange={handleMealChange}
                    options={meals?.map((meal: RecipeDto) => {
                        return ({
                            value: meal.documentId,
                            label: meal.title,
                        });
                    })}
                />
            </Modal>
        </div>
    );
}

export default WeeklyMealPlan;