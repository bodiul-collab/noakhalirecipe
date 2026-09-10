import React from "react";

interface AdSlotProps {
  slotId?: string;
  format?: "horizontal" | "rectangle" | "sidebar";
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  slotId = "ad-unit",
  format = "horizontal",
  className = "",
}) => {
  return (
    <div
      className={`w-full my-6 flex flex-col items-center justify-center print:hidden ${className}`}
    >
      <div className="text-[10px] uppercase font-bold tracking-widest text-[#8A857E] mb-1 text-center">
        ADVERTISEMENT
      </div>
      <div
        id={slotId}
        className={`w-full max-w-3xl border border-dashed border-[#E6E1D8] bg-[#FAF9F6] rounded-md flex flex-col items-center justify-center p-4 text-center ${
          format === "horizontal"
            ? "h-24 sm:h-28"
            : format === "sidebar"
            ? "h-64"
            : "h-48"
        }`}
      >
        <span className="text-xs text-[#8A857E] font-medium">
          Google AdSense Unit Placement Ready
        </span>
        <span className="text-[10px] text-[#8A857E]/70 mt-1">
          Compliant non-intrusive slot &bull; ID: {slotId}
        </span>
      </div>
    </div>
  );
};
