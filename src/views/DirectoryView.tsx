import React, { useState, useMemo } from "react";
import {
  MapPin,
  Search,
  Phone,
  Globe,
  Clock,
  ShieldCheck,
  Building2,
  Utensils,
  ShoppingBag,
  Sparkles,
  PlusCircle,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";
import { DIRECTORY_LISTINGS } from "../data/directory";
import { DirectoryListing } from "../types";

interface DirectoryViewProps {
  initialCategory?: string;
  onOpenAssistant: () => void;
  onNavigate: (route: string) => void;
}

export const DirectoryView: React.FC<DirectoryViewProps> = ({
  initialCategory,
  onOpenAssistant,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || "all"
  );

  React.useEffect(() => {
    setSelectedCategory(initialCategory || "all");
  }, [initialCategory]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClassification, setSelectedClassification] = useState<string>("all");
  const [suggestionModalOpen, setSuggestionModalOpen] = useState(false);
  const [suggestionSubmitted, setSuggestionSubmitted] = useState(false);

  // Suggestion form state
  const [placeName, setPlaceName] = useState("");
  const [placeCategory, setPlaceCategory] = useState("restaurants");
  const [placeCity, setPlaceCity] = useState("");
  const [placeNotes, setPlaceNotes] = useState("");

  const categories = [
    { id: "all", label: "All Listings", count: DIRECTORY_LISTINGS.length },
    {
      id: "restaurants",
      label: "Restaurants",
      count: DIRECTORY_LISTINGS.filter((d) => d.category === "restaurants").length,
    },
    {
      id: "butchers",
      label: "Halal Butchers",
      count: DIRECTORY_LISTINGS.filter((d) => d.category === "butchers").length,
    },
    {
      id: "groceries",
      label: "Groceries & Markets",
      count: DIRECTORY_LISTINGS.filter((d) => d.category === "groceries").length,
    },
    {
      id: "mosques",
      label: "Mosques & Jummah",
      count: DIRECTORY_LISTINGS.filter((d) => d.category === "mosques").length,
    },
    {
      id: "islamic-centers",
      label: "Islamic Centers",
      count: DIRECTORY_LISTINGS.filter((d) => d.category === "islamic-centers").length,
    },
  ];

  const filteredListings = useMemo(() => {
    return DIRECTORY_LISTINGS.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      const matchesSearch =
        !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.postalCode.includes(searchQuery) ||
        item.halalDetails.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesClassification =
        selectedClassification === "all" ||
        item.halalClassification === selectedClassification;

      return matchesCategory && matchesSearch && matchesClassification;
    });
  }, [selectedCategory, searchQuery, selectedClassification]);

  const handleSuggestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuggestionSubmitted(true);
    setTimeout(() => {
      setSuggestionSubmitted(false);
      setSuggestionModalOpen(false);
      setPlaceName("");
      setPlaceCity("");
      setPlaceNotes("");
    }, 2500);
  };

  return (
    <div className="w-full bg-[#FAF9F6] py-10 sm:py-14">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2D7A52]">
              COMMUNITY DIRECTORY
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#242423] font-serif-editorial">
              Verified Halal Directory
            </h1>
            <p className="text-sm text-[#77736D] max-w-2xl">
              Find trusted Halal restaurants, hand-slaughtered zabiha butchers, specialty grocers, and local mosques with verified Jummah prayer details.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-2 self-start md:self-auto">
            <button
              onClick={onOpenAssistant}
              className="px-4 py-2.5 bg-[#FFF9F0] border border-[#F8CD78] text-[#D75D17] hover:bg-[#F8CD78]/40 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#E97520]" />
              Find Near Me (AI Maps)
            </button>

            <button
              onClick={() => setSuggestionModalOpen(true)}
              className="px-4 py-2.5 bg-[#30302F] hover:bg-[#242423] text-white rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-[#E7A52B]" />
              Suggest a Place
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-xl border border-[#E6E1D8] p-5 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city, ZIP (e.g. 77449), state, or store name..."
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-[#E6E1D8] rounded focus:outline-none focus:border-[#30302F]"
              />
              <Search className="w-4 h-4 text-[#8A857E] absolute right-3 top-3" />
            </div>

            {/* Classification Filter */}
            <select
              value={selectedClassification}
              onChange={(e) => setSelectedClassification(e.target.value)}
              className="px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E6E1D8] rounded text-[#30302F] focus:outline-none"
            >
              <option value="all">All Halal Classifications</option>
              <option value="100% Halal Certified">100% Halal Certified</option>
              <option value="Muslim-Owned">Muslim-Owned</option>
              <option value="Halal Options Available">Halal Options Available</option>
            </select>
          </div>

          {/* Quick ZIP / Location Filter Shortcuts */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs pt-1">
            <span className="text-[11px] font-semibold text-[#8A857E] uppercase tracking-wider shrink-0">
              Popular Areas:
            </span>
            {[
              { label: "77449 (Katy, TX)", query: "77449" },
              { label: "Jackson Heights (11372)", query: "11372" },
              { label: "Jersey City (07302)", query: "07302" },
              { label: "Falls Church (22046)", query: "22046" },
              { label: "Boston (02215)", query: "02215" },
            ].map((loc) => (
              <button
                key={loc.query}
                type="button"
                onClick={() => setSearchQuery(searchQuery === loc.query ? "" : loc.query)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer shrink-0 ${
                  searchQuery === loc.query
                    ? "bg-[#E97520] text-white font-semibold"
                    : "bg-[#FAF9F6] border border-[#E6E1D8] text-[#55504A] hover:border-[#E97520] hover:text-[#E97520]"
                }`}
              >
                {loc.label}
              </button>
            ))}
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-[11px] text-[#8A857E] hover:text-[#30302F] underline ml-1 cursor-pointer shrink-0"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#F3F2EE]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? "bg-[#30302F] text-white"
                    : "bg-[#FAF9F6] text-[#3F3C38] border border-[#E6E1D8] hover:border-[#30302F]"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat.id
                      ? "bg-white/20 text-white"
                      : "bg-[#E6E1D8] text-[#30302F]"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Directory Grid */}
        {filteredListings.length === 0 ? (
          <div className="p-16 text-center bg-white rounded-xl border border-[#E6E1D8] space-y-3">
            <Building2 className="w-12 h-12 mx-auto text-[#E6E1D8]" />
            <h3 className="text-base font-bold text-[#30302F] font-serif-editorial">
              No directory listings found
            </h3>
            <p className="text-xs text-[#77736D] max-w-sm mx-auto">
              We couldn't find listings matching your search. You can ask our AI Assistant to search live Google Maps data or submit a place suggestion.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedClassification("all");
                }}
                className="px-4 py-2 bg-[#FAF9F6] border border-[#E6E1D8] text-xs font-bold rounded"
              >
                Reset Filters
              </button>
              <button
                onClick={onOpenAssistant}
                className="px-4 py-2 bg-[#E97520] text-white text-xs font-bold rounded"
              >
                Search Live with AI
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-[#E6E1D8] p-5 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Top Meta */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] bg-[#FAF9F6] px-2 py-0.5 rounded border border-[#E6E1D8]">
                      {item.categoryLabel}
                    </span>
                    <span className="text-[10px] font-bold text-[#2D7A52] bg-[#2D7A52]/10 px-2 py-0.5 rounded">
                      {item.halalClassification}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="text-base font-bold text-[#242423] font-serif-editorial">
                    {item.name}
                  </h3>

                  {/* Address & Phone */}
                  <div className="space-y-1 text-xs text-[#77736D]">
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#E97520] shrink-0 mt-0.5" />
                      <span>
                        {item.address}, {item.city}, {item.state} {item.postalCode}
                      </span>
                    </div>

                    {item.phone && (
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#2D7A52] shrink-0" />
                        <a
                          href={`tel:${item.phone.replace(/[^0-9]/g, "")}`}
                          className="text-[#30302F] hover:text-[#E97520] font-medium"
                        >
                          {item.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Halal Details Card */}
                  <div className="p-3 bg-[#FAF9F6] rounded-md border border-[#E6E1D8] text-xs text-[#3F3C38] leading-relaxed">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#2D7A52] mb-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Halal Sourcing &amp; Kitchen Notes:</span>
                    </div>
                    {item.halalDetails}
                  </div>

                  {/* Mosque details if present */}
                  {item.jummahInfo && (
                    <div className="p-3 bg-[#FFF9F0] rounded-md border border-[#F8CD78]/40 text-xs space-y-1">
                      <div className="font-bold text-[#D75D17] text-[11px]">
                        🕌 Jummah Prayer Schedule:
                      </div>
                      <p className="text-[#3F3C38]">{item.jummahInfo}</p>
                      {item.womensPrayerArea && (
                        <p className="text-[#77736D] text-[11px]">
                          <strong>Women's Area:</strong> {item.womensPrayerArea}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.features.map((feat, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-[#FAF9F6] text-[#77736D] px-2 py-0.5 rounded border border-[#E6E1D8]"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* Hours */}
                  <div className="text-xs text-[#8A857E] flex items-center gap-1.5 pt-1">
                    <Clock className="w-3.5 h-3.5 text-[#77736D]" />
                    <span>{item.openingHours}</span>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-4 mt-4 border-t border-[#F3F2EE] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    {item.phone && (
                      <a
                        href={`tel:${item.phone.replace(/[^0-9]/g, "")}`}
                        className="text-[#30302F] hover:text-[#E97520] flex items-center gap-1"
                        title={item.phone}
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Call</span>
                      </a>
                    )}
                    {item.website && (
                      <a
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#30302F] hover:text-[#E97520] flex items-center gap-1"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Website</span>
                      </a>
                    )}
                  </div>

                  <a
                    href={item.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#E97520] hover:text-[#D75D17] flex items-center gap-1"
                  >
                    <span>Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Suggestion / Correction Modal */}
        {suggestionModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-[#E6E1D8] p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E6E1D8]">
                <h3 className="text-base font-bold text-[#30302F] font-serif-editorial">
                  Suggest a Halal Business or Mosque
                </h3>
                <button
                  onClick={() => setSuggestionModalOpen(false)}
                  className="p-1 text-[#77736D] hover:text-[#30302F]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {suggestionSubmitted ? (
                <div className="p-6 text-center space-y-2">
                  <CheckCircle2 className="w-12 h-12 mx-auto text-[#2D7A52]" />
                  <h4 className="text-sm font-bold text-[#30302F]">
                    Thank You for Your Contribution!
                  </h4>
                  <p className="text-xs text-[#77736D]">
                    Our community verification team will review and verify this listing before publishing.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSuggestionSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[#30302F] font-bold mb-1">
                      Establishment / Mosque Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={placeName}
                      onChange={(e) => setPlaceName(e.target.value)}
                      placeholder="e.g. Al-Madina Halal Grill"
                      className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E6E1D8] rounded focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#30302F] font-bold mb-1">Category *</label>
                    <select
                      value={placeCategory}
                      onChange={(e) => setPlaceCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E6E1D8] rounded focus:outline-none"
                    >
                      <option value="restaurants">Restaurant</option>
                      <option value="butchers">Butcher / Meat Market</option>
                      <option value="groceries">Grocery / Supermarket</option>
                      <option value="mosques">Mosque &amp; Islamic Center</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#30302F] font-bold mb-1">
                      City, State or Full Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={placeCity}
                      onChange={(e) => setPlaceCity(e.target.value)}
                      placeholder="e.g. Paterson, NJ"
                      className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E6E1D8] rounded focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#30302F] font-bold mb-1">
                      Halal Certification / Sourcing Notes
                    </label>
                    <textarea
                      rows={3}
                      value={placeNotes}
                      onChange={(e) => setPlaceNotes(e.target.value)}
                      placeholder="e.g. Hand-slaughtered zabiha chicken & beef, no alcohol served..."
                      className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E6E1D8] rounded focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setSuggestionModalOpen(false)}
                      className="px-4 py-2 border border-[#E6E1D8] rounded text-[#77736D] hover:bg-[#F3F2EE]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#E97520] hover:bg-[#D75D17] text-white rounded font-bold"
                    >
                      Submit for Review
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
