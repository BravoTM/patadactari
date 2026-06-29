import { NextResponse } from "next/server";
import { getMapsApiKey } from "@/lib/env.server";

export async function GET() {
  return NextResponse.json({ key: getMapsApiKey() });
}
