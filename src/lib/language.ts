export type MessageLanguage = "en" | "sw";

const SWAHILI_WORDS = new Set([
  "na", "ya", "kwa", "ni", "si", "au", "kutoka", "homa", "kichwa", "tumbo", "damu",
  "maumivu", "habari", "mimi", "nina", "nime", "ninahisi", "ninaumwa", "najisikia",
  "dalili", "tafadhali", "asante", "sana", "kidogo", "siku", "leo", "pole", "kupumua",
  "kutapika", "kuharisha", "joto", "baridi", "degedege", "choma", "jeraha", "daktari",
  "hospitali", "kliniki", "mgonjwa", "unajisikia", "anajisikia", "wewe", "yangu",
  "yako", "hii", "hizi", "kwa", "kutokana", "kikohozi", "mafua", "malaria", "tumbo",
  "kinauma", "ninakohoa", "ninatapika", "nina", "kuumwa", "uchovu", "kizunguzungu",
]);

const ENGLISH_WORDS = new Set([
  "the", "and", "have", "has", "been", "feeling", "feel", "pain", "headache", "fever",
  "cough", "my", "i've", "i'm", "im", "what", "should", "for", "with", "days", "hurt",
  "hurts", "ache", "sick", "nausea", "vomiting", "diarrhea", "breathing", "chest",
  "throat", "doctor", "hospital", "symptoms", "since", "yesterday", "today",
]);

/** Detect whether the user message is primarily English or Kiswahili. */
export function detectMessageLanguage(text: string): MessageLanguage {
  const lower = text.toLowerCase();
  const words = lower.match(/[\p{L}']+/gu) ?? [];

  let swScore = 0;
  let enScore = 0;

  for (const word of words) {
    if (SWAHILI_WORDS.has(word)) swScore++;
    if (ENGLISH_WORDS.has(word)) enScore++;
  }

  const swPhrases = [
    "nina homa", "kichwa kinauma", "ninaumwa", "ninahisi", "najisikia", "nina kikohozi",
    "nina maumivu", "tumbo linauma", "nimekuwa", "nina homa",
  ];
  if (swPhrases.some((p) => lower.includes(p))) swScore += 2;

  if (swScore > enScore) return "sw";
  if (enScore > swScore) return "en";

  // Short/ambiguous messages: favour Swahili if any Swahili marker appears
  if (swScore > 0) return "sw";
  return "en";
}

export const DOCTOR_DISCLAIMER: Record<MessageLanguage, string> = {
  en: "Remember: Always seek advice from a real doctor.",
  sw: "Kumbuka: Tafuta ushauri wa daktari halisi.",
};

/** Strip mixed disclaimers and append the correct single-language one. */
export function ensureDisclaimer(text: string, lang: MessageLanguage): string {
  const cleaned = text
    .replace(/\n*Kumbuka:\s*Tafuta ushauri wa daktari halisi\.?\s*/gi, "")
    .replace(/\n*Remember:\s*Always seek advice from a real doctor\.?\s*/gi, "")
    .replace(/\n*Kumbuka:.*\/\s*Remember:.*$/gi, "")
    .trim();

  return `${cleaned}\n\n${DOCTOR_DISCLAIMER[lang]}`;
}
