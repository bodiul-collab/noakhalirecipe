import React from "react";
import { IMAGES } from "../data/assets";

interface NoakhaliLogoProps {
  variant?: "horizontal" | "stacked" | "icon-only" | "image" | "emblem";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  theme?: "light" | "dark" | "hero";
  showSubtitle?: boolean;
}

export const NoakhaliLogo: React.FC<NoakhaliLogoProps> = ({
  variant = "horizontal",
  size = "md",
  className = "",
  theme = "light",
  showSubtitle = false,
}) => {
  const sizeDimensions = {
    sm: "w-8 h-8",
    md: "w-9 h-9 sm:w-11 sm:h-11",
    lg: "w-14 h-14 sm:w-16 sm:h-16",
    xl: "w-20 h-20 sm:w-24 sm:h-24",
  };

  const textClasses = {
    sm: "text-base",
    md: "text-lg sm:text-2xl",
    lg: "text-3xl sm:text-4xl",
    xl: "text-4xl sm:text-5xl",
  };

  const textColor =
    theme === "dark"
      ? "text-white"
      : theme === "hero"
      ? "text-[#0A1945]"
      : "text-[#0A1945]";

  // Standalone circular image emblem variant
  if (variant === "image" || variant === "emblem") {
    return (
      <div className={`inline-flex items-center justify-center shrink-0 ${className}`}>
        <img
          src={IMAGES.logoFull}
          alt="Noākhāli Kitchen Authentic Recipes, Timeless Flavors Logo"
          className={`${sizeDimensions[size]} object-contain rounded-xl drop-shadow-xs bg-white`}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // Icon only variant
  if (variant === "icon-only") {
    return (
      <div className={`inline-flex items-center justify-center shrink-0 ${className}`}>
        <img
          src={IMAGES.logoFull}
          alt="Noākhāli Kitchen Logo Emblem"
          className={`${sizeDimensions[size]} object-contain rounded-full shadow-xs bg-white`}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // Horizontal Brand Logo with official image emblem alongside typography
  return (
    <div
      className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}
      aria-label="Noākhāli Kitchen"
    >
      {/* Official Brand Image Emblem */}
      <img
        src={IMAGES.logoFull}
        alt="Noākhāli Kitchen Logo Emblem"
        className={`${sizeDimensions[size]} object-contain rounded-xl shadow-xs bg-white border border-[#E6E1D8]/80 shrink-0`}
        referrerPolicy="no-referrer"
      />

      {/* Brand Typography */}
      <div className="flex flex-col tracking-tight leading-[0.95]">
        <span
          className={`font-black tracking-tight ${textColor} ${textClasses[size]} font-sans`}
          style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
        >
          Noākhāli
        </span>
        <span
          className={`font-black tracking-tight ${textColor} ${textClasses[size]} font-sans`}
          style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
        >
          Kitchen
        </span>

        {showSubtitle && (
          <span className="text-[10px] tracking-widest uppercase font-semibold text-[#8A857E] mt-1">
            Authentic Halal Cuisine
          </span>
        )}
      </div>
    </div>
  );
};
