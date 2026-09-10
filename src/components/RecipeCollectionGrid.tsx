import React, { useRef, useState } from "react";
import { IMAGES } from "../data/assets";

export interface CollectionCardItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  heritageTag: string;
  brandName: string;
  halalBadge: string;
  image: string;
}

interface RecipeCollectionGridProps {
  onSelectRecipeBySlug?: (slug: string) => void;
  cards?: CollectionCardItem[];
}

const DEFAULT_COLLECTION: CollectionCardItem[] = [
  {
    id: "card-shorshe-ilish",
    slug: "noakhali-shorshe-ilish",
    title: "Noakhali Shorshe Ilish (Hilsa in Golden Mustard Gravy)",
    description:
      "Steamed hilsa steaks in golden stone-ground mustard paste, nigella seeds & cold-pressed mustard oil.",
    heritageTag: "✨ Signature Heritage Dish",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Dish",
    image: IMAGES.shorsheIlish,
  },
  {
    id: "card-bhuna-khichuri",
    slug: "beef-bhuna-khichuri",
    title: "Beef Bhuna Khichuri",
    description:
      "Fragrant chinigura rice and lentils slow-cooked with tender aromatic chunks of spiced beef.",
    heritageTag: "🔥 Chef's Special",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Dish",
    image: IMAGES.beefBhuna,
  },
  {
    id: "card-chingri-malai",
    slug: "chingri-malai-curry",
    title: "Chingri Malaikari",
    description:
      "Jumbo prawns cooked in a creamy, velvety coconut milk gravy flavored with whole spices.",
    heritageTag: "✨ Traditional Classic",
    brandName: "Noakhali Kitchen",
    halalBadge: "100% Halal Dish",
    image: IMAGES.chingriMalai,
  },
];

interface SingleCollectionCardProps {
  item: CollectionCardItem;
  onOpen: (slug: string) => void;
}

const SingleCollectionCard: React.FC<SingleCollectionCardProps> = ({ item, onOpen }) => {
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
      className="recipe-card-container w-full flex justify-center"
      style={{ perspective: "1200px" }}
    >
      <div
        ref={cardRef}
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
          onOpen(item.slug);
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          ...transformStyle,
          transformStyle: "preserve-3d",
        }}
        className={`recipe-card relative w-full max-w-[340px] h-[440px] rounded-[16px] overflow-hidden cursor-pointer bg-[#1a1a1a] transition-shadow duration-150 ${
          isHovered
            ? "shadow-[0_30px_60px_rgba(0,0,0,0.3)]"
            : "shadow-[0_15px_35px_rgba(0,0,0,0.15)]"
        }`}
      >
        {/* Background Image Wrapper with 2x Auto-Zoom */}
        <div className="recipe-image-wrap absolute inset-0 w-full h-full z-1 overflow-hidden pointer-events-none">
          <img
            src={item.image}
            alt={item.title}
            className={`w-full h-full object-cover pointer-events-none transition-transform duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              isHovered ? "scale-[2]" : "scale-100"
            }`}
            loading="lazy"
          />
        </div>

        {/* Dark Vignette Overlay */}
        <div
          className="card-overlay absolute inset-0 w-full h-full z-2 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.85) 100%)",
          }}
        />

        {/* Recipe Content Overlay */}
        <div className="recipe-content absolute inset-0 w-full h-full z-3 p-6 flex flex-col justify-between text-white pointer-events-none">
          {/* Top Header Tags */}
          <div className="card-header-tags flex justify-between items-center">
            <span className="brand-name font-subheading text-[0.85rem] font-bold uppercase tracking-[1px] opacity-90 drop-shadow-sm">
              {item.brandName}
            </span>
            <span className="halal-badge font-tag bg-[#ff6b00] text-white text-[0.7rem] font-bold px-2 py-1 rounded-[4px] uppercase tracking-[0.5px] shadow-sm">
              {item.halalBadge}
            </span>
          </div>

          {/* Lower Recipe Details */}
          <div className="recipe-details flex flex-col gap-2">
            <span className="heritage-tag font-subheading text-[0.75rem] font-semibold text-[#ffcc00] uppercase tracking-[0.5px] drop-shadow-xs">
              {item.heritageTag}
            </span>
            <h2 className="recipe-title font-heading text-[1.15rem] sm:text-[1.25rem] font-bold m-0 leading-[1.3] text-white drop-shadow-md tracking-wider">
              {item.title}
            </h2>
            <p className="recipe-description font-description text-[0.85rem] text-white/75 my-1 mb-3 leading-[1.4] line-clamp-2">
              {item.description}
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                onOpen(item.slug);
              }}
              className="view-recipe-btn font-ui self-start bg-[#ff6b00] hover:bg-[#e05e00] text-white border-0 py-2.5 px-4 text-[0.8rem] font-bold rounded-[6px] uppercase tracking-[0.5px] shadow-md cursor-pointer transition-colors pointer-events-auto"
            >
              View Recipe →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RecipeCollectionGrid: React.FC<RecipeCollectionGridProps> = ({
  onSelectRecipeBySlug = () => {},
  cards = DEFAULT_COLLECTION,
}) => {
  return (
    <div
      className="recipe-grid w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] justify-items-center"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      }}
    >
      {cards.map((item) => (
        <SingleCollectionCard
          key={item.id}
          item={item}
          onOpen={onSelectRecipeBySlug}
        />
      ))}
    </div>
  );
};
