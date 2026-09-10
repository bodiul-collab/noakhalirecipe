import React from "react";
import { IMAGES } from "../data/assets";

interface NoakhaliLogoProps {
  variant?: "horizontal" | "stacked" | "icon-only" | "image";
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
  // If image variant is chosen, render the high-res generated asset
  if (variant === "image") {
    const sizeHeights = {
      sm: "h-8",
      md: "h-11",
      lg: "h-14",
      xl: "h-20",
    };
    return (
      <div className={`inline-flex items-center ${className}`}>
        <img
          src={IMAGES.logoFull}
          alt="Noākhāli Kitchen Logo"
          className={`${sizeHeights[size]} w-auto object-contain drop-shadow-xs`}
        />
      </div>
    );
  }

  // Sizing configurations for crisp vector rendering
  const heightClasses = {
    sm: "h-8",
    md: "h-10 sm:h-11",
    lg: "h-14 sm:h-16",
    xl: "h-20 sm:h-24",
  };

  const textClasses = {
    sm: "text-base",
    md: "text-xl sm:text-2xl",
    lg: "text-3xl sm:text-4xl",
    xl: "text-4xl sm:text-5xl",
  };

  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10 sm:w-11 sm:h-11",
    lg: "w-14 h-14 sm:w-16 sm:h-16",
    xl: "w-20 h-20 sm:w-24 sm:h-24",
  };

  const textColor =
    theme === "dark"
      ? "text-white"
      : theme === "hero"
      ? "text-[#0A1945]"
      : "text-[#0A1945]";

  const steamColor = theme === "dark" ? "#E7A52B" : "#0A1945";
  const potColor = "#B85420"; // Warm authentic terracotta

  // Icon Only SVG
  if (variant === "icon-only") {
    return (
      <div className={`inline-flex items-center justify-center shrink-0 ${className}`}>
        <svg
          viewBox="0 0 120 120"
          className={`${iconSizes[size]} fill-none shrink-0`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Steam curls */}
          <path
            d="M48 24C46 19 50 14 47 9"
            stroke={steamColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M58 24C56 19 60 14 57 9"
            stroke={steamColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M68 24C66 19 70 14 67 9"
            stroke={steamColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Ladle handle angled outward */}
          <path
            d="M74 54L98 22C100 19 104 20 106 23C107 26 106 30 103 33L84 60"
            fill={potColor}
          />

          {/* Casserole Pot Lid Knob */}
          <rect x="52" y="27" width="16" height="6" rx="3" fill={potColor} />

          {/* Pot Lid Rim */}
          <path
            d="M26 40C26 36 34 33 60 33C86 33 94 36 94 40L96 43H24L26 40Z"
            fill={potColor}
          />

          {/* Pot Body with side handles */}
          {/* Left Handle */}
          <path
            d="M22 47C16 47 14 51 14 54C14 57 16 61 22 61V56C19 56 18 55 18 54C18 53 19 52 22 52V47Z"
            fill={potColor}
          />
          {/* Right Handle */}
          <path
            d="M98 47C104 47 106 51 106 54C106 57 104 61 98 61V56C101 56 102 55 102 54C102 53 101 52 98 52V47Z"
            fill={potColor}
          />

          {/* Main Pot Vessel Body */}
          <path
            d="M22 44H98L92 84C90 94 82 98 72 98H48C38 98 30 94 28 84L22 44Z"
            fill={potColor}
          />

          {/* Ladle Bowl Cutout in negative space */}
          <path
            d="M58 84C58 77 64 71 73 71C82 71 88 77 88 84C88 86 86 88 84 88H62C60 88 58 86 58 84Z"
            fill={theme === "dark" ? "#30302F" : theme === "hero" ? "#F8CD78" : "#FFFFFF"}
          />
        </svg>
      </div>
    );
  }

  // Full Horizontal Brand Logo matching the user's uploaded image exactly:
  // Text "Noākhāli Kitchen" on the left, terracotta pot with ladle and steam on the right
  return (
    <div
      className={`inline-flex items-center gap-3 sm:gap-4 select-none ${className}`}
      aria-label="Noākhāli Kitchen"
    >
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

      {/* Terracotta Pot with Ladle & Steam */}
      <div className="shrink-0 flex items-center justify-center">
        <svg
          viewBox="0 0 120 120"
          className={`${iconSizes[size]} fill-none shrink-0`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Steam curls in navy */}
          <path
            d="M48 24C46 19 50 14 47 9"
            stroke={steamColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M58 24C56 19 60 14 57 9"
            stroke={steamColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M68 24C66 19 70 14 67 9"
            stroke={steamColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Ladle handle angled upward-right */}
          <path
            d="M74 54L98 22C100 19 104 20 106 23C107 26 106 30 103 33L84 60"
            fill={potColor}
          />

          {/* Casserole Pot Lid Knob */}
          <rect x="52" y="27" width="16" height="6" rx="3" fill={potColor} />

          {/* Pot Lid Rim */}
          <path
            d="M26 40C26 36 34 33 60 33C86 33 94 36 94 40L96 43H24L26 40Z"
            fill={potColor}
          />

          {/* Pot Side Handles */}
          <path
            d="M22 47C16 47 14 51 14 54C14 57 16 61 22 61V56C19 56 18 55 18 54C18 53 19 52 22 52V47Z"
            fill={potColor}
          />
          <path
            d="M98 47C104 47 106 51 106 54C106 57 104 61 98 61V56C101 56 102 55 102 54C102 53 101 52 98 52V47Z"
            fill={potColor}
          />

          {/* Main Pot Vessel Body */}
          <path
            d="M22 44H98L92 84C90 94 82 98 72 98H48C38 98 30 94 28 84L22 44Z"
            fill={potColor}
          />

          {/* Ladle Bowl Cutout in negative space */}
          <path
            d="M58 84C58 77 64 71 73 71C82 71 88 77 88 84C88 86 86 88 84 88H62C60 88 58 86 58 84Z"
            fill={theme === "dark" ? "#30302F" : theme === "hero" ? "#F8CD78" : "#FFFFFF"}
          />
        </svg>
      </div>
    </div>
  );
};
