// Emergency keywords that trigger immediate escalation to /emergency page
// These symptoms require immediate 999 call, not triage assessment

const EMERGENCY_EN = [
  "chest pain",
  "heart attack",
  "stroke",
  "not breathing",
  "can't breathe",
  "difficulty breathing",
  "unconscious",
  "fitting",
  "seizure",
  "convulsion",
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
  "choking",
  "overdose",
  "severe head injury",
  "collapsed",
  "unable to wake",
  "high fever stiff neck",
  "meningitis",
  "paralysed",
  "paralyzed",
  "stopped breathing",
  "no pulse",
  "severe chest",
  "can't breathe",
  "anaphylaxis",
  "allergic reaction severe",
  "burns severe",
  "electric shock",
  "poisoning",
  "suffocating",
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

const EMERGENCY_SW = [
  "maumivu ya kifua",
  "mshtuko wa moyo",
  "kiharusi",
  "hapumui",
  "kushindwa kupumua",
  "kupoteza fahamu",
  "kizunguzungu kikali",
  "kifafa",
  "degedege",
  "kutoka damu",
  "kutoka damu nyingi",
  "damu nyingi",
  "kutapika damu",
  "damu kwenye kinyesi",
  "kukosekana pumzi",
  "kupigwa sumu",
  "kichwa kikali",
  "kushindwa kuamka",
  "kupooza",
  "maumivu makali ya kifua",
  "kutoka povu mdomoni",
  "dharura",
  "kuzimia",
  "mgomba",
  "mgomba mkali",
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
  const keywords = [...EMERGENCY_EN, ...EMERGENCY_SW];

  if (keywords.some((kw) => lower.includes(kw.toLowerCase()))) return true;
  return hasBloodEmergency(lower);
}

export function getEmergencyKeywordMatches(text: string): string[] {
  if (!text) return [];
  const lower = text.toLowerCase().trim();
  const keywords = [...EMERGENCY_EN, ...EMERGENCY_SW];

  const matches = keywords.filter((kw) => lower.includes(kw.toLowerCase()));
  if (hasBloodEmergency(lower) && !matches.some((m) => m.includes("blood") || m.includes("damu"))) {
    matches.push("blood");
  }
  return matches;
}
