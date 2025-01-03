import LayoutWrapper from "../wrappers/LayoutWrapper.tsx";
import { Flex, Input, Menu, Space } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchRecipes } from "../api/fetchRecipes.ts";
import { useEffect, useState } from "react";
import { MenuItemType } from "antd/lib/menu/interface";
import { CuisineTagDto, RecipeDto } from "../model/dto/recipe.dto.ts";
import RecipeCookBook from "../components/Recipe.tsx";
import { capitalizeString } from "../utils/capitalizeString.ts";

const CookBookPage = () => {
    const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<RecipeDto | null>(null);

    // Tracks which Menu keys should be open (expanded)
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    // For real-time search (debounced):
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    // Helper: highlight matching text
    const highlightText = (text: string, query: string) => {
        if (!query) return text; // Nothing to highlight
        const regex = new RegExp(`(${query})`, "gi");
        const parts = text.split(regex);
        return (
            <>
                {parts.map((part, idx) =>
                    part.toLowerCase() === query.toLowerCase() ? (
                        <mark key={idx}>{part}</mark>
                    ) : (
                        part
                    )
                )}
            </>
        );
    };

    // Query all recipes
    const { data } = useQuery({
        queryKey: ["recipes"],
        queryFn: () => fetchRecipes(),
    });

    // Debounce effect: wait 200ms after typing stops
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 200);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Build menu items whenever data or debouncedSearchTerm changes
    useEffect(() => {
        if (!data) return;

        // Collect unique cuisine tags
        const seenCuisineTagIds = new Set<number>();
        const cuisineTags: CuisineTagDto[] = [];
        data.forEach((recipe) => {
            const { cuisineTag } = recipe;
            if (cuisineTag && !seenCuisineTagIds.has(cuisineTag.id)) {
                seenCuisineTagIds.add(cuisineTag.id);
                cuisineTags.push(cuisineTag);
            }
        });

        // Determine which cuisine keys should be open
        const expandedKeys: string[] = [];

        // Build items (top level: cuisine tags, children: matched recipes)
        const newMenuItems = cuisineTags.map((cuisine: CuisineTagDto) => {
            // Filter + highlight only the recipes that match the search
            const childRecipes = data
                .filter(
                    (recipe: RecipeDto) => recipe.cuisineTag.documentId === cuisine.documentId
                )
                .map((recipe: RecipeDto) => {
                    // If there's a search, check if recipe title matches
                    const matchesSearch = debouncedSearchTerm
                        ? recipe.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
                        : true;

                    if (!matchesSearch) return null; // Skip this recipe

                    return {
                        key: recipe.documentId,
                        label: highlightText(recipe.title, debouncedSearchTerm),
                        // We could store the recipe here if needed, but not required
                    };
                })
                .filter((child) => {
                    // Keep only children that matched the search
                    if (!debouncedSearchTerm) return true; // If no search, show all
                    // child.label is ReactNode; we can re-check textual content or rely on the earlier .includes check
                    // Simpler approach: if highlightText changed anything, it's a match. Let’s rely on the .includes logic above.
                    return !!child;
                });

            // Decide if this cuisine should be expanded
            if (childRecipes.length > 0 && debouncedSearchTerm) {
                expandedKeys.push(cuisine.documentId);
            }

            return {
                key: cuisine.documentId,
                label: capitalizeString(cuisine.cuisineTag),
                children: childRecipes,
            };
        });

        setMenuItems(newMenuItems);
        setOpenKeys(expandedKeys);
    }, [data, debouncedSearchTerm]);

    // When user selects a recipe from the menu
    const handleClick = ({ key }: { key: string }) => {
        setSelectedRecipe(
            data?.find((recipe: RecipeDto) => recipe.documentId === key) ?? null
        );
    };

    // Called when user expands/collapses top-level menu items
    const handleOpenChange = (keys: string[]) => {
        setOpenKeys(keys);
    };

    return (
        <LayoutWrapper>
            <Flex gap={"middle"}>
                <Flex vertical={true} style={{minWidth: "30%", position: "sticky", top: "90px"}}>
                    <Space
                        style={{ padding: "10px", display: "flex", justifyContent: "space-between" }}
                    >
                        <Input
                            allowClear={true}
                            placeholder="Search recipe"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ flex: 1, marginRight: "8px" }}
                        />
                    </Space>
                    <Menu
                        theme="light"
                        items={menuItems}
                        mode="inline"
                        style={{ height: "100%" }}
                        onClick={handleClick}
                        openKeys={openKeys}
                        onOpenChange={handleOpenChange}
                    />
                </Flex>
                {selectedRecipe && <RecipeCookBook recipe={selectedRecipe} />}
            </Flex>
        </LayoutWrapper>
    );
};

export default CookBookPage;