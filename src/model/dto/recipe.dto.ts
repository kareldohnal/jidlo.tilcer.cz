interface RecipeChild {
    text: string;
    type: string;
}

interface RecipeElement {
    type: string;
    children: RecipeChild[];
}

export interface TagDto {
    id: number;
    documentId: string;
    tag: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    publishedAt: string; // ISO date string
}

export interface Ingredient {
    id: number;
    documentId: string;
    ingredient: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    publishedAt: string; // ISO date string
}

export interface RecipeDto {
    id: number;
    documentId: string;
    title: string;
    recipe: RecipeElement[];
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    publishedAt: string; // ISO date string
    tags?: TagDto[];
    ingredients?: Ingredient[];
}