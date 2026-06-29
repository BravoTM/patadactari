/** Shared helpers for hospital map UI (Google Maps + list). */

export const NAIROBI_CENTER = { lat: -1.2921, lng: 36.8219 };

export function getLevelColor(level: number): string {
  if (level === 6) return "#7f1d1d";
  if (level === 5) return "#dc2626";
  if (level === 4) return "#ea580c";
  return "#3b82f6";
}

export function getDirectionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

/** Colored circle marker as a data-URL for Google Maps Marker icons. */
export function makeMarkerIcon(color: string, size = 22): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" fill="${color}" stroke="white" stroke-width="2.5"/>
    <circle cx="12" cy="12" r="3.5" fill="white" opacity="0.9"/>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const USER_MARKER_ICON = makeMarkerIcon("#10b981", 26);
