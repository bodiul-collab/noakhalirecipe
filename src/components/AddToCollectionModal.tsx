import React, { useState } from "react";
import {
  X,
  Plus,
  Check,
  FolderHeart,
  Sparkles,
  Clock,
  Utensils,
  Moon,
  Flame,
  Heart,
  Calendar,
  Layers,
} from "lucide-react";
import { Recipe, RecipeCollection } from "../types";

interface AddToCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe;
  collections: RecipeCollection[];
  onToggleRecipeInCollection: (collectionId: string, recipeId: string) => void;
  onCreateCollection: (name: string) => void;
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

export const AddToCollectionModal: React.FC<AddToCollectionModalProps> = ({
  isOpen,
  onClose,
  recipe,
  collections,
  onToggleRecipeInCollection,
  onCreateCollection,
}) => {
  const [newCollectionName, setNewCollectionName] = useState("");
  const [isCreatingInline, setIsCreatingInline] = useState(false);

  if (!isOpen) return null;

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;
    onCreateCollection(newCollectionName.trim());
    setNewCollectionName("");
    setIsCreatingInline(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-[#E6E1D8] overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-to-collection-title"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E6E1D8] flex items-center justify-between bg-[#FAF9F6]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FFF9F0] border border-[#F8CD78] text-[#E97520] rounded-lg">
              <FolderHeart className="w-4 h-4" />
            </div>
            <div>
              <h3
                id="add-to-collection-title"
                className="text-base font-bold text-[#242423] font-serif-editorial"
              >
                Save to Custom Collections
              </h3>
              <p className="text-[11px] text-[#77736D] truncate max-w-[260px]">
                Organize "{recipe.title}"
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#77736D] hover:text-[#242423] rounded-md hover:bg-[#F3F2EE] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Recipe Preview Bar */}
        <div className="p-4 bg-[#FAF9F6]/60 border-b border-[#E6E1D8] flex items-center gap-3">
          <img
            src={recipe.heroImage}
            alt={recipe.title}
            className="w-12 h-12 rounded-lg object-cover shrink-0 border border-[#E6E1D8]"
          />
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#E97520]">
              {recipe.category}
            </span>
            <h4 className="text-xs font-bold text-[#242423] truncate">
              {recipe.title}
            </h4>
            <span className="text-[11px] text-[#77736D]">
              {recipe.totalTimeMinutes} mins &bull; {recipe.difficulty}
            </span>
          </div>
        </div>

        {/* Collection Checkboxes */}
        <div className="p-4 max-h-72 overflow-y-auto space-y-2">
          {collections.length === 0 ? (
            <div className="text-center py-6 text-[#77736D] space-y-2">
              <Layers className="w-8 h-8 mx-auto text-[#8A857E]" />
              <p className="text-xs font-medium text-[#242423]">No collections yet</p>
              <p className="text-[11px] text-[#77736D]">
                Create your first collection below to start grouping your recipes.
              </p>
            </div>
          ) : (
            collections.map((col) => {
              const isIncluded = col.recipeIds.includes(recipe.id);
              const IconComp = ICON_MAP[col.icon || "sparkles"] || Sparkles;

              return (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => onToggleRecipeInCollection(col.id, recipe.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer text-left ${
                    isIncluded
                      ? "bg-[#FFF9F0] border-[#E97520] shadow-2xs"
                      : "bg-white border-[#E6E1D8] hover:border-[#8A857E] hover:bg-[#FAF9F6]"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-7 h-7 rounded-md flex items-center justify-center text-white shrink-0 shadow-2xs"
                      style={{ backgroundColor: col.color || "#E97520" }}
                    >
                      <IconComp className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#242423] truncate">
                        {col.name}
                      </div>
                      <div className="text-[11px] text-[#77736D]">
                        {col.recipeIds.length}{" "}
                        {col.recipeIds.length === 1 ? "recipe" : "recipes"}
                        {col.description ? ` &bull; ${col.description}` : ""}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center border transition-colors shrink-0 ${
                      isIncluded
                        ? "bg-[#E97520] border-[#E97520] text-white"
                        : "border-[#8A857E] bg-white"
                    }`}
                  >
                    {isIncluded && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Quick Inline Create */}
        <div className="p-4 border-t border-[#E6E1D8] bg-[#FAF9F6]">
          {isCreatingInline ? (
            <form onSubmit={handleCreateSubmit} className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  placeholder="e.g., Eid Feast, Quick Iftar..."
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-[#E6E1D8] bg-white text-[#242423] focus:outline-none focus:border-[#E97520]"
                  autoFocus
                  maxLength={40}
                />
                <button
                  type="submit"
                  disabled={!newCollectionName.trim()}
                  className="px-3 py-1.5 bg-[#E97520] hover:bg-[#D75D17] disabled:opacity-50 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Create &amp; Add
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingInline(false);
                    setNewCollectionName("");
                  }}
                  className="p-1.5 text-[#77736D] hover:text-[#242423] rounded cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          ) : (
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsCreatingInline(true)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E97520] hover:text-[#D75D17] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Collection</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-xs font-bold bg-[#242423] text-white rounded-lg hover:bg-black transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
