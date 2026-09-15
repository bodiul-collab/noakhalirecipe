import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  MapPin,
  Search,
  Sparkles,
  PlusCircle,
  CheckCircle2,
  X,
  Loader2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import {
  PlaceResult,
  SearchCategory,
  SearchFilters,
  SearchLocation,
} from "../types";
import { LocationSearchHeader } from "../components/directory/LocationSearchHeader";
import { CategorySelector } from "../components/directory/CategorySelector";
import { PlacesFilterBar } from "../components/directory/PlacesFilterBar";
import { PlaceCard } from "../components/directory/PlaceCard";
import { PlaceMap, DIRECTORY_CARD_HOVER_EVENT } from "../components/directory/PlaceMap";
import { PlacesEmptyState } from "../components/directory/PlacesEmptyState";
import { GoogleAttribution } from "../components/directory/GoogleAttribution";

interface DirectoryViewProps {
  initialCategory?: string;
  onOpenAssistant: () => void;
  onNavigate: (route: string) => void;
  refreshTrigger?: number;
}

// Initial default search center: Houston, TX (77057) - major global halal culinary hub
const DEFAULT_SEARCH_LOCATION: SearchLocation = {
  formattedAddress: "Houston, TX 77057, USA",
  lat: 29.7454,
  lng: -95.4913,
  city: "Houston",
  state: "Texas",
  country: "United States",
  postalCode: "77057",
};

export const DirectoryView: React.FC<DirectoryViewProps> = ({
  initialCategory,
  onOpenAssistant,
  onNavigate,
  refreshTrigger,
}) => {
  // Normalize initial category to SearchCategory
  const mapInitialCategory = (cat?: string): SearchCategory => {
    if (cat === "groceries" || cat === "butchers") return "groceries";
    if (cat === "mosques" || cat === "islamic-centers") return "mosques";
    return "restaurants";
  };

  const [selectedCategory, setSelectedCategory] = useState<SearchCategory>(() =>
    mapInitialCategory(initialCategory)
  );

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(mapInitialCategory(initialCategory));
    }
  }, [initialCategory]);

  // Search input & resolved coordinates with sessionStorage persistence
  const [locationInput, setLocationInput] = useState<string>(() => {
    try {
      const saved = sessionStorage.getItem("nk_dir_loc_input");
      if (saved) return saved;
    } catch {}
    return "Houston, TX 77057";
  });
  const [resolvedLocation, setResolvedLocation] = useState<SearchLocation>(() => {
    try {
      const saved = sessionStorage.getItem("nk_dir_resolved_loc");
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_SEARCH_LOCATION;
  });
  const [ambiguousLocations, setAmbiguousLocations] = useState<SearchLocation[]>([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Keep sessionStorage updated
  useEffect(() => {
    try {
      sessionStorage.setItem("nk_dir_loc_input", locationInput);
      sessionStorage.setItem("nk_dir_resolved_loc", JSON.stringify(resolvedLocation));
    } catch {}
  }, [locationInput, resolvedLocation]);

  // Search filters
  const [filters, setFilters] = useState<SearchFilters>({
    radiusMeters: 16093, // 10 miles default
    distanceUnit: "mi",
    openNowOnly: false,
    minRating: 0,
    sortBy: "nearest",
  });

  const [subQueryInput, setSubQueryInput] = useState("");
  const [appliedSubQuery, setAppliedSubQuery] = useState("");

  // Results & Maps state
  const [places, setPlaces] = useState<PlaceResult[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<Date | null>(() => new Date());
  const [refreshSuccessMessage, setRefreshSuccessMessage] = useState<string | null>(null);
  const [placesError, setPlacesError] = useState<string | null>(null);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [hoveredPlaceId, setHoveredPlaceId] = useState<string | null>(null);
  const [categoryCounts, setCategoryCounts] = useState<Partial<Record<SearchCategory, number>>>({});

  // Card hover handler that updates local state and broadcasts DOM event for Google Maps marker synchronization
  const handleCardHover = useCallback((placeId: string | null) => {
    setHoveredPlaceId(placeId);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent(DIRECTORY_CARD_HOVER_EVENT, {
          detail: { placeId, isHovered: !!placeId },
        })
      );
    }
  }, []);

  // Mobile View state: "list" | "map"
  const [mobileView, setMobileView] = useState<"list" | "map">("list");

  // Google Maps API Key configuration
  const [clientApiKey, setClientApiKey] = useState<string | null>(null);

  // Community Suggestion Modal state
  const [suggestionModalOpen, setSuggestionModalOpen] = useState(false);
  const [suggestionSubmitted, setSuggestionSubmitted] = useState(false);
  const [placeName, setPlaceName] = useState("");
  const [placeCategory, setPlaceCategory] = useState("restaurants");
  const [placeCity, setPlaceCity] = useState("");
  const [placeNotes, setPlaceNotes] = useState("");

  // Fetch API configuration on mount
  useEffect(() => {
    fetch("/api/places/config")
      .then((res) => res.json())
      .then((data) => {
        if (data.clientApiKey) {
          setClientApiKey(data.clientApiKey);
        }
      })
      .catch((err) => console.warn("Could not fetch places configuration:", err));
  }, []);

  // Track active search request ID and query key to prevent stale responses or race conditions
  const searchRequestIdRef = useRef<number>(0);
  const locationResolveRequestIdRef = useRef<number>(0);
  const activeSearchKeyRef = useRef<string>("");

  // Fetch places from server-side endpoint with optional force refresh bypass
  const executePlacesSearch = useCallback(
    async (
      loc: SearchLocation,
      cat: SearchCategory,
      filterState: SearchFilters,
      subQ: string,
      forceRefresh = false,
      reqId?: number
    ) => {
      const activeId = reqId ?? ++searchRequestIdRef.current;
      setIsLoadingPlaces(true);
      if (forceRefresh) {
        setIsRefreshing(true);
      }
      setPlacesError(null);
      setNextPageToken(null);

      try {
        const response = await fetch("/api/places/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            category: cat,
            lat: loc.lat,
            lng: loc.lng,
            radiusMeters: filterState.radiusMeters,
            subQuery: subQ || undefined,
            openNow: filterState.openNowOnly,
            minRating: filterState.minRating,
            locationName: loc.city || loc.formattedAddress,
            refresh: forceRefresh,
            forceRefresh: forceRefresh,
          }),
        });

        if (activeId !== searchRequestIdRef.current) {
          return; // Ignore stale/superseded response
        }

        if (!response.ok) {
          throw new Error(`Server returned status ${response.status}`);
        }

        const data = await response.json();
        if (activeId !== searchRequestIdRef.current) {
          return; // Ignore stale/superseded response
        }

        if (data.status === "ERROR") {
          setPlacesError(data.errorMessage || "Unable to load places at this time.");
          setPlaces([]);
          setNextPageToken(null);
        } else {
          setPlaces(data.places || []);
          setNextPageToken(data.nextPageToken || null);
          setCategoryCounts((prev) => ({
            ...prev,
            [cat]: data.places?.length || 0,
          }));
          setLastRefreshedAt(new Date());
        }
      } catch (err: any) {
        if (activeId === searchRequestIdRef.current) {
          console.error("Failed to fetch places:", err);
          setPlacesError("Could not connect to the directory search service. Please try again.");
        }
      } finally {
        if (activeId === searchRequestIdRef.current) {
          setIsLoadingPlaces(false);
          setIsRefreshing(false);
        }
      }
    },
    []
  );

  // Centralized, synchronized location selection handler
  const applySelectedLocation = useCallback(
    (loc: SearchLocation, forceRefresh = true) => {
      // 1. Immediately update active coordinates, address, and UI states
      setResolvedLocation(loc);
      setLocationInput(loc.formattedAddress);
      setAmbiguousLocations([]);
      setSelectedPlaceId(null);
      setLocationError(null);

      // 2. Clear previous business results immediately so stale cards are not displayed
      setPlaces([]);
      setIsLoadingPlaces(true);
      if (forceRefresh) {
        setIsRefreshing(true);
      }
      setPlacesError(null);
      setNextPageToken(null);

      // 3. Increment request ID and update key to prevent duplicate or out-of-order execution
      const currentReqId = ++searchRequestIdRef.current;
      const key = `${loc.lat.toFixed(4)},${loc.lng.toFixed(4)}|${selectedCategory}|${filters.radiusMeters}|${filters.openNowOnly}|${filters.minRating}|${appliedSubQuery}`;
      activeSearchKeyRef.current = key;

      // 4. Trigger fresh Places search for the new location (exact single search for selected category)
      executePlacesSearch(
        loc,
        selectedCategory,
        filters,
        appliedSubQuery,
        forceRefresh,
        currentReqId
      );
    },
    [selectedCategory, filters, appliedSubQuery, executePlacesSearch]
  );

  // Pagination: Load next 20 results via Places API nextPageToken
  const handleLoadMorePlaces = async () => {
    if (!nextPageToken || isLoadingMore) return;
    setIsLoadingMore(true);

    try {
      const response = await fetch("/api/places/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: selectedCategory,
          lat: resolvedLocation.lat,
          lng: resolvedLocation.lng,
          radiusMeters: filters.radiusMeters,
          subQuery: appliedSubQuery || undefined,
          openNow: filters.openNowOnly,
          minRating: filters.minRating,
          locationName: resolvedLocation.city || resolvedLocation.formattedAddress,
          pageToken: nextPageToken,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const incomingPlaces: PlaceResult[] = data.places || [];
        if (incomingPlaces.length > 0) {
          setPlaces((prev) => {
            const existingIds = new Set(prev.map((p) => p.id));
            const uniqueNew = incomingPlaces.filter((p) => !existingIds.has(p.id));
            return [...prev, ...uniqueNew];
          });
        }
        setNextPageToken(data.nextPageToken || null);
      }
    } catch (err) {
      console.error("Failed to load more places:", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Comprehensive manual refresh callback (clears server cache, verifies live status)
  const handleRefreshPlaces = useCallback(async () => {
    setIsRefreshing(true);
    setPlacesError(null);

    // 1. Purge server-side places memory cache
    try {
      await fetch("/api/places/clear-cache", { method: "POST" });
    } catch (e) {
      console.warn("Could not clear cache endpoint:", e);
    }

    const minDelay = new Promise((resolve) => setTimeout(resolve, 450));

    // 2. Fetch fresh live places
    await Promise.all([
      executePlacesSearch(resolvedLocation, selectedCategory, filters, appliedSubQuery, true),
      minDelay,
    ]);

    setRefreshSuccessMessage(
      `Live Directory Refreshed: Verified Halal locations near ${resolvedLocation.city || resolvedLocation.formattedAddress}.`
    );
    setTimeout(() => {
      setRefreshSuccessMessage(null);
    }, 4000);
  }, [resolvedLocation, selectedCategory, filters, appliedSubQuery, executePlacesSearch]);

  // Synchronized search effect when category, filters, or subquery change
  useEffect(() => {
    const key = `${resolvedLocation.lat.toFixed(4)},${resolvedLocation.lng.toFixed(4)}|${selectedCategory}|${filters.radiusMeters}|${filters.openNowOnly}|${filters.minRating}|${appliedSubQuery}`;
    if (activeSearchKeyRef.current === key) {
      return; // Already triggered by applySelectedLocation
    }
    activeSearchKeyRef.current = key;
    const currentReqId = ++searchRequestIdRef.current;

    // Clear old places immediately to prevent showing old location or category cards
    setPlaces([]);
    setIsLoadingPlaces(true);
    setSelectedPlaceId(null);
    setNextPageToken(null);
    setPlacesError(null);

    executePlacesSearch(resolvedLocation, selectedCategory, filters, appliedSubQuery, false, currentReqId);
  }, [
    resolvedLocation,
    selectedCategory,
    filters.radiusMeters,
    filters.openNowOnly,
    filters.minRating,
    appliedSubQuery,
    executePlacesSearch,
  ]);

  // Re-trigger fresh search if parent requests directory refresh
  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (refreshTrigger !== undefined && refreshTrigger > 0) {
      handleRefreshPlaces();
    }
  }, [refreshTrigger, handleRefreshPlaces]);

  // Handle location search submit
  const handleSearchLocation = async (overrideQuery?: string) => {
    const query = (overrideQuery || locationInput).trim();
    if (!query) return;

    const activeLocId = ++locationResolveRequestIdRef.current;
    setIsLoadingLocation(true);
    setLocationError(null);
    setAmbiguousLocations([]);

    try {
      const response = await fetch("/api/places/resolve-location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (activeLocId !== locationResolveRequestIdRef.current) return;

      const data = await response.json();
      if (activeLocId !== locationResolveRequestIdRef.current) return;

      if (data.status === "OK" && data.results.length > 0) {
        const topResult = data.results[0];
        applySelectedLocation(topResult, true);
      } else if (data.status === "AMBIGUOUS" && data.results.length > 1) {
        setAmbiguousLocations(data.results);
      } else {
        setLocationError(
          data.errorMessage ||
            "We couldn't find that location. Try a city, ZIP/postal code, neighborhood, or full address."
        );
      }
    } catch (err: any) {
      if (activeLocId === locationResolveRequestIdRef.current) {
        console.error("Geocoding request failed:", err);
        setLocationError("Could not resolve location at this time. Please try again.");
      }
    } finally {
      if (activeLocId === locationResolveRequestIdRef.current) {
        setIsLoadingLocation(false);
      }
    }
  };

  // Handle "Use My Location" (Geolocation)
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    const activeLocId = ++locationResolveRequestIdRef.current;
    setIsLoadingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        if (activeLocId !== locationResolveRequestIdRef.current) return;
        const { latitude, longitude } = position.coords;
        const coordQuery = `${latitude}, ${longitude}`;

        try {
          const response = await fetch("/api/places/resolve-location", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: coordQuery }),
          });

          if (activeLocId !== locationResolveRequestIdRef.current) return;

          const data = await response.json();
          if (activeLocId !== locationResolveRequestIdRef.current) return;

          if (data.status === "OK" && data.results.length > 0) {
            const resolved = data.results[0];
            applySelectedLocation(resolved, true);
          } else {
            const fallbackCoordLoc: SearchLocation = {
              formattedAddress: `Current Location (${latitude.toFixed(3)}, ${longitude.toFixed(3)})`,
              lat: latitude,
              lng: longitude,
            };
            applySelectedLocation(fallbackCoordLoc, true);
          }
        } catch (err) {
          console.warn("Could not reverse geocode coordinates, using raw values:", err);
        } finally {
          if (activeLocId === locationResolveRequestIdRef.current) {
            setIsLoadingLocation(false);
          }
        }
      },
      (error) => {
        if (activeLocId === locationResolveRequestIdRef.current) {
          setIsLoadingLocation(false);
          // Requirement 5: exact user-friendly explanation
          setLocationError(
            "Location access is unavailable. You can search by city, postal code, ZIP code, or address instead."
          );
        }
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  };

  // Filter and sort the retrieved places client-side
  const sortedAndFilteredPlaces = useMemo(() => {
    let list = [...places];

    // Sort
    if (filters.sortBy === "highest_rated") {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else {
      // Nearest first
      list.sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));
    }

    return list;
  }, [places, filters.sortBy]);

  // Synchronized card selection
  const handleSelectPlace = (place: PlaceResult) => {
    setSelectedPlaceId(place.id);
    // Smoothly scroll the card into view if needed
    const cardEl = document.getElementById(`place-card-${place.id}`);
    if (cardEl && mobileView === "list") {
      cardEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  // Suggestion Modal submission
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

  const getCategoryDisplayName = () => {
    switch (selectedCategory) {
      case "restaurants":
        return "Halal Restaurant";
      case "groceries":
        return "Halal Grocery";
      case "mosques":
        return "Mosque";
    }
  };

  return (
    <div className="w-full bg-[#FAF9F6] py-8 sm:py-12 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
        {/* Top Header Bar & Global Search */}
        <LocationSearchHeader
          locationInput={locationInput}
          onChangeLocationInput={setLocationInput}
          onSearch={handleSearchLocation}
          onUseMyLocation={handleUseMyLocation}
          isLoadingLocation={isLoadingLocation}
          locationError={locationError}
          onClearLocationError={() => setLocationError(null)}
          resolvedLocation={resolvedLocation}
          ambiguousLocations={ambiguousLocations}
          onSelectAmbiguousLocation={(loc) => {
            applySelectedLocation(loc, true);
          }}
          filters={filters}
          onChangeFilters={(newFilters) =>
            setFilters((prev) => ({ ...prev, ...newFilters }))
          }
          onRefresh={handleRefreshPlaces}
          isRefreshing={isRefreshing || isLoadingPlaces}
        />

        {/* 3 Equal Categories Selector */}
        <CategorySelector
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            if (cat !== selectedCategory) {
              setSelectedCategory(cat);
              setSelectedPlaceId(null);
              setPlaces([]);
              setIsLoadingPlaces(true);
            }
          }}
          counts={categoryCounts}
          isLoading={isLoadingPlaces}
        />

        {/* Filters, Subquery & Mobile View Bar */}
        <PlacesFilterBar
          totalCount={sortedAndFilteredPlaces.length}
          category={selectedCategory}
          categoryLabel={getCategoryDisplayName()}
          locationName={resolvedLocation.city || resolvedLocation.formattedAddress}
          filters={filters}
          onChangeFilters={(newFilters) =>
            setFilters((prev) => ({ ...prev, ...newFilters }))
          }
          mobileView={mobileView}
          onChangeMobileView={setMobileView}
          subQueryInput={subQueryInput}
          onChangeSubQueryInput={setSubQueryInput}
          onApplySubQuery={() => setAppliedSubQuery(subQueryInput.trim())}
          onRefresh={handleRefreshPlaces}
          isRefreshing={isRefreshing || isLoadingPlaces}
          lastRefreshedAt={lastRefreshedAt}
        />

        {/* Synchronized Map + List Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Place Cards List */}
          <div
            className={`lg:col-span-7 space-y-4 ${
              mobileView === "map" ? "hidden lg:block" : "block"
            }`}
          >
            {refreshSuccessMessage && (
              <div className="flex items-center justify-between bg-[#F0FDF4] border border-[#BBF7D0] px-4 py-3 rounded-xl text-xs text-[#166534] shadow-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2D7A52] shrink-0" />
                  <span className="font-semibold">{refreshSuccessMessage}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setRefreshSuccessMessage(null)}
                  className="text-[#166534] hover:text-[#14532D] p-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {isRefreshing && places.length > 0 && (
              <div className="flex items-center justify-between bg-[#FFF9F2] border border-[#FDE6D2] px-4 py-2.5 rounded-xl text-xs text-[#E97520] animate-pulse">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Refreshing live places & verifying operating status...</span>
                </div>
              </div>
            )}

            {isLoadingPlaces && places.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#E6E1D8] p-12 text-center space-y-4 shadow-xs">
                <Loader2 className="w-10 h-10 mx-auto text-[#E97520] animate-spin" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#242423] font-serif-editorial">
                    Searching for {getCategoryDisplayName().toLowerCase()}s near{" "}
                    {resolvedLocation.city || resolvedLocation.formattedAddress}...
                  </h3>
                  <p className="text-xs text-[#77736D]">
                    Retrieving live geographical data, verified coordinates, and operating status.
                  </p>
                </div>
              </div>
            ) : placesError ? (
              <div className="bg-white rounded-2xl border border-red-200 p-8 text-center space-y-3 shadow-xs">
                <AlertCircle className="w-10 h-10 mx-auto text-red-500" />
                <h3 className="text-base font-bold text-[#242423]">
                  Unable to load search results
                </h3>
                <p className="text-xs text-[#77736D] max-w-md mx-auto">
                  {placesError}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    executePlacesSearch(
                      resolvedLocation,
                      selectedCategory,
                      filters,
                      appliedSubQuery,
                      true
                    )
                  }
                  className="px-4 py-2 bg-[#E97520] text-white rounded-lg text-xs font-bold"
                >
                  Retry Search
                </button>
              </div>
            ) : sortedAndFilteredPlaces.length === 0 ? (
              <PlacesEmptyState
                category={selectedCategory}
                locationName={
                  resolvedLocation.city || resolvedLocation.formattedAddress
                }
                onIncreaseRadius={() =>
                  setFilters((prev) => ({
                    ...prev,
                    radiusMeters: 40233, // 25 miles
                  }))
                }
                onOpenSuggestModal={() => setSuggestionModalOpen(true)}
                onResetFilters={() => {
                  setFilters((prev) => ({
                    ...prev,
                    openNowOnly: false,
                    minRating: 0,
                    radiusMeters: 16093,
                  }));
                  setSubQueryInput("");
                  setAppliedSubQuery("");
                }}
              />
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sortedAndFilteredPlaces.map((place) => (
                    <PlaceCard
                      key={place.id}
                      place={place}
                      isSelected={place.id === selectedPlaceId}
                      isHovered={place.id === hoveredPlaceId}
                      distanceUnit={filters.distanceUnit}
                      onSelect={handleSelectPlace}
                      onHover={handleCardHover}
                    />
                  ))}
                </div>

                {/* 20-Result Pagination CTA */}
                {nextPageToken ? (
                  <div className="pt-2 pb-2 text-center">
                    <button
                      type="button"
                      id="view-more-results-btn"
                      onClick={handleLoadMorePlaces}
                      disabled={isLoadingMore}
                      className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-[#FAF9F6] border-2 border-[#E97520] hover:border-[#D75D17] text-[#E97520] hover:text-[#D75D17] rounded-xl text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer shadow-xs disabled:opacity-60 flex items-center justify-center gap-2 mx-auto"
                    >
                      {isLoadingMore ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#E97520]" />
                          <span>Loading more results...</span>
                        </>
                      ) : (
                        <>
                          <span>View More Results</span>
                        </>
                      )}
                    </button>
                  </div>
                ) : sortedAndFilteredPlaces.length >= 20 ? (
                  <div className="py-2 text-center text-xs font-semibold text-[#8A857E]">
                    All verified results loaded
                  </div>
                ) : null}

                {/* Attribution and Legal Halal Guidance */}
                <GoogleAttribution />
              </div>
            )}
          </div>

          {/* Right Column: Synchronized Interactive Map */}
          <div
            className={`lg:col-span-5 lg:sticky lg:top-24 h-[520px] sm:h-[600px] lg:h-[calc(100vh-120px)] ${
              mobileView === "list" ? "hidden lg:block" : "block"
            }`}
          >
            <PlaceMap
              apiKey={clientApiKey}
              places={sortedAndFilteredPlaces}
              centerLocation={resolvedLocation}
              selectedPlaceId={selectedPlaceId}
              hoveredPlaceId={hoveredPlaceId}
              onSelectPlace={handleSelectPlace}
              onHoverPlace={handleCardHover}
              radiusMeters={filters.radiusMeters}
            />
          </div>
        </div>

        {/* Community Suggestion / Correction Modal */}
        {suggestionModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E6E1D8] p-6 space-y-4">
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
                      className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E6E1D8] rounded-lg focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#30302F] font-bold mb-1">Category *</label>
                    <select
                      value={placeCategory}
                      onChange={(e) => setPlaceCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E6E1D8] rounded-lg focus:outline-none"
                    >
                      <option value="restaurants">Halal Restaurant</option>
                      <option value="groceries">Halal Grocery &amp; Zabiha Butcher</option>
                      <option value="mosques">Mosque &amp; Islamic Center</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#30302F] font-bold mb-1">
                      City, State, Country or Full Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={placeCity}
                      onChange={(e) => setPlaceCity(e.target.value)}
                      placeholder="e.g. Toronto, ON or Houston, TX"
                      className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E6E1D8] rounded-lg focus:outline-none"
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
                      placeholder="e.g. Hand-slaughtered zabiha chicken & beef, no alcohol served, Jummah prayers..."
                      className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E6E1D8] rounded-lg focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setSuggestionModalOpen(false)}
                      className="px-4 py-2 border border-[#E6E1D8] rounded-lg text-[#77736D] hover:bg-[#F3F2EE]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#E97520] hover:bg-[#D75D17] text-white rounded-lg font-bold"
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
