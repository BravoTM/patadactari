export const NAIROBI_CENTER = { lat: -1.2921, lng: 36.8219 };

/** Pin tip sits at y=36 in this viewBox — anchor must match. */
const PIN_TIP_Y = 36;
const PIN_VIEW_HEIGHT = 36;

export interface FacilityLevelInfo {
  level: number;
  color: string;
  markerSize: number;
  badgeClass: string;
  labelEn: string;
  labelSw: string;
  descEn: string;
  descSw: string;
}

export const FACILITY_LEVELS: Record<number, FacilityLevelInfo> = {
  5: {
    level: 5,
    color: "#0d9488",
    markerSize: 30,
    badgeClass: "bg-teal-600 text-white",
    labelEn: "Level 5",
    labelSw: "Kiwango 5",
    descEn: "Full hospital — 24hr emergency",
    descSw: "Hospitali kamili — dharura 24hr",
  },
  4: {
    level: 4,
    color: "#2563eb",
    markerSize: 27,
    badgeClass: "bg-blue-600 text-white",
    labelEn: "Level 4",
    labelSw: "Kiwango 4",
    descEn: "District hospital",
    descSw: "Hospitali ya wilaya",
  },
  3: {
    level: 3,
    color: "#7c3aed",
    markerSize: 24,
    badgeClass: "bg-violet-600 text-white",
    labelEn: "Level 3",
    labelSw: "Kiwango 3",
    descEn: "Health centre — primary care",
    descSw: "Kituo cha afya",
  },
};

export const USER_LOCATION_COLOR = "#10b981";

export function getLevelColor(level: number): string {
  return FACILITY_LEVELS[level]?.color ?? FACILITY_LEVELS[3].color;
}

export function getMarkerSize(level: number): number {
  return FACILITY_LEVELS[level]?.markerSize ?? FACILITY_LEVELS[3].markerSize;
}

export function getLevelInfo(level: number): FacilityLevelInfo {
  return FACILITY_LEVELS[level] ?? FACILITY_LEVELS[3];
}

export function getDirectionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

function markerSvg(
  color: string,
  options?: { selected?: boolean; hovered?: boolean }
): string {
  const { selected = false, hovered = false } = options ?? {};
  const ring = selected
    ? `<circle cx="12" cy="11" r="10.5" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.35"/>`
    : hovered
      ? `<circle cx="12" cy="11" r="9.5" fill="none" stroke="${color}" stroke-width="1" opacity="0.25"/>`
      : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36">
    ${ring}
    <path d="M12 1C7.03 1 3.5 4.53 3.5 9c0 5.2 8.5 26 8.5 26S20.5 14.2 20.5 9C20.5 4.53 16.97 1 12 1z" fill="${color}" stroke="white" stroke-width="1.25"/>
    <circle cx="12" cy="9" r="3" fill="white" opacity="0.95"/>
  </svg>`;
}

/** Inline pin SVG for legend and UI (not a map icon). */
export function legendPinSvg(color: string, size = 18): string {
  const h = Math.round((size * PIN_VIEW_HEIGHT) / 24);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${h}" viewBox="0 0 24 36" aria-hidden="true">
    <path d="M12 1C7.03 1 3.5 4.53 3.5 9c0 5.2 8.5 26 8.5 26S20.5 14.2 20.5 9C20.5 4.53 16.97 1 12 1z" fill="${color}" stroke="white" stroke-width="1.25"/>
    <circle cx="12" cy="9" r="3" fill="white" opacity="0.95"/>
  </svg>`;
}

export function buildMarkerIcon(
  color: string,
  size = 28,
  options?: { selected?: boolean; hovered?: boolean }
): google.maps.Icon | string {
  const scale = options?.selected ? 1.2 : options?.hovered ? 1.08 : 1;
  const w = Math.round(size * scale);
  const h = Math.round(((size * PIN_VIEW_HEIGHT) / 24) * scale);
  const url = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(markerSvg(color, options))}`;

  if (typeof google === "undefined") return url;

  return {
    url,
    scaledSize: new google.maps.Size(w, h),
    anchor: new google.maps.Point(w / 2, (h * PIN_TIP_Y) / PIN_VIEW_HEIGHT),
  };
}

export function buildUserMarkerIcon(): google.maps.Icon | string {
  return buildMarkerIcon(USER_LOCATION_COLOR, 26, { selected: true });
}

export function buildLevelMarkerIcon(
  level: number,
  options?: { selected?: boolean; hovered?: boolean }
): google.maps.Icon | string {
  return buildMarkerIcon(getLevelColor(level), getMarkerSize(level), options);
}
