import React from "react";
import {
  MapPin,
  Phone,
  Globe,
  ExternalLink,
  Star,
  Clock,
  ShieldCheck,
  Building2,
  Utensils,
  ShoppingBag,
} from "lucide-react";
import { PlaceResult } from "../../types";
import { formatDistance } from "../../utils/distance";

interface PlaceCardProps {
  place: PlaceResult;
  isSelected?: boolean;
  isHovered?: boolean;
  distanceUnit: "mi" | "km";
  onSelect: (place: PlaceResult) => void;
  onHover?: (placeId: string | null) => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  isSelected,
  isHovered,
  distanceUnit,
  onSelect,
  onHover,
}) => {
  const getCategoryIcon = () => {
    switch (place.category) {
      case "restaurants":
        return <Utensils className="w-3.5 h-3.5 text-[#E97520]" />;
      case "groceries":
        return <ShoppingBag className="w-3.5 h-3.5 text-[#2D7A52]" />;
      case "mosques":
        return <Building2 className="w-3.5 h-3.5 text-[#1B6CA8]" />;
      default:
        return <MapPin className="w-3.5 h-3.5 text-[#E97520]" />;
    }
  };

  const getCategoryBadgeClass = () => {
    switch (place.category) {
      case "restaurants":
        return "text-[#D75D17] bg-[#FFF5EB] border-[#FED7AA]";
      case "groceries":
        return "text-[#2D7A52] bg-[#F0FDF4] border-[#BBF7D0]";
      case "mosques":
        return "text-[#1B6CA8] bg-[#F0F9FF] border-[#BAE6FD]";
      default:
        return "text-[#77736D] bg-[#FAF9F6] border-[#E6E1D8]";
    }
  };

  const displayDistance =
    distanceUnit === "km"
      ? place.distanceKm !== undefined
        ? `${place.distanceKm} km`
        : null
      : place.distanceMiles !== undefined
      ? `${place.distanceMiles} mi`
      : null;

  return (
    <div
      id={`place-card-${place.id}`}
      onClick={() => onSelect(place)}
      onMouseEnter={() => onHover?.(place.id)}
      onMouseLeave={() => onHover?.(null)}
      className={`group relative bg-white rounded-xl border transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between ${
        isSelected
          ? "border-[#E97520] ring-2 ring-[#E97520]/20 shadow-md bg-[#FFFDF9]"
          : isHovered
          ? "border-[#E97520] ring-2 ring-[#E97520]/20 shadow-md -translate-y-0.5"
          : "border-[#E6E1D8] hover:border-[#30302F] hover:shadow-sm"
      }`}
    >
      <div className="p-4 sm:p-5 space-y-3">
        {/* Top Header: Category badge + Distance + Live Status */}
        <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
          <div className="flex items-center gap-1.5">
            <span
              className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border flex items-center gap-1 ${getCategoryBadgeClass()}`}
            >
              {getCategoryIcon()}
              <span>{place.categoryLabel}</span>
            </span>

            {displayDistance && (
              <span className="text-[11px] font-semibold text-[#55504A] bg-[#F3F2EE] px-2 py-0.5 rounded">
                {displayDistance} away
              </span>
            )}
          </div>

          {place.isOpenNow !== undefined && (
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                place.isOpenNow
                  ? "bg-[#2D7A52]/10 text-[#2D7A52]"
                  : "bg-red-50 text-red-600 border border-red-100"
              }`}
            >
              <Clock className="w-3 h-3" />
              <span>{place.isOpenNow ? "Open Now" : "Closed"}</span>
            </span>
          )}
        </div>

        {/* Place Photo / Thumbnail if available */}
        {place.photoUrl && (
          <div className="w-full h-36 rounded-lg overflow-hidden relative bg-[#F3F2EE]">
            <img
              src={place.photoUrl}
              alt={place.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
        )}

        {/* Place Name & Rating */}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#242423] font-serif-editorial leading-snug group-hover:text-[#E97520] transition-colors">
            {place.name}
          </h3>

          {place.rating !== undefined && (
            <div className="flex items-center gap-1.5 mt-1 text-xs">
              <div className="flex items-center text-[#E7A52B]">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-bold ml-1 text-[#242423]">
                  {place.rating.toFixed(1)}
                </span>
              </div>
              {place.userRatingCount && (
                <span className="text-[#8A857E]">
                  ({place.userRatingCount.toLocaleString()} reviews)
                </span>
              )}
            </div>
          )}
        </div>

        {/* Address */}
        <div className="flex items-start gap-1.5 text-xs text-[#77736D]">
          <MapPin className="w-3.5 h-3.5 text-[#E97520] shrink-0 mt-0.5" />
          <span className="line-clamp-2">{place.formattedAddress}</span>
        </div>

        {/* Halal Accuracy Notice Card */}
        <div className="p-2.5 bg-[#FAF9F6] rounded-md border border-[#E6E1D8] text-[11px] text-[#3F3C38] leading-relaxed">
          <div className="flex items-center gap-1 text-[11px] font-bold text-[#2D7A52] mb-0.5">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>Search &amp; Sourcing Status</span>
          </div>
          <p className="text-[#55504A]">{place.halalNotice}</p>
        </div>
      </div>

      {/* Footer Action Links */}
      <div className="px-4 py-3 bg-[#FAF9F6] border-t border-[#F3F2EE] flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          {place.nationalPhoneNumber && (
            <a
              href={`tel:${place.nationalPhoneNumber.replace(/[^0-9+]/g, "")}`}
              onClick={(e) => e.stopPropagation()}
              className="text-[#30302F] hover:text-[#E97520] flex items-center gap-1 font-medium transition-colors"
              title={place.nationalPhoneNumber}
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Call</span>
            </a>
          )}

          {place.websiteUri && (
            <a
              href={place.websiteUri}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[#30302F] hover:text-[#E97520] flex items-center gap-1 font-medium transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Website</span>
            </a>
          )}
        </div>

        <a
          href={place.googleMapsUri}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="font-bold text-[#E97520] hover:text-[#D75D17] flex items-center gap-1 group/btn"
        >
          <span>Directions</span>
          <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
};
