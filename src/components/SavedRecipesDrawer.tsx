import React, { useState } from "react";
import {
  X,
  Bookmark,
  Trash2,
  Plus,
  Edit3,
  Sparkles,
  Clock,
  Utensils,
  Moon,
  Flame,
  Heart,
  Calendar,
  Layers,
  Search,
  FolderPlus,
  FolderHeart,
  Check,
  ChevronRight,
} from "lucide-react";
import { Recipe, RecipeCollection } from "../types";
import { AddToCollectionModal } from "./AddToCollectionModal";

interface SavedRecipesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedRecipes: Recipe[];
  onRemove: (id: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  collections: RecipeCollection[];
  onCreateCollection: (name: string, description?: string, color?: string, icon?: string) => void;
  onEditCollection: (collection: RecipeCollection) => void;
  onDeleteCollection: (collectionId: string) => void;
  onToggleRecipeInCollection: (collectionId: string, recipeId: string) => void;
  onOpenCreateModal: () => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  sparkles: Sparkles,
  clock: Clock,
  utensils: Utensils,
  moon: Moon,
  flame: Flame,
  heart: Heart,
  calendar: Calendar,
};

export const SavedRecipesDrawer: React.FC<SavedRecipesDrawerProps> = ({
  isOpen,
  onClose,
  savedRecipes,
  onRemove,
  onSelectRecipe,
  collections,
  onCreateCollection,
  onEditCollection,
  onDeleteCollection,
  onToggleRecipeInCollection,
  onOpenCreateModal,
}) => {
  const [activeTab, setActiveTab] = useState<string>("all"); // 'all' or collection.id
  const [searchQuery, setSearchQuery] = useState("");
  const [recipeForCollectionModal, setRecipeForCollectionModal] = useState<Recipe | null>(null);
  const [showAddRecipesToCollectionPicker, setShowAddRecipesToCollectionPicker] = useState(false);

  if (!isOpen) return null;

  const currentCollection =
    activeTab !== "all" ? collections.find((c) => c.id === activeTab) : null;

  // Filter recipes according to active tab
  let displayedRecipes = savedRecipes;
  if (currentCollection) {
    displayedRecipes = savedRecipes.filter((r) =>
      currentCollection.recipeIds.includes(r.id)
    );
  }

  // Filter by search query
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    displayedRecipes = displayedRecipes.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q)
    );
  }

  const handleDeleteCurrentCollection = () => {
    if (!currentCollection) return;
    if (
      window.confirm(
        `Are you sure you want to delete the collection "${currentCollection.name}"? (Your saved recipes will not be deleted).`
      )
    ) {
      onDeleteCollection(currentCollection.id);
      setActiveTab("all");
    }
  };

  const getCollectionsForRecipe = (recipeId: string) => {
    return collections.filter((col) => col.recipeIds.includes(recipeId));
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-150 print:hidden">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Top Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#E6E1D8] flex items-center justify-between bg-[#FAF9F6]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#E97520] text-white shadow-xs">
              <Bookmark className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#242423] font-serif-editorial">
                Saved Recipes &amp; Collections
              </h3>
              <p className="text-[11px] text-[#77736D]">
                {savedRecipes.length} saved &bull; {collections.length} custom collections
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#77736D] hover:text-[#242423] rounded-md hover:bg-[#F3F2EE] transition-colors cursor-pointer"
            aria-label="Close saved recipes"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Collections Tab Bar */}
        <div className="border-b border-[#E6E1D8] bg-white px-3 py-2.5 overflow-x-auto scrollbar-none flex items-center gap-2">
          {/* All Saved Tab */}
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeTab === "all"
                ? "bg-[#242423] text-white shadow-xs"
                : "bg-[#FAF9F6] text-[#3F3C38] border border-[#E6E1D8] hover:border-[#8A857E]"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Saved</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeTab === "all"
                  ? "bg-white/20 text-white"
                  : "bg-[#E6E1D8] text-[#3F3C38]"
              }`}
            >
              {savedRecipes.length}
            </span>
          </button>

          {/* Individual Custom Collections Tabs */}
          {collections.map((col) => {
            const IconComp = ICON_MAP[col.icon || "sparkles"] || Sparkles;
            const isCurrent = activeTab === col.id;
            const count = savedRecipes.filter((r) =>
              col.recipeIds.includes(r.id)
            ).length;

            return (
              <button
                key={col.id}
                onClick={() => setActiveTab(col.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  isCurrent
                    ? "text-white shadow-xs"
                    : "bg-[#FAF9F6] text-[#3F3C38] border border-[#E6E1D8] hover:border-[#8A857E]"
                }`}
                style={
                  isCurrent
                    ? { backgroundColor: col.color || "#E97520" }
                    : undefined
                }
              >
                <IconComp className="w-3.5 h-3.5" />
                <span className="truncate max-w-[130px]">{col.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isCurrent
                      ? "bg-white/25 text-white"
                      : "bg-[#E6E1D8] text-[#3F3C38]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}

          {/* Create New Collection Button in Tab Bar */}
          <button
            onClick={onOpenCreateModal}
            className="px-2.5 py-1.5 rounded-lg text-xs font-bold border border-dashed border-[#E97520] text-[#E97520] hover:bg-[#FFF9F0] transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
            title="Create a new custom collection"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">New Collection</span>
          </button>
        </div>

        {/* Selected Collection Header Banner (When viewing a specific collection) */}
        {currentCollection && (
          <div className="p-3.5 bg-[#FAF9F6] border-b border-[#E6E1D8] space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: currentCollection.color || "#E97520" }}
                  />
                  <h4 className="text-sm font-bold text-[#242423] truncate font-serif-editorial">
                    {currentCollection.name}
                  </h4>
                  <span className="text-[11px] text-[#77736D]">
                    ({displayedRecipes.length}{" "}
                    {displayedRecipes.length === 1 ? "recipe" : "recipes"})
                  </span>
                </div>
                {currentCollection.description && (
                  <p className="text-xs text-[#77736D] mt-0.5 line-clamp-2">
                    {currentCollection.description}
                  </p>
                )}
              </div>

              {/* Collection Action Buttons */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => setShowAddRecipesToCollectionPicker(true)}
                  className="px-2.5 py-1 text-[11px] font-bold bg-[#E97520] hover:bg-[#D75D17] text-white rounded-md shadow-2xs flex items-center gap-1 cursor-pointer transition-colors"
                  title="Add saved recipes to this collection"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Recipes</span>
                </button>
                <button
                  onClick={() => onEditCollection(currentCollection)}
                  className="p-1.5 text-[#77736D] hover:text-[#242423] hover:bg-white rounded-md border border-transparent hover:border-[#E6E1D8] cursor-pointer"
                  title="Edit collection name or theme"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleDeleteCurrentCollection}
                  className="p-1.5 text-[#77736D] hover:text-red-600 hover:bg-white rounded-md border border-transparent hover:border-[#E6E1D8] cursor-pointer"
                  title="Delete this collection"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search inside saved recipes */}
        {savedRecipes.length > 2 && (
          <div className="px-4 py-2 border-b border-[#E6E1D8] bg-white">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-[#8A857E] absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  currentCollection
                    ? `Search in ${currentCollection.name}...`
                    : "Search your saved recipes..."
                }
                className="w-full pl-8 pr-7 py-1.5 text-xs rounded-md border border-[#E6E1D8] bg-[#FAF9F6] text-[#242423] focus:outline-none focus:bg-white focus:border-[#E97520]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 text-[#8A857E] hover:text-[#242423]"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Recipe List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {displayedRecipes.length === 0 ? (
            <div className="text-center py-14 text-[#77736D] space-y-3">
              {currentCollection ? (
                <>
                  <div
                    className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center text-white shadow-xs"
                    style={{ backgroundColor: currentCollection.color || "#E97520" }}
                  >
                    {React.createElement(
                      ICON_MAP[currentCollection.icon || "sparkles"] || Sparkles,
                      { className: "w-6 h-6" }
                    )}
                  </div>
                  <p className="text-sm font-bold text-[#242423]">
                    No recipes in "{currentCollection.name}" yet
                  </p>
                  <p className="text-xs text-[#77736D] max-w-xs mx-auto">
                    Add from your {savedRecipes.length} saved recipes to organize this collection.
                  </p>
                  <button
                    onClick={() => setShowAddRecipesToCollectionPicker(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#E97520] hover:bg-[#D75D17] text-white text-xs font-bold rounded-lg shadow-xs cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Saved Recipes Now</span>
                  </button>
                </>
              ) : (
                <>
                  <Bookmark className="w-12 h-12 mx-auto text-[#E6E1D8]" />
                  <p className="text-sm font-bold text-[#242423]">
                    {searchQuery ? "No matching saved recipes" : "No saved recipes yet"}
                  </p>
                  <p className="text-xs text-[#77736D] max-w-xs mx-auto">
                    {searchQuery
                      ? "Try searching for a different keyword or category."
                      : "Click the bookmark icon on any recipe card to save it and organize into custom collections like 'Eid Feast' or 'Weeknight Dinners'."}
                  </p>
                </>
              )}
            </div>
          ) : (
            displayedRecipes.map((recipe) => {
              const recipeCollections = getCollectionsForRecipe(recipe.id);

              return (
                <div
                  key={recipe.id}
                  className="flex flex-col p-3 rounded-lg border border-[#E6E1D8] hover:border-[#F8CD78] bg-white transition-all shadow-2xs space-y-2.5"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={recipe.heroImage}
                      alt={recipe.title}
                      className="w-16 h-16 rounded-lg object-cover cursor-pointer shrink-0 border border-[#E6E1D8] hover:opacity-90"
                      onClick={() => {
                        onSelectRecipe(recipe);
                        onClose();
                      }}
                    />

                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#E97520]">
                        {recipe.category}
                      </span>
                      <h4
                        onClick={() => {
                          onSelectRecipe(recipe);
                          onClose();
                        }}
                        className="text-xs font-bold text-[#242423] truncate cursor-pointer hover:text-[#E97520]"
                      >
                        {recipe.title}
                      </h4>
                      <div className="text-[11px] text-[#77736D] mt-0.5">
                        {recipe.totalTimeMinutes} mins &bull; {recipe.difficulty} &bull; {recipe.cuisine}
                      </div>

                      {/* Collection Tags for this recipe */}
                      {recipeCollections.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {recipeCollections.map((col) => (
                            <span
                              key={col.id}
                              className="text-[10px] font-semibold px-2 py-0.5 rounded-full text-white inline-flex items-center gap-1"
                              style={{ backgroundColor: col.color || "#E97520" }}
                            >
                              <span className="w-1 h-1 bg-white rounded-full" />
                              {col.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-1 items-end shrink-0">
                      {currentCollection ? (
                        <button
                          onClick={() =>
                            onToggleRecipeInCollection(
                              currentCollection.id,
                              recipe.id
                            )
                          }
                          className="px-2 py-1 text-[10px] font-medium text-red-600 hover:bg-red-50 rounded border border-transparent hover:border-red-200 transition-colors cursor-pointer"
                          title={`Remove from ${currentCollection.name}`}
                        >
                          Remove from Collection
                        </button>
                      ) : (
                        <button
                          onClick={() => onRemove(recipe.id)}
                          className="p-1.5 text-[#8A857E] hover:text-red-600 rounded hover:bg-[#F3F2EE] transition-colors cursor-pointer"
                          title="Remove from saved"
                          aria-label="Remove recipe"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}

                      <button
                        onClick={() => setRecipeForCollectionModal(recipe)}
                        className="px-2 py-1 text-[10px] font-bold text-[#3F3C38] hover:text-[#E97520] bg-[#FAF9F6] hover:bg-[#FFF9F0] border border-[#E6E1D8] hover:border-[#F8CD78] rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                        title="Manage which collections this recipe belongs to"
                      >
                        <FolderHeart className="w-3 h-3 text-[#E97520]" />
                        <span>Collections</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Info */}
        <div className="p-3.5 border-t border-[#E6E1D8] bg-[#FAF9F6] flex items-center justify-between text-xs text-[#77736D]">
          <span>
            {savedRecipes.length} recipes saved in browser
          </span>
          <button
            onClick={onOpenCreateModal}
            className="inline-flex items-center gap-1 text-[#E97520] hover:text-[#D75D17] font-bold cursor-pointer"
          >
            <FolderPlus className="w-3.5 h-3.5" />
            <span>New Collection</span>
          </button>
        </div>
      </div>

      {/* Modal to add/remove this recipe to/from collections */}
      {recipeForCollectionModal && (
        <AddToCollectionModal
          isOpen={Boolean(recipeForCollectionModal)}
          onClose={() => setRecipeForCollectionModal(null)}
          recipe={recipeForCollectionModal}
          collections={collections}
          onToggleRecipeInCollection={onToggleRecipeInCollection}
          onCreateCollection={(name) => {
            onCreateCollection(name);
          }}
        />
      )}

      {/* Modal for adding saved recipes to the currently selected collection */}
      {showAddRecipesToCollectionPicker && currentCollection && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-[#E6E1D8] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#E6E1D8] flex items-center justify-between bg-[#FAF9F6]">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: currentCollection.color || "#E97520" }}
                />
                <h3 className="text-sm font-bold text-[#242423]">
                  Add Recipes to "{currentCollection.name}"
                </h3>
              </div>
              <button
                onClick={() => setShowAddRecipesToCollectionPicker(false)}
                className="p-1 text-[#77736D] hover:text-[#242423]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 max-h-80 overflow-y-auto space-y-2">
              {savedRecipes.length === 0 ? (
                <p className="text-center py-6 text-xs text-[#77736D]">
                  You have no saved recipes yet. Bookmark recipes first to add them.
                </p>
              ) : (
                savedRecipes.map((r) => {
                  const isIn = currentCollection.recipeIds.includes(r.id);
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() =>
                        onToggleRecipeInCollection(currentCollection.id, r.id)
                      }
                      className={`w-full flex items-center justify-between p-2.5 rounded-lg border transition-colors text-left cursor-pointer ${
                        isIn
                          ? "bg-[#FFF9F0] border-[#E97520]"
                          : "bg-white border-[#E6E1D8] hover:bg-[#FAF9F6]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={r.heroImage}
                          alt={r.title}
                          className="w-10 h-10 rounded object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#242423] truncate">
                            {r.title}
                          </p>
                          <p className="text-[10px] text-[#77736D]">
                            {r.category} &bull; {r.totalTimeMinutes} mins
                          </p>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center border shrink-0 ${
                          isIn
                            ? "bg-[#E97520] border-[#E97520] text-white"
                            : "border-[#8A857E] bg-white"
                        }`}
                      >
                        {isIn && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            <div className="p-3 border-t border-[#E6E1D8] bg-[#FAF9F6] flex justify-end">
              <button
                onClick={() => setShowAddRecipesToCollectionPicker(false)}
                className="px-4 py-1.5 text-xs font-bold bg-[#242423] hover:bg-black text-white rounded-lg transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
