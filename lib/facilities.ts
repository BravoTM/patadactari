import facilitiesData from "@/data/facilities.json";

export interface Facility {
  id: string;
  name: string;
  level: 3 | 4 | 5 | 6;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  hours: string;
  emergencyCapable: boolean;
}

/**
 * Haversine formula to calculate distance between two geographic points
 * Returns distance in kilometers
 */
function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
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
  return R * c;
}

/**
 * Get the 3 nearest facilities based on user's location
 * If location not provided, returns the top 3 alphabetically
 */
export function getNearestFacilities(
  userLat?: number,
  userLng?: number
): Facility[] {
  const facilities = facilitiesData as Facility[];

  if (userLat !== undefined && userLng !== undefined) {
    // Calculate distances and sort
    const withDistances = facilities.map((f) => ({
      ...f,
      distance: haversineDistance(userLat, userLng, f.latitude, f.longitude),
    }));

    return withDistances
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3)
      .map(({ distance, ...f }) => f);
  }

  // Default: return first 3 alphabetically
  return facilities.sort((a, b) => a.name.localeCompare(b.name)).slice(0, 3);
}

/**
 * Get the 3 nearest Level 4+ (emergency-capable) facilities
 */
export function getNearestEmergencyFacilities(
  userLat?: number,
  userLng?: number
): Facility[] {
  const facilities = facilitiesData as Facility[];
  const emergencyFacilities = facilities.filter((f) => f.emergencyCapable);

  if (userLat !== undefined && userLng !== undefined) {
    const withDistances = emergencyFacilities.map((f) => ({
      ...f,
      distance: haversineDistance(userLat, userLng, f.latitude, f.longitude),
    }));

    return withDistances
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3)
      .map(({ distance, ...f }) => f);
  }

  // Default: return first 3 emergency facilities alphabetically
  return emergencyFacilities
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 3);
}

/**
 * Format distance for display (rounds to 1 decimal)
 */
export function formatDistance(km: number): string {
  if (km < 0.1) return "< 0.1";
  return km.toFixed(1);
}
