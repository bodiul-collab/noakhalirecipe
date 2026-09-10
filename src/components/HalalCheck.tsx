import React from "react";
import { ShieldCheck, Info } from "lucide-react";

interface HalalCheckProps {
  title?: string;
  notes: string;
  cautionNotes?: string;
}

export const HalalCheck: React.FC<HalalCheckProps> = ({
  title = "Halal Ingredient Verification Note",
  notes,
  cautionNotes,
}) => {
  return (
    <div className="rounded-lg border border-[#2D7A52]/25 bg-[#FAF9F6] p-4 sm:p-5 text-sm space-y-2.5">
      <div className="flex items-center gap-2 text-[#2D7A52] font-semibold text-xs uppercase tracking-wider">
        <ShieldCheck className="w-4 h-4 text-[#2D7A52]" />
        <span>{title}</span>
      </div>

      <p className="text-xs sm:text-sm text-[#3F3C38] leading-relaxed">
        {notes}
      </p>

      {cautionNotes && (
        <div className="pt-2 border-t border-[#2D7A52]/15 flex items-start gap-2 text-xs text-[#8A857E]">
          <Info className="w-3.5 h-3.5 text-[#D75D17] shrink-0 mt-0.5" />
          <span>{cautionNotes}</span>
        </div>
      )}
    </div>
  );
};
