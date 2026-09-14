import React from "react";
import { Utensils, ShoppingBag, Building2 } from "lucide-react";
import { SearchCategory } from "../../types";

interface CategorySelectorProps {
  selectedCategory: SearchCategory;
  onSelectCategory: (category: SearchCategory) => void;
  counts?: Partial<Record<SearchCategory, number>>;
  isLoading?: boolean;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onSelectCategory,
  counts,
  isLoading,
}) => {
  const categories: Array<{
    id: SearchCategory;
    label: string;
    description: string;
    icon: React.ReactNode;
    activeBorder: string;
    activeBg: string;
    accentColor: string;
  }> = [
    {
      id: "restaurants",
      label: "Halal Restaurants",
      description: "Dining, grills, biryani & takeout",
      icon: <Utensils className="w-5 h-5" />,
      activeBorder: "border-[#E97520]",
      activeBg: "bg-[#FFF9F2] text-[#242423]",
      accentColor: "#E97520",
    },
    {
      id: "groceries",
      label: "Halal Grocery",
      description: "Fresh zabiha meat, spices & staples",
      icon: <ShoppingBag className="w-5 h-5" />,
      activeBorder: "border-[#2D7A52]",
      activeBg: "bg-[#F4FAF6] text-[#242423]",
      accentColor: "#2D7A52",
    },
    {
      id: "mosques",
      label: "Mosques & Jummah",
      description: "Daily prayers, Jummah & community",
      icon: <Building2 className="w-5 h-5" />,
      activeBorder: "border-[#1B6CA8]",
      activeBg: "bg-[#F2F8FD] text-[#242423]",
      accentColor: "#1B6CA8",
    },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-widest text-[#77736D]">
          WHAT ARE YOU LOOKING FOR?
        </h2>
        <span className="text-[11px] text-[#8A857E]">
          Select a category to search live
        </span>
      </div>

      {/* 3 Equal Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = counts?.[cat.id];

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 relative ${
                isSelected
                  ? `${cat.activeBorder} ${cat.activeBg} ring-2 ring-opacity-20 shadow-sm`
                  : "border-[#E6E1D8] bg-white hover:border-[#30302F] text-[#55504A]"
              }`}
            >
              <div className="flex items-start justify-between w-full">
                <div
                  className={`p-2.5 rounded-lg transition-colors ${
                    isSelected
                      ? "bg-white shadow-xs text-[#242423]"
                      : "bg-[#FAF9F6] text-[#77736D]"
                  }`}
                  style={{ color: isSelected ? cat.accentColor : undefined }}
                >
                  {cat.icon}
                </div>

                {count !== undefined && !isLoading && (
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-white text-[#242423] shadow-xs"
                        : "bg-[#F3F2EE] text-[#77736D]"
                    }`}
                  >
                    {count} places
                  </span>
                )}
              </div>

              <div>
                <h3
                  className={`text-sm sm:text-base font-bold font-serif-editorial ${
                    isSelected ? "text-[#242423]" : "text-[#30302F]"
                  }`}
                >
                  {cat.label}
                </h3>
                <p className="text-xs text-[#77736D] mt-0.5">{cat.description}</p>
              </div>

              {isSelected && (
                <div
                  className="h-1 w-8 rounded-full"
                  style={{ backgroundColor: cat.accentColor }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
