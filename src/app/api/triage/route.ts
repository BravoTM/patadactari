import { NextRequest, NextResponse } from "next/server";
import { isEmergency } from "@/lib/emergency";
import { getFirstAidRedirect, getFirstAidHref, getFirstAidRedirectMessage } from "@/lib/firstAidRouting";
import { detectMessageLanguage } from "@/lib/language";
import { getTriageApiKey } from "@/lib/env.server";
import { getTriage } from "@/lib/rag";

export const runtime = "nodejs";

const FALLBACK_RESPONSE =
  "I'm temporarily unable to connect to the AI service. For emergencies, call 999 immediately. Otherwise, visit your nearest public health facility for assessment.\n\nKumbuka: Tafuta ushauri wa daktari halisi. / Remember: Always seek advice from a real doctor.";

const MISSING_KEY_RESPONSE =
  "The AI assistant is not configured yet. Add OPENAI_API_KEY to .env.local (recommended) or GEMINI_API_KEY for Google Gemini.\n\nGet an OpenAI key at https://platform.openai.com/api-keys\n\nFor emergencies, call 999 immediately. Otherwise, visit your nearest public health facility.\n\nKumbuka: Tafuta ushauri wa daktari halisi. / Remember: Always seek advice from a real doctor.";

function triageErrorResponse(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  const code =
    error && typeof error === "object" && "code" in error
      ? String((error as { code?: string }).code)
      : "";

  if (message.includes("insufficient_quota") || code === "insufficient_quota") {
    return (
      "Your OpenAI account has no API quota left. Add a payment method at https://platform.openai.com/account/billing — free trial credits may have expired.\n\n" +
      "Alternatively, add a GEMINI_API_KEY with the Generative Language API enabled in Google Cloud.\n\n" +
      "For emergencies, call 999 immediately. Otherwise, visit your nearest public health facility.\n\n" +
      "Kumbuka: Tafuta ushauri wa daktari halisi. / Remember: Always seek advice from a real doctor."
    );
  }

  if (message.includes("API_KEY_SERVICE_BLOCKED") || message.includes("403 Forbidden")) {
    return (
      "The Gemini API key is blocked or missing the Generative Language API. Create a separate key at https://aistudio.google.com/apikey — do not reuse your Google Maps key.\n\n" +
      "For emergencies, call 999 immediately. Otherwise, visit your nearest public health facility.\n\n" +
      "Kumbuka: Tafuta ushauri wa daktari halisi. / Remember: Always seek advice from a real doctor."
    );
  }

  if (message.includes("invalid_api_key") || message.includes("Incorrect API key")) {
    return (
      "The AI API key in .env.local is invalid. Check OPENAI_API_KEY or GEMINI_API_KEY and restart the dev server.\n\n" +
      "For emergencies, call 999 immediately. Otherwise, visit your nearest public health facility.\n\n" +
      "Kumbuka: Tafuta ushauri wa daktari halisi. / Remember: Always seek advice from a real doctor."
    );
  }

  return FALLBACK_RESPONSE;
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Please describe your symptoms." },
        { status: 400 }
      );
    }

    if (isEmergency(message)) {
      return NextResponse.json({ type: "emergency" });
    }

    const firstAid = getFirstAidRedirect(message);
    if (firstAid) {
      const lang = detectMessageLanguage(message);
      const guideId = firstAid.guideId ?? undefined;
      return NextResponse.json({
        type: "firstaid",
        guideId: guideId ?? null,
        href: getFirstAidHref(guideId),
        response: getFirstAidRedirectMessage(lang, guideId),
      });
    }

    const auth = getTriageApiKey();
    if (!auth) {
      console.error("Triage: missing OPENAI_API_KEY or GOOGLE_API_KEY");
      return NextResponse.json({ type: "triage", response: MISSING_KEY_RESPONSE });
    }

    const response = await getTriage(message);
    return NextResponse.json({ type: "triage", response });
  } catch (error) {
    console.error("Triage error:", error);
    return NextResponse.json({ type: "triage", response: triageErrorResponse(error) });
  }
}
