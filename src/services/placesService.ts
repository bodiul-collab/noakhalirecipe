import { PlaceResult, SearchCategory, SearchLocation, PlacesSearchResult } from "../types";
import { calculateDistance } from "../utils/distance";

// In-memory cache with TTL (30 minutes) to eliminate duplicate API requests and minimize costs
interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes
const memoryCache = new Map<string, CacheEntry<any>>();

function getFromCache<T>(key: string): T | null {
  const entry = memoryCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    memoryCache.delete(key);
    return null;
  }
  return entry.data as T;
}

function setInCache<T>(key: string, data: T, ttlMs: number = CACHE_TTL_MS): void {
  // Cap cache size at 500 entries to prevent memory leaks
  if (memoryCache.size > 500) {
    const firstKey = memoryCache.keys().next().value;
    if (firstKey) memoryCache.delete(firstKey);
  }
  memoryCache.set(key, {
    data,
    expiresAt: Date.now() + ttlMs,
  });
}

export function clearPlacesCache(): void {
  memoryCache.clear();
}

// Structured predefined popular locations with full geographic context
export interface PopularLocationItem {
  label: string;
  query: string;
  location: SearchLocation;
}

export const POPULAR_LOCATIONS: PopularLocationItem[] = [
  {
    label: "Houston (77057)",
    query: "Houston, TX 77057",
    location: {
      formattedAddress: "Houston, TX 77057, USA",
      lat: 29.7454,
      lng: -95.4913,
      city: "Houston",
      state: "Texas",
      country: "United States",
      postalCode: "77057",
    },
  },
  {
    label: "Katy (77449)",
    query: "Katy, TX 77449",
    location: {
      formattedAddress: "Katy, TX 77449, USA",
      lat: 29.8398,
      lng: -95.7335,
      city: "Katy",
      state: "Texas",
      country: "United States",
      postalCode: "77449",
    },
  },
  {
    label: "Toronto (M5V 3A8)",
    query: "Toronto, M5V 3A8",
    location: {
      formattedAddress: "Toronto, ON M5V 3A8, Canada",
      lat: 43.6441,
      lng: -79.3948,
      city: "Toronto",
      state: "Ontario",
      country: "Canada",
      postalCode: "M5V 3A8",
    },
  },
  {
    label: "London (SW1A 1AA)",
    query: "London, SW1A 1AA",
    location: {
      formattedAddress: "Westminster, London SW1A 1AA, United Kingdom",
      lat: 51.5014,
      lng: -0.1419,
      city: "London",
      state: "England",
      country: "United Kingdom",
      postalCode: "SW1A 1AA",
    },
  },
  {
    label: "Dhaka (1205)",
    query: "Dhaka 1205",
    location: {
      formattedAddress: "Dhanmondi, Dhaka 1205, Bangladesh",
      lat: 23.7461,
      lng: 90.3742,
      city: "Dhaka",
      state: "Dhaka Division",
      country: "Bangladesh",
      postalCode: "1205",
    },
  },
  {
    label: "New Delhi (110001)",
    query: "New Delhi 110001",
    location: {
      formattedAddress: "Connaught Place, New Delhi 110001, India",
      lat: 28.6328,
      lng: 77.2197,
      city: "New Delhi",
      state: "Delhi",
      country: "India",
      postalCode: "110001",
    },
  },
  {
    label: "Dubai (UAE)",
    query: "Dubai, UAE",
    location: {
      formattedAddress: "Dubai, United Arab Emirates",
      lat: 25.2048,
      lng: 55.2708,
      city: "Dubai",
      state: "Dubai",
      country: "United Arab Emirates",
    },
  },
  {
    label: "Sydney (2000)",
    query: "Sydney 2000",
    location: {
      formattedAddress: "Sydney NSW 2000, Australia",
      lat: -33.8688,
      lng: 151.2093,
      city: "Sydney",
      state: "New South Wales",
      country: "Australia",
      postalCode: "2000",
    },
  },
];

// Built-in international geocode fallbacks for common hubs
const FALLBACK_GEOLOCATIONS: Record<string, SearchLocation> = {
  "sydney 2000": {
    formattedAddress: "Sydney NSW 2000, Australia",
    lat: -33.8688,
    lng: 151.2093,
    city: "Sydney",
    state: "New South Wales",
    country: "Australia",
    postalCode: "2000",
  },
  "sydney nsw 2000": {
    formattedAddress: "Sydney NSW 2000, Australia",
    lat: -33.8688,
    lng: 151.2093,
    city: "Sydney",
    state: "New South Wales",
    country: "Australia",
    postalCode: "2000",
  },
  "houston 77057": {
    formattedAddress: "Houston, TX 77057, USA",
    lat: 29.7454,
    lng: -95.4913,
    city: "Houston",
    state: "Texas",
    country: "United States",
    postalCode: "77057",
  },
  "houston 77002": {
    formattedAddress: "Houston, TX 77002, USA",
    lat: 29.7589,
    lng: -95.3677,
    city: "Houston",
    state: "Texas",
    country: "United States",
    postalCode: "77002",
  },
  "77002": {
    formattedAddress: "Houston, TX 77002, USA",
    lat: 29.7589,
    lng: -95.3677,
    city: "Houston",
    state: "Texas",
    country: "United States",
    postalCode: "77002",
  },
  "katy 77449": {
    formattedAddress: "Katy, TX 77449, USA",
    lat: 29.8398,
    lng: -95.7335,
    city: "Katy",
    state: "Texas",
    country: "United States",
    postalCode: "77449",
  },
  "toronto m5v 3a8": {
    formattedAddress: "Toronto, ON M5V 3A8, Canada",
    lat: 43.6441,
    lng: -79.3948,
    city: "Toronto",
    state: "Ontario",
    country: "Canada",
    postalCode: "M5V 3A8",
  },
  "london sw1a 1aa": {
    formattedAddress: "Westminster, London SW1A 1AA, UK",
    lat: 51.5014,
    lng: -0.1419,
    city: "London",
    state: "England",
    country: "United Kingdom",
    postalCode: "SW1A 1AA",
  },
  "dhaka 1205": {
    formattedAddress: "Dhanmondi, Dhaka 1205, Bangladesh",
    lat: 23.7461,
    lng: 90.3742,
    city: "Dhaka",
    state: "Dhaka Division",
    country: "Bangladesh",
    postalCode: "1205",
  },
  "new delhi 110001": {
    formattedAddress: "Connaught Place, New Delhi 110001, India",
    lat: 28.6328,
    lng: 77.2197,
    city: "New Delhi",
    state: "Delhi",
    country: "India",
    postalCode: "110001",
  },
  "77057": {
    formattedAddress: "Houston, TX 77057, USA",
    lat: 29.7454,
    lng: -95.4913,
    city: "Houston",
    state: "Texas",
    country: "United States",
    postalCode: "77057",
  },
  "77449": {
    formattedAddress: "Katy, TX 77449, USA",
    lat: 29.8322,
    lng: -95.7335,
    city: "Katy",
    state: "Texas",
    country: "United States",
    postalCode: "77449",
  },
  "houston": {
    formattedAddress: "Houston, TX, USA",
    lat: 29.7604,
    lng: -95.3698,
    city: "Houston",
    state: "Texas",
    country: "United States",
  },
  "m5v 3a8": {
    formattedAddress: "Toronto, ON M5V 3A8, Canada",
    lat: 43.6441,
    lng: -79.3948,
    city: "Toronto",
    state: "Ontario",
    country: "Canada",
    postalCode: "M5V 3A8",
  },
  "toronto": {
    formattedAddress: "Toronto, ON, Canada",
    lat: 43.6532,
    lng: -79.3832,
    city: "Toronto",
    state: "Ontario",
    country: "Canada",
  },
  "sw1a 1aa": {
    formattedAddress: "Westminster, London SW1A 1AA, UK",
    lat: 51.5014,
    lng: -0.1419,
    city: "London",
    state: "England",
    country: "United Kingdom",
    postalCode: "SW1A 1AA",
  },
  "london": {
    formattedAddress: "London, UK",
    lat: 51.5074,
    lng: -0.1278,
    city: "London",
    state: "England",
    country: "United Kingdom",
  },
  "4000": {
    formattedAddress: "Chittagong 4000, Bangladesh",
    lat: 22.3569,
    lng: 91.7832,
    city: "Chittagong",
    state: "Chittagong Division",
    country: "Bangladesh",
    postalCode: "4000",
  },
  "chittagong": {
    formattedAddress: "Chittagong, Bangladesh",
    lat: 22.3569,
    lng: 91.7832,
    city: "Chittagong",
    state: "Chittagong Division",
    country: "Bangladesh",
  },
  "dhaka": {
    formattedAddress: "Dhaka, Bangladesh",
    lat: 23.8103,
    lng: 90.4125,
    city: "Dhaka",
    state: "Dhaka Division",
    country: "Bangladesh",
  },
  "1205": {
    formattedAddress: "Dhanmondi, Dhaka 1205, Bangladesh",
    lat: 23.7461,
    lng: 90.3742,
    city: "Dhaka",
    state: "Dhaka Division",
    country: "Bangladesh",
    postalCode: "1205",
  },
  "110001": {
    formattedAddress: "Connaught Place, New Delhi 110001, India",
    lat: 28.6328,
    lng: 77.2197,
    city: "New Delhi",
    state: "Delhi",
    country: "India",
    postalCode: "110001",
  },
  "delhi": {
    formattedAddress: "New Delhi, Delhi, India",
    lat: 28.6139,
    lng: 77.209,
    city: "New Delhi",
    state: "Delhi",
    country: "India",
  },
  "dubai": {
    formattedAddress: "Dubai, United Arab Emirates",
    lat: 25.2048,
    lng: 55.2708,
    city: "Dubai",
    state: "Dubai",
    country: "United Arab Emirates",
  },
  "sydney": {
    formattedAddress: "Sydney NSW, Australia",
    lat: -33.8688,
    lng: 151.2093,
    city: "Sydney",
    state: "New South Wales",
    country: "Australia",
  },
  "2000": {
    formattedAddress: "Sydney NSW 2000, Australia",
    lat: -33.8688,
    lng: 151.2093,
    city: "Sydney",
    state: "New South Wales",
    country: "Australia",
    postalCode: "2000",
  },
  "new york": {
    formattedAddress: "New York, NY, USA",
    lat: 40.7128,
    lng: -74.006,
    city: "New York",
    state: "New York",
    country: "United States",
  },
  "11372": {
    formattedAddress: "Jackson Heights, NY 11372, USA",
    lat: 40.7517,
    lng: -73.8831,
    city: "Queens",
    state: "New York",
    country: "United States",
    postalCode: "11372",
  },
  "07302": {
    formattedAddress: "Jersey City, NJ 07302, USA",
    lat: 40.7282,
    lng: -74.0776,
    city: "Jersey City",
    state: "New Jersey",
    country: "United States",
    postalCode: "07302",
  },
  "22046": {
    formattedAddress: "Falls Church, VA 22046, USA",
    lat: 38.8823,
    lng: -77.1711,
    city: "Falls Church",
    state: "Virginia",
    country: "United States",
    postalCode: "22046",
  },
};

/**
 * Resolve any postal code, city, neighborhood, or international address
 * to geographic coordinates using the Google Geocoding API with fallback.
 */
export async function resolveLocation(
  query: string,
  apiKey?: string
): Promise<{
  status: "OK" | "ZERO_RESULTS" | "AMBIGUOUS" | "ERROR";
  results: SearchLocation[];
  errorMessage?: string;
  source: "google_api" | "fallback";
}> {
  const trimmed = query.trim();
  if (!trimmed) {
    return {
      status: "ZERO_RESULTS",
      results: [],
      errorMessage: "Please enter a city, postal code, or location.",
      source: "fallback",
    };
  }

  // Check cache first (30-minute TTL)
  const cacheKey = `geocode:${trimmed.toLowerCase()}`;
  const cached = getFromCache<SearchLocation[]>(cacheKey);
  if (cached) {
    return {
      status: cached.length > 0 ? (cached.length > 1 ? "AMBIGUOUS" : "OK") : "ZERO_RESULTS",
      results: cached,
      source: "google_api",
    };
  }

  // Check if string is already raw coordinates (e.g. "29.7454, -95.4913")
  const coordMatch = trimmed.match(/^([-+]?\d{1,3}(?:\.\d+)?)[,\s]+([-+]?\d{1,3}(?:\.\d+)?)$/);
  if (coordMatch) {
    const lat = parseFloat(coordMatch[1]);
    const lng = parseFloat(coordMatch[2]);
    if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
      const coordLoc: SearchLocation = {
        formattedAddress: `Coordinates (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
        lat,
        lng,
      };
      setInCache(cacheKey, [coordLoc]);
      return {
        status: "OK",
        results: [coordLoc],
        source: "fallback",
      };
    }
  }

  // Check structured predefined locations and known city/postal dictionaries first
  const normalizedKey = trimmed.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ");
  for (const item of POPULAR_LOCATIONS) {
    const normLabel = item.label.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ");
    const normQuery = item.query.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ");
    if (
      normalizedKey === normLabel ||
      normalizedKey === normQuery ||
      (item.location.city && item.location.postalCode && normalizedKey === `${item.location.city.toLowerCase()} ${item.location.postalCode.toLowerCase()}`) ||
      (normalizedKey === item.location.postalCode?.toLowerCase())
    ) {
      setInCache(cacheKey, [item.location]);
      return {
        status: "OK",
        results: [item.location],
        source: "fallback",
      };
    }
  }

  if (FALLBACK_GEOLOCATIONS[normalizedKey]) {
    const loc = FALLBACK_GEOLOCATIONS[normalizedKey];
    setInCache(cacheKey, [loc]);
    return {
      status: "OK",
      results: [loc],
      source: "fallback",
    };
  }

  // 1. Primary: Google Geocoding API
  if (apiKey) {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        trimmed
      )}&key=${apiKey}&solution_id=gmp_mcp_codeassist_v1_aistudio`;

      const response = await fetch(url);
      if (response.ok) {
        const data = (await response.json()) as any;
        if (data.status === "OK" && Array.isArray(data.results) && data.results.length > 0) {
          const mapped: SearchLocation[] = data.results.map((r: any) => {
            const getComp = (type: string) => {
              const comp = r.address_components?.find((c: any) => c.types?.includes(type));
              return comp ? comp.long_name : undefined;
            };

            return {
              formattedAddress: r.formatted_address,
              lat: r.geometry.location.lat,
              lng: r.geometry.location.lng,
              placeId: r.place_id,
              city:
                getComp("locality") ||
                getComp("postal_town") ||
                getComp("sublocality") ||
                getComp("administrative_area_level_2"),
              state: getComp("administrative_area_level_1"),
              country: getComp("country"),
              postalCode: getComp("postal_code"),
            };
          });

          setInCache(cacheKey, mapped);
          return {
            status: mapped.length > 1 ? "AMBIGUOUS" : "OK",
            results: mapped,
            source: "google_api",
          };
        }
      }
    } catch (err: any) {
      console.warn("Google Geocoding API request error, proceeding to live resolver fallback:", err?.message);
    }
  }

  // 2. Secondary Live Resolver: Google Places API (New) Text Search
  // If Geocoding API has quota restrictions or returns REQUEST_DENIED, Places API (New) resolves global cities, postal codes & landmarks
  if (apiKey) {
    const candidateQueries = [trimmed];
    if (/^\d{3,6}$/.test(trimmed)) {
      candidateQueries.push(`${trimmed} postal code`);
    }

    for (const q of candidateQueries) {
      try {
        const placesRes = await fetch("https://places.googleapis.com/v1/places:searchText", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
            "X-Goog-Maps-Solution-ID": "gmp_mcp_codeassist_v1_aistudio",
            "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.location,places.addressComponents",
          },
          body: JSON.stringify({ textQuery: q, pageSize: 5 }),
        });

        if (placesRes.ok) {
          const placesData = (await placesRes.json()) as any;
          const rawPlaces: any[] = placesData.places || [];
          if (rawPlaces.length > 0) {
            const mapped: SearchLocation[] = rawPlaces
              .filter((p) => p.location?.latitude && p.location?.longitude)
              .map((p) => {
                const getComp = (type: string) => {
                  const comp = p.addressComponents?.find((c: any) => c.types?.includes(type));
                  return comp ? comp.longText || comp.shortText : undefined;
                };

                return {
                  formattedAddress: p.formattedAddress || p.displayName?.text || trimmed,
                  lat: p.location.latitude,
                  lng: p.location.longitude,
                  placeId: p.id,
                  city:
                    getComp("locality") ||
                    getComp("postal_town") ||
                    getComp("sublocality") ||
                    p.displayName?.text,
                  state: getComp("administrative_area_level_1"),
                  country: getComp("country"),
                  postalCode: getComp("postal_code"),
                };
              });

            if (mapped.length > 0) {
              setInCache(cacheKey, mapped);
              return {
                status: mapped.length > 1 ? "AMBIGUOUS" : "OK",
                results: mapped,
                source: "google_api",
              };
            }
          }
        }
      } catch (err: any) {
        console.warn("Places API text location resolution failed:", err?.message);
      }
    }
  }

  // 3. Tertiary Global Resolver: OpenStreetMap Geocoding (Worldwide coverage for postal codes, districts & cities)
  try {
    const osmUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      trimmed
    )}&format=json&addressdetails=1&limit=5`;
    const osmRes = await fetch(osmUrl, {
      headers: {
        "User-Agent": "NoakhaliKitchenGlobalDirectory/1.0",
      },
    });

    if (osmRes.ok) {
      const osmData = (await osmRes.json()) as any[];
      if (Array.isArray(osmData) && osmData.length > 0) {
        // Country context safeguard:
        // Do NOT allow a foreign business/establishment (e.g. Italian venue) to override a clearly identified city/postal-code
        const validOsm = osmData.filter((item) => {
          const addr = item.address || {};
          const country = (addr.country || "").toLowerCase();
          const qLower = trimmed.toLowerCase();
          if (qLower.includes("sydney") && country !== "australia") {
            return false;
          }
          if (qLower.includes("toronto") && country !== "canada") {
            return false;
          }
          if (qLower.includes("dhaka") && country !== "bangladesh") {
            return false;
          }
          if (qLower.includes("london") && !country.includes("united kingdom") && country !== "uk" && country !== "canada") {
            return false;
          }
          return true;
        });

        if (validOsm.length > 0) {
          const mapped: SearchLocation[] = validOsm.map((item) => {
            const addr = item.address || {};
            return {
              formattedAddress: item.display_name,
              lat: parseFloat(item.lat),
              lng: parseFloat(item.lon),
              placeId: item.place_id ? `osm-${item.place_id}` : undefined,
              city: addr.city || addr.town || addr.village || addr.suburb || addr.municipality || item.name,
              state: addr.state || addr.province || addr.region,
              country: addr.country,
              postalCode: addr.postcode,
            };
          });

          setInCache(cacheKey, mapped);
          return {
            status: mapped.length > 1 ? "AMBIGUOUS" : "OK",
            results: mapped,
            source: "fallback",
          };
        }
      }
    }
  } catch (err: any) {
    console.warn("Global OpenStreetMap geocoding fallback failed:", err?.message);
  }

  // 4. Secondary Backup Dictionary (Known popular locations only as a fallback, NEVER overriding valid global searches)
  const fallbackNormKey = trimmed.toLowerCase().replace(/[^a-z0-9\s]/g, "");
  for (const [key, location] of Object.entries(FALLBACK_GEOLOCATIONS)) {
    if (
      fallbackNormKey === key ||
      fallbackNormKey.includes(key) ||
      trimmed.toLowerCase() === (location.city?.toLowerCase() || "")
    ) {
      setInCache(cacheKey, [location]);
      return {
        status: "OK",
        results: [location],
        source: "fallback",
      };
    }
  }

  // 5. If unresolvable, return exact error message without silently switching to any default location
  return {
    status: "ZERO_RESULTS",
    results: [],
    errorMessage: "We couldn't find that location. Try a city, ZIP/postal code, neighborhood, or full address.",
    source: "fallback",
  };
}

// ============================================================================
// STRICT CATEGORY CLASSIFICATION & HALAL RELEVANCE LAYER
// ============================================================================

export interface RawPlaceInput {
  name: string;
  types?: string[];
  primaryType?: string;
  formattedAddress?: string;
  editorialSummary?: string;
  osmClass?: string;
  osmType?: string;
  osmTags?: Record<string, string>;
}

export interface PlaceClassification {
  eligible: boolean;
  category: SearchCategory | null;
  categoryLabel: string;
  halalConfidence: "high" | "medium" | "low" | "none";
  halalNotice: string;
  halalEvidence: string;
  rejectionReason?: string;
}

// Known non-halal casual dining & bar chains
const NON_HALAL_CHAINS = [
  "chili's",
  "applebee's",
  "outback steakhouse",
  "texas roadhouse",
  "olive garden",
  "red lobster",
  "buffalo wild wings",
  "tgi fridays",
  "hooters",
  "twin peaks",
  "bj's restaurant",
  "cracker barrel",
  "golden corral",
  "bob evans",
  "waffle house",
];

// Generic supermarket & retail chains that are NOT automatically Halal Groceries
const GENERIC_SUPERMARKET_CHAINS = [
  "walmart",
  "kroger",
  "target",
  "safeway",
  "whole foods",
  "heb",
  "h-e-b",
  "h.e.b",
  "central market",
  "aldi",
  "costco",
  "sam's club",
  "sams club",
  "publix",
  "sprouts",
  "albertsons",
  "trader joe's",
  "trader joes",
  "food lion",
  "giant",
  "giant eagle",
  "meijer",
  "shoprite",
  "winco",
  "winn-dixie",
  "food 4 less",
  "ralphs",
  "vons",
  "smart & final",
  "wegmans",
  "stop & shop",
  "harris teeter",
  "smith's",
  "fred meyer",
  "piggly wiggly",
  "lidl",
  "dollar tree",
  "family dollar",
  "dollar general",
];

// Strictly non-Islamic religious terms for mosque filtering
const NON_ISLAMIC_RELIGIOUS_TERMS = [
  "church",
  "cathedral",
  "synagogue",
  "temple",
  "gurdwara",
  "chapel",
  "parish",
  "baptist",
  "methodist",
  "presbyterian",
  "lutheran",
  "catholic",
  "episcopal",
  "adventist",
  "pentecostal",
  "buddhist",
  "hindu",
  "scientology",
  "kingdom hall",
  "mormon",
  "latter-day",
  "seventh-day",
  "jehovah",
];

/**
 * Single centralized classification pipeline.
 * Classifies raw place records against the requested category, strictly verifying
 * both business type eligibility and credible halal relevance.
 */
export function classifyPlace(
  raw: RawPlaceInput,
  requestedCategory: SearchCategory
): PlaceClassification {
  const name = (raw.name || "").trim();
  const nameLower = name.toLowerCase();
  const summaryLower = (raw.editorialSummary || "").toLowerCase();
  const combinedText = `${nameLower} ${summaryLower}`;

  const rawTypes = (raw.types || []).map((t) => t.toLowerCase().trim());
  if (raw.primaryType) rawTypes.push(raw.primaryType.toLowerCase().trim());
  if (raw.osmClass) rawTypes.push(raw.osmClass.toLowerCase().trim());
  if (raw.osmType) rawTypes.push(raw.osmType.toLowerCase().trim());
  const types = Array.from(new Set(rawTypes));

  // Determine explicit halal identity in place data (NOT from the search query)
  const hasExplicitHalal =
    /\b(halal|zabiha|zabihah|bismillah|dhabihah)\b/i.test(combinedText) ||
    raw.osmTags?.cuisine === "halal" ||
    raw.osmTags?.["diet:halal"] === "yes" ||
    raw.osmTags?.halal === "yes";

  // ==========================================
  // CATEGORY A & B: RESTAURANT CLASSIFICATION
  // ==========================================
  if (requestedCategory === "restaurants") {
    // 1. Conflict Check: Alcohol venues, pork specialties, non-halal chains
    const alcoholTypes = [
      "bar",
      "pub",
      "night_club",
      "liquor_store",
      "wine_bar",
      "brewery",
      "distillery",
      "beer_garden",
    ];
    if (types.some((t) => alcoholTypes.includes(t)) && !hasExplicitHalal) {
      return {
        eligible: false,
        category: null,
        categoryLabel: "Bar / Nightlife",
        halalConfidence: "none",
        halalNotice: "",
        halalEvidence: "none",
        rejectionReason: "Alcohol/nightlife venue (bar/pub/brewery/club), not a halal dining establishment",
      };
    }

    if (
      NON_HALAL_CHAINS.some(
        (chain) =>
          nameLower === chain || nameLower.startsWith(chain + " ") || nameLower.includes(chain)
      )
    ) {
      return {
        eligible: false,
        category: null,
        categoryLabel: "Non-Halal Chain",
        halalConfidence: "none",
        halalNotice: "",
        halalEvidence: "none",
        rejectionReason: "Known non-halal casual dining/fast-food chain",
      };
    }

    const alcoholKeywords = [
      "bar & grill",
      "pub & grill",
      "brewery",
      "brewpub",
      "tavern",
      "taproom",
      "saloon",
      "winery",
      "distillery",
      "wine bar",
      "sports bar",
    ];
    if (alcoholKeywords.some((w) => nameLower.includes(w)) && !hasExplicitHalal) {
      return {
        eligible: false,
        category: null,
        categoryLabel: "Bar / Pub",
        halalConfidence: "none",
        halalNotice: "",
        halalEvidence: "none",
        rejectionReason: "Bar/pub/alcohol-focused name keywords detected",
      };
    }

    const porkKeywords = [
      "pork",
      "pork ribs",
      "pork belly",
      "bacon",
      "pork chop",
      "ham ",
      "charcuterie",
      "carnitas",
      "chicharron",
    ];
    if (porkKeywords.some((w) => nameLower.includes(w)) && !hasExplicitHalal) {
      return {
        eligible: false,
        category: null,
        categoryLabel: "Non-Halal Meat",
        halalConfidence: "none",
        halalNotice: "",
        halalEvidence: "none",
        rejectionReason: "Pork/non-halal meat specialty detected in name",
      };
    }

    if (
      (nameLower.includes("smokehouse") || nameLower.includes("bbq") || nameLower.includes("barbecue")) &&
      !hasExplicitHalal
    ) {
      return {
        eligible: false,
        category: null,
        categoryLabel: "Smokehouse / BBQ",
        halalConfidence: "none",
        halalNotice: "",
        halalEvidence: "none",
        rejectionReason:
          "Smokehouse / BBQ establishment without verified halal identification (pork cross-contamination risk)",
      };
    }

    // 2. Strict Grocery / Retail / Supermarket / Butcher rejection
    // NEVER convert a grocery store, butcher, supermarket, or market into a restaurant
    const groceryTypes = [
      "grocery_store",
      "supermarket",
      "convenience_store",
      "liquor_store",
      "butcher_shop",
      "warehouse",
      "shopping_mall",
      "department_store",
      "clothing_store",
      "gas_station",
      "pharmacy",
    ];
    if (types.some((t) => groceryTypes.includes(t))) {
      return {
        eligible: false,
        category: "groceries",
        categoryLabel: "Grocery / Retail",
        halalConfidence: hasExplicitHalal ? "high" : "none",
        halalNotice: "",
        halalEvidence: hasExplicitHalal ? "halal in name" : "none",
        rejectionReason: "Grocery/supermarket/butcher/retail place type, not a dining restaurant",
      };
    }

    const groceryNameRegex =
      /\b(grocery|groceries|supermarket|meat market|butcher|halal market|bazaar|food mart|mini mart|convenience store|convenience|wholesaler|cash & carry|produce market|spices|halal foods|halal meat|zabiha meat|depot|provisions)\b/i;
    if (groceryNameRegex.test(nameLower)) {
      return {
        eligible: false,
        category: "groceries",
        categoryLabel: "Grocery / Market",
        halalConfidence: hasExplicitHalal ? "high" : "none",
        halalNotice: "",
        halalEvidence: hasExplicitHalal ? "halal in name" : "none",
        rejectionReason: "Name indicates grocery/retail/market/butcher business, not a dining restaurant",
      };
    }

    // 3. Genuine Food/Dining type verification
    const diningTypes = [
      "restaurant",
      "meal_takeaway",
      "meal_delivery",
      "cafe",
      "fast_food_restaurant",
      "diner",
      "food_court",
      "food",
    ];
    const isDining =
      types.some((t) => diningTypes.includes(t)) ||
      raw.osmType === "restaurant" ||
      raw.osmType === "fast_food" ||
      raw.osmType === "cafe" ||
      raw.osmType === "food_court";

    if (!isDining) {
      return {
        eligible: false,
        category: null,
        categoryLabel: "Non-Dining",
        halalConfidence: "none",
        halalNotice: "",
        halalEvidence: "none",
        rejectionReason: "Establishment types do not indicate a food or dining establishment",
      };
    }

    // 4. Halal Relevance & Labeling
    if (hasExplicitHalal) {
      return {
        eligible: true,
        category: "restaurants",
        categoryLabel: "Halal Restaurant",
        halalConfidence: "high",
        halalEvidence: "explicit_halal_name_or_metadata",
        halalNotice:
          "Halal restaurant with explicit halal identification. Verify individual certification & meat sourcing directly with establishment.",
      };
    }

    // Check credible halal-friendly cuisines
    const credibleCuisineRegex =
      /\b(shawarma|kabab|kebab|biryani|mandi|karahi|falafel|doner|pide|tandoori|nihari|haleem|tikka|afghan|yemeni|somali|moroccan|lebanese|uyghur|persian|iranian|turkish|pakistani|bengali|bangladeshi|middle eastern|mediterranean|malaysian|indonesian|uzbek)\b/i;
    const isCredibleCuisine =
      credibleCuisineRegex.test(combinedText) ||
      types.some((t) =>
        [
          "middle_eastern_restaurant",
          "pakistani_restaurant",
          "turkish_restaurant",
          "lebanese_restaurant",
          "afghan_restaurant",
          "indonesian_restaurant",
          "malaysian_restaurant",
        ].includes(t)
      );

    if (isCredibleCuisine) {
      return {
        eligible: true,
        category: "restaurants",
        categoryLabel: "Halal-friendly / Verify",
        halalConfidence: "medium",
        halalEvidence: "credible_halal_cuisine",
        halalNotice:
          "Halal-friendly dining options reported. Verify halal certification, meat sourcing, and preparation practices directly with establishment.",
      };
    }

    // If completely generic restaurant with no halal signal:
    return {
      eligible: false,
      category: null,
      categoryLabel: "Standard Restaurant",
      halalConfidence: "none",
      halalNotice: "",
      halalEvidence: "none",
      rejectionReason: "Generic dining establishment without credible halal signals or Islamic culinary context",
    };
  }

  // ==========================================
  // CATEGORY C & D: GROCERY CLASSIFICATION
  // ==========================================
  if (requestedCategory === "groceries") {
    // 1. Strict Rejection of Non-Grocery Types:
    // Reject restaurants, cafes, bars, hotels, mosques, gas stations, pharmacies, retail
    const nonGroceryTypes = [
      "bar",
      "pub",
      "night_club",
      "hotel",
      "lodging",
      "gas_station",
      "pharmacy",
      "clothing_store",
      "hardware_store",
      "car_dealer",
      "cemetery",
      "place_of_worship",
    ];
    if (types.some((t) => nonGroceryTypes.includes(t))) {
      return {
        eligible: false,
        category: null,
        categoryLabel: "Non-Grocery Retail",
        halalConfidence: "none",
        halalNotice: "",
        halalEvidence: "none",
        rejectionReason: "Non-grocery/service establishment type (bar/hotel/gas station/pharmacy)",
      };
    }

    // Check if it's primarily a restaurant/cafe rather than grocery
    const restaurantTypes = ["restaurant", "cafe", "fast_food_restaurant"];
    const hasRestaurantType = types.some((t) => restaurantTypes.includes(t));
    const restaurantNameWords =
      /\b(restaurant|cafe|café|kitchen|bistro|grill|diner|lounge|shack|steakhouse|pizzeria|taqueria|eatery|smokehouse|cantina|dhaba)\b/i;
    const groceryNameWords =
      /\b(grocery|groceries|supermarket|meat market|butcher|halal market|bazaar|food mart|mini mart|halal foods|halal meat|zabiha meat|spices & foods)\b/i;

    if (hasRestaurantType && restaurantNameWords.test(nameLower) && !groceryNameWords.test(nameLower)) {
      return {
        eligible: false,
        category: "restaurants",
        categoryLabel: "Restaurant",
        halalConfidence: hasExplicitHalal ? "high" : "none",
        halalNotice: "",
        halalEvidence: hasExplicitHalal ? "halal in name" : "none",
        rejectionReason: "Establishment is a restaurant/dining venue, not a grocery or food market",
      };
    }

    // Must have grocery/food-retail identity
    const groceryRetailTypes = [
      "grocery_store",
      "supermarket",
      "butcher_shop",
      "food_store",
      "market",
      "store",
    ];
    const isGroceryType =
      types.some((t) => groceryRetailTypes.includes(t)) ||
      raw.osmType === "supermarket" ||
      raw.osmType === "butcher" ||
      raw.osmType === "convenience" ||
      raw.osmType === "greengrocer";

    if (!isGroceryType && !groceryNameWords.test(nameLower)) {
      return {
        eligible: false,
        category: null,
        categoryLabel: "Non-Grocery",
        halalConfidence: "none",
        halalNotice: "",
        halalEvidence: "none",
        rejectionReason: "Establishment is not a grocery, supermarket, butcher, or food market",
      };
    }

    // 2. Strict Supermarket Chain Check (Section D):
    // Do NOT label Walmart, Kroger, Target, Safeway, Whole Foods, HEB, Aldi, Costco, etc. as "Halal Grocery"
    const isGenericSupermarket = GENERIC_SUPERMARKET_CHAINS.some(
      (chain) =>
        nameLower === chain ||
        nameLower.startsWith(chain + " ") ||
        nameLower.includes(chain + " supercenter") ||
        nameLower.includes(chain + " neighborhood") ||
        nameLower.includes(chain + " market") ||
        nameLower.includes(chain + " wholesale")
    );

    if (isGenericSupermarket) {
      if (!hasExplicitHalal) {
        return {
          eligible: false,
          category: null,
          categoryLabel: "Generic Supermarket",
          halalConfidence: "none",
          halalNotice: "",
          halalEvidence: "none",
          rejectionReason: "Generic supermarket chain without verified halal-focused operation",
        };
      }
    }

    // 3. Halal Grocery Relevance Check:
    // Specialty businesses whose identity clearly indicates Halal Grocery / Market / Butcher
    const specialtyHalalKeywords =
      /\b(al-barakah|al-madina|al-noor|al-haramain|al-quds|zamzam|makkah|medina|noor|sufi|khyber|crescent|jerusalem|bosphorus|istanbul|middle eastern market|south asian market|desi market|pakistan market|halal butcher|zabiha butcher|halal meat|halal foods|halal grocers)\b/i;
    const isSpecialtyHalal = specialtyHalalKeywords.test(nameLower);

    if (!hasExplicitHalal && !isSpecialtyHalal) {
      return {
        eligible: false,
        category: null,
        categoryLabel: "Standard Grocery",
        halalConfidence: "none",
        halalNotice: "",
        halalEvidence: "none",
        rejectionReason: "Generic food store/market without credible halal grocery signals",
      };
    }

    return {
      eligible: true,
      category: "groceries",
      categoryLabel: "Halal Grocery",
      halalConfidence: hasExplicitHalal ? "high" : "medium",
      halalEvidence: hasExplicitHalal
        ? "explicit_halal_name_or_metadata"
        : "specialty_halal_grocery_identity",
      halalNotice:
        "Halal grocery & food market. Verify individual certification and meat sourcing directly with establishment.",
    };
  }

  // ==========================================
  // CATEGORY G: MOSQUE CLASSIFICATION
  // ==========================================
  if (requestedCategory === "mosques") {
    // 1. Non-Islamic religious rejection
    if (NON_ISLAMIC_RELIGIOUS_TERMS.some((term) => nameLower.includes(term))) {
      return {
        eligible: false,
        category: null,
        categoryLabel: "Non-Islamic Worship",
        halalConfidence: "none",
        halalNotice: "",
        halalEvidence: "none",
        rejectionReason: "Non-Islamic place of worship",
      };
    }

    // 2. Commercial business rejection
    const commercialTypes = ["restaurant", "grocery_store", "supermarket", "store", "bar", "hotel"];
    const mosqueWords =
      /\b(mosque|masjid|islamic center|islamic centre|islamic society|muslim association|jamaat|musalla|markaz)\b/i;
    if (types.some((t) => commercialTypes.includes(t)) && !mosqueWords.test(nameLower)) {
      return {
        eligible: false,
        category: null,
        categoryLabel: "Commercial Business",
        halalConfidence: "none",
        halalNotice: "",
        halalEvidence: "none",
        rejectionReason: "Commercial business, not a mosque or Islamic center",
      };
    }

    // 3. Islamic Place of Worship / Community Center Check
    const islamicIdentification =
      mosqueWords.test(combinedText) ||
      /\b(baitul|baytul|darul|dar-ul|al-noor|al-huda|al-falah|al-iman|al-farooq|al-madina|al-muntada|al-taqwa|al-hikmah|al-furqan|hidayah|darussalam|baitus|baitur)\b/i.test(
        combinedText
      ) ||
      raw.osmTags?.religion === "muslim";

    if (!islamicIdentification) {
      return {
        eligible: false,
        category: null,
        categoryLabel: "Unverified Venue",
        halalConfidence: "none",
        halalNotice: "",
        halalEvidence: "none",
        rejectionReason: "Not an Islamic place of worship or Islamic community center",
      };
    }

    return {
      eligible: true,
      category: "mosques",
      categoryLabel: "Mosque / Islamic Center",
      halalConfidence: "high",
      halalEvidence: "verified_islamic_worship_center",
      halalNotice:
        "Mosque / Islamic Center. Please confirm prayer times and Jummah services directly with the mosque.",
    };
  }

  return {
    eligible: false,
    category: null,
    categoryLabel: "Unknown",
    halalConfidence: "none",
    halalNotice: "",
    halalEvidence: "none",
    rejectionReason: "Unrecognized category requested",
  };
}

// Forensic debug logger for development / testing mode
function logClassificationDecision(
  name: string,
  requestedCategory: SearchCategory,
  types: string[] | undefined,
  classification: PlaceClassification
): void {
  const isDebug =
    typeof process !== "undefined" &&
    (process.env?.NODE_ENV !== "production" || process.env?.DEBUG_PLACES === "true");

  if (isDebug) {
    if (!classification.eligible) {
      console.log(
        `[Classifier REJECT] "${name}" | requestedCategory: ${requestedCategory} | types: ${JSON.stringify(
          types || []
        )} | halalEvidence: ${classification.halalEvidence} | reason: ${classification.rejectionReason}`
      );
    } else {
      console.log(
        `[Classifier ACCEPT] "${name}" -> ${classification.categoryLabel} (${classification.halalConfidence}) | evidence: ${classification.halalEvidence}`
      );
    }
  }
}

/**
 * Perform Places API (New) Text Search with location restriction, category, pagination and strict classification.
 */
export async function searchHalalPlaces(params: {
  category: SearchCategory;
  lat: number;
  lng: number;
  radiusMeters?: number;
  subQuery?: string;
  openNow?: boolean;
  minRating?: number;
  locationName?: string;
  apiKey?: string;
  forceRefresh?: boolean;
  pageToken?: string;
}): Promise<PlacesSearchResult> {
  const {
    category,
    lat,
    lng,
    radiusMeters = 16093, // default 10 miles in meters
    subQuery,
    openNow,
    minRating = 0,
    locationName,
    apiKey,
    forceRefresh = false,
    pageToken,
  } = params;

  const cacheKey = `places:${category}:${lat.toFixed(3)},${lng.toFixed(3)}:${radiusMeters}:${
    subQuery || ""
  }:${openNow ? "1" : "0"}:${minRating}:${pageToken || ""}`;

  if (forceRefresh) {
    memoryCache.delete(cacheKey);
  } else {
    const cached = getFromCache<PlacesSearchResult>(cacheKey);
    if (cached) {
      return cached;
    }
  }

  // Construct focused text search query and strict type restriction
  let textQuery = "";
  let includedType: string | undefined = undefined;

  if (category === "restaurants") {
    // Focused restaurant query (Section A)
    textQuery = subQuery ? `${subQuery.trim()} halal restaurant` : "halal restaurant";
    includedType = "restaurant";
  } else if (category === "groceries") {
    // Focused grocery query (Section C)
    textQuery = subQuery ? `${subQuery.trim()} halal grocery` : "halal grocery";
    // Avoid broad multi-word generic supermarket queries
    includedType = undefined;
  } else if (category === "mosques") {
    // Focused mosque query (Section G)
    textQuery = subQuery ? `${subQuery.trim()} mosque masjid islamic center` : "mosque masjid islamic center";
    includedType = "place_of_worship";
  }

  // If Google Maps API key is configured, execute Places API (New) Search
  if (apiKey) {
    try {
      const textUrl = "https://places.googleapis.com/v1/places:searchText";
      const requestBody: any = {
        textQuery,
        locationRestriction: {
          circle: {
            center: { latitude: lat, longitude: lng },
            radius: Math.min(Math.max(radiusMeters, 1000), 50000),
          },
        },
        pageSize: 20,
      };

      if (includedType) {
        requestBody.includedType = includedType;
      }
      if (openNow) {
        requestBody.openNow = true;
      }
      if (minRating > 0) {
        requestBody.minRating = minRating;
      }
      if (pageToken) {
        requestBody.pageToken = pageToken;
      }

      const response = await fetch(textUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-Maps-Solution-ID": "gmp_mcp_codeassist_v1_aistudio",
          "X-Goog-FieldMask":
            "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.currentOpeningHours,places.nationalPhoneNumber,places.internationalPhoneNumber,places.websiteUri,places.googleMapsUri,places.types,places.primaryType,places.editorialSummary,places.photos,places.priceLevel,nextPageToken",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = (await response.json()) as any;
        const rawPlaces: any[] = data.places || [];
        const resNextPageToken: string | undefined = data.nextPageToken || undefined;

        // Apply strict application-level classifier to EVERY returned place (Initial & Pagination)
        const classifiedPlaces: PlaceResult[] = [];

        for (const p of rawPlaces) {
          const placeName = p.displayName?.text || "Establishment";
          const classification = classifyPlace(
            {
              name: placeName,
              types: p.types,
              primaryType: p.primaryType,
              formattedAddress: p.formattedAddress,
              editorialSummary: p.editorialSummary?.text,
            },
            category
          );

          logClassificationDecision(placeName, category, p.types, classification);

          if (!classification.eligible) {
            continue;
          }

          const dist = calculateDistance(
            lat,
            lng,
            p.location?.latitude || 0,
            p.location?.longitude || 0
          );
          let photoUrl: string | undefined = undefined;
          if (p.photos && p.photos.length > 0 && p.photos[0].name) {
            photoUrl = `https://places.googleapis.com/v1/${p.photos[0].name}/media?key=${apiKey}&maxHeightPx=400&maxWidthPx=600&solution_id=gmp_mcp_codeassist_v1_aistudio`;
          }

          classifiedPlaces.push({
            id: p.id || `place-${Math.random().toString(36).slice(2, 9)}`,
            name: placeName,
            category,
            categoryLabel: classification.categoryLabel,
            formattedAddress: p.formattedAddress || "Address available on map",
            location: {
              latitude: p.location?.latitude || lat,
              longitude: p.location?.longitude || lng,
            },
            rating: typeof p.rating === "number" ? p.rating : undefined,
            userRatingCount: typeof p.userRatingCount === "number" ? p.userRatingCount : undefined,
            priceLevel: p.priceLevel,
            isOpenNow: p.currentOpeningHours?.openNow,
            weekdayDescriptions: p.currentOpeningHours?.weekdayDescriptions,
            nationalPhoneNumber: p.nationalPhoneNumber,
            internationalPhoneNumber: p.internationalPhoneNumber,
            websiteUri: p.websiteUri,
            googleMapsUri:
              p.googleMapsUri ||
              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName)}`,
            photoUrl,
            types: p.types,
            distanceKm: dist.km,
            distanceMiles: dist.miles,
            halalNotice: classification.halalNotice,
            source: "google_api",
          });
        }

        // Apply client subQuery filter if provided
        let finalPlaces = classifiedPlaces;
        if (subQuery) {
          const lowerSub = subQuery.toLowerCase();
          finalPlaces = finalPlaces.filter(
            (p) =>
              p.name.toLowerCase().includes(lowerSub) ||
              (p.types && p.types.some((t) => t.toLowerCase().includes(lowerSub))) ||
              p.formattedAddress.toLowerCase().includes(lowerSub)
          );
        }

        // Return up to 20 verified items. No supplementation or category padding (Section L)
        const slicedPlaces = finalPlaces.slice(0, 20);
        if (slicedPlaces.length > 0 || pageToken) {
          const result: PlacesSearchResult = {
            places: slicedPlaces,
            nextPageToken: resNextPageToken,
            status: slicedPlaces.length > 0 ? "OK" : "ZERO_RESULTS",
            source: "google_api",
          };
          setInCache(cacheKey, result);
          return result;
        }
      } else {
        const errorText = await response.text();
        console.warn("Places API searchText returned non-200:", response.status, errorText);
      }
    } catch (err: any) {
      console.warn("Places API searchText failed:", err?.message);
    }
  }

  // If this was a subsequent page (pageToken present) and failed, return empty result without fallback
  if (pageToken) {
    return {
      places: [],
      status: "OK",
      source: "google_api",
    };
  }

  // Resilient Live Worldwide Fallback: Real OpenStreetMap data ONLY
  // Strictly zero synthetic businesses or procedural addresses.
  // Every OSM place is classified through the EXACT same classifyPlace pipeline.
  const fallbackList = (
    await resolveLiveAndContextualPlaces(category, lat, lng, radiusMeters, locationName)
  ).slice(0, 20);

  const fallbackResult: PlacesSearchResult = {
    places: fallbackList,
    status: fallbackList.length > 0 ? "OK" : "ZERO_RESULTS",
    source: fallbackList.length > 0 ? "osm_live" : "fallback",
    nextPageToken: undefined,
  };
  setInCache(cacheKey, fallbackResult, 30 * 60 * 1000);
  return fallbackResult;
}

/**
 * Resolve live worldwide places using live open directory search and reverse-geocoding
 * when Google Places API quota is restricted or offline.
 *
 * Guarantees:
 * 1. REAL city-specific establishments ONLY from OpenStreetMap.
 * 2. Filtered through the EXACT same classification pipeline (no generic supermarkets or fake places).
 * 3. COMPLETE formatted street addresses.
 * 4. NEVER outputs incomplete fragments.
 * 5. Returns qualifying results (quality > quantity, no padding).
 */
async function resolveLiveAndContextualPlaces(
  category: SearchCategory,
  lat: number,
  lng: number,
  radiusMeters: number,
  locationName?: string
): Promise<PlaceResult[]> {
  // 1. Fetch live establishments from OpenStreetMap Nominatim around the location bounding box
  let liveItems: any[] = [];
  const delta = Math.max(0.06, Math.min(0.35, radiusMeters / 111000));
  const viewbox = `${(lng - delta).toFixed(4)},${(lat + delta).toFixed(4)},${(lng + delta).toFixed(4)},${(lat - delta).toFixed(4)}`;

  // Focused OSM search queries per category (Section H)
  const queries =
    category === "restaurants"
      ? ["halal restaurant", "halal dining"]
      : category === "groceries"
      ? ["halal grocery", "halal butcher", "halal market", "halal meat"]
      : ["mosque", "masjid", "islamic center"];

  for (const q of queries) {
    try {
      const searchUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        q
      )}&format=json&addressdetails=1&extratags=1&limit=25&viewbox=${viewbox}&bounded=1`;
      const res = await fetch(searchUrl, {
        headers: { "User-Agent": "NoakhaliKitchenGlobalDirectory/2.0" },
      });
      if (res.ok) {
        const data = (await res.json()) as any[];
        if (Array.isArray(data) && data.length > 0) {
          for (const item of data) {
            if (!liveItems.some((x) => x.place_id === item.place_id || x.osm_id === item.osm_id)) {
              liveItems.push(item);
            }
          }
        }
      }
    } catch (e) {
      console.warn("Live OSM search query error:", e);
    }
    if (liveItems.length >= 25) break;
  }

  const results: PlaceResult[] = [];

  // 2. Classify and map live items through the EXACT same category classification pipeline
  for (let idx = 0; idx < liveItems.length && results.length < 20; idx++) {
    const item = liveItems[idx];
    const name = item.name || item.display_name.split(",")[0] || "Local Establishment";

    const classification = classifyPlace(
      {
        name,
        types: [item.type, item.class],
        osmClass: item.class,
        osmType: item.type,
        formattedAddress: item.display_name,
        osmTags: item.extratags,
      },
      category
    );

    logClassificationDecision(name, category, [item.type, item.class], classification);

    if (!classification.eligible) {
      continue;
    }

    const itemLat = parseFloat(item.lat);
    const itemLng = parseFloat(item.lon);
    const dist = calculateDistance(lat, lng, itemLat, itemLng);

    // Format complete full address from display_name
    let cleanAddress = item.display_name;
    if (item.name && cleanAddress.startsWith(item.name + ", ")) {
      cleanAddress = cleanAddress.substring(item.name.length + 2);
    }

    results.push({
      id: `osm-${item.place_id || idx}`,
      name,
      category,
      categoryLabel: classification.categoryLabel,
      formattedAddress: cleanAddress,
      location: { latitude: itemLat, longitude: itemLng },
      rating: undefined,
      userRatingCount: undefined,
      isOpenNow: undefined,
      nationalPhoneNumber: undefined,
      websiteUri: `https://maps.google.com/?q=${encodeURIComponent(name + " " + cleanAddress)}`,
      googleMapsUri: `https://maps.google.com/?q=${encodeURIComponent(name + " " + cleanAddress)}`,
      photoUrl: undefined,
      distanceKm: dist.km,
      distanceMiles: dist.miles,
      halalNotice: classification.halalNotice,
      source: "osm_live",
    });
  }

  return results;
}
