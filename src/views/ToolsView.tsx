import React, { useState } from "react";
import {
  Wrench,
  Scale,
  Thermometer,
  ShieldCheck,
  Search,
  Calendar,
  Check,
  Plus,
  Trash2,
  Sparkles,
  ArrowLeftRight,
} from "lucide-react";
import { ECODES } from "../data/ecodes";
import { RECIPES } from "../data/recipes";
import { Recipe } from "../types";
import { KitchenConversionTool } from "../components/KitchenConversionTool";

interface ToolsViewProps {
  onSelectRecipe: (recipe: Recipe) => void;
  onOpenAssistant: () => void;
  initialTab?: "ecodes" | "scaler" | "converter" | "oven" | "planner";
}

export const ToolsView: React.FC<ToolsViewProps> = ({
  onSelectRecipe,
  onOpenAssistant,
  initialTab = "ecodes",
}) => {
  const [activeTab, setActiveTab] = useState<
    "ecodes" | "scaler" | "converter" | "oven" | "planner"
  >(initialTab);

  // E-Code checker state
  const [ecodeQuery, setEcodeQuery] = useState("");
  const [ecodeFilter, setEcodeFilter] = useState("all");

  // Scaler state
  const [scalerInput, setScalerInput] = useState(
    "2 cups Basmati rice\n500 g Halal chicken thighs\n1 tbsp Pure cow ghee\n0.5 tsp Turmeric powder\n1 tsp Sea salt"
  );
  const [scaleFactor, setScaleFactor] = useState<number>(2);

  // Oven Converter state
  const [ovenTempF, setOvenTempF] = useState<number>(350);

  // Meal Planner state
  const [mealPlan, setMealPlan] = useState<{ [day: string]: string }>({
    Monday: "Authentic Halal Chicken Dum Biryani",
    Tuesday: "Traditional Bengali Beef Bhuna",
    Wednesday: "Vegetable Bhuna Khichuri",
    Thursday: "Shahi Chicken Roast",
    Friday: "Royal Chingri Malai Curry",
    Saturday: "Spiced Keema Matar with Paratha",
    Sunday: "Slow-Braised Nihari with Ginger",
  });
  const [editingDay, setEditingDay] = useState<string | null>(null);
  const [tempMealName, setTempMealName] = useState<string>("");

  // E-Code filtering
  const filteredEcodes = ECODES.filter((e) => {
    const matchesSearch =
      !ecodeQuery.trim() ||
      e.code.toLowerCase().includes(ecodeQuery.toLowerCase()) ||
      e.name.toLowerCase().includes(ecodeQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(ecodeQuery.toLowerCase()) ||
      e.verificationAdvice.toLowerCase().includes(ecodeQuery.toLowerCase());

    const matchesStatus =
      ecodeFilter === "all" ||
      e.status.toLowerCase().includes(ecodeFilter.toLowerCase());

    return matchesSearch && matchesStatus;
  });

  // Recipe Scaler logic
  const scaleRecipeText = () => {
    const lines = scalerInput.split("\n");
    return lines
      .map((line) => {
        return line.replace(/(\d+(\.\d+)?)/g, (match) => {
          const val = parseFloat(match);
          if (isNaN(val)) return match;
          const scaled = val * scaleFactor;
          return scaled % 1 === 0 ? scaled.toString() : scaled.toFixed(1);
        });
      })
      .join("\n");
  };

  // Oven conversions
  const tempC = Math.round(((ovenTempF - 32) * 5) / 9);
  const tempFanC = Math.max(0, tempC - 20);
  const getGasMark = (f: number) => {
    if (f < 275) return "1/4";
    if (f < 300) return "1/2";
    if (f < 325) return "1";
    if (f < 350) return "2";
    if (f < 375) return "4";
    if (f < 400) return "6";
    if (f < 425) return "7";
    if (f < 450) return "8";
    return "9+";
  };

  return (
    <div className="w-full bg-[#FAF9F6] py-10 sm:py-14">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E97520]">
            KITCHEN UTILITIES &bull; RESEARCHED TOOLS
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#242423] font-serif-editorial">
            Practical Kitchen Tools
          </h1>
          <p className="text-sm text-[#77736D]">
            Instant, practical tools designed for home cooks—scale ingredients, check food additives, convert measurements, and plan weekly Halal meals.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white rounded-lg border border-[#E6E1D8] shadow-xs">
          {[
            { id: "ecodes", label: "Halal E-Code Checker", icon: ShieldCheck },
            { id: "scaler", label: "Recipe Scaler", icon: Scale },
            { id: "converter", label: "Kitchen Converter", icon: ArrowLeftRight },
            { id: "oven", label: "Oven Temp Guide", icon: Thermometer },
            { id: "planner", label: "Meal Planner", icon: Calendar },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isActive
                    ? "bg-[#30302F] text-white"
                    : "text-[#3F3C38] hover:bg-[#FAF9F6]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#E7A52B]" : "text-[#77736D]"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TOOL 1: HALAL E-CODE CHECKER */}
        {activeTab === "ecodes" && (
          <div className="bg-white rounded-xl border border-[#E6E1D8] p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-[#242423] font-serif-editorial">
                  Halal E-Code &amp; Additive Directory
                </h2>
                <p className="text-xs text-[#77736D]">
                  Search food additives, animal rennets, emulsifiers, and gelatin origins with clear Halal guidance.
                </p>
              </div>
              <button
                onClick={onOpenAssistant}
                className="text-xs font-bold text-[#D75D17] bg-[#FFF9F0] border border-[#F8CD78] px-3 py-1.5 rounded flex items-center gap-1 self-start sm:self-auto cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E97520]" />
                Ask AI Assistant for Unlisted Code
              </button>
            </div>

            {/* Search Bar & Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={ecodeQuery}
                  onChange={(e) => setEcodeQuery(e.target.value)}
                  placeholder="Search code (e.g. E120, E471) or name (Gelatin, Rennet)..."
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-[#E6E1D8] rounded focus:outline-none focus:border-[#30302F]"
                />
                <Search className="w-4 h-4 text-[#8A857E] absolute right-3 top-3" />
              </div>

              <select
                value={ecodeFilter}
                onChange={(e) => setEcodeFilter(e.target.value)}
                className="px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E6E1D8] rounded text-[#30302F] focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="halal">Halal (Permissible)</option>
                <option value="haram">Haram (Prohibited)</option>
                <option value="doubtful">Mushbooh / Check Source</option>
              </select>
            </div>

            {/* E-Codes Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredEcodes.map((item, idx) => {
                const isHalal = item.status === "Halal";
                const isHaram = item.status === "Haram";
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border flex flex-col justify-between ${
                      isHaram
                        ? "bg-red-50/40 border-red-200"
                        : isHalal
                        ? "bg-[#FAF9F6] border-[#2D7A52]/30"
                        : "bg-[#FFF9F0] border-[#F8CD78]/60"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-sm font-bold text-[#30302F]">
                          {item.code}
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            isHaram
                              ? "bg-red-600 text-white"
                              : isHalal
                              ? "bg-[#2D7A52] text-white"
                              : "bg-[#D75D17] text-white"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-[#242423] mb-1">
                        {item.name}
                      </h4>

                      <p className="text-xs text-[#77736D] mb-2">
                        <strong>Source:</strong> {item.source}
                      </p>

                      <p className="text-xs text-[#3F3C38] leading-relaxed mb-3">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-black/5 text-[11px] text-[#3F3C38]">
                      <strong>Verification Advice:</strong> {item.verificationAdvice}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TOOL 2: RECIPE SCALER */}
        {activeTab === "scaler" && (
          <div className="bg-white rounded-xl border border-[#E6E1D8] p-6 sm:p-8 space-y-6 shadow-xs">
            <div>
              <h2 className="text-xl font-bold text-[#242423] font-serif-editorial">
                Recipe Quantity Scaler
              </h2>
              <p className="text-xs text-[#77736D]">
                Multiply or divide any recipe ingredient list. Paste your ingredients below and select a multiplier.
              </p>
            </div>

            {/* Scaler Controls */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#77736D] font-bold">Select Scale:</span>
              {[0.5, 1, 1.5, 2, 3, 4].map((mult) => (
                <button
                  key={mult}
                  onClick={() => setScaleFactor(mult)}
                  className={`px-3 py-1.5 rounded font-bold transition-colors cursor-pointer ${
                    scaleFactor === mult
                      ? "bg-[#E97520] text-white"
                      : "bg-[#FAF9F6] border border-[#E6E1D8] text-[#30302F] hover:bg-[#F3F2EE]"
                  }`}
                >
                  {mult}x
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#30302F] mb-1.5 uppercase tracking-wider">
                  Original Ingredients (Editable)
                </label>
                <textarea
                  rows={8}
                  value={scalerInput}
                  onChange={(e) => setScalerInput(e.target.value)}
                  className="w-full p-3 text-xs sm:text-sm font-mono bg-[#FAF9F6] border border-[#E6E1D8] rounded focus:outline-none focus:border-[#30302F] leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#E97520] mb-1.5 uppercase tracking-wider">
                  Scaled Result ({scaleFactor}x)
                </label>
                <textarea
                  readOnly
                  rows={8}
                  value={scaleRecipeText()}
                  className="w-full p-3 text-xs sm:text-sm font-mono bg-[#FFF9F0] border border-[#F8CD78] rounded focus:outline-none leading-relaxed text-[#30302F]"
                />
              </div>
            </div>
          </div>
        )}

        {/* TOOL 3: KITCHEN CONVERSION TOOL */}
        {activeTab === "converter" && <KitchenConversionTool />}

        {/* TOOL 4: OVEN TEMPERATURE GUIDE */}
        {activeTab === "oven" && (
          <div className="bg-white rounded-xl border border-[#E6E1D8] p-6 sm:p-8 space-y-6 shadow-xs">
            <div>
              <h2 className="text-xl font-bold text-[#242423] font-serif-editorial">
                Oven Temperature Converter &amp; Gas Marks
              </h2>
              <p className="text-xs text-[#77736D]">
                Convert oven settings for standard baking, fan-forced/convection, and UK Gas Marks.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 p-5 bg-[#FAF9F6] rounded-lg border border-[#E6E1D8]">
              <label className="text-xs font-bold text-[#30302F]">
                Slide Temperature (°F):
              </label>
              <input
                type="range"
                min="200"
                max="500"
                step="25"
                value={ovenTempF}
                onChange={(e) => setOvenTempF(parseInt(e.target.value))}
                className="flex-1 accent-[#E97520]"
              />
              <span className="text-sm font-bold text-[#30302F] w-16 text-right">
                {ovenTempF}°F
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-white border border-[#E6E1D8] rounded-lg">
                <span className="text-[10px] font-bold text-[#8A857E] uppercase block">
                  FAHRENHEIT
                </span>
                <span className="text-2xl font-bold text-[#30302F] font-serif-editorial">
                  {ovenTempF}°F
                </span>
              </div>
              <div className="p-4 bg-white border border-[#E6E1D8] rounded-lg">
                <span className="text-[10px] font-bold text-[#8A857E] uppercase block">
                  CELSIUS (CONVENTIONAL)
                </span>
                <span className="text-2xl font-bold text-[#30302F] font-serif-editorial">
                  {tempC}°C
                </span>
              </div>
              <div className="p-4 bg-white border border-[#E6E1D8] rounded-lg">
                <span className="text-[10px] font-bold text-[#8A857E] uppercase block">
                  FAN FORCED / CONVECTION
                </span>
                <span className="text-2xl font-bold text-[#E97520] font-serif-editorial">
                  {tempFanC}°C
                </span>
              </div>
              <div className="p-4 bg-white border border-[#E6E1D8] rounded-lg">
                <span className="text-[10px] font-bold text-[#8A857E] uppercase block">
                  GAS MARK
                </span>
                <span className="text-2xl font-bold text-[#2D7A52] font-serif-editorial">
                  Gas {getGasMark(ovenTempF)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 5: WEEKLY HALAL MEAL PLANNER */}
        {activeTab === "planner" && (
          <div className="bg-white rounded-xl border border-[#E6E1D8] p-6 sm:p-8 space-y-6 shadow-xs">
            <div>
              <h2 className="text-xl font-bold text-[#242423] font-serif-editorial">
                Weekly Halal Family Meal Planner
              </h2>
              <p className="text-xs text-[#77736D]">
                Organize balanced dinners across the week, reduce food waste, and coordinate your shopping checklist.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(mealPlan).map(([day, dish]) => (
                <div
                  key={day}
                  className="p-3.5 bg-[#FAF9F6] rounded-lg border border-[#E6E1D8] flex items-center justify-between gap-2"
                >
                  {editingDay === day ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="text"
                        value={tempMealName}
                        onChange={(e) => setTempMealName(e.target.value)}
                        className="flex-1 px-2.5 py-1 text-xs bg-white border border-[#30302F] rounded focus:outline-none"
                        autoFocus
                      />
                      <button
                        onClick={() => {
                          if (tempMealName.trim()) {
                            setMealPlan((prev) => ({ ...prev, [day]: tempMealName.trim() }));
                          }
                          setEditingDay(null);
                        }}
                        className="px-2.5 py-1 bg-[#2D7A52] text-white text-[11px] font-bold rounded cursor-pointer"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingDay(null)}
                        className="px-2 py-1 text-[11px] text-[#77736D] hover:text-[#30302F] cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-0.5 min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#E97520] block">
                          {day}
                        </span>
                        <h4 className="text-xs font-bold text-[#30302F] truncate">{dish}</h4>
                      </div>
                      <button
                        onClick={() => {
                          setEditingDay(day);
                          setTempMealName(dish);
                        }}
                        className="text-xs text-[#77736D] hover:text-[#30302F] underline cursor-pointer shrink-0 ml-2"
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#FFF9F0] rounded-lg border border-[#F8CD78]/60 flex items-center justify-between text-xs">
              <span className="text-[#3F3C38]">
                💡 Tip: Cook once, eat twice! Batch cook Beef Bhuna or Biryani on weekends for effortless weeknight meals.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
