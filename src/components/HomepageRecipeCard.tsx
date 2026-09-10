import React, { useState, useRef } from "react";
import { IMAGES } from "../data/assets";
import { NoakhaliLogo } from "./NoakhaliLogo";

interface HomepageRecipeCardProps {
  onOpenRecipe?: () => void;
  imageSrc?: string;
  brandName?: string;
  halalBadge?: string;
  heritageTag?: string;
  title?: string;
  description?: string;
  buttonText?: string;
}

export const HomepageRecipeCard: React.FC<HomepageRecipeCardProps> = ({
  onOpenRecipe,
  imageSrc = IMAGES.shorsheIlish,
  brandName = "Noakhali Kitchen",
  halalBadge = "100% Halal Dish",
  heritageTag = "✨ Signature Heritage Dish",
  title = "Noakhali Shorshe Ilish",
  description = "Steamed hilsa steaks in golden stone-ground mustard paste, nigella seeds & cold-pressed mustard oil.",
  buttonText = "View Recipe →",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [transformStyle, setTransformStyle] = useState<React.CSSProperties>({
    transform: "rotateX(0deg) rotateY(0deg)",
    transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * 15;
    const rotateY = ((x - centerX) / centerX) * 15;

    setTransformStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: "transform 0.1s ease-out, box-shadow 0.15s ease-out",
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setTransformStyle({
      transform: "rotateX(0deg) rotateY(0deg)",
      transition: "transform 0.1s ease-out, box-shadow 0.15s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle({
      transform: "rotateX(0deg) rotateY(0deg)",
      transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease-out",
    });
  };

  return (
    <div
      className="recipe-card-container w-full max-w-[340px] sm:max-w-[360px] mx-auto"
      style={{ perspective: "1200px" }}
    >
      <div
        id="recipeCard"
        ref={cardRef}
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
          if (onOpenRecipe) onOpenRecipe();
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          ...transformStyle,
          transformStyle: "preserve-3d",
        }}
        className={`recipe-card relative w-full h-[440px] rounded-[16px] overflow-hidden cursor-pointer bg-[#1a1a1a] transition-shadow duration-150 ${
          isHovered
            ? "shadow-[0_30px_60px_rgba(0,0,0,0.35)]"
            : "shadow-[0_15px_35px_rgba(0,0,0,0.2)]"
        }`}
      >
        {/* Background Recipe Image Wrapper with 2x Auto-Zoom */}
        <div className="recipe-image-wrap absolute inset-0 w-full h-full z-1 overflow-hidden pointer-events-none">
          <img
            src={imageSrc}
            alt={title}
            className={`w-full h-full object-cover pointer-events-none transition-transform duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              isHovered ? "scale-[2]" : "scale-100"
            }`}
            loading="eager"
          />
        </div>

        {/* Vignette Gradient Overlay to ensure text stays clear and readable */}
        <div
          className="card-overlay absolute inset-0 w-full h-full z-2 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.88) 100%)",
          }}
        />

        {/* Text & Content Overlay Wrapper */}
        <div className="recipe-content absolute inset-0 w-full h-full z-3 p-6 flex flex-col justify-between text-white pointer-events-none">
          {/* Top Tags */}
          <div className="card-header-tags flex justify-between items-center">
            <span className="brand-name font-subheading text-[0.85rem] font-bold uppercase tracking-[1px] opacity-95 drop-shadow-sm flex items-center gap-1.5 bg-black/30 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10">
              <NoakhaliLogo variant="icon-only" size="sm" theme="dark" className="scale-75 -ml-1" />
              <span>{brandName}</span>
            </span>
            <span className="halal-badge font-tag bg-[#ff6b00] text-white text-[0.7rem] font-bold px-2.5 py-1 rounded tracking-[0.5px] uppercase shadow-sm">
              {halalBadge}
            </span>
          </div>

          {/* Bottom Info Content */}
          <div className="recipe-details flex flex-col gap-2">
            <span className="heritage-tag font-subheading text-[0.75rem] font-semibold text-[#ffcc00] uppercase tracking-[0.5px] drop-shadow-xs">
              {heritageTag}
            </span>
            <h2 className="recipe-title font-heading text-[1.15rem] sm:text-[1.25rem] font-bold m-0 leading-[1.35] text-white drop-shadow-md tracking-wider">
              {title}
            </h2>
            <p className="recipe-description font-description text-[0.9rem] text-white/90 my-1 mb-3 leading-[1.45] line-clamp-2">
              {description}
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                if (onOpenRecipe) onOpenRecipe();
              }}
              className="view-recipe-btn font-ui self-start bg-[#ff6b00] hover:bg-[#e05e00] text-white border-0 py-2.5 px-4 text-[0.8rem] font-bold rounded-[6px] uppercase tracking-[0.5px] flex items-center gap-1.5 shadow-md cursor-pointer transition-colors pointer-events-auto"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
