import LayoutWrapper from "../wrappers/LayoutWrapper.tsx";
import {useState} from "react";
import {fetchMealPlanByDates} from "../api/mealPlan.ts";
import Calendar from "../components/Calendar.tsx";
import {getCurrentWeekDates} from "../utils/getCurrentWeekDates.ts";
import {DateType} from "../model/types.ts";
import WeeklyMealPlan from "../components/WeeklyMealPlan.tsx";
import {useQuery} from "@tanstack/react-query";
import {MealDto} from "../model/dto/mealPlan.dto.ts";
import {Flex} from "antd";
import {useMediaQuery} from "react-responsive";

const MealPlanPage = () => {
    const [selectedWeek, setSelectedWeek] = useState<DateType[]>(getCurrentWeekDates());
    const isSmallScreen = useMediaQuery({ maxWidth: 500 })

    const {data} = useQuery({
        queryKey: ['mealPlan', selectedWeek],
        queryFn: () => fetchMealPlanByDates(selectedWeek[0], selectedWeek[6]),
    })

    return (
        <LayoutWrapper>
            <Flex gap={"middle"} vertical={isSmallScreen} align={isSmallScreen ? "center" : undefined}>
                <Calendar {...{selectedWeek, setSelectedWeek}}/>
                <WeeklyMealPlan data={data ?? [] as MealDto[]} {...{selectedWeek}} />
            </Flex>
        </LayoutWrapper>
    );
}

export default MealPlanPage;