import {Ingredient, RecipeDto, TagDto} from "../model/dto/recipe.dto.ts";
import {Flex, Tag} from "antd";
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
import "./recipe.scss"

type Props = {
    recipe: RecipeDto;
}

const RecipeCookBook = ({recipe}: Props) => {
    return (
        <div className={"recipe"}>
            <h1>{recipe.title}</h1>
            <Flex gap={8} wrap={true}>
                {recipe.tags?.map((tag: TagDto) => (
                    <Tag key={tag.documentId} style={{marginInlineEnd: 0}}>{tag.tag}</Tag>
                ))}
            </Flex>
            <h3>Ingredience:</h3>
            <Flex gap={8} vertical={true} align={"start"} style={{paddingLeft: "12px"}}>
                {recipe.ingredients?.map((ingredient: Ingredient) => (
                    <Tag color={"orange"} key={ingredient.documentId}>{ingredient.ingredient}</Tag>
                ))}
            </Flex>
            <BlocksRenderer content={recipe.recipe as BlocksContent} />
        </div>
    )
}

export default RecipeCookBook;