import React, { useState } from "react";
import { Play, ExternalLink, Video as VideoIcon, Sparkles } from "lucide-react";
import type { RecipeVideo } from "../types";

interface RecipeVideoCardProps {
  video: RecipeVideo;
  recipeTitle: string;
}

export const RecipeVideoCard: React.FC<RecipeVideoCardProps> = ({ video, recipeTitle }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnailSrc, setThumbnailSrc] = useState<string>(
    video.videoThumbnail || `https://i.ytimg.com/vi/${video.youtubeVideoId}/hqdefault.jpg`
  );
  const [thumbnailError, setThumbnailError] = useState(false);

  const embedUrl = `https://www.youtube-nocookie.com/embed/${video.youtubeVideoId}?autoplay=1&rel=0`;
  const watchUrl = video.youtubeUrl || `https://youtu.be/${video.youtubeVideoId}`;
  const displayTitle = video.videoTitle || `${recipeTitle} Video Tutorial`;

  const handleThumbnailError = () => {
    // If hqdefault failed, switch to fallback flag
    if (thumbnailSrc.includes("maxresdefault")) {
      setThumbnailSrc(`https://i.ytimg.com/vi/${video.youtubeVideoId}/hqdefault.jpg`);
    } else {
      setThumbnailError(true);
    }
  };

  return (
    <section
      id="recipe-video-section"
      aria-label={`Video Tutorial: ${displayTitle}`}
      className="bg-white rounded-xl border border-[#E6E1D8] shadow-sm p-4 sm:p-6 space-y-4 scroll-mt-6 print:hidden"
    >
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F3F2EE] pb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FFF4EA] text-[#E97520] border border-[#F8CD78]/60">
              <VideoIcon className="w-3 h-3" />
              Official Video Tutorial
            </span>
            <span className="text-xs text-[#77736D]">&bull; Step-by-Step Cooking</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[#242423] font-heading leading-tight">
            Watch How to Cook {recipeTitle}
          </h2>
        </div>

        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-[#77736D] hover:text-[#E97520] transition-colors self-start sm:self-auto cursor-pointer"
          title="Watch directly on YouTube in new tab"
        >
          <span>Watch on YouTube</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* 16:9 Video Container / Click-to-load Player */}
      <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-[#1E1B18] border border-[#E6E1D8] shadow-inner group">
        {isPlaying ? (
          <iframe
            src={embedUrl}
            title={`${displayTitle} - Video Guide`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
            loading="lazy"
          />
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Poster thumbnail or graceful gradient fallback */}
            {!thumbnailError ? (
              <img
                src={thumbnailSrc}
                alt={displayTitle}
                onError={handleThumbnailError}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#2E2823] to-[#141210] p-6 text-center text-white/80">
                <VideoIcon className="w-12 h-12 text-[#E97520] mb-2" />
                <p className="text-sm font-semibold">{displayTitle}</p>
                <p className="text-xs text-white/60 mt-1">Official Video Tutorial</p>
              </div>
            )}

            {/* Subtle dark gradient scrim for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40 group-hover:via-black/20 transition-all pointer-events-none" />

            {/* Video title overlay on top left */}
            <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none">
              <span className="text-white text-xs font-semibold drop-shadow-md line-clamp-1 max-w-[85%]">
                {displayTitle}
              </span>
            </div>

            {/* Centered Play Button */}
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              aria-label={`Play recipe video: ${displayTitle}`}
              className="relative z-10 flex flex-col items-center gap-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#E97520]/50 rounded-2xl p-2 transition-transform duration-300 group-hover:scale-110 active:scale-95"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E97520] hover:bg-[#D75D17] text-white flex items-center justify-center shadow-2xl transition-all border-2 border-white/80">
                <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-white ml-1" />
              </div>
              <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-sm text-white text-xs font-bold tracking-wide border border-white/20 shadow-md">
                Click to Play
              </span>
            </button>

            {/* Privacy notice bottom pill */}
            <div className="absolute bottom-2.5 right-3 pointer-events-none">
              <span className="text-[10px] text-white/70 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                Privacy-enhanced playback
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Chapters (if verified chapters exist) */}
      {video.videoChapters && video.videoChapters.length > 0 && (
        <div className="pt-2 border-t border-[#F3F2EE] space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#77736D]">
            <Sparkles className="w-3.5 h-3.5 text-[#E97520]" />
            <span>Video Chapters</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {video.videoChapters.map((ch, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setIsPlaying(true);
                }}
                className="inline-flex items-center gap-1.5 text-xs bg-[#FAF9F6] border border-[#E6E1D8] hover:border-[#E97520] hover:bg-[#FFF4EA] px-3 py-1.5 rounded-md text-[#30302F] transition-colors cursor-pointer"
              >
                <Play className="w-2.5 h-2.5 text-[#E97520] fill-[#E97520]" />
                <span className="font-semibold">{ch.title}</span>
                <span className="text-[10px] text-[#77736D]">
                  {Math.floor(ch.seconds / 60)}:{(ch.seconds % 60).toString().padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
