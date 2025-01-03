import {API_ROOT} from "../model/constants.ts";
import {RecipeDto} from "../model/dto/recipe.dto.ts";

export const fetchRecipes = async () => {
    try {
        const response = await fetch(`${API_ROOT}/jidlo-tilcer-recipes?populate=*`,
            {
                method: 'GET',
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch /recipes`);
        }

        const data = await response.json();
        return data.data as RecipeDto[]
    } catch (error) {
        console.error('Error fetching /meal-plans:', error);
        throw error;
    }
}