import {MEALTIME} from "../enums.ts";
import {RecipeDto} from "./recipe.dto.ts";

export interface MealDto {
    id: number;
    documentId: string;
    date: string;
    mealtime: MEALTIME;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    recipe?: RecipeDto;
}

export interface MealPlanPostDto {
    date: string;
    mealtime: MEALTIME;
    recipe: number;
}