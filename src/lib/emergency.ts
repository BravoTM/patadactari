const EMERGENCY_KEYWORDS_EN = [
  "unconscious",
  "cannot breathe",
  "can't breathe",
  "not breathing",
  "difficulty breathing",
  "severe bleeding",
  "bleeding heavily",
  "bleeding",
  "blood loss",
  "coughing blood",
  "cough up blood",
  "vomiting blood",
  "blood in stool",
  "blood in urine",
  "losing blood",
  "chest pain",
  "convulsing",
  "seizure",
  "convulsion",
  "not responding",
  "collapsed",
  "stroke",
  "heart attack",
  "poisoned",
  "overdose",
  "choking",
  "anaphylaxis",
  "stopped breathing",
];

const EMERGENCY_KEYWORDS_SW = [
  "kupoteza fahamu",
  "hawezi kupumua",
  "kushindwa kupumua",
  "damu nyingi",
  "kutoka damu",
  "kutoka damu nyingi",
  "kutapika damu",
  "damu kwenye kinyesi",
  "maumivu ya kifua",
  "degedege",
  "amezimia",
  "mshtuko wa moyo",
  "sumu",
  "kiharusi",
];

const BENIGN_BLOOD_PHRASES = [
  "blood pressure",
  "high blood pressure",
  "blood test",
  "blood sugar",
  "blood sample",
  "blood work",
  "blood count",
  "shinikizo la damu",
];

/** Standalone "blood"/"damu" triggers emergency unless only benign context (e.g. blood pressure). */
function hasBloodEmergency(text: string): boolean {
  const lower = text.toLowerCase();
  const hasBloodWord = /\bblood\b/.test(lower) || /\bdamu\b/.test(lower);
  if (!hasBloodWord) return false;

  const onlyBenign = BENIGN_BLOOD_PHRASES.some((phrase) => lower.includes(phrase));
  const hasEmergencyBloodContext =
    lower.includes("bleeding") ||
    lower.includes("severe") ||
    lower.includes("heavy") ||
    lower.includes("loss") ||
    lower.includes("cough") ||
    lower.includes("vomit") ||
    lower.includes("stool") ||
    lower.includes("urine") ||
    lower.includes("wound") ||
    lower.includes("cut") ||
    lower.includes("injury") ||
    lower.includes("nyingi") ||
    lower.includes("kutoka");

  if (onlyBenign && !hasEmergencyBloodContext) return false;
  return true;
}

export function isEmergency(text: string): boolean {
  if (!text) return false;
  const lower = text.toLowerCase().trim();
  const keywords = [...EMERGENCY_KEYWORDS_EN, ...EMERGENCY_KEYWORDS_SW];

  if (keywords.some((keyword) => lower.includes(keyword))) return true;
  return hasBloodEmergency(lower);
}

export function getEmergencyKeywordMatches(text: string): string[] {
  if (!text) return [];
  const lower = text.toLowerCase().trim();
  const keywords = [...EMERGENCY_KEYWORDS_EN, ...EMERGENCY_KEYWORDS_SW];

  const matches = keywords.filter((kw) => lower.includes(kw.toLowerCase()));
  if (hasBloodEmergency(lower) && !matches.some((m) => m.includes("blood") || m.includes("damu"))) {
    matches.push("blood");
  }
  return matches;
}
