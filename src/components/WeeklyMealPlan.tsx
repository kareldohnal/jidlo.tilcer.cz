import {MealDto} from "../model/dto/mealPlan.dto.ts";
import {DateType} from "../model/types.ts";
import WeeklyMealPlanDay from "./WeeklyMealPlanDay.tsx";

type Props = {
    data: MealDto[];
    selectedWeek: DateType[]
}

const WeeklyMealPlan = ({data, selectedWeek}: Props) => {
    return (
        <div>
            {selectedWeek.map((day) => {
                return (
                        <WeeklyMealPlanDay key={day} day={day} data={data}/>
                )
            })}
        </div>
    );
}

export default WeeklyMealPlan;