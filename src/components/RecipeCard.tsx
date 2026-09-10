import React from "react";
import { Clock, Star, Bookmark, ChefHat, FolderHeart } from "lucide-react";
import { Recipe, RecipeCollection } from "../types";

interface RecipeCardProps {
  recipe: Recipe;
  isSaved: boolean;
  onToggleSave: (recipe: Recipe) => void;
  onClick: (recipe: Recipe) => void;
  collections?: RecipeCollection[];
  onOpenCollections?: (recipe: Recipe) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  isSaved,
  onToggleSave,
  onClick,
  collections = [],
  onOpenCollections,
}) => {
  const matchingCollections = collections.filter((c) =>
    c.recipeIds.includes(recipe.id)
  );

  return (
    <article className="recipe-card group bg-white rounded-lg border border-[#E6E1D8] overflow-hidden flex flex-col transition-all duration-300">
      {/* Image Container */}
      <div
        className="relative aspect-[4/3] overflow-hidden bg-[#FAF9F6] cursor-pointer"
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
          onClick(recipe);
        }}
      >
        <img
          src={recipe.heroImage}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          loading="lazy"
        />

        {/* Category Pill */}
        <span className="absolute top-3 left-3 bg-[#30302F]/90 text-white text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded backdrop-blur-xs font-tag">
          {recipe.category}
        </span>

        {/* Action Buttons Top Right */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {isSaved && onOpenCollections && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenCollections(recipe);
              }}
              aria-label="Add to collection"
              title="Add to custom collection"
              className="p-2 rounded-full shadow bg-white/90 text-[#30302F] hover:bg-white hover:text-[#E97520] transition-all cursor-pointer font-ui"
            >
              <FolderHeart className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Save Recipe Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(recipe);
            }}
            aria-label={isSaved ? "Remove from saved recipes" : "Save recipe"}
            className={`p-2 rounded-full shadow transition-all cursor-pointer font-ui ${
              isSaved
                ? "bg-[#E97520] text-white"
                : "bg-white/90 text-[#30302F] hover:bg-white hover:text-[#E97520]"
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-white" : ""}`} />
          </button>
        </div>

        {/* Cuisine Badge */}
        <div className="absolute bottom-2 left-3 text-[10px] font-medium text-white/90 drop-shadow-md font-subheading uppercase tracking-wider">
          {recipe.cuisine}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 font-ui">
        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 text-xs text-[#77736D] mb-1.5 font-ui">
          <div className="flex items-center text-[#E7A52B]">
            <Star className="w-3.5 h-3.5 fill-[#E7A52B]" />
            <span className="ml-1 font-bold text-[#30302F]">{recipe.rating}</span>
          </div>
          <span>&bull;</span>
          <span>({recipe.reviewCount} reviews)</span>
        </div>

        {/* Title */}
        <h3
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
            onClick(recipe);
          }}
          className="text-sm sm:text-base font-bold text-[#242423] font-heading group-hover:text-[#E97520] transition-colors line-clamp-2 cursor-pointer mb-2 leading-snug tracking-wide uppercase"
        >
          {recipe.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-[13px] text-[#635F59] line-clamp-2 leading-relaxed mb-3 flex-1 font-description">
          {recipe.description}
        </p>

        {/* Collection Tags (if recipe is organized into any collections) */}
        {matchingCollections.length > 0 && (
          <div className="flex flex-wrap items-center gap-1 mb-3">
            {matchingCollections.slice(0, 2).map((col) => (
              <span
                key={col.id}
                className="text-[9px] font-semibold px-2 py-0.5 rounded-full text-white inline-flex items-center gap-1 shadow-2xs"
                style={{ backgroundColor: col.color || "#E97520" }}
              >
                <span className="w-1 h-1 bg-white rounded-full" />
                {col.name}
              </span>
            ))}
            {matchingCollections.length > 2 && (
              <span className="text-[10px] text-[#77736D] font-medium">
                +{matchingCollections.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* Footer Meta Row with View Recipe Button */}
        <div className="pt-3 border-t border-[#F3F2EE] flex items-center justify-between gap-2 mt-auto">
          <div className="flex items-center gap-2.5 text-xs text-[#8A857E]">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#30302F]" />
              {recipe.totalTimeMinutes}m
            </span>

            <span className="flex items-center gap-1">
              <ChefHat className="w-3.5 h-3.5 text-[#E97520]" />
              {recipe.difficulty}
            </span>

            <span className="font-medium text-[#30302F] hidden sm:inline">
              {recipe.calories} kcal
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              onClick(recipe);
            }}
            className="px-3 py-1.5 bg-[#E97520] hover:bg-[#D75D17] text-white text-[11px] font-bold uppercase tracking-wider rounded transition-all cursor-pointer flex items-center gap-1 shadow-xs hover:shadow-sm active:scale-95 shrink-0"
            title={`View ${recipe.title} recipe`}
          >
            <span>View Recipe</span>
            <span className="text-xs">&rarr;</span>
          </button>
        </div>
      </div>
    </article>
  );
};

