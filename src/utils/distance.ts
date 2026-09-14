/**
 * Distance calculation utilities using the Haversine formula
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): { miles: number; km: number } {
  if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) {
    return { miles: 0, km: 0 };
  }

  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const km = R * c;
  const miles = km * 0.621371;

  return {
    km: Math.round(km * 10) / 10,
    miles: Math.round(miles * 10) / 10,
  };
}

export function formatDistance(
  distance: { miles: number; km: number } | undefined,
  unit: "mi" | "km" = "mi"
): string {
  if (!distance) return "";
  if (unit === "km") {
    return `${distance.km} km`;
  }
  return `${distance.miles} mi`;
}
