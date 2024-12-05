import {MEALTIME} from "../enums.ts";

export interface MealDto {
    id: number;
    documentId: string;
    date: string;
    mealtime: MEALTIME;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}