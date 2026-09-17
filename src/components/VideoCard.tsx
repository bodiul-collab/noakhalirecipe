import React from "react";
import { Play, Clock, ArrowRight, BookOpen } from "lucide-react";
import { CookingVideo } from "../types";

interface VideoCardProps {
  video: CookingVideo;
  onWatchVideo?: (video: CookingVideo) => void;
  onOpenRecipe?: (recipeSlug: string) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  onWatchVideo,
  onOpenRecipe,
}) => {
  const handlePrimaryClick = () => {
    if (onWatchVideo) {
      onWatchVideo(video);
    } else if (onOpenRecipe) {
      onOpenRecipe(video.recipeSlug);
    }
  };

  return (
    <div className="group bg-white dark:bg-[#1E1E1C] rounded-xl border border-[#E6E1D8] dark:border-[#33322E] overflow-hidden hover:border-[#F8CD78] dark:hover:border-[#E7A52B]/60 hover:shadow-md transition-all flex flex-col justify-between">
      {/* Thumbnail with Play Overlay */}
      <div
        onClick={handlePrimaryClick}
        className="relative aspect-[16/9] w-full bg-[#242423] overflow-hidden cursor-pointer"
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
        />

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Prominent Play Icon Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#E97520] group-hover:bg-[#D75D17] text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
            <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white ml-0.5" />
          </div>
        </div>

        {/* Duration Badge */}
        {video.duration && (
          <div className="absolute bottom-2.5 right-2.5 bg-black/85 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[11px] font-mono font-semibold flex items-center gap-1 border border-white/10 shadow-xs">
            <Clock className="w-3 h-3 text-[#F8CD78]" />
            <span>{video.duration}</span>
          </div>
        )}

        {/* Category Pill */}
        <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-xs text-[#F8CD78] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-white/10">
          {video.categoryTitle}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <h3
            onClick={handlePrimaryClick}
            className="text-base font-bold text-[#242423] dark:text-[#EDE8DF] font-serif-editorial group-hover:text-[#E97520] transition-colors leading-snug cursor-pointer line-clamp-2"
          >
            {video.title}
          </h3>

          <p className="text-xs text-[#77736D] dark:text-[#A8A49E] leading-relaxed line-clamp-2">
            {video.description}
          </p>
        </div>

        {/* Card Actions & Connected Recipe */}
        <div className="pt-3 border-t border-[#F3F2EE] dark:border-[#2D2D2A] flex items-center justify-between gap-2 text-xs">
          <button
            onClick={() => onOpenRecipe && onOpenRecipe(video.recipeSlug)}
            className="inline-flex items-center gap-1.5 text-[#30302F] dark:text-[#EDE8DF] hover:text-[#E97520] font-semibold text-[11px] truncate cursor-pointer transition-colors"
            title={`View full recipe for ${video.recipeTitle}`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#E97520] shrink-0" />
            <span className="truncate">View Recipe</span>
          </button>

          <button
            onClick={handlePrimaryClick}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#30302F] hover:bg-[#E97520] dark:bg-[#33322E] dark:hover:bg-[#E97520] text-white text-[11px] font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
          >
            <span>Watch</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
