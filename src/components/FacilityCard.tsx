"use client";

import { forwardRef } from "react";
import { FacilityWithDistance } from "@/lib/facilities";
import { getDirectionsUrl, getLevelInfo } from "@/lib/mapUtils";

interface FacilityCardProps {
  facility: FacilityWithDistance;
  selected?: boolean;
  hovered?: boolean;
  index?: number;
  onSelect: () => void;
  onHover: (hovered: boolean) => void;
  lang: "en" | "sw";
}

const FacilityCard = forwardRef<HTMLButtonElement, FacilityCardProps>(
  function FacilityCard(
    { facility, selected, hovered, index = 0, onSelect, onHover, lang },
    ref
  ) {
    const levelInfo = getLevelInfo(facility.level);

    return (
      <button
        ref={ref}
        type="button"
        onClick={onSelect}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        style={{ animationDelay: `${Math.min(index * 40, 320)}ms` }}
        className={`facility-card w-full text-left glass-card p-4 transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-0.5 ${
          selected
            ? "ring-2 ring-teal-500 shadow-lg scale-[1.01] bg-white/90"
            : hovered
              ? "ring-1 ring-teal-300/80 shadow-md bg-white/85"
              : ""
        }`}
      >
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0 flex items-start gap-2">
            <span
              className="shrink-0 mt-0.5 w-2 h-2 rounded-full ring-2 ring-white shadow-sm"
              style={{ backgroundColor: levelInfo.color }}
              aria-hidden
            />
            <div>
              <h3 className="text-sm font-semibold text-teal-900 leading-snug">
                {facility.name}
              </h3>
              <p className="text-xs text-teal-600/80 mt-0.5">
                {facility.address ? `${facility.address} · ` : ""}
                {facility.area}, Nairobi
              </p>
            </div>
          </div>
          <span
            className={`text-[10px] font-semibold px-2.5 py-1 rounded-full shrink-0 transition-transform duration-200 ${levelInfo.badgeClass} ${selected ? "scale-105" : ""}`}
          >
            L{facility.level}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-teal-700/90 pl-4">
          <a
            href={`tel:${facility.phone}`}
            onClick={(e) => e.stopPropagation()}
            className="hover:text-teal-900 transition-colors"
          >
            📞 {facility.phone}
          </a>
          <span>🕐 {facility.hours}</span>
          {facility.distance != null && (
            <span className="text-teal-500 font-medium tabular-nums">
              {facility.distance < 1
                ? `${Math.round(facility.distance * 1000)} m`
                : `${facility.distance.toFixed(1)} km`}
            </span>
          )}
        </div>

        <div
          className={`grid transition-all duration-300 ease-out pl-4 ${
            selected ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0"
          }`}
        >
          <div className="overflow-hidden">
            <a
              href={getDirectionsUrl(facility.lat, facility.lng)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold hover:opacity-80 transition-colors"
              style={{ color: levelInfo.color }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full animate-pulse-soft"
                style={{ backgroundColor: levelInfo.color }}
              />
              {lang === "en" ? "Get directions →" : "Pata njia →"}
            </a>
          </div>
        </div>
      </button>
    );
  }
);

export default FacilityCard;
