export interface MealPlanDto {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    meals: MealDto[];
}