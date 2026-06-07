import { NextRequest, NextResponse } from "next/server";
import { runTriagePipeline, generateFallbackResponse } from "@/lib/rag/pipeline";

interface TriageRequest {
  symptoms: string;
  language: "en" | "sw";
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as TriageRequest;
    const { symptoms, language } = body;

    // Validate input
    if (!symptoms || typeof symptoms !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid symptoms field" },
        { status: 400 }
      );
    }

    if (!language || !["en", "sw"].includes(language)) {
      return NextResponse.json(
        { error: "Invalid language. Must be 'en' or 'sw'" },
        { status: 400 }
      );
    }

    const trimmedSymptoms = symptoms.trim();
    if (trimmedSymptoms.length < 10 || trimmedSymptoms.length > 500) {
      return NextResponse.json(
        { error: "Symptoms must be between 10 and 500 characters" },
        { status: 400 }
      );
    }

    console.log(`[API] Triage request: ${language}, ${trimmedSymptoms.length} chars`);

    // Run the RAG pipeline
    const response = await runTriagePipeline(trimmedSymptoms, language);

    return NextResponse.json(response);
  } catch (error) {
    console.error("[API] Triage error:", error);

    // Return fallback response
    const fallbackLanguage = "en";
    const fallback = generateFallbackResponse("", fallbackLanguage);

    return NextResponse.json(fallback, { status: 200 });
  }
}

// Allow CORS for client requests
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
