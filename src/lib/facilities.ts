import { facilitiesData } from "@/data/facilities";

export interface Facility {
  id: number;
  name: string;
  level: number;
  area: string;
  address?: string;
  geocodeQuery?: string;
  lat: number;
  lng: number;
  phone: string;
  hours: string;
}

export type FacilityWithDistance = Facility & { distance?: number };

export function getAllFacilities(): Facility[] {
  return facilitiesData as Facility[];
}

export function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function sortByDistance(
  facilities: Facility[],
  userLat: number,
  userLng: number
): FacilityWithDistance[] {
  return facilities
    .map((f) => ({
      ...f,
      distance: haversineDistance(userLat, userLng, f.lat, f.lng),
    }))
    .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
}
