"use client";

import {
  FACILITY_LEVELS,
  USER_LOCATION_COLOR,
  legendPinSvg,
} from "@/lib/mapUtils";

interface MapLegendProps {
  language: "en" | "sw";
  showUserLocation?: boolean;
}

const LEVEL_ORDER = [5, 4, 3] as const;

export default function MapLegend({ language, showUserLocation }: MapLegendProps) {
  const isEn = language === "en";

  return (
    <div
      className="map-legend absolute bottom-3 left-3 z-10 pointer-events-none"
      aria-label={isEn ? "Map pin legend" : "Ufafanuzi wa alama za ramani"}
    >
      <div className="glass-card px-3 py-2.5 shadow-md border border-white/70 bg-white/90 pointer-events-auto">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-teal-700/70 mb-2">
          {isEn ? "Facility levels" : "Viango vya vituo"}
        </p>
        <ul className="space-y-1.5">
          {LEVEL_ORDER.map((level) => {
            const info = FACILITY_LEVELS[level];
            return (
              <li key={level} className="flex items-center gap-2 min-w-[168px]">
                <span
                  className="shrink-0 flex items-center justify-center"
                  dangerouslySetInnerHTML={{
                    __html: legendPinSvg(info.color, level === 5 ? 20 : level === 4 ? 18 : 16),
                  }}
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-teal-900 leading-tight">
                    {isEn ? info.labelEn : info.labelSw}
                  </p>
                  <p className="text-[10px] text-teal-600/75 leading-snug truncate">
                    {isEn ? info.descEn : info.descSw}
                  </p>
                </div>
              </li>
            );
          })}
          {showUserLocation && (
            <li className="flex items-center gap-2 pt-1 border-t border-teal-100/80">
              <span
                className="shrink-0"
                dangerouslySetInnerHTML={{ __html: legendPinSvg(USER_LOCATION_COLOR, 16) }}
              />
              <p className="text-xs font-medium text-teal-800">
                {isEn ? "Your location" : "Mahali ulipo"}
              </p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
