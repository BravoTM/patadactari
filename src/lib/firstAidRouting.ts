import {
  FIRST_AID_GUIDES,
  getFirstAidGuide,
  searchFirstAidGuides,
  type FirstAidGuide,
} from "@/lib/firstaid";

const EXPLICIT_FIRST_AID_PHRASES = [
  "first aid",
  "firstaid",
  "first-aid",
  "basic first aid",
  "msaada wa kwanza",
  "mwongozo wa msaada",
  "first aid guide",
  "first aid help",
  "first aid instructions",
  "need first aid",
  "show first aid",
  "take me to first aid",
  "about first aid",
  "nataka msaada wa kwanza",
  "nahitaji msaada wa kwanza",
];

const INJURY_SIGNALS = [
  "burn",
  "burnt",
  "scald",
  "scalded",
  "cut",
  "wound",
  "laceration",
  "puncture",
  "nosebleed",
  "sprain",
  "fracture",
  "broken bone",
  "faint",
  "fainting",
  "passed out",
  "allergic",
  "heat exhaustion",
  "sunburn",
  "choma",
  "kuchomeka",
  "mikato",
  "jeraha",
  "michomo",
  "damu puani",
  "kuvutika",
  "kuzimia",
  "mzio",
];

export function isExplicitFirstAidRequest(text: string): boolean {
  const lower = text.toLowerCase().trim();
  return EXPLICIT_FIRST_AID_PHRASES.some((phrase) => lower.includes(phrase));
}

/** Match symptom text to the most relevant first aid guide, if any. */
export function matchFirstAidGuide(text: string): FirstAidGuide | undefined {
  const lower = text.toLowerCase().trim();
  if (lower.length < 2) return undefined;

  const results = searchFirstAidGuides(lower);
  if (results.length === 0) return undefined;

  let best = results[0];
  let bestScore = 0;

  for (const guide of results) {
    const score = guide.keywords.filter((kw) => lower.includes(kw.toLowerCase())).length;
    if (score > bestScore) {
      bestScore = score;
      best = guide;
    }
  }

  if (bestScore > 0) return best;

  // Single-result search with injury context
  const hasInjury = INJURY_SIGNALS.some((signal) => lower.includes(signal));
  return hasInjury ? best : undefined;
}

/** Returns a guide id when the user should be sent to the first aid page. */
export function getFirstAidRedirect(text: string): { guideId?: string } | null {
  const lower = text.toLowerCase().trim();
  const guide = matchFirstAidGuide(text);
  const explicit = isExplicitFirstAidRequest(text);
  const hasInjury = INJURY_SIGNALS.some((signal) => lower.includes(signal));

  if (explicit) {
    return { guideId: guide?.id };
  }

  if (guide && hasInjury) {
    return { guideId: guide.id };
  }

  return null;
}

export function getFirstAidGuideCount(): number {
  return FIRST_AID_GUIDES.length;
}

export function getFirstAidHref(guideId?: string): string {
  return guideId ? `/firstaid?guide=${guideId}` : "/firstaid";
}

export function getFirstAidRedirectMessage(
  lang: "en" | "sw",
  guideId?: string
): string {
  const guide = guideId ? getFirstAidGuide(guideId) : undefined;
  if (guide) {
    const name = lang === "en" ? guide.nameEn : guide.nameSw;
    return lang === "en"
      ? `I found a guide that may help: ${name}. Opening the First Aid Guide now.`
      : `Nimepata mwongozo unaoweza kusaidia: ${name}. Nafungua Mwongozo wa Msaada wa Kwanza sasa.`;
  }
  return lang === "en"
    ? "For step-by-step first aid instructions, I'm opening our First Aid Guide now."
    : "Kwa maelekezo ya msaada wa kwanza hatua kwa hatua, nafungua Mwongozo wa Msaada wa Kwanza sasa.";
}
