import React from "react";
import { SearchX, ArrowUpRight, Compass, PlusCircle } from "lucide-react";
import { SearchCategory } from "../../types";

interface PlacesEmptyStateProps {
  category: SearchCategory;
  locationName: string;
  onIncreaseRadius: () => void;
  onOpenSuggestModal: () => void;
  onResetFilters: () => void;
}

export const PlacesEmptyState: React.FC<PlacesEmptyStateProps> = ({
  category,
  locationName,
  onIncreaseRadius,
  onOpenSuggestModal,
  onResetFilters,
}) => {
  const getCategoryName = () => {
    switch (category) {
      case "restaurants":
        return "halal restaurants";
      case "groceries":
        return "halal grocery stores or zabiha butchers";
      case "mosques":
        return "mosques or Islamic centers";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E6E1D8] p-8 sm:p-12 text-center space-y-4 shadow-xs">
      <div className="w-14 h-14 mx-auto rounded-full bg-[#FAF9F6] border border-[#E6E1D8] flex items-center justify-center text-[#8A857E]">
        <SearchX className="w-7 h-7 text-[#E97520]" />
      </div>

      <div className="max-w-md mx-auto space-y-1.5">
        <h3 className="text-lg sm:text-xl font-bold text-[#242423] font-serif-editorial">
          No {getCategoryName()} found near {locationName}
        </h3>
        <p className="text-xs sm:text-sm text-[#77736D] leading-relaxed">
          We couldn't find matches within your current search radius. Try expanding your search distance or submitting a local community recommendation.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
        <button
          type="button"
          onClick={onIncreaseRadius}
          className="px-4 py-2.5 bg-[#E97520] hover:bg-[#D75D17] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <Compass className="w-4 h-4" />
          <span>Expand Radius (25 mi / 40 km)</span>
        </button>

        <button
          type="button"
          onClick={onResetFilters}
          className="px-4 py-2.5 bg-[#FAF9F6] hover:bg-[#F3F2EE] border border-[#E6E1D8] text-[#30302F] rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          <span>Reset Filters</span>
        </button>

        <button
          type="button"
          onClick={onOpenSuggestModal}
          className="px-4 py-2.5 bg-[#30302F] hover:bg-[#242423] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-[#E7A52B]" />
          <span>Suggest a Place</span>
        </button>
      </div>
    </div>
  );
};
