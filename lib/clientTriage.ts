/**
 * Client-side triage system
 * Provides medical guidance without requiring API calls
 * Based on Kenya Ministry of Health guidelines
 */

interface TriageResult {
  guidance: string;
  urgency: "routine" | "urgent" | "emergency";
  condition: "malaria" | "respiratory" | "diarrheal" | "firstaid" | "out_of_scope";
  language: "en" | "sw";
}

const conditions = {
  malaria: {
    keywords: {
      en: ["fever", "chills", "headache", "body ache", "malaria", "sweating"],
      sw: ["homa", "baridi", "sakit ya kichwa", "maumivu ya mwili", "malaria", "jasho"],
    },
    guidanceEn: `What this might be: Suspected malaria (fever with headache and body aches)

What to do now:
- Rest and drink plenty of water
- Take paracetamol if you have a fever (follow package directions)
- Keep warm but don't over-bundle yourself

When to go to a facility:
- Go to your nearest health facility for a blood test to confirm malaria
- Seek immediate care if you have: severe headache, confusion, or difficulty breathing

⚠️ This guidance does not replace a doctor. If symptoms are severe or getting worse, go to the nearest health facility immediately.`,
    guidanceSw: `Ni nini kinachoweza kuwa: Kufahamika kwenye malaria (homa na maumivu ya kichwa)

Nini cha kufanya sasa:
- Pumzika na kunywa maji mengi
- Chukua paracetamol kama una homa (fuata mwongozo wa kopo)
- Jikamata lakini usijizibue sana

Wakati wa kwenda kwenye kituo:
- Nenda kwenye kituo chako kama karibu kwa jaribio la damu
- Tafuta msaada haraka kama una: sakit kubwa ya kichwa, usizindua au ugumu wa kupumua

⚠️ Hii ya mwongozo haisomi dakitari. Kama dalili zinarudi au zikakuwa mbaya, nenda kwenye kituo chako kama karibu.`,
    urgency: "urgent",
  },
  respiratory: {
    keywords: {
      en: ["cough", "cold", "flu", "sneezing", "runny nose", "sore throat", "chest pain", "breathing", "pneumonia"],
      sw: ["kikohozi", "baridi", "mafua", "mkundu mwingine", "koo likouma", "maumivu ya kifua", "kupumua", "pneumonia"],
    },
    guidanceEn: `What this might be: Respiratory infection (cough, cold, or flu)

What to do now:
- Rest and drink warm liquids (tea, soup, water)
- Use a saline gargle for sore throat (salt in warm water)
- Take paracetamol for fever and pain
- Cover your mouth when coughing to avoid spreading

When to go to a facility:
- If cough lasts more than 2-3 weeks
- If you have chest pain or difficulty breathing
- If you cough up blood
- If symptoms get worse despite home care

⚠️ This guidance does not replace a doctor. If symptoms are severe or getting worse, go to the nearest health facility immediately.`,
    guidanceSw: `Ni nini kinachoweza kuwa: Maambukizi ya kupumua (kikohozi, baridi, au mafua)

Nini cha kufanya sasa:
- Pumzika na kunywa vinywaji vya joto (chai, supu, maji)
- Tumia maji maziwa ya chumvi kwa koo likouma (chumvi katika maji ya joto)
- Chukua paracetamol kwa ajili ya homa na maumivu
- Funika kinywa chako unapokohoa ili kuepuka kueneza

Wakati wa kwenda kwenye kituo:
- Kama kikohozi kinarudi kwa zaidi ya siku 2-3
- Kama una maumivu ya kifua au ugumu wa kupumua
- Kama unakohoa kwa damu
- Kama dalili zinarudi licha ya huduma za nyumbani

⚠️ Hii ya mwongozo haisomi dakitari. Kama dalili zinarudi au zikakuwa mbaya, nenda kwenye kituo chako kama karibu.`,
    urgency: "routine",
  },
  diarrheal: {
    keywords: {
      en: ["diarrhea", "loose stool", "stomach pain", "cramps", "vomiting", "nausea", "bloating"],
      sw: ["kuvimba", "meno mabovu", "maumivu ya tumbо", "maumivu ya meno", "kutapika", "nyofu", "kumimina"],
    },
    guidanceEn: `What this might be: Diarrheal disease (loose stools, stomach pain)

What to do now:
- Drink plenty of water, oral rehydration salts (ORS), or coconut water
- Avoid fatty or spicy foods - eat bland foods like rice, bananas, bread
- Wash hands frequently and use clean water for drinking
- Avoid sharing eating utensils

When to go to a facility:
- If diarrhea lasts more than 3-5 days
- If you have blood or mucus in stools
- If you have severe dehydration signs: extreme thirst, dark urine, dizziness
- If a child or elderly person has diarrhea lasting more than 1 day

⚠️ This guidance does not replace a doctor. If symptoms are severe or getting worse, go to the nearest health facility immediately.`,
    guidanceSw: `Ni nini kinachoweza kuwa: Kuvimba (meno mabovu na maumivu ya tumbо)

Nini cha kufanya sasa:
- Kunywa maji mengi, sukari salts (ORS), au maji ya nasi
- Epuka chakula cha mafuta au kali - kula chakula rahisi kama wali, ndani, mkate
- Osha mikono mara kwa mara na tumia maji safi ya kunywa
- Epuka kushiriki soko la kula

Wakati wa kwenda kwenye kituo:
- Kama kuvimba kinarudi kwa zaidi ya siku 3-5
- Kama una damu au chumvi katika meno
- Kama una dalili kubwa za dehydration: thirst kubwa, mkojo mweusi, kuzunguka
- Kama mtoto au mtu mzee ana kuvimba kwa zaidi ya siku 1

⚠️ Hii ya mwongozo haisomi dakitari. Kama dalili zinarudi au zikakuwa mbaya, nenda kwenye kituo chako kama karibu.`,
    urgency: "routine",
  },
  firstaid: {
    keywords: {
      en: ["cut", "wound", "burn", "bleeding", "injury", "accident", "bruise", "swelling"],
      sw: ["kukatwa", "jeraha", "kuchakaa", "kutoka damu", "madhimba", "ajali", "uvimbe"],
    },
    guidanceEn: `What this might be: Basic first aid situation (cut, burn, or minor injury)

What to do now:
- For cuts: Clean with clean water, apply pressure to stop bleeding, cover with clean cloth
- For burns: Cool the area with clean water for 10-15 minutes, cover loosely
- For bruises: Rest and apply ice if available
- Elevate injured area if possible

When to go to a facility:
- If bleeding won't stop after 10 minutes of pressure
- If cut is deep or edges are open
- If burn is large or blistering
- If you suspect broken bones

⚠️ This guidance does not replace a doctor. If symptoms are severe or getting worse, go to the nearest health facility immediately.`,
    guidanceSw: `Ni nini kinachoweza kuwa: Tatizo la kwanza aid (kukatwa, kuchakaa, au madhimba)

Nini cha kufanya sasa:
- Kwa kukatwa: Osha kwa maji safi, tumia shinikizo kuacha kutoka damu, funika kwa kitambaa safi
- Kwa kuchakaa: Baridi eneo kwa maji safi kwa dakika 10-15, funika kwa lepesi
- Kwa uvimbe: Pumzika na tumia barafu kama ipo
- Inua sehemu iliyoathiriwa kama inaweza

Wakati wa kwenda kwenye kituo:
- Kama kutoka damu hakitasimami baada ya dakika 10 ya shinikizo
- Kama kukatwa ni kirefu au kingo zinabukaana
- Kama chakaa ni kubwa au kuna mfua
- Kama unakufahamika kwamba mifupa imevunjika

⚠️ Hii ya mwongozo haisomi dakitari. Kama dalili zinarudi au zikakuwa mbaya, nenda kwenye kituo chako kama karibu.`,
    urgency: "routine",
  },
};

/**
 * Perform client-side triage based on symptoms
 */
export function triageSymptoms(
  symptoms: string,
  language: "en" | "sw"
): TriageResult {
  const lowerSymptoms = symptoms.toLowerCase();
  const keywordsByLanguage = language === "en" ? "en" : "sw";

  let bestMatch: keyof typeof conditions | null = null;
  let maxMatches = 0;

  // Check which condition has the most matching keywords
  for (const [condition, data] of Object.entries(conditions)) {
    const matches = data.keywords[keywordsByLanguage as "en" | "sw"].filter((keyword) =>
      lowerSymptoms.includes(keyword)
    ).length;

    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = condition as keyof typeof conditions;
    }
  }

  // If no condition matched well, return out_of_scope
  if (!bestMatch || maxMatches === 0) {
    return {
      guidance:
        language === "en"
          ? "PataDaktari cannot assess this condition. Please visit your nearest health facility."
          : "PataDaktari hawezi kukagua hali hii. Tafadhali tembelea kituo chako kama karibu.",
      urgency: "urgent",
      condition: "out_of_scope",
      language,
    };
  }

  const selectedCondition = conditions[bestMatch];
  const guidance = language === "en" ? selectedCondition.guidanceEn : selectedCondition.guidanceSw;

  return {
    guidance,
    urgency: selectedCondition.urgency as "routine" | "urgent" | "emergency",
    condition: bestMatch,
    language,
  };
}
