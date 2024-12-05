import {DateType} from "../model/types.ts";
import {MealDto} from "../model/dto/mealPlan.dto.ts";
import {MEALTIME} from "../model/enums.ts";
import {v4 as uuid} from "uuid";
import {getDayOfWeek} from "../utils/getDayOfWeek.ts";

type Props = {
    day: DateType;
    data: MealDto[];
}

const WeeklyMealPlanDay = ({ day, data }: Props) => {
    return (
        <div>
            <div>
                <div>{getDayOfWeek(day)}</div>
                <div>{Number(day.split("-").pop())}</div>
            </div>
            <div>
                {data
                    .filter((meal) => meal.date === day)
                    .filter((meal) => meal.mealtime === MEALTIME.BREAKFAST)
                    .map((meal) => {
                        return (
                            <div key={uuid()}>
                                {meal.documentId}
                            </div>
                        )
                    })}
            </div>
            <div>
                {data
                    .filter((meal) => meal.date === day)
                    .filter((meal) => meal.mealtime === MEALTIME.LUNCH)
                    .map((meal) => {
                        return (
                            <div key={uuid()}>
                                {meal.documentId}
                            </div>
                        )
                    })}
            </div>
            <div>
                {data
                    .filter((meal) => meal.date === day)
                    .filter((meal) => meal.mealtime === MEALTIME.DINNER)
                    .map((meal) => {
                        return (
                            <div key={uuid()}>
                                {meal.documentId}
                            </div>
                        )
                    })}
            </div>
        </div>
    );
}

export default WeeklyMealPlanDay;