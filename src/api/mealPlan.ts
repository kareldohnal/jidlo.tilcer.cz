import {API_ROOT} from "../model/constants.ts";
import {DateType} from "../model/types.ts";
import {MealDto} from "../model/dto/mealPlan.dto.ts";

export const fetchMealPlanByDates = async (startDate: DateType, endDate: DateType) => {
    try {
        const response = await fetch(`${API_ROOT}/jidlo-tilcer-meal-plans?filters[date][$gte]=${startDate}&filters[date][$lte]=${endDate}`,
            {
                method: 'GET',
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch /meal-plans`);
        }

        const data = await response.json();
        return data.data as MealDto[]
    } catch (error) {
        console.error('Error fetching /meal-plans:', error);
        throw error;
    }
}