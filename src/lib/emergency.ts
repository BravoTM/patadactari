const EMERGENCY_KEYWORDS_EN = [
  "unconscious",
  "cannot breathe",
  "not breathing",
  "severe bleeding",
  "bleeding heavily",
  "chest pain",
  "convulsing",
  "seizure",
  "not responding",
  "collapsed",
  "stroke",
  "heart attack",
  "poisoned",
  "overdose"
];

const EMERGENCY_KEYWORDS_SW = [
  "kupoteza fahamu",
  "hawezi kupumua",
  "damu nyingi",
  "maumivu ya kifua",
  "degedege",
  "amezimia",
  "mshtuko wa moyo",
  "sumu"
];

export function isEmergency(text: string): boolean {
  const lower = text.toLowerCase();
  return [...EMERGENCY_KEYWORDS_EN, ...EMERGENCY_KEYWORDS_SW].some(
    (keyword) => lower.includes(keyword)
  );
}