"use client";

import { useState, useEffect } from "react";
import { Facility, haversineDistance } from "@/lib/facilities";
import facilitiesData from "@/data/facilities.json";
import { Heart, MapPin, Phone, Clock, AlertCircle } from "lucide-react";

interface HospitalMapProps {
  language: "en" | "sw";
  userLocation?: { lat: number; lng: number };
}

export default function HospitalMap({ language, userLocation }: HospitalMapProps) {
  const [facilities] = useState<Facility[]>(facilitiesData as Facility[]);
  const [selectedFacility, setSelectedFacility] = useState<(Facility & { distance?: number }) | null>(null);
  const [facilitiesWithDistance, setFacilitiesWithDistance] = useState<(Facility & { distance?: number })[]>([]);
  const [filteredFacilities, setFilteredFacilities] = useState<(Facility & { distance?: number })[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterEmergency, setFilterEmergency] = useState(false);

  useEffect(() => {
    // Calculate distances if user location is available
    if (userLocation) {
      const withDistance = facilities.map((f) => ({
        ...f,
        distance: haversineDistance(userLocation.lat, userLocation.lng, f.latitude, f.longitude),
      }));
      setFacilitiesWithDistance(withDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0)));
      setFilteredFacilities(withDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0)));
    } else {
      setFacilitiesWithDistance(facilities);
      setFilteredFacilities(facilities);
    }
  }, [userLocation, facilities]);

  // Apply filters
  useEffect(() => {
    let results = facilitiesWithDistance;

    if (filterEmergency) {
      results = results.filter((f) => f.emergencyCapable);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (f) =>
          f.name.toLowerCase().includes(query) ||
          f.address.toLowerCase().includes(query) ||
          (f as any).specialties?.some((s: string) => s.toLowerCase().includes(query))
      );
    }

    setFilteredFacilities(results);
  }, [searchQuery, filterEmergency, facilitiesWithDistance]);

  // Map visualization
  const mapWidth = 550;
  const mapHeight = 450;
  const centerLat = -1.3;
  const centerLng = 36.8;
  const zoomLevel = 0.4;

  const projectCoordinates = (lat: number, lng: number): { x: number; y: number } => {
    const x = ((lng - centerLng) / zoomLevel) * 20 + mapWidth / 2;
    const y = (-(lat - centerLat) / zoomLevel) * 20 + mapHeight / 2;
    return { x: Math.max(15, Math.min(mapWidth - 15, x)), y: Math.max(15, Math.min(mapHeight - 15, y)) };
  };

  const getLevelColor = (level: number) => {
    if (level === 6) return "#7f1d1d"; // Red for National Hospital
    if (level === 5) return "#dc2626"; // Light red for Teaching
    if (level === 4) return "#ea580c"; // Orange for District
    return "#3b82f6"; // Blue for Health Centers
  };

  const getLevelLabel = (level: number) => {
    return `${language === "en" ? "Level" : "Kiwango"} ${level}`;
  };

  return (
    <div className="w-full space-y-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <MapPin size={24} />
            {language === "en" ? "Hospital Network Map" : "Ramani ya Mtandao wa Hospitali"}
          </h2>
        </div>

        {/* Search and Filter */}
        <div className="p-4 bg-gray-50 border-b border-gray-200 space-y-3">
          <input
            type="text"
            placeholder={language === "en" ? "Search hospitals..." : "Tafuta hospitali..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filterEmergency}
              onChange={(e) => setFilterEmergency(e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm font-medium text-gray-700">
              {language === "en" ? "🚑 Emergency facilities only" : "🚑 Vituo vya dharura tu"}
            </span>
          </label>
        </div>

        {/* Map */}
        <div className="p-4 bg-gradient-to-b from-blue-50 to-blue-100 flex justify-center overflow-x-auto">
          <svg width={mapWidth} height={mapHeight} className="border-2 border-blue-300 bg-white rounded shadow-md flex-shrink-0">
            {/* Grid background */}
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#e0e7ff" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width={mapWidth} height={mapHeight} fill="url(#grid)" />

            {/* User location marker */}
            {userLocation && (() => {
              const pos = projectCoordinates(userLocation.lat, userLocation.lng);
              return (
                <g>
                  <circle cx={pos.x} cy={pos.y} r="12" fill="#10b981" fillOpacity="0.3" />
                  <circle cx={pos.x} cy={pos.y} r="6" fill="#10b981" />
                  <circle cx={pos.x} cy={pos.y} r="3" fill="white" />
                </g>
              );
            })()}

            {/* Hospital markers */}
            {facilitiesWithDistance.map((facility) => {
              const pos = projectCoordinates(facility.latitude, facility.longitude);
              const isSelected = selectedFacility?.id === facility.id;
              const color = getLevelColor(facility.level);
              const markerSize = isSelected ? 16 : facility.emergencyCapable ? 12 : 10;

              return (
                <g key={facility.id}>
                  {/* Outer halo on select */}
                  {isSelected && (
                    <circle cx={pos.x} cy={pos.y} r="20" fill={color} fillOpacity="0.15" />
                  )}
                  {/* Marker circle */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={markerSize}
                    fill={color}
                    fillOpacity={isSelected ? "1" : "0.9"}
                    stroke={isSelected ? "white" : "none"}
                    strokeWidth="2"
                    onClick={() => setSelectedFacility(facility)}
                    style={{ cursor: "pointer", transition: "all 0.2s" }}
                    className="hover:opacity-100"
                  />
                  {/* Inner marker */}
                  <circle cx={pos.x} cy={pos.y} r={markerSize / 2} fill="white" />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-900 rounded-full"></div>
              <span>{language === "en" ? "National (L6)" : "Kitaifa (L6)"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-600 rounded-full"></div>
              <span>{language === "en" ? "Teaching (L5)" : "Kufundisha (L5)"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-600 rounded-full"></div>
              <span>{language === "en" ? "District (L4)" : "Kijiji (L4)"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span>{language === "en" ? "Health Center (L3)" : "Kituo (L3)"}</span>
            </div>
            <div className="flex items-center gap-2 col-span-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>{language === "en" ? "Your location" : "Mahali yako"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Facilities List */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-4">
          {language === "en"
            ? `Hospitals & Clinics (${filteredFacilities.length})`
            : `Hospitali na Kliniki (${filteredFacilities.length})`}
        </h3>

        {filteredFacilities.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            <p>{language === "en" ? "No facilities match your search" : "Hakuna vituo vinavyokidhi utafutaji"}</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredFacilities.map((facility) => (
              <div
                key={facility.id}
                onClick={() => setSelectedFacility(facility)}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  selectedFacility?.id === facility.id
                    ? "bg-blue-100 border-2 border-blue-500 shadow-md"
                    : "bg-gray-100 border-2 border-gray-200 hover:bg-gray-150"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{facility.name}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {facility.emergencyCapable ? "🚑" : "🏥"} {getLevelLabel(facility.level)}
                    </div>
                  </div>
                  {facility.distance !== undefined && (
                    <div className="text-sm font-bold text-blue-600 ml-2">
                      {facility.distance < 1
                        ? "< 1 km"
                        : facility.distance.toFixed(1) + " km"}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Facility Details */}
      {selectedFacility && (
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border-2 border-blue-400 shadow-lg">
          <h3 className="font-bold text-lg text-gray-800 mb-3">{selectedFacility.name}</h3>
          
          <div className="space-y-3 text-sm">
            {/* Level Badge */}
            <div className="inline-block px-3 py-1 bg-white border-2 border-blue-500 text-blue-700 font-bold rounded-full text-xs">
              {selectedFacility.emergencyCapable ? "🚑 " : "🏥 "} {getLevelLabel(selectedFacility.level)}
            </div>

            {/* Address */}
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-gray-800">
                  {language === "en" ? "Address" : "Anwani"}
                </div>
                <div className="text-gray-600">{selectedFacility.address}</div>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <Phone size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-gray-800">
                  {language === "en" ? "Phone" : "Simu"}
                </div>
                <a
                  href={`tel:${selectedFacility.phone}`}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  {selectedFacility.phone}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-3">
              <Clock size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-gray-800">
                  {language === "en" ? "Hours" : "Saa"}
                </div>
                <div className="text-gray-600">{selectedFacility.hours}</div>
              </div>
            </div>

            {/* Distance */}
            {selectedFacility.distance !== undefined && (
              <div className="flex items-start gap-3">
                <Heart size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-800">
                    {language === "en" ? "Distance" : "Umbali"}
                  </div>
                  <div className="text-gray-600">
                    {selectedFacility.distance < 1
                      ? "< 1 km"
                      : selectedFacility.distance.toFixed(1) + " km"}
                  </div>
                </div>
              </div>
            )}

            {/* Specialties if available */}
            {(selectedFacility as any).specialties && (
              <div className="flex items-start gap-3">
                <AlertCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-800">
                    {language === "en" ? "Services" : "Huduma"}
                  </div>
                  <div className="text-gray-600">
                    {(selectedFacility as any).specialties.join(", ")}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Call Button */}
          <a
            href={`tel:${selectedFacility.phone}`}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors text-center"
          >
            {language === "en" ? "📞 Call Now" : "📞 Piga Simu"}
          </a>
        </div>
      )}
    </div>
  );
}
