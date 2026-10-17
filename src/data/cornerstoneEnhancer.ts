import { Recipe } from "../types";
import { CORNERSTONE_METADATA_MAP } from "./cornerstoneMetadata";
import { CORNERSTONE_ADDITIONAL_RECIPES } from "./cornerstoneRecipes";

export function enhanceRecipesWithCornerstones(baseRecipes: Recipe[]): Recipe[] {
  const existingSlugs = new Set(baseRecipes.map((r) => r.slug));
  const combined = [...baseRecipes];

  for (const extra of CORNERSTONE_ADDITIONAL_RECIPES) {
    if (!existingSlugs.has(extra.slug)) {
      combined.push(extra);
      existingSlugs.add(extra.slug);
    }
  }

  return combined.map((recipe) => {
    const meta = CORNERSTONE_METADATA_MAP.get(recipe.slug);
    if (!meta) return recipe;

    return {
      ...recipe,
      seoTitle: recipe.seoTitle || meta.seoTitle,
      seoDescription: recipe.seoDescription || meta.seoDescription,
      kitchenToolId: recipe.kitchenToolId || meta.kitchenToolId,
      relatedCulture: recipe.relatedCulture || meta.relatedCulture,
      relatedRecipes: recipe.relatedRecipes || meta.relatedRecipes,
      relatedRecipeSlugs: recipe.relatedRecipeSlugs || meta.relatedRecipes,
      relatedGuides: recipe.relatedGuides || meta.relatedGuides,
      relatedGuideSlugs: recipe.relatedGuideSlugs || meta.relatedGuides,
    };
  });
}
