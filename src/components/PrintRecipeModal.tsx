import React, { useState } from "react";
import { X, Printer, Download, ExternalLink, Sliders, Check } from "lucide-react";
import { Recipe } from "../types";
import { openPrintWindow, downloadPrintableHtml } from "../utils/printableRecipeGenerator";

interface PrintRecipeModalProps {
  recipe: Recipe;
  isOpen: boolean;
  onClose: () => void;
  initialServingsMultiplier?: number;
}

export const PrintRecipeModal: React.FC<PrintRecipeModalProps> = ({
  recipe,
  isOpen,
  onClose,
  initialServingsMultiplier = 1,
}) => {
  const [multiplier, setMultiplier] = useState<number>(initialServingsMultiplier);
  const [includeNutrition, setIncludeNutrition] = useState<boolean>(true);
  const [includeChefNotes, setIncludeChefNotes] = useState<boolean>(true);

  if (!isOpen) return null;

  const scaledServings = Math.round(recipe.servings * multiplier);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl border border-[#E6E1D8] space-y-6">
        <div className="flex items-center justify-between border-b border-[#E6E1D8] pb-4">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-[#E97520]" />
            <h3 className="font-bold text-lg text-[#242423]">Print Recipe Options</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#77736D] hover:text-[#242423] hover:bg-[#FAF9F6] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-sm text-[#4D4943]">
          <div>
            <span className="font-semibold text-[#242423] block mb-1">Recipe:</span>
            <p className="text-base font-bold text-[#242423]">{recipe.title}</p>
          </div>

          <div>
            <label className="font-semibold text-[#242423] block mb-2">
              Serving Scale: <span className="text-[#E97520]">{scaledServings} servings</span> ({multiplier}x)
            </label>
            <div className="flex gap-2">
              {[0.5, 1, 1.5, 2, 3].map((m) => (
                <button
                  key={m}
                  onClick={() => setMultiplier(m)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    multiplier === m
                      ? "bg-[#E97520] text-white shadow-xs"
                      : "bg-[#FAF9F6] border border-[#E6E1D8] text-[#4D4943] hover:border-[#E97520]"
                  }`}
                >
                  {m}x
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#E6E1D8]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeNutrition}
                onChange={(e) => setIncludeNutrition(e.target.checked)}
                className="rounded accent-[#E97520]"
              />
              <span>Include Nutrition Breakdown</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeChefNotes}
                onChange={(e) => setIncludeChefNotes(e.target.checked)}
                className="rounded accent-[#E97520]"
              />
              <span>Include Chef Notes &amp; Tips</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E6E1D8]">
          <button
            onClick={() => {
              downloadPrintableHtml(recipe, { multiplier, includeNutrition, includeChefNotes });
              onClose();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#E6E1D8] text-[#4D4943] hover:bg-[#FAF9F6] text-xs font-bold cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download HTML
          </button>
          <button
            onClick={() => {
              openPrintWindow(recipe, { multiplier, includeNutrition, includeChefNotes });
              onClose();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#E97520] hover:bg-[#D46515] text-white text-xs font-bold shadow-xs cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Print Now
          </button>
        </div>
      </div>
    </div>
  );
};
