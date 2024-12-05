import LayoutWrapper from "../wrappers/LayoutWrapper.tsx";
import {useEffect, useState} from "react";
import {fetchMealPlanByDates} from "../api/mealPlan.ts";
import Calendar from "../components/Calendar.tsx";
import {getCurrentWeekStartDateEndDate} from "../utils/getCurrentWeekStartDateEndDate.ts";
import {DateType} from "../model/types.ts";

const MealPlanPage = () => {
    const [weekStartDateEndDate, setWeekStartDateEndDate] = useState<[DateType, DateType]>(getCurrentWeekStartDateEndDate());

    useEffect(() => {
        fetchMealPlanByDates(weekStartDateEndDate[0], weekStartDateEndDate[1])
            .then(mealPlan => console.log(mealPlan))
    }, [weekStartDateEndDate])

    return (
        <LayoutWrapper>
            <h1>Meal Plan Page</h1>
            <Calendar {...{setWeekStartDateEndDate}}/>
        </LayoutWrapper>
    );
}

export default MealPlanPage;