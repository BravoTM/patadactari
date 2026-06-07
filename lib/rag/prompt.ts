/**
 * Build the system prompt for Claude to provide health guidance
 * This ensures Claude stays within scope and only uses Kenya MoH guidelines
 */
export const buildSystemPrompt = (context: string) => `
You are PataDaktari, a health guidance assistant built for Nairobi residents. Follow every rule below without exception.

HARD RULES:
1. You are NOT a doctor. You do NOT diagnose conditions. You do NOT prescribe medicines or dosages.
2. You ONLY provide guidance for these four conditions: (a) malaria suspicion, (b) respiratory infections (coughs, colds, flu, pneumonia), (c) diarrheal diseases, (d) basic first aid.
3. ALL guidance must come ONLY from the Kenya MoH Clinical Guidelines 2016 excerpts provided below. Never use outside medical knowledge.
4. If symptoms fall outside the four conditions, say exactly: "PataDaktari cannot assess this condition. Please visit your nearest health facility." Then stop.
5. Always end EVERY response with this disclaimer on a new line: "⚠️ This guidance does not replace a doctor. If symptoms are severe or getting worse, go to the nearest health facility immediately."
6. Respond in the SAME LANGUAGE the user wrote in. Swahili input → Swahili response. English input → English response.
7. Write simply — as if explaining to someone with a primary school education. No medical jargon.
8. Structure every response with these three sections: (a) What this might be, (b) What to do now, (c) When to go to a facility.

KENYA CLINICAL GUIDELINES 2016 — RELEVANT EXCERPTS:
${context}
`;

/**
 * Build the user message for Claude
 */
export const buildUserMessage = (symptoms: string) =>
  `The patient describes their symptoms as follows:\n\n"${symptoms}"\n\nProvide guidance based only on the clinical excerpts above.`;

/**
 * Extract condition category from Claude's response
 */
export function detectCondition(
  response: string
): "malaria" | "respiratory" | "diarrheal" | "firstaid" | "out_of_scope" {
  const lower = response.toLowerCase();

  // Check for out_of_scope first
  if (
    lower.includes("cannot assess") ||
    lower.includes("visit your nearest health facility") ||
    lower.includes("hawezi kukagua")
  ) {
    return "out_of_scope";
  }

  // Check for malaria
  if (
    lower.includes("malaria") ||
    lower.includes("fever") ||
    lower.includes("chills") ||
    lower.includes("homa") ||
    lower.includes("baridi")
  ) {
    return "malaria";
  }

  // Check for respiratory
  if (
    lower.includes("cough") ||
    lower.includes("cold") ||
    lower.includes("flu") ||
    lower.includes("pneumonia") ||
    lower.includes("breathing") ||
    lower.includes("respiratory") ||
    lower.includes("kikohozi") ||
    lower.includes("mafua") ||
    lower.includes("upumziko")
  ) {
    return "respiratory";
  }

  // Check for diarrheal
  if (
    lower.includes("diarrhea") ||
    lower.includes("diarrhoea") ||
    lower.includes("loose stool") ||
    lower.includes("vomit") ||
    lower.includes("nausea") ||
    lower.includes("diarrhea") ||
    lower.includes("kufanya haraka") ||
    lower.includes("tezeta") ||
    lower.includes("tapika")
  ) {
    return "diarrheal";
  }

  // Check for first aid
  if (
    lower.includes("cut") ||
    lower.includes("wound") ||
    lower.includes("burn") ||
    lower.includes("injury") ||
    lower.includes("first aid") ||
    lower.includes("bandage") ||
    lower.includes("basi yenye jeraha")
  ) {
    return "firstaid";
  }

  // Default to out of scope if uncertain
  return "out_of_scope";
}

/**
 * Detect urgency level from Claude's response
 */
export function detectUrgency(
  response: string
): "routine" | "urgent" | "emergency" {
  const lower = response.toLowerCase();

  // Emergency keywords
  if (
    lower.includes("immediately") ||
    lower.includes("urgently") ||
    lower.includes("hospital now") ||
    lower.includes("call 999") ||
    lower.includes("haraka") ||
    lower.includes("dharura") ||
    lower.includes("mkate moto") ||
    lower.includes("severe") ||
    lower.includes("critical") ||
    lower.includes("life-threatening") ||
    lower.includes("go now")
  ) {
    return "emergency";
  }

  // Urgent keywords
  if (
    lower.includes("soon") ||
    lower.includes("doctor") ||
    lower.includes("health facility") ||
    lower.includes("visit a clinic") ||
    lower.includes("see a doctor") ||
    lower.includes("hivi karibuni") ||
    lower.includes("daktari") ||
    lower.includes("kliniki") ||
    lower.includes("within") ||
    lower.includes("today")
  ) {
    return "urgent";
  }

  // Routine (can manage at home)
  return "routine";
}
