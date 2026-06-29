import { NextResponse } from "next/server";
import { getAllFacilities } from "@/lib/facilities";

export async function GET() {
  return NextResponse.json(getAllFacilities());
}
