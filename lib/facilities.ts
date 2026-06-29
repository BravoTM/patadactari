import { facilitiesData } from "@/data/facilities";

export interface Facility {
  id: string;
  name: string;
  city: string;
  level: 3 | 4 | 5 | 6;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  hours: string;
  emergencyCapable: boolean;
  specialties: string[];
}

export function getAllFacilities(): Facility[] {
  return facilitiesData as Facility[];
}

export function getFacilityById(id: string): Facility | undefined {
  return getAllFacilities().find((f) => f.id === id);
}

export function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
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

export function sortFacilitiesByDistance(
  facilities: Facility[],
  userLat: number,
  userLng: number
): (Facility & { distance: number })[] {
  return facilities
    .map((f) => ({
      ...f,
      distance: haversineDistance(userLat, userLng, f.latitude, f.longitude),
    }))
    .sort((a, b) => a.distance - b.distance);
}

export function getNearestFacilities(
  userLat?: number,
  userLng?: number,
  limit = 3
): Facility[] {
  const facilities = getAllFacilities();

  if (userLat !== undefined && userLng !== undefined) {
    return sortFacilitiesByDistance(facilities, userLat, userLng)
      .slice(0, limit)
      .map(({ distance: _d, ...f }) => f);
  }

  return facilities.sort((a, b) => a.name.localeCompare(b.name)).slice(0, limit);
}

export function getNearestEmergencyFacilities(
  userLat?: number,
  userLng?: number,
  limit = 3
): Facility[] {
  const emergencyFacilities = getAllFacilities().filter((f) => f.emergencyCapable);

  if (userLat !== undefined && userLng !== undefined) {
    return sortFacilitiesByDistance(emergencyFacilities, userLat, userLng)
      .slice(0, limit)
      .map(({ distance: _d, ...f }) => f);
  }

  return emergencyFacilities
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, limit);
}

export function formatDistance(km: number): string {
  if (km < 0.1) return "< 0.1";
  return km.toFixed(1);
}

export function filterFacilities(options: {
  search?: string;
  emergencyOnly?: boolean;
}): Facility[] {
  let results = getAllFacilities();

  if (options.emergencyOnly) {
    results = results.filter((f) => f.emergencyCapable);
  }

  if (options.search?.trim()) {
    const q = options.search.toLowerCase();
    results = results.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.address.toLowerCase().includes(q) ||
        f.specialties.some((s) => s.toLowerCase().includes(q))
    );
  }

  return results;
}
