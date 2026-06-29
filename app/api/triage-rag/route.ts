import { NextRequest, NextResponse } from "next/server";
import { isEmergency } from "@/lib/emergency";
import {
  generateFallbackResponse,
  runTriagePipeline,
} from "@/lib/rag/pipeline";

export async function POST(request: NextRequest) {
  let symptoms = "";
  let language: "en" | "sw" = "en";

  try {
    const body = await request.json();
    symptoms = body.symptoms;
    language = body.language ?? "en";

    if (!symptoms || typeof symptoms !== "string") {
      return NextResponse.json(
        { error: "Symptoms text is required" },
        { status: 400 }
      );
    }

    if (isEmergency(symptoms)) {
      return NextResponse.json({ emergency: true });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY not configured" },
        { status: 503 }
      );
    }

    const result = await runTriagePipeline(symptoms, language);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[API] triage-rag error:", error);
    return NextResponse.json(
      generateFallbackResponse(symptoms, language),
      { status: 200 }
    );
  }
}
