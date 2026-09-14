import React, { useState } from "react";
import {
  Search,
  MapPin,
  Compass,
  AlertCircle,
  ChevronDown,
  Loader2,
  X,
  SlidersHorizontal,
  RotateCw,
} from "lucide-react";
import { SearchFilters, SearchLocation } from "../../types";

interface LocationSearchHeaderProps {
  locationInput: string;
  onChangeLocationInput: (val: string) => void;
  onSearch: (overrideQuery?: string) => void;
  onUseMyLocation: () => void;
  isLoadingLocation: boolean;
  locationError: string | null;
  onClearLocationError: () => void;
  resolvedLocation: SearchLocation | null;
  ambiguousLocations: SearchLocation[];
  onSelectAmbiguousLocation: (loc: SearchLocation) => void;
  filters: SearchFilters;
  onChangeFilters: (newFilters: Partial<SearchFilters>) => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export const LocationSearchHeader: React.FC<LocationSearchHeaderProps> = ({
  locationInput,
  onChangeLocationInput,
  onSearch,
  onUseMyLocation,
  isLoadingLocation,
  locationError,
  onClearLocationError,
  resolvedLocation,
  ambiguousLocations,
  onSelectAmbiguousLocation,
  filters,
  onChangeFilters,
  onRefresh,
  isRefreshing,
}) => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const radiusOptions = [
    { meters: 1609, labelMi: "1 mile", labelKm: "1.6 km" },
    { meters: 8046, labelMi: "5 miles", labelKm: "8 km" },
    { meters: 16093, labelMi: "10 miles", labelKm: "16 km" },
    { meters: 40233, labelMi: "25 miles", labelKm: "40 km" },
    { meters: 80467, labelMi: "50 miles", labelKm: "80 km" },
  ];

  const popularLocations = [
    { label: "Houston (77057)", query: "Houston, TX 77057" },
    { label: "Katy (77449)", query: "Katy, TX 77449" },
    { label: "Toronto (M5V 3A8)", query: "Toronto, M5V 3A8" },
    { label: "London (SW1A 1AA)", query: "London, SW1A 1AA" },
    { label: "Dhaka (1205)", query: "Dhaka 1205" },
    { label: "New Delhi (110001)", query: "New Delhi 110001" },
    { label: "Dubai (UAE)", query: "Dubai, UAE" },
    { label: "Sydney (2000)", query: "Sydney 2000" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!locationInput.trim()) return;
    onSearch();
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E6E1D8] p-5 sm:p-7 shadow-xs space-y-6">
      {/* Title & Hierarchy */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#2D7A52] bg-[#2D7A52]/10 px-2 py-0.5 rounded">
            GLOBAL LIVE SEARCH
          </span>
          <span className="text-xs text-[#8A857E] hidden sm:inline">&bull;</span>
          <span className="text-xs text-[#8A857E] hidden sm:inline">
            International Postal Codes, Cities &amp; Neighborhoods
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#242423] font-serif-editorial">
          Find Halal &amp; Islamic Places
        </h1>
        <p className="text-xs sm:text-sm text-[#77736D] max-w-3xl">
          Search anywhere in the world by city, ZIP/postal code, address, or location. Discover Halal restaurants, fresh zabiha grocers, and mosques offering daily &amp; Jummah prayers.
        </p>
      </div>

      {/* Main Search Input Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <div className="absolute left-3.5 top-3.5 text-[#8A857E] pointer-events-none">
              <MapPin className="w-4 h-4 text-[#E97520]" />
            </div>

            <input
              type="text"
              value={locationInput}
              onChange={(e) => {
                onChangeLocationInput(e.target.value);
                if (locationError) onClearLocationError();
              }}
              placeholder="Enter any global city, ZIP/postal code, or address (e.g. 77002, London, Dhaka, Dubai)..."
              className="w-full pl-10 pr-10 py-3 text-xs sm:text-sm bg-[#FAF9F6] border border-[#E6E1D8] rounded-xl text-[#242423] placeholder-[#8A857E] focus:outline-none focus:border-[#242423] focus:bg-white transition-colors"
            />

            {locationInput && (
              <button
                type="button"
                onClick={() => {
                  onChangeLocationInput("");
                  if (locationError) onClearLocationError();
                }}
                className="absolute right-3 top-3.5 text-[#8A857E] hover:text-[#242423] p-0.5 cursor-pointer"
                title="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={isLoadingLocation || !locationInput.trim()}
              className="flex-1 sm:flex-none px-6 py-3 bg-[#E97520] hover:bg-[#D75D17] disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              {isLoadingLocation ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onUseMyLocation}
              disabled={isLoadingLocation}
              title="Find places near your current position"
              className="px-4 py-3 bg-[#FAF9F6] hover:bg-[#F3F2EE] border border-[#E6E1D8] hover:border-[#30302F] text-[#30302F] rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Compass className="w-4 h-4 text-[#2D7A52]" />
              <span className="hidden md:inline">Use My Location</span>
              <span className="md:hidden">Near Me</span>
            </button>

            {onRefresh && (
              <button
                type="button"
                onClick={onRefresh}
                disabled={isRefreshing || isLoadingLocation}
                className="p-3 bg-[#FAF9F6] hover:bg-[#F3F2EE] border border-[#E6E1D8] hover:border-[#30302F] text-[#30302F] rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                title="Refresh current search results"
              >
                <RotateCw className={`w-4 h-4 text-[#E97520] ${isRefreshing ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">{isRefreshing ? "Refreshing..." : "Refresh"}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`p-3 rounded-xl border transition-colors cursor-pointer flex items-center gap-1.5 ${
                filtersOpen
                  ? "bg-[#30302F] text-white border-[#30302F]"
                  : "bg-[#FAF9F6] text-[#55504A] border-[#E6E1D8] hover:border-[#30302F]"
              }`}
              title="Toggle search radius & units"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-xs font-bold hidden lg:inline">Filters</span>
            </button>
          </div>
        </div>

        {/* Resolved Location Banner */}
        {resolvedLocation && (
          <div className="flex items-center justify-between bg-[#F0FDF4] border border-[#BBF7D0] px-3.5 py-2 rounded-lg text-xs text-[#166534]">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#2D7A52] shrink-0" />
              <span className="font-semibold">Current Search Center:</span>
              <span className="truncate">{resolvedLocation.formattedAddress}</span>
            </div>
            <span className="text-[11px] font-bold text-[#2D7A52] shrink-0 ml-2">
              Radius:{" "}
              {filters.distanceUnit === "km"
                ? `${Math.round(filters.radiusMeters / 1000)} km`
                : `${Math.round(filters.radiusMeters / 1609)} mi`}
            </span>
          </div>
        )}

        {/* Location Error / Permission Notice */}
        {locationError && (
          <div className="flex items-start gap-2 bg-[#FFF7ED] border border-[#FFEDD5] p-3 rounded-lg text-xs text-[#9A3412]">
            <AlertCircle className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium">{locationError}</p>
            </div>
            <button
              type="button"
              onClick={onClearLocationError}
              className="text-[#9A3412] hover:text-[#7C2D12] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Ambiguous Location Disambiguation Selector */}
        {ambiguousLocations.length > 1 && (
          <div className="bg-[#FFFDF9] border border-[#F8CD78] p-3.5 rounded-xl space-y-2">
            <p className="text-xs font-bold text-[#D75D17]">
              Multiple matching locations found. Please select your target area:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ambiguousLocations.map((loc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectAmbiguousLocation(loc)}
                  className="text-left px-3 py-2 bg-white border border-[#E6E1D8] hover:border-[#E97520] hover:bg-[#FFF9F2] rounded-lg text-xs transition-colors cursor-pointer flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#E97520] shrink-0" />
                  <span className="truncate font-medium text-[#242423]">
                    {loc.formattedAddress}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </form>

      {/* Expandable Radius & Units Drawer */}
      {filtersOpen && (
        <div className="p-4 bg-[#FAF9F6] rounded-xl border border-[#E6E1D8] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {/* Radius Selector */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="block font-bold text-[#30302F]">
              Search Radius:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {radiusOptions.map((opt) => {
                const isSelected = filters.radiusMeters === opt.meters;
                return (
                  <button
                    key={opt.meters}
                    type="button"
                    onClick={() => onChangeFilters({ radiusMeters: opt.meters })}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#30302F] text-white font-bold"
                        : "bg-white border border-[#E6E1D8] text-[#55504A] hover:border-[#30302F]"
                    }`}
                  >
                    {filters.distanceUnit === "km" ? opt.labelKm : opt.labelMi}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Unit Toggle */}
          <div className="space-y-1.5">
            <label className="block font-bold text-[#30302F]">
              Distance Unit:
            </label>
            <div className="inline-flex rounded-lg border border-[#E6E1D8] bg-white p-0.5">
              <button
                type="button"
                onClick={() => onChangeFilters({ distanceUnit: "mi" })}
                className={`px-3 py-1 rounded-md font-semibold text-xs transition-colors cursor-pointer ${
                  filters.distanceUnit === "mi"
                    ? "bg-[#E97520] text-white"
                    : "text-[#77736D] hover:text-[#30302F]"
                }`}
              >
                Miles (mi)
              </button>
              <button
                type="button"
                onClick={() => onChangeFilters({ distanceUnit: "km" })}
                className={`px-3 py-1 rounded-md font-semibold text-xs transition-colors cursor-pointer ${
                  filters.distanceUnit === "km"
                    ? "bg-[#2D7A52] text-white"
                    : "text-[#77736D] hover:text-[#30302F]"
                }`}
              >
                Kilometers (km)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popular Worldwide Hubs for One-Click Testing */}
      <div className="space-y-1.5 pt-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
          <span className="font-bold text-[#8A857E] uppercase tracking-wider">Explore Popular Locations:</span>
          <span className="text-[#8A857E] text-[11px]">Popular shortcuts &mdash; or search any global city, postal code, or address above</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {popularLocations.map((item) => (
            <button
              key={item.query}
              type="button"
              onClick={() => {
                onChangeLocationInput(item.query);
                onSearch(item.query);
              }}
              className="px-2.5 py-1 bg-[#FAF9F6] hover:bg-[#F3F2EE] border border-[#E6E1D8] hover:border-[#E97520] text-[#55504A] hover:text-[#E97520] rounded-full text-[11px] font-medium transition-colors cursor-pointer shrink-0"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
