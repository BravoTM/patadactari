import { NextRequest, NextResponse } from "next/server";
import {
  getNearestFacilities,
  getNearestEmergencyFacilities,
  Facility,
} from "@/lib/facilities";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const isEmergency = searchParams.get("emergency") === "true";

    let facilities: Facility[];

    if (lat && lng) {
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);

      if (isNaN(latitude) || isNaN(longitude)) {
        return NextResponse.json(
          { error: "Invalid coordinates" },
          { status: 400 }
        );
      }

      if (isEmergency) {
        facilities = getNearestEmergencyFacilities(latitude, longitude);
      } else {
        facilities = getNearestFacilities(latitude, longitude);
      }
    } else {
      // No coordinates provided - return defaults
      if (isEmergency) {
        facilities = getNearestEmergencyFacilities();
      } else {
        facilities = getNearestFacilities();
      }
    }

    return NextResponse.json({
      facilities,
      count: facilities.length,
    });
  } catch (error) {
    console.error("[API] Facilities error:", error);
    return NextResponse.json(
      { error: "Failed to fetch facilities" },
      { status: 500 }
    );
  }
}
