import React, { useState, useEffect, useMemo, useRef, useCallback, Component } from "react";
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
  InfoWindow,
  Pin,
} from "@vis.gl/react-google-maps";
import { PlaceResult, SearchLocation } from "../../types";
import { Utensils, ShoppingBag, Building2, ExternalLink, Star } from "lucide-react";

export const DIRECTORY_CARD_HOVER_EVENT = "noakhali:directory-card-hover";

export interface DirectoryCardHoverDetail {
  placeId: string | null;
  isHovered: boolean;
}

interface PlaceMapProps {
  apiKey: string | null;
  places: PlaceResult[];
  centerLocation: SearchLocation;
  selectedPlaceId: string | null;
  hoveredPlaceId?: string | null;
  onSelectPlace: (place: PlaceResult) => void;
  onHoverPlace?: (placeId: string | null) => void;
  radiusMeters: number;
}

interface MapErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

interface MapErrorBoundaryState {
  hasError: boolean;
}

class MapErrorBoundary extends Component {
  props: MapErrorBoundaryProps;
  state: MapErrorBoundaryState = { hasError: false };

  constructor(props: MapErrorBoundaryProps) {
    super(props);
    this.props = props;
  }

  static getDerivedStateFromError(): MapErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.warn("Google Maps rendering error, switching to interactive fallback map:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export const PlaceMap: React.FC<PlaceMapProps> = ({
  apiKey,
  places,
  centerLocation,
  selectedPlaceId,
  hoveredPlaceId,
  onSelectPlace,
  onHoverPlace,
  radiusMeters,
}) => {
  const [activePlace, setActivePlace] = useState<PlaceResult | null>(null);

  // References to the Google Maps JavaScript API marker instances
  const markerInstancesRef = useRef<Map<string, google.maps.marker.AdvancedMarkerElement>>(new Map());
  const activeAnimationsRef = useRef<Map<string, Animation>>(new Map());

  // Marker pulse/highlight logic using the Google Maps JavaScript API marker interface
  const applyMarkerHighlight = useCallback(
    (placeId: string | null, isHovered: boolean) => {
      if (!placeId || !isHovered) {
        // Cancel all ongoing marker animations and restore default zIndices
        activeAnimationsRef.current.forEach((anim) => {
          try {
            anim.cancel();
          } catch {
            // Ignore if already canceled
          }
        });
        activeAnimationsRef.current.clear();

        markerInstancesRef.current.forEach((marker, id) => {
          const isSelected = id === (activePlace?.id || selectedPlaceId);
          try {
            marker.zIndex = isSelected ? 50 : 10;
          } catch {
            // Ignore
          }
          try {
            if (typeof google !== "undefined" && google.maps?.event?.trigger) {
              google.maps.event.trigger(marker, "unhighlight", { placeId: id });
            }
          } catch {
            // AdvancedMarkerElement may not support legacy MVCObject events
          }
        });
        return;
      }

      const targetMarker = markerInstancesRef.current.get(placeId);
      if (targetMarker) {
        // 1. Elevate marker zIndex via the marker interface
        try {
          targetMarker.zIndex = 1000;
        } catch {
          // Ignore
        }

        // 2. Trigger custom event on the Google Maps marker interface
        try {
          if (typeof google !== "undefined" && google.maps?.event?.trigger) {
            google.maps.event.trigger(targetMarker, "highlight", { placeId });
          }
        } catch {
          // AdvancedMarkerElement may not support legacy MVCObject events
        }

        // 3. Apply programmatic pulse/highlight animation to marker DOM element
        const markerEl = (targetMarker.element || targetMarker.content) as HTMLElement | null;
        if (markerEl) {
          activeAnimationsRef.current.get(placeId)?.cancel();

          try {
            const anim = markerEl.animate(
              [
                {
                  transform: "scale(1) translateY(0px)",
                  filter: "drop-shadow(0 0 0px rgba(233, 117, 32, 0))",
                },
                {
                  transform: "scale(1.3) translateY(-8px)",
                  filter: "drop-shadow(0 6px 16px rgba(233, 117, 32, 0.85))",
                },
                {
                  transform: "scale(1.18) translateY(-5px)",
                  filter: "drop-shadow(0 3px 10px rgba(233, 117, 32, 0.6))",
                },
              ],
              {
                duration: 750,
                iterations: Infinity,
                direction: "alternate",
                easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
              }
            );
            activeAnimationsRef.current.set(placeId, anim);
          } catch {
            // Graceful fallback if Web Animations API is restricted
          }
        }
      }
    },
    [activePlace, selectedPlaceId]
  );

  // Event-listener logic: Listen for DirectoryView card hover events to trigger marker pulse/highlight
  useEffect(() => {
    const handleCardHoverEvent = (e: Event) => {
      const customEvent = e as CustomEvent<DirectoryCardHoverDetail>;
      if (customEvent && customEvent.detail) {
        applyMarkerHighlight(customEvent.detail.placeId, customEvent.detail.isHovered);
      }
    };

    window.addEventListener(DIRECTORY_CARD_HOVER_EVENT, handleCardHoverEvent);
    return () => {
      window.removeEventListener(DIRECTORY_CARD_HOVER_EVENT, handleCardHoverEvent);
    };
  }, [applyMarkerHighlight]);

  // Synchronize when hoveredPlaceId prop changes directly
  useEffect(() => {
    applyMarkerHighlight(hoveredPlaceId || null, !!hoveredPlaceId);
  }, [hoveredPlaceId, applyMarkerHighlight]);

  // Sync active place with selectedPlaceId
  useEffect(() => {
    if (selectedPlaceId) {
      const found = places.find((p) => p.id === selectedPlaceId);
      setActivePlace(found || null);
    } else {
      setActivePlace(null);
    }
  }, [selectedPlaceId, places]);

  // When center coordinates change, clear previous active place to recenter map
  useEffect(() => {
    setActivePlace(null);
  }, [centerLocation.lat, centerLocation.lng]);

  const mapCenter = useMemo(() => {
    if (activePlace) {
      return {
        lat: activePlace.location.latitude,
        lng: activePlace.location.longitude,
      };
    }
    return {
      lat: centerLocation.lat,
      lng: centerLocation.lng,
    };
  }, [activePlace, centerLocation]);

  // Calculate appropriate zoom level based on radiusMeters
  const mapZoom = useMemo(() => {
    if (radiusMeters <= 2000) return 15;
    if (radiusMeters <= 8500) return 13;
    if (radiusMeters <= 18000) return 12;
    if (radiusMeters <= 45000) return 10;
    return 9;
  }, [radiusMeters]);

  const getPinColors = (category: string, isSelected: boolean, isHovered: boolean = false) => {
    if (isHovered) {
      return {
        background: "#D75D17",
        glyphColor: "#FFFFFF",
        borderColor: "#FFFFFF",
      };
    }

    if (isSelected) {
      return {
        background: "#242423",
        glyphColor: "#FFF",
        borderColor: "#E97520",
      };
    }

    switch (category) {
      case "restaurants":
        return {
          background: "#E97520",
          glyphColor: "#FFFFFF",
          borderColor: "#C25E17",
        };
      case "groceries":
        return {
          background: "#2D7A52",
          glyphColor: "#FFFFFF",
          borderColor: "#1E583A",
        };
      case "mosques":
        return {
          background: "#1B6CA8",
          glyphColor: "#FFFFFF",
          borderColor: "#124C78",
        };
      default:
        return {
          background: "#77736D",
          glyphColor: "#FFFFFF",
          borderColor: "#55504A",
        };
    }
  };

  // If client API key is provided, use @vis.gl/react-google-maps
  if (apiKey) {
    return (
      <MapErrorBoundary fallback={
        <div className="w-full h-full min-h-[420px] rounded-2xl overflow-hidden border border-[#E6E1D8] shadow-xs relative bg-[#EBF0F5] flex flex-col justify-between">
          <div className="p-3 bg-white/90 backdrop-blur-xs border-b border-[#E6E1D8] flex items-center justify-between text-xs z-10">
            <div className="flex items-center gap-1.5 truncate">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
              <span className="font-bold text-[#242423] truncate">
                {centerLocation.formattedAddress}
              </span>
            </div>
            <span className="text-[11px] text-[#77736D] shrink-0 font-medium ml-2">
              {places.length} places pinned
            </span>
          </div>
          <div className="relative flex-1 w-full min-h-[340px] flex items-center justify-center p-6 overflow-hidden">
            <div className="text-center space-y-2 z-10 bg-white/90 p-4 rounded-xl border border-[#E6E1D8] shadow-xs max-w-xs">
              <p className="text-xs font-bold text-[#242423]">Interactive Map Mode</p>
              <p className="text-[11px] text-[#77736D]">Showing {places.length} locations near {centerLocation.city || "your area"}.</p>
            </div>
          </div>
        </div>
      }>
        <div className="w-full h-full min-h-[420px] rounded-2xl overflow-hidden border border-[#E6E1D8] shadow-xs relative bg-[#F3F2EE]">
          <APIProvider apiKey={apiKey}>
          <GoogleMap
            id="halal-directory-map"
            mapId="DEMO_MAP_ID"
            defaultCenter={{ lat: centerLocation.lat, lng: centerLocation.lng }}
            center={mapCenter}
            defaultZoom={mapZoom}
            zoom={mapZoom}
            gestureHandling="greedy"
            disableDefaultUI={false}
            internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
            style={{ width: "100%", height: "100%", minHeight: "420px" }}
          >
            {/* Center Location Pin */}
            <AdvancedMarker
              position={{ lat: centerLocation.lat, lng: centerLocation.lng }}
              title={`Search Center: ${centerLocation.formattedAddress}`}
            >
              <div className="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-md ring-4 ring-blue-500/30 animate-pulse" />
            </AdvancedMarker>

            {/* Place Markers */}
            {places.map((place) => {
              const isSelected = place.id === (activePlace?.id || selectedPlaceId);
              const isHovered = place.id === hoveredPlaceId;
              const pinColors = getPinColors(place.category, isSelected, isHovered);

              return (
                <AdvancedMarker
                  key={place.id}
                  ref={(markerInstance) => {
                    if (markerInstance) {
                      markerInstancesRef.current.set(place.id, markerInstance);
                      if (typeof google !== "undefined" && google.maps?.event?.addListener) {
                        google.maps.event.addListener(markerInstance, "highlight", () => {
                          // Handled via marker interface
                        });
                      }
                      if (place.id === hoveredPlaceId) {
                        applyMarkerHighlight(place.id, true);
                      }
                    } else {
                      markerInstancesRef.current.delete(place.id);
                      const anim = activeAnimationsRef.current.get(place.id);
                      if (anim) {
                        anim.cancel();
                        activeAnimationsRef.current.delete(place.id);
                      }
                    }
                  }}
                  position={{
                    lat: place.location.latitude,
                    lng: place.location.longitude,
                  }}
                  title={place.name}
                  zIndex={isHovered ? 100 : isSelected ? 50 : 10}
                  onClick={() => {
                    setActivePlace(place);
                    onSelectPlace(place);
                  }}
                  onMouseEnter={() => {
                    onHoverPlace?.(place.id);
                  }}
                  onMouseLeave={() => {
                    onHoverPlace?.(null);
                  }}
                >
                  <div
                    className={`relative flex items-center justify-center transition-all duration-300 ${
                      isHovered
                        ? "scale-125 -translate-y-2.5 z-50"
                        : isSelected
                        ? "scale-110 -translate-y-1 z-40"
                        : "scale-100 z-10"
                    }`}
                  >
                    {/* Visual Pulse Waves on Hover */}
                    {isHovered && (
                      <>
                        <span
                          className="absolute -inset-2.5 rounded-full animate-ping opacity-75 pointer-events-none"
                          style={{
                            backgroundColor:
                              place.category === "restaurants"
                                ? "#E97520"
                                : place.category === "groceries"
                                ? "#2D7A52"
                                : "#1B6CA8",
                          }}
                        />
                        <span
                          className="absolute -inset-4 rounded-full animate-pulse border-2 border-white shadow-xl pointer-events-none opacity-60"
                          style={{
                            backgroundColor:
                              place.category === "restaurants"
                                ? "rgba(233, 117, 32, 0.4)"
                                : place.category === "groceries"
                                ? "rgba(45, 122, 82, 0.4)"
                                : "rgba(27, 108, 168, 0.4)",
                          }}
                        />
                      </>
                    )}

                    <Pin
                      background={pinColors.background}
                      glyphColor={pinColors.glyphColor}
                      borderColor={pinColors.borderColor}
                      scale={isHovered ? 1.35 : isSelected ? 1.25 : 1.0}
                    />

                    {/* Floating Tooltip Pill on Hover */}
                    {isHovered && !isSelected && (
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2.5 whitespace-nowrap bg-[#242423] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xl border border-white/20 pointer-events-none z-50">
                        {place.name}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#242423]" />
                      </div>
                    )}
                  </div>
                </AdvancedMarker>
              );
            })}

            {/* Interactive Info Window for Selected Place */}
            {activePlace && (
              <InfoWindow
                position={{
                  lat: activePlace.location.latitude,
                  lng: activePlace.location.longitude,
                }}
                onCloseClick={() => setActivePlace(null)}
              >
                <div className="p-2 max-w-[240px] text-xs space-y-1.5 font-sans">
                  <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#E97520]">
                    <span>{activePlace.categoryLabel}</span>
                  </div>

                  <h4 className="font-bold text-[#242423] text-sm leading-snug">
                    {activePlace.name}
                  </h4>

                  {activePlace.rating !== undefined && (
                    <div className="flex items-center gap-1 text-[11px] text-[#55504A]">
                      <Star className="w-3 h-3 text-[#E7A52B] fill-current" />
                      <span className="font-bold">{activePlace.rating.toFixed(1)}</span>
                      {activePlace.userRatingCount && (
                        <span>({activePlace.userRatingCount})</span>
                      )}
                    </div>
                  )}

                  <p className="text-[11px] text-[#77736D] line-clamp-2">
                    {activePlace.formattedAddress}
                  </p>

                  <div className="pt-1 flex items-center justify-between border-t border-[#E6E1D8]">
                    <span className="text-[10px] text-[#2D7A52] font-semibold">
                      {activePlace.isOpenNow ? "Open Now" : "Hours on Map"}
                    </span>
                    <a
                      href={activePlace.googleMapsUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-[#E97520] hover:underline flex items-center gap-0.5"
                    >
                      <span>Directions</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </APIProvider>
        </div>
      </MapErrorBoundary>
    );
  }

  // Visual Interactive Map for Fallback / Preview Mode
  return (
    <div className="w-full h-full min-h-[420px] rounded-2xl overflow-hidden border border-[#E6E1D8] shadow-xs relative bg-[#EBF0F5] flex flex-col justify-between">
      {/* Map Top Notification */}
      <div className="p-3 bg-white/90 backdrop-blur-xs border-b border-[#E6E1D8] flex items-center justify-between text-xs z-10">
        <div className="flex items-center gap-1.5 truncate">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
          <span className="font-bold text-[#242423] truncate">
            {centerLocation.formattedAddress}
          </span>
        </div>
        <span className="text-[11px] text-[#77736D] shrink-0 font-medium ml-2">
          {places.length} places pinned
        </span>
      </div>

      {/* Styled Interactive Geographic Canvas */}
      <div className="relative flex-1 w-full min-h-[340px] flex items-center justify-center p-6 overflow-hidden">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:20px_20px] opacity-60" />

        {/* Search Center Pulse */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-6 h-6 rounded-full bg-blue-600 border-2 border-white shadow-lg ring-8 ring-blue-500/20 flex items-center justify-center text-white text-[10px] font-bold">
            📍
          </div>
          <span className="text-[11px] font-bold text-blue-900 bg-white/95 px-2 py-0.5 rounded shadow-xs mt-1 border border-blue-200">
            Center: {centerLocation.city || "Area"}
          </span>
        </div>

        {/* Place Markers distributed around the center */}
        {places.map((place, idx) => {
          const isSelected = place.id === (activePlace?.id || selectedPlaceId);
          const isHovered = place.id === hoveredPlaceId;
          // Distribute in a compass radial arrangement for visualization
          const angle = (idx * (360 / Math.max(places.length, 1)) * Math.PI) / 180;
          const radiusPx = 80 + (idx % 3) * 35;
          const offsetX = Math.cos(angle) * radiusPx;
          const offsetY = Math.sin(angle) * radiusPx;

          const getIcon = () => {
            if (place.category === "restaurants") return <Utensils className="w-3.5 h-3.5" />;
            if (place.category === "groceries") return <ShoppingBag className="w-3.5 h-3.5" />;
            return <Building2 className="w-3.5 h-3.5" />;
          };

          const getBg = () => {
            if (isHovered) return "bg-[#D75D17] text-white ring-4 ring-[#E97520]/60 scale-125 -translate-y-2 shadow-xl";
            if (isSelected) return "bg-[#242423] text-white ring-4 ring-[#E97520]/40 scale-110";
            if (place.category === "restaurants") return "bg-[#E97520] text-white hover:bg-[#D75D17]";
            if (place.category === "groceries") return "bg-[#2D7A52] text-white hover:bg-[#236040]";
            return "bg-[#1B6CA8] text-white hover:bg-[#145382]";
          };

          return (
            <div
              key={place.id}
              onClick={() => {
                setActivePlace(place);
                onSelectPlace(place);
              }}
              onMouseEnter={() => {
                onHoverPlace?.(place.id);
              }}
              onMouseLeave={() => {
                onHoverPlace?.(null);
              }}
              style={{
                transform: `translate(${offsetX}px, ${offsetY}px)`,
              }}
              className={`absolute cursor-pointer group transition-all duration-300 ${
                isHovered ? "z-40" : isSelected ? "z-30" : "z-20"
              }`}
            >
              {/* Pulse effect on hovered fallback marker */}
              {isHovered && (
                <span className="absolute -inset-2.5 rounded-full animate-ping bg-[#E97520]/75 pointer-events-none" />
              )}
              <div
                className={`p-2 rounded-full shadow-md border-2 border-white flex items-center justify-center transition-transform ${getBg()}`}
              >
                {getIcon()}
              </div>

              {/* Hover / Selected Label */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 whitespace-nowrap bg-[#242423] text-white text-[10px] font-bold px-2 py-1 rounded shadow-md border border-white/20 transition-opacity pointer-events-none ${
                  isHovered || isSelected ? "opacity-100 z-50" : "opacity-0 group-hover:opacity-100"
                }`}
              >
                {place.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Map Bottom Attribution / Information Footer */}
      <div className="p-3 bg-white/95 backdrop-blur-xs border-t border-[#E6E1D8] flex items-center justify-between text-[11px] text-[#77736D] z-10">
        <span>Click markers to sync with list view</span>
        <span className="font-semibold text-[#30302F]">
          {activePlace ? `Selected: ${activePlace.name}` : "Interactive Map Preview"}
        </span>
      </div>
    </div>
  );
};
