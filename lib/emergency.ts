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
  "kutoka damu nyingi",
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

export function isEmergency(text: string): boolean {
  if (!text) return false;
  const lower = text.toLowerCase().trim();
  const keywords = [...EMERGENCY_EN, ...EMERGENCY_SW];
  
  return keywords.some((kw) => lower.includes(kw.toLowerCase()));
}

export function getEmergencyKeywordMatches(text: string): string[] {
  if (!text) return [];
  const lower = text.toLowerCase().trim();
  const keywords = [...EMERGENCY_EN, ...EMERGENCY_SW];
  
  return keywords.filter((kw) => lower.includes(kw.toLowerCase()));
}
