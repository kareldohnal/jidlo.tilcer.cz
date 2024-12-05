import LayoutWrapper from "../wrappers/LayoutWrapper.tsx";
import {useState} from "react";
import {fetchMealPlanByDates} from "../api/mealPlan.ts";
import Calendar from "../components/Calendar.tsx";
import {getCurrentWeekDates} from "../utils/getCurrentWeekDates.ts";
import {DateType} from "../model/types.ts";
import WeeklyMealPlan from "../components/WeeklyMealPlan.tsx";
import {useQuery} from "@tanstack/react-query";
import {MealDto} from "../model/dto/mealPlan.dto.ts";

const MealPlanPage = () => {
    const [selectedWeek, setSelectedWeek] = useState<DateType[]>(getCurrentWeekDates());
    const { data } = useQuery({
        queryKey: ['mealPlan', selectedWeek],
        queryFn: () => fetchMealPlanByDates(selectedWeek[0], selectedWeek[6]),
    })
    console.log(selectedWeek)
    return (
        <LayoutWrapper>
            <h1>Meal Plan Page</h1>
            <Calendar {...{selectedWeek, setSelectedWeek}}/>
            <WeeklyMealPlan data={data ?? [] as MealDto[]} {...{selectedWeek}} />
        </LayoutWrapper>
    );
}

export default MealPlanPage;