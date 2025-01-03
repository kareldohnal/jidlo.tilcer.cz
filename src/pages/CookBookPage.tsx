import LayoutWrapper from "../wrappers/LayoutWrapper.tsx";
import {Flex, Menu} from "antd";
import {useQuery} from "@tanstack/react-query";
import {fetchRecipes} from "../api/fetchRecipes.ts";
import {useEffect, useState} from "react";
import {MenuItemType} from "antd/lib/menu/interface";
import {RecipeDto} from "../model/dto/recipe.dto.ts";
import RecipeCookBook from "../components/Recipe.tsx";

const CookBookPage = () => {
    const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<RecipeDto | null>(null);

    const {data} = useQuery({
        queryKey: ['recipes'],
        queryFn: () => fetchRecipes(),
    })

    useEffect(() => {
        if (data) {
            setMenuItems(data.map((recipe: RecipeDto) => ({
                key: recipe.documentId,
                label: recipe.title,
            })))
        }
    }, [data]);

    const handleClick = ({key}: { key: string }) => {
        setSelectedRecipe(data?.find((recipe: RecipeDto) => recipe.documentId === key) ?? null);
    }
    console.log(selectedRecipe)
    return (
        <LayoutWrapper>
            <Flex gap={"middle"}>
                <Menu
                    theme={"light"}
                    items={menuItems}
                    style={{width: 256, height: "100%"}}
                    onClick={handleClick}
                />
                {selectedRecipe && <RecipeCookBook recipe={selectedRecipe}/>}
            </Flex>
        </LayoutWrapper>
    );
}

export default CookBookPage;