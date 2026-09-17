import React from "react";
import { Play, ArrowRight } from "lucide-react";

interface YouTubeCTAProps {
  className?: string;
  variant?: "primary" | "secondary" | "subtle";
  label?: string;
  onNavigateToVideos?: () => void;
}

export const YouTubeCTA: React.FC<YouTubeCTAProps> = ({
  className = "",
  variant = "primary",
  label = "Watch on YouTube",
  onNavigateToVideos,
}) => {
  // Safe environment check for official YouTube Channel destination
  const configuredChannelUrl = (typeof import.meta !== "undefined" && import.meta.env?.VITE_YOUTUBE_CHANNEL_URL) || "";

  // If a real external YouTube channel URL is configured, link directly to it
  if (configuredChannelUrl && configuredChannelUrl.trim().startsWith("http")) {
    const baseStyle =
      variant === "primary"
        ? "bg-[#E97520] hover:bg-[#D75D17] text-white shadow-md hover:shadow-lg"
        : variant === "secondary"
        ? "bg-[#30302F] hover:bg-[#242423] text-white shadow-sm"
        : "bg-[#FFF9F0] hover:bg-[#F8CD78]/30 border border-[#F8CD78] text-[#D75D17]";

    return (
      <a
        href={configuredChannelUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-all cursor-pointer font-ui ${baseStyle} ${className}`}
      >
        <Play className="w-3.5 h-3.5 fill-current" />
        <span>{label}</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </a>
    );
  }

  // If no external URL is configured, but caller provides internal video navigation:
  if (onNavigateToVideos) {
    const baseStyle =
      variant === "primary"
        ? "bg-[#E97520] hover:bg-[#D75D17] text-white shadow-md hover:shadow-lg"
        : variant === "secondary"
        ? "bg-[#30302F] hover:bg-[#242423] text-white shadow-sm"
        : "bg-[#FFF9F0] hover:bg-[#F8CD78]/30 border border-[#F8CD78] text-[#D75D17]";

    return (
      <button
        onClick={onNavigateToVideos}
        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-all cursor-pointer font-ui ${baseStyle} ${className}`}
      >
        <Play className="w-3.5 h-3.5 fill-current" />
        <span>Watch Cooking Videos</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    );
  }

  // Strict Rule: Do not invent fake channel URL. If no channel destination exists, return null.
  return null;
};
