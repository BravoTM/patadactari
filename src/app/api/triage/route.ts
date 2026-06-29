import { NextRequest, NextResponse } from "next/server";
import { isEmergency } from "@/lib/emergency";
import { getTriage } from "@/lib/rag";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Please describe your symptoms." },
        { status: 400 }
      );
    }

    // Emergency check runs first, always
    if (isEmergency(message)) {
      return NextResponse.json({ type: "emergency" });
    }

    const response = await getTriage(message);
    return NextResponse.json({ type: "triage", response });

  } catch (error) {
    console.error("Triage error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}