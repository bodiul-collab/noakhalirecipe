import React, { useState, useEffect } from "react";
import {
  X,
  Sparkles,
  Clock,
  Utensils,
  Moon,
  Flame,
  Heart,
  Calendar,
  FolderPlus,
  Edit3,
  Check,
} from "lucide-react";
import { RecipeCollection } from "../types";
import {
  PRESET_COLLECTION_COLORS,
  PRESET_COLLECTION_ICONS,
} from "../utils/collectionsStorage";

interface CollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (collectionData: {
    name: string;
    description: string;
    color: string;
    icon: string;
  }) => void;
  initialCollection?: RecipeCollection | null;
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

const SUGGESTED_COLLECTION_NAMES = [
  "Eid Feast",
  "Weeknight Dinners",
  "Ramadan & Iftar",
  "Weekend Brunch",
  "Slow-Cooked Specials",
  "Comfort Curries",
  "Party Finger Foods",
];

export const CollectionModal: React.FC<CollectionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialCollection,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#E97520");
  const [icon, setIcon] = useState("sparkles");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialCollection) {
      setName(initialCollection.name);
      setDescription(initialCollection.description || "");
      setColor(initialCollection.color || "#E97520");
      setIcon(initialCollection.icon || "sparkles");
    } else {
      setName("");
      setDescription("");
      setColor("#E97520");
      setIcon("sparkles");
    }
    setError(null);
  }, [initialCollection, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter a collection name.");
      return;
    }
    onSave({
      name: name.trim(),
      description: description.trim(),
      color,
      icon,
    });
    onClose();
  };

  const SelectedIconComponent = ICON_MAP[icon] || Sparkles;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-[#E6E1D8] overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="collection-modal-title"
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-[#E6E1D8] flex items-center justify-between bg-[#FAF9F6]">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-xs"
              style={{ backgroundColor: color }}
            >
              <SelectedIconComponent className="w-4 h-4" />
            </div>
            <div>
              <h3
                id="collection-modal-title"
                className="text-base font-bold text-[#242423] font-serif-editorial"
              >
                {initialCollection ? "Edit Collection" : "Create Recipe Collection"}
              </h3>
              <p className="text-[11px] text-[#77736D]">
                Organize your favorite Halal dishes into themed menus
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#77736D] hover:text-[#242423] rounded-md hover:bg-[#F3F2EE] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Quick Suggestions (if new) */}
          {!initialCollection && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-[#77736D] uppercase tracking-wider">
                Quick Suggestions:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_COLLECTION_NAMES.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => {
                      setName(suggestion);
                      setError(null);
                    }}
                    className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                      name === suggestion
                        ? "bg-[#E97520] text-white border-[#E97520] font-semibold"
                        : "bg-[#FAF9F6] text-[#3F3C38] border-[#E6E1D8] hover:border-[#E97520]"
                    }`}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Collection Name */}
          <div className="space-y-1">
            <label
              htmlFor="collection-name-input"
              className="block text-xs font-bold text-[#242423]"
            >
              Collection Name <span className="text-red-500">*</span>
            </label>
            <input
              id="collection-name-input"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g., Eid Feast, Weeknight Dinners, Comfort Curries"
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-[#E6E1D8] bg-white text-[#242423] placeholder-[#8A857E] focus:outline-none focus:ring-2 focus:ring-[#E97520]/20 focus:border-[#E97520]"
              autoFocus
              maxLength={45}
            />
            {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label
              htmlFor="collection-description-input"
              className="block text-xs font-bold text-[#242423]"
            >
              Description <span className="text-[#8A857E] font-normal">(Optional)</span>
            </label>
            <textarea
              id="collection-description-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Festive dishes and biryanis for Eid celebrations..."
              rows={2}
              maxLength={140}
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#E6E1D8] bg-white text-[#242423] placeholder-[#8A857E] focus:outline-none focus:ring-2 focus:ring-[#E97520]/20 focus:border-[#E97520] resize-none"
            />
          </div>

          {/* Theme Color Picker */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#242423]">
              Color Accent
            </label>
            <div className="flex items-center gap-2.5">
              {PRESET_COLLECTION_COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setColor(c.value)}
                  title={c.label}
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-transform hover:scale-110 cursor-pointer relative"
                  style={{ backgroundColor: c.value }}
                >
                  {color === c.value && (
                    <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Icon Picker */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#242423]">
              Collection Icon
            </label>
            <div className="grid grid-cols-7 gap-1.5">
              {PRESET_COLLECTION_ICONS.map((ic) => {
                const Comp = ICON_MAP[ic.id] || Sparkles;
                const isSelected = icon === ic.id;
                return (
                  <button
                    key={ic.id}
                    type="button"
                    onClick={() => setIcon(ic.id)}
                    title={ic.label}
                    className={`p-2 rounded-lg border flex flex-col items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#FAF9F6] border-[#E97520] text-[#E97520] shadow-xs"
                        : "border-[#E6E1D8] text-[#77736D] hover:text-[#242423] hover:border-[#8A857E]"
                    }`}
                  >
                    <Comp className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-[#E6E1D8] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-medium text-[#77736D] hover:text-[#242423] hover:bg-[#F3F2EE] rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#E97520] hover:bg-[#D75D17] text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              {initialCollection ? (
                <>
                  <Edit3 className="w-3.5 h-3.5" />
                  Save Changes
                </>
              ) : (
                <>
                  <FolderPlus className="w-3.5 h-3.5" />
                  Create Collection
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
