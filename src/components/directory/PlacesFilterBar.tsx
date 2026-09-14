import React from "react";
import {
  List,
  Map as MapIcon,
  Star,
  Clock,
  ArrowUpDown,
  Search,
  RotateCw,
} from "lucide-react";
import { SearchCategory, SearchFilters } from "../../types";

interface PlacesFilterBarProps {
  totalCount: number;
  category: SearchCategory;
  categoryLabel: string;
  locationName: string;
  filters: SearchFilters;
  onChangeFilters: (newFilters: Partial<SearchFilters>) => void;
  mobileView: "list" | "map";
  onChangeMobileView: (view: "list" | "map") => void;
  subQueryInput: string;
  onChangeSubQueryInput: (val: string) => void;
  onApplySubQuery: () => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  lastRefreshedAt?: Date | null;
}

export const PlacesFilterBar: React.FC<PlacesFilterBarProps> = ({
  totalCount,
  category,
  categoryLabel,
  locationName,
  filters,
  onChangeFilters,
  mobileView,
  onChangeMobileView,
  subQueryInput,
  onChangeSubQueryInput,
  onApplySubQuery,
  onRefresh,
  isRefreshing,
  lastRefreshedAt,
}) => {
  const getSubQueryPlaceholder = () => {
    switch (category) {
      case "restaurants":
        return "Filter by cuisine, biryani, burgers...";
      case "groceries":
        return "Filter by meat, butcher, spices...";
      case "mosques":
        return "Filter by Jummah, academy, center...";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#E6E1D8] p-4 shadow-xs space-y-3">
      {/* Top row: Results summary + Mobile View Toggle + Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-[#242423] font-serif-editorial">
            {totalCount} {categoryLabel}
            {totalCount !== 1 ? "s" : ""}
          </h3>
          <p className="text-xs text-[#77736D]">
            Found near <span className="font-semibold text-[#30302F]">{locationName}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Refresh Directory Results Button */}
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={isRefreshing}
              title="Refresh live directory results"
              className="px-3 py-1.5 rounded-lg border border-[#E6E1D8] bg-[#FAF9F6] hover:bg-[#F3F2EE] hover:border-[#30302F] text-[#30302F] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-60 shadow-2xs"
            >
              <RotateCw className={`w-3.5 h-3.5 text-[#E97520] ${isRefreshing ? "animate-spin" : ""}`} />
              <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
              {lastRefreshedAt && !isRefreshing && (
                <span className="text-[10px] text-[#8A857E] hidden md:inline">
                  &bull; {lastRefreshedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              )}
            </button>
          )}

          {/* Mobile View Toggle Buttons [ LIST ] [ MAP ] */}
          <div className="lg:hidden flex items-center bg-[#FAF9F6] p-1 rounded-lg border border-[#E6E1D8]">
            <button
              type="button"
              onClick={() => onChangeMobileView("list")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                mobileView === "list"
                  ? "bg-[#30302F] text-white shadow-xs"
                  : "text-[#77736D] hover:text-[#242423]"
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>List</span>
            </button>
            <button
              type="button"
              onClick={() => onChangeMobileView("map")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                mobileView === "map"
                  ? "bg-[#30302F] text-white shadow-xs"
                  : "text-[#77736D] hover:text-[#242423]"
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and sorting controls */}
      <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-[#F3F2EE] text-xs">
        {/* Sub-query keyword filter */}
        <div className="relative flex-1 min-w-[200px]">
          <input
            type="text"
            value={subQueryInput}
            onChange={(e) => onChangeSubQueryInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onApplySubQuery();
              }
            }}
            placeholder={getSubQueryPlaceholder()}
            className="w-full pl-8 pr-3 py-1.5 bg-[#FAF9F6] border border-[#E6E1D8] rounded-lg text-xs text-[#242423] focus:outline-none focus:border-[#30302F]"
          />
          <Search className="w-3.5 h-3.5 text-[#8A857E] absolute left-2.5 top-2" />
        </div>

        {/* Sort By */}
        <div className="flex items-center gap-1 bg-[#FAF9F6] border border-[#E6E1D8] rounded-lg px-2.5 py-1.5">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#8A857E]" />
          <select
            value={filters.sortBy}
            onChange={(e) =>
              onChangeFilters({ sortBy: e.target.value as "nearest" | "highest_rated" })
            }
            className="bg-transparent text-xs text-[#30302F] font-medium focus:outline-none cursor-pointer"
          >
            <option value="nearest">Nearest First</option>
            <option value="highest_rated">Highest Rated</option>
          </select>
        </div>

        {/* Open Now Checkbox */}
        <label className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#FAF9F6] border border-[#E6E1D8] rounded-lg cursor-pointer hover:border-[#30302F] select-none">
          <input
            type="checkbox"
            checked={filters.openNowOnly}
            onChange={(e) => onChangeFilters({ openNowOnly: e.target.checked })}
            className="rounded text-[#E97520] focus:ring-0 w-3.5 h-3.5 cursor-pointer"
          />
          <Clock className="w-3.5 h-3.5 text-[#2D7A52]" />
          <span className="text-xs font-medium text-[#30302F]">Open Now</span>
        </label>

        {/* Rating Filter */}
        <div className="flex items-center gap-1 bg-[#FAF9F6] border border-[#E6E1D8] rounded-lg px-2.5 py-1.5">
          <Star className="w-3.5 h-3.5 text-[#E7A52B] fill-current" />
          <select
            value={filters.minRating}
            onChange={(e) =>
              onChangeFilters({ minRating: parseFloat(e.target.value) })
            }
            className="bg-transparent text-xs text-[#30302F] font-medium focus:outline-none cursor-pointer"
          >
            <option value="0">All Ratings</option>
            <option value="4">4.0+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
          </select>
        </div>
      </div>
    </div>
  );
};
