import {Button, Card, Flex, Popconfirm} from "antd";
import {MealDto} from "../model/dto/mealPlan.dto.ts";
import {useAtomValue} from "jotai/react";
import {tokenAtom} from "../atomStore.ts";
import {isJwtValid} from "../utils/isJwtValid.ts";

type Props = {
    meal: MealDto;
    removeMeal: (documentId: string) => () => void;
}

const MealPlanCard = ({meal, removeMeal}: Props) => {
    const token = useAtomValue(tokenAtom);
    const isTokenValid = isJwtValid(token);

    return (
        <Card key={meal.id}
              size={"small"}
              style={{margin: "5px"}}
        >
            <Flex justify={"space-between"} align={"center"}>
                <strong>
                    <a href={`https://jidlo.tilcer.cz/recipe/${meal.recipe?.id}`}
                       target={"_blank"}>
                        {meal.recipe?.title}
                    </a>
                </strong>
                <Popconfirm
                    title="Delete the meal"
                    description="Are you sure to delete this meal?"
                    onConfirm={removeMeal(meal.documentId)}
                    okText="Yes"
                    cancelText="No"
                >
                    {isTokenValid && <Button type={"link"}>Remove</Button>}
                </Popconfirm>
            </Flex>
        </Card>
    );
}

export default MealPlanCard;