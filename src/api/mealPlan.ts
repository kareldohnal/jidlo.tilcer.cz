import {API_ROOT} from "../model/constants.ts";
import {DateType} from "../model/types.ts";
import {MealDto, MealPlanPostDto} from "../model/dto/mealPlan.dto.ts";

export const fetchMealPlanByDates = async (startDate: DateType, endDate: DateType) => {
    try {
        const response = await fetch(`${API_ROOT}/jidlo-tilcer-meal-plans?filters[date][$gte]=${startDate}&filters[date][$lte]=${endDate}&populate=recipe`,
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

export const postMealPlan = async (token: string, body: MealPlanPostDto) => {
    try {
        const response = await fetch(`${API_ROOT}/jidlo-tilcer-meal-plans`,
            {
                method: 'POST',
                body: JSON.stringify({data: body}),
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            },
        );

        if (!response.ok) {
            throw new Error(`Failed to POST /meal-plans`);
        }

    } catch (error) {
        console.error('Error in POST /meal-plans:', error);
        throw error;
    }
}

export const deleteMealPlan = async (token: string, mealPlanDocumentId: string) => {
    try {
        const response = await fetch(`${API_ROOT}/jidlo-tilcer-meal-plans/${mealPlanDocumentId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            },
        );

        if (!response.ok) {
            throw new Error(`Failed to DELETE /meal-plans`);
        }

    } catch (error) {
        console.error('Error in DELETE /meal-plans:', error);
        throw error;
    }
}