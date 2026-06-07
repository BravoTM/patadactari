"use client";

import { Facility, formatDistance } from "@/lib/facilities";
import { Lang, t } from "@/lib/i18n";
import { Phone, MapPin, Clock } from "lucide-react";

interface FacilityCardProps {
  facility: Facility;
  distance?: number;
  language: Lang;
}

export function FacilityCard({
  facility,
  distance,
  language,
}: FacilityCardProps) {
  const translations = t[language];
  const formattedDistance = distance ? formatDistance(distance) : "N/A";

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-gray-800">{facility.name}</h3>
          <p className="text-xs text-gray-500">
            {translations.level} {facility.level}
          </p>
        </div>
        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
          {formattedDistance} km
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin size={16} className="text-gray-400" />
          <span>{facility.address}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Clock size={16} className="text-gray-400" />
          <span>{facility.hours}</span>
        </div>

        <div className="flex items-center gap-2">
          <Phone size={16} className="text-gray-400" />
          <a
            href={`tel:${facility.phone}`}
            className="text-blue-600 hover:underline font-medium"
            aria-label={`${translations.call} ${facility.name}`}
          >
            {facility.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
