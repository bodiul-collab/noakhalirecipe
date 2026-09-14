import React from "react";
import { ShieldCheck, Info } from "lucide-react";

export const GoogleAttribution: React.FC = () => {
  return (
    <div className="bg-[#FAF9F6] border border-[#E6E1D8] rounded-xl p-4 text-xs text-[#77736D] space-y-2">
      <div className="flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-[#2D7A52] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-[#30302F]">
            Noakhali Kitchen Halal Search &amp; Verification Guidance
          </p>
          <p className="text-[11px] leading-relaxed text-[#55504A]">
            Businesses marked as &ldquo;Found through halal search&rdquo; are retrieved via live Google Places geographical discovery. Because vendor sourcing, meat purveyors, and ownership may evolve, visitors are advised to directly verify current hand-slaughtered zabiha certification, alcohol-free kitchen prep, and prayer arrangements with the establishment management.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-[#E6E1D8] text-[10px] text-[#8A857E]">
        <span>Search results provided by Google Maps Platform</span>
        <span className="font-medium text-[#55504A]">Google Maps</span>
      </div>
    </div>
  );
};
