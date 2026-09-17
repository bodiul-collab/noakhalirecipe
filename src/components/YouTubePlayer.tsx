import React, { useState } from "react";
import { Play, Clock, Sparkles } from "lucide-react";

interface YouTubePlayerProps {
  videoId?: string;
  videoUrl?: string;
  title: string;
  thumbnailUrl?: string;
  duration?: string;
  subtitle?: string;
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoId,
  videoUrl,
  title,
  thumbnailUrl,
  duration,
  subtitle,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract video ID if full URL was provided
  const resolvedVideoId = React.useMemo(() => {
    if (videoId) return videoId.trim();
    if (videoUrl) {
      const match = videoUrl.match(
        /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
      );
      if (match && match[1]) return match[1];
    }
    return null;
  }, [videoId, videoUrl]);

  // Strict User Rule: If no YouTube ID exists, simply do NOT render the video section
  if (!resolvedVideoId) {
    return null;
  }

  return (
    <div className="w-full bg-[#1E1E1C] rounded-xl overflow-hidden border border-[#33322E] shadow-lg mb-8">
      {/* Section Header */}
      <div className="px-4 sm:px-6 py-3.5 bg-[#242423] border-b border-[#33322E] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E97520] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#E97520]">
            Watch The Full Recipe Video
          </span>
        </div>
        {duration && (
          <div className="flex items-center gap-1 text-xs text-[#A8A49E]">
            <Clock className="w-3.5 h-3.5 text-[#F8CD78]" />
            <span className="font-mono">{duration}</span>
          </div>
        )}
      </div>

      {/* Video Viewport / Facade */}
      <div className="relative aspect-[16/9] w-full bg-black">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${resolvedVideoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
        ) : (
          <div
            onClick={() => setIsPlaying(true)}
            className="group relative w-full h-full cursor-pointer select-none"
            role="button"
            tabIndex={0}
            aria-label={`Play video: ${title}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsPlaying(true);
              }
            }}
          >
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt={title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
            ) : (
              <div className="w-full h-full bg-[#2A2A28] flex items-center justify-center text-[#77736D]">
                <span>Noakhali Kitchen Recipe Video</span>
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

            {/* Centered Big YouTube Play Button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E97520] group-hover:bg-[#D75D17] text-white flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white ml-1" />
              </div>
              <span className="text-white text-xs sm:text-sm font-bold uppercase tracking-wider bg-black/60 px-3 py-1 rounded-full border border-white/20 backdrop-blur-xs">
                Click To Play Video
              </span>
            </div>

            {/* Title & Metadata Overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-left">
              <h4 className="text-white text-sm sm:text-base font-bold font-serif-editorial leading-snug drop-shadow-md line-clamp-2">
                {title}
              </h4>
              {subtitle && (
                <p className="text-[#E6E1D8] text-xs mt-1 line-clamp-1 opacity-90">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
