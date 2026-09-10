import React, { useState, useEffect, useRef } from "react";
import { Search, X, Flame, ArrowRight, RotateCw } from "lucide-react";

interface SearchUtilityRowProps {
  onSearch: (term: string) => void;
  onNavigate: (route: string) => void;
  onOpenSaved: () => void;
  initialQuery?: string;
}

const TRENDING_SEARCHES = [
  "Birria Tacos",
  "Kofta Tagine",
  "Chicken Mandi",
  "Mezbani Beef",
  "Kibbeh",
  "Teler Pitha",
];

export const SearchUtilityRow: React.FC<SearchUtilityRowProps> = ({
  onSearch,
  onNavigate,
  onOpenSaved,
  initialQuery = "",
}) => {
  const [inputVal, setInputVal] = useState(initialQuery);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isUserTyping = useRef(false);

  // Sync with initialQuery when passed from parent without triggering search
  useEffect(() => {
    setInputVal(initialQuery);
    isUserTyping.current = false;
  }, [initialQuery]);

  // Automatic refresh ONLY when user actually types (debounced)
  useEffect(() => {
    if (!isUserTyping.current) {
      return;
    }
    const timer = setTimeout(() => {
      onSearch(inputVal.trim());
      isUserTyping.current = false;
    }, 300);

    return () => clearTimeout(timer);
  }, [inputVal, onSearch]);

  const handleRefreshSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    isUserTyping.current = false;
    setIsRefreshing(true);
    onSearch(inputVal.trim());
    setTimeout(() => {
      setIsRefreshing(false);
    }, 450);
  };

  const handleTagClick = (tag: string) => {
    isUserTyping.current = false;
    setInputVal(tag);
    setIsRefreshing(true);
    onSearch(tag);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 350);
  };

  const handleClear = () => {
    isUserTyping.current = false;
    setInputVal("");
    setIsRefreshing(true);
    onSearch("");
    setTimeout(() => {
      setIsRefreshing(false);
    }, 300);
  };

  return (
    <div
      id="search-utility-row"
      className="w-full bg-[#FAF9F6] border-b border-[#E6E1D8] py-2.5 sm:py-3 px-4 sm:px-6 print:hidden"
    >
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 sm:gap-4">
        {/* Sleek Search Input Bar with Auto-Refresh */}
        <form
          onSubmit={handleRefreshSearch}
          className="relative flex-1 max-w-xl flex items-center border border-[#E6E1D8] rounded-lg bg-white focus-within:border-[#E97520] focus-within:ring-2 focus-within:ring-[#E97520]/15 transition-all shadow-2xs"
        >
          <div className="pl-3.5 text-[#8A857E] flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-[#8A857E]" />
          </div>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => {
              isUserTyping.current = true;
              setInputVal(e.target.value);
            }}
            placeholder="Search Halal recipes, ingredients, techniques..."
            className="w-full px-3 py-2 text-xs sm:text-sm bg-transparent text-[#30302F] placeholder-[#8A857E] focus:outline-none min-w-0"
          />
          {inputVal && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 text-[#8A857E] hover:text-[#30302F] transition-colors cursor-pointer mr-1"
              aria-label="Clear search input"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Automatic Refresh Search Button */}
          <button
            type="submit"
            onClick={handleRefreshSearch}
            className="px-3.5 py-1.5 mr-1 text-xs font-semibold bg-[#30302F] text-white hover:bg-[#E97520] rounded-md transition-all cursor-pointer shrink-0 flex items-center gap-1.5 shadow-2xs active:scale-95"
            title="Click to automatically refresh search results"
          >
            <RotateCw
              className={`w-3.5 h-3.5 transition-transform ${
                isRefreshing ? "animate-spin text-[#F8CD78]" : ""
              }`}
            />
            <span>{isRefreshing ? "Refreshing..." : "Search"}</span>
          </button>
        </form>

        {/* Trending Quick Search Pills (Decongested alternative to duplicate buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs">
          <span className="text-[11px] font-semibold text-[#8A857E] uppercase tracking-wider flex items-center gap-1 shrink-0">
            <Flame className="w-3 h-3 text-[#E97520]" />
            <span className="hidden sm:inline">Popular:</span>
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            {TRENDING_SEARCHES.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagClick(tag)}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white border border-[#E6E1D8] text-[#55504A] hover:border-[#E97520] hover:text-[#E97520] hover:bg-[#FFF9F0] transition-colors whitespace-nowrap cursor-pointer shadow-2xs"
              >
                {tag}
              </button>
            ))}
          </div>
          <button
            onClick={() => onNavigate("/recipes")}
            className="ml-auto pl-2 text-[11px] font-bold text-[#E97520] hover:underline flex items-center gap-0.5 shrink-0"
          >
            <span className="hidden lg:inline">All Recipes</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

