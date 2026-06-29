"use client";

import Link from "next/link";
import { Facility, formatDistance } from "@/lib/facilities";
import { getDirectionsUrl } from "@/lib/mapUtils";
import { Lang, t } from "@/lib/i18n";
import { Phone, MapPin, Clock, Navigation, ExternalLink } from "lucide-react";

interface FacilityCardProps {
  facility: Facility;
  distance?: number;
  language: Lang;
  highlighted?: boolean;
}

export function FacilityCard({
  facility,
  distance,
  language,
  highlighted = false,
}: FacilityCardProps) {
  const translations = t[language];
  const formattedDistance = distance !== undefined ? formatDistance(distance) : null;

  return (
    <div
      className={`border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-all ${
        highlighted
          ? "border-emerald-500 ring-2 ring-emerald-200"
          : "border-gray-200"
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="min-w-0">
          <h3 className="font-bold text-gray-900 leading-tight">{facility.name}</h3>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="text-xs text-gray-500">
              {translations.level} {facility.level}
            </span>
            {facility.emergencyCapable && (
              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                24/7 ER
              </span>
            )}
          </div>
        </div>
        {formattedDistance && (
          <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full font-semibold shrink-0">
            {formattedDistance} km
          </span>
        )}
      </div>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <div className="flex items-start gap-2">
          <MapPin size={15} className="text-gray-400 mt-0.5 shrink-0" />
          <span>{facility.address}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={15} className="text-gray-400 shrink-0" />
          <span>{facility.hours}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={15} className="text-gray-400 shrink-0" />
          <a
            href={`tel:${facility.phone.replace(/\s/g, "")}`}
            className="text-emerald-700 hover:underline font-medium"
          >
            {facility.phone}
          </a>
        </div>
      </div>

      <div className="flex gap-2">
        <a
          href={`tel:${facility.phone.replace(/\s/g, "")}`}
          className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2 px-3 rounded-lg transition"
        >
          <Phone size={14} />
          {translations.call}
        </a>
        <a
          href={getDirectionsUrl(facility.latitude, facility.longitude)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-sm font-semibold py-2 px-3 rounded-lg transition"
        >
          <Navigation size={14} />
          {language === "en" ? "Directions" : "Njia"}
        </a>
        <Link
          href={`/maps?facility=${facility.id}`}
          className="flex items-center justify-center p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600"
          title={language === "en" ? "View on map" : "Tazama kwenye ramani"}
        >
          <ExternalLink size={14} />
        </Link>
      </div>
    </div>
  );
}
