import {Ingredient, RecipeDto, TagDto} from "../model/dto/recipe.dto.ts";
import {Tag} from "antd";

type Props = {
    recipe: RecipeDto;
}

const RecipeCookBook = ({recipe}: Props) => {
    return (
        <div>
            <h1>{recipe.title}</h1>
            {recipe.tags.map((tag: TagDto) => (
                <Tag key={tag.documentId}>{tag.tag}</Tag>
            ))}
            {recipe.ingredients.map((ingredient: Ingredient) => (
                <Tag color={"orange"} key={ingredient.documentId}>{ingredient.ingredient}</Tag>
            ))}
        </div>
    )
}

export default RecipeCookBook;