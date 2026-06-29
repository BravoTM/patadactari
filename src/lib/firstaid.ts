export interface FirstAidStep {
  step: number;
  titleEn: string;
  titleSw: string;
  instructionsEn: string[];
  instructionsSw: string[];
  warningsEn?: string[];
  warningsSw?: string[];
}

export type FirstAidCategoryId =
  | "bleeding_wounds"
  | "burns"
  | "breathing_cpr"
  | "bones_muscles"
  | "general";

export interface FirstAidCategory {
  id: FirstAidCategoryId;
  nameEn: string;
  nameSw: string;
  descriptionEn: string;
  descriptionSw: string;
  icon: string;
}

export interface FirstAidGuide {
  id: string;
  category: FirstAidCategoryId;
  nameEn: string;
  nameSw: string;
  descriptionEn: string;
  descriptionSw: string;
  icon: string;
  steps: FirstAidStep[];
  keywords: string[];
}

export const FIRST_AID_CATEGORIES: FirstAidCategory[] = [
  {
    id: "bleeding_wounds",
    nameEn: "Bleeding & Wounds",
    nameSw: "Damu na Majeraha",
    descriptionEn: "Cuts, bleeding, and open injuries",
    descriptionSw: "Mikato, kutoka damu, na majeraha ya nje",
    icon: "🩸",
  },
  {
    id: "burns",
    nameEn: "Burns",
    nameSw: "Kuchomeka",
    descriptionEn: "Thermal, chemical, electrical, and sun burns",
    descriptionSw: "Kuchomeka kwa moto, kemikali, umeme, na jua",
    icon: "🔥",
  },
  {
    id: "breathing_cpr",
    nameEn: "Breathing & CPR",
    nameSw: "Kupumua na CPR",
    descriptionEn: "Choking and cardiac emergencies",
    descriptionSw: "Kukwama chakula na dharura za moyo",
    icon: "😮",
  },
  {
    id: "bones_muscles",
    nameEn: "Bones & Sprains",
    nameSw: "Mifupa na Maumivu",
    descriptionEn: "Fractures, sprains, and joint injuries",
    descriptionSw: "Mifupa iliyovunjika, kuvutika, na majeraha ya viungo",
    icon: "🦴",
  },
  {
    id: "general",
    nameEn: "Other Emergencies",
    nameSw: "Dharura Nyingine",
    descriptionEn: "Fainting, allergies, heat illness, and more",
    descriptionSw: "Kuzimia, mzio, joto, na zaidi",
    icon: "⚠️",
  },
];

export const FIRST_AID_GUIDES: FirstAidGuide[] = [
  // ── Bleeding & Wounds ──────────────────────────────────────────
  {
    id: "severe_bleeding",
    category: "bleeding_wounds",
    nameEn: "Severe Bleeding",
    nameSw: "Kutoka Damu Nyingi",
    descriptionEn: "Control life-threatening blood loss",
    descriptionSw: "Kudhibiti kutoka damu kunakohatarisha maisha",
    icon: "🩸",
    keywords: ["bleeding", "blood", "hemorrhage", "damu", "kutoka damu", "severe"],
    steps: [
      {
        step: 1,
        titleEn: "Ensure safety",
        titleSw: "Hakikisha usalama",
        instructionsEn: [
          "Wear gloves if available",
          "Avoid direct contact with blood",
          "Use a barrier if possible",
        ],
        instructionsSw: [
          "Vaa glavu ikiwa zipo",
          "Epuka kugusa damu moja kwa moja",
          "Tumia kizuizi ikiwa inawezekana",
        ],
      },
      {
        step: 2,
        titleEn: "Apply direct pressure",
        titleSw: "Weka shinikizo la moja kwa moja",
        instructionsEn: [
          "Use a clean cloth or gauze on the wound",
          "Press firmly and hold steady for 10–15 minutes",
          "Do not remove the first cloth; add more on top if soaked",
        ],
        instructionsSw: [
          "Tumia kitambaa safi au gauze kwenye jeraha",
          "Shinikiza kwa nguvu na usiondoe kwa dakika 10–15",
          "Usiondoe kitambaa cha kwanza; ongeza kingine juu ikiwa kimejaa damu",
        ],
        warningsEn: ["Do not poke or probe the wound"],
        warningsSw: ["Usichunguze au kuchoma ndani ya jeraha"],
      },
      {
        step: 3,
        titleEn: "Elevate and call for help",
        titleSw: "Inua na piga simu ya dharura",
        instructionsEn: [
          "Raise the injured area above heart level if possible",
          "Keep applying pressure",
          "Call 999 immediately",
        ],
        instructionsSw: [
          "Inua sehemu iliyojeruhiwa juu ya kiwango cha moyo ikiwezekana",
          "Endelea kuweka shinikizo",
          "Piga 999 mara moja",
        ],
      },
    ],
  },
  {
    id: "minor_cuts",
    category: "bleeding_wounds",
    nameEn: "Minor Cuts & Scrapes",
    nameSw: "Mikato Midogo",
    descriptionEn: "Small shallow cuts that stop bleeding quickly",
    descriptionSw: "Mikato midogo isiyo kirefu inayosimamisha damu haraka",
    icon: "🩹",
    keywords: ["cut", "scrape", "graze", "minor wound", "kukatwa", "jeraha dogo"],
    steps: [
      {
        step: 1,
        titleEn: "Clean the wound",
        titleSw: "Safisha jeraha",
        instructionsEn: [
          "Wash your hands with soap and water first",
          "Rinse the wound gently under clean running water",
          "Remove visible dirt — do not scrub deeply",
        ],
        instructionsSw: [
          "Osha mikono kwa sabuni na maji kwanza",
          "Sugua jeraha kwa upole kwa maji safi yanayotiririka",
          "Ondoa uchafu unaonekana — usisugue kwa nguvu",
        ],
      },
      {
        step: 2,
        titleEn: "Stop minor bleeding",
        titleSw: "Simamisha damu kidogo",
        instructionsEn: [
          "Apply gentle pressure with a clean cloth for 1–2 minutes",
          "Most small cuts stop bleeding on their own",
        ],
        instructionsSw: [
          "Weka shinikizo la upole kwa kitambaa safi kwa dakika 1–2",
          "Mikato midogo mingi husimamisha damu yenyewe",
        ],
      },
      {
        step: 3,
        titleEn: "Cover and monitor",
        titleSw: "Funika na ufuatilie",
        instructionsEn: [
          "Apply antiseptic if available",
          "Cover with a sterile adhesive bandage or gauze",
          "Change daily or when wet or dirty",
          "See a clinic if redness, swelling, or pus develops",
        ],
        instructionsSw: [
          "Paka dawa ya kuua vijidudu ikiwa ipo",
          "Funika kwa bandeji au gauze safi",
          "Badilisha kila siku au ikiwa imejaa maji au uchafu",
          "Tembelea kliniki ikiwa uwekundu, uvimbe, au usaha unaonekana",
        ],
      },
    ],
  },
  {
    id: "deep_cuts",
    category: "bleeding_wounds",
    nameEn: "Deep Cuts & Lacerations",
    nameSw: "Mikato ya Kina",
    descriptionEn: "Deep or gaping wounds that may need stitches",
    descriptionSw: "Mikato ya kina au iliyo wazi inayoweza kuhitaji kushonwa",
    icon: "🔪",
    keywords: ["deep cut", "laceration", "gaping wound", "stitches", "mikato ya kina"],
    steps: [
      {
        step: 1,
        titleEn: "Control bleeding",
        titleSw: "Dhibiti damu",
        instructionsEn: [
          "Apply firm direct pressure with a clean cloth",
          "Do not remove cloth if blood soaks through — add more layers",
          "Elevate the limb above heart level if possible",
        ],
        instructionsSw: [
          "Weka shinikizo la moja kwa moja kwa kitambaa safi",
          "Usiondoe kitambaa ikiwa damu imejaa — ongeza tabaka zaidi",
          "Inua kiungo juu ya kiwango cha moyo ikiwezekana",
        ],
        warningsEn: ["Call 999 if bleeding does not slow after 10 minutes of pressure"],
        warningsSw: ["Piga 999 ikiwa damu haipungui baada ya dakika 10 za shinikizo"],
      },
      {
        step: 2,
        titleEn: "Do not close the wound yourself",
        titleSw: "Usifunge jeraha mwenyewe",
        instructionsEn: [
          "Do not use tape or glue to close a deep wound",
          "Do not remove embedded objects — stabilise around them",
          "Keep the area clean and covered loosely",
        ],
        instructionsSw: [
          "Usitumie tepu au gundi kufunga jeraha la kina",
          "Usiondoe vitu vilivyokwama — vishikilie karibu navyo",
          "Weka eneo safi na lifunike kwa upole",
        ],
      },
      {
        step: 3,
        titleEn: "Seek medical care",
        titleSw: "Tafuta huduma ya kimatibabu",
        instructionsEn: [
          "Go to a health facility within 6–8 hours for possible stitches",
          "Watch for numbness, loss of movement, or severe pain",
          "Get a tetanus shot if wound is dirty or from a rusty object",
        ],
        instructionsSw: [
          "Nenda kituo cha afya ndani ya saa 6–8 kwa uwezekano wa kushonwa",
          "Angalia kupoteza hisia, kusogea, au maumivu makali",
          "Pata chanjo ya pepo ikiwa jeraha ni chafu au kutoka kwa chombo cha kutu",
        ],
      },
    ],
  },
  {
    id: "puncture_wounds",
    category: "bleeding_wounds",
    nameEn: "Puncture Wounds",
    nameSw: "Michomo",
    descriptionEn: "Nail, needle, or object puncture through the skin",
    descriptionSw: "Michomo kutoka kwa kucha, sindano, au chombo kingine",
    icon: "📌",
    keywords: ["puncture", "nail", "needle", "stepped on", "michomo", "kuchomwa"],
    steps: [
      {
        step: 1,
        titleEn: "Leave the object in place",
        titleSw: "Acha chombo mahali pake",
        instructionsEn: [
          "If an object is embedded, do not pull it out",
          "Stabilise the object with gauze or cloth around it",
          "Control bleeding with gentle pressure around the object",
        ],
        instructionsSw: [
          "Ikiwa chombo kimekwama, usikivute",
          "Shikilia chombo kwa gauze au kitambaa karibu nacho",
          "Dhibiti damu kwa shinikizo la upole karibu na chombo",
        ],
        warningsEn: ["Removing embedded objects can cause severe bleeding"],
        warningsSw: ["Kuondoa vitu vilivyokwama kunaweza kusababisha kutoka damu kwingi"],
      },
      {
        step: 2,
        titleEn: "Clean the area",
        titleSw: "Safisha eneo",
        instructionsEn: [
          "If object is removed or not present, wash around wound with clean water",
          "Do not probe inside the puncture",
          "Apply antiseptic to the skin surface only",
        ],
        instructionsSw: [
          "Ikiwa chombo kimeondolewa au hakipo, osha karibu na jeraha kwa maji safi",
          "Usichunguze ndani ya mchomo",
          "Paka dawa ya kuua vijidudu juu ya ngozi tu",
        ],
      },
      {
        step: 3,
        titleEn: "Get medical evaluation",
        titleSw: "Pata uchunguzi wa kimatibabu",
        instructionsEn: [
          "All puncture wounds need professional assessment",
          "Tetanus risk is high — seek vaccination if not up to date",
          "Watch for increasing pain, redness, or fever (signs of infection)",
        ],
        instructionsSw: [
          "Michomo yote inahitaji uchunguzi wa kitaalamu",
          "Hatari ya pepo ni kubwa — tafuta chanjo ikiwa haujasasishwa",
          "Angalia maumivu, uwekundu, au homa (dalili za maambukizi)",
        ],
      },
    ],
  },
  {
    id: "nosebleed",
    category: "bleeding_wounds",
    nameEn: "Nosebleed (Epistaxis)",
    nameSw: "Kutoka Damu Puani",
    descriptionEn: "Bleeding from the nose — usually not serious",
    descriptionSw: "Kutoka damu kutoka puani — kwa kawaida si hatari",
    icon: "👃",
    keywords: ["nosebleed", "nose bleed", "epistaxis", "damu puani", "pua"],
    steps: [
      {
        step: 1,
        titleEn: "Sit and lean forward",
        titleSw: "Kaa na uinamie mbele",
        instructionsEn: [
          "Sit upright — do not lie down",
          "Lean slightly forward so blood drains from the nose, not down the throat",
          "Pinch the soft part of the nose firmly for 10–15 minutes",
        ],
        instructionsSw: [
          "Kaa wima — usilale",
          "Inama kidogo mbele ili damu itoke puani, si kooni",
          "Bana sehemu laini ya puani kwa nguvu kwa dakika 10–15",
        ],
        warningsEn: ["Do not tilt the head back — blood can be swallowed"],
        warningsSw: ["Usiinamie kichwa nyuma — damu inaweza kumezwa"],
      },
      {
        step: 2,
        titleEn: "Apply cold compress",
        titleSw: "Weka kitambaa baridi",
        instructionsEn: [
          "Place a cold cloth or ice pack wrapped in fabric on the bridge of the nose",
          "Breathe through the mouth while pinching",
          "Release pressure briefly after 10 minutes to check if bleeding stopped",
        ],
        instructionsSw: [
          "Weka kitambaa baridi au barafu iliyofunikwa kwenye sehemu ya juu ya puani",
          "Pumua kupitia mdomo unapobana",
          "Achilia shinikizo kidogo baada ya dakika 10 kuona ikiwa damu imesimama",
        ],
      },
      {
        step: 3,
        titleEn: "Aftercare and when to seek help",
        titleSw: "Huduma baada na lini kutafuta msaada",
        instructionsEn: [
          "Avoid blowing the nose, heavy lifting, or hot drinks for 24 hours",
          "Seek medical help if bleeding lasts more than 20 minutes",
          "Call 999 if caused by a head injury or if blood loss is heavy",
        ],
        instructionsSw: [
          "Epuka kupiga chafya, kubeba mizigo, au vinywaji moto kwa saa 24",
          "Tafuta msaada ikiwa damu inaendelea zaidi ya dakika 20",
          "Piga 999 ikiwa imesababishwa na jeraha la kichwa au damu nyingi",
        ],
      },
    ],
  },

  // ── Burns ──────────────────────────────────────────────────────
  {
    id: "thermal_burn",
    category: "burns",
    nameEn: "Thermal Burns (Fire & Hot Objects)",
    nameSw: "Kuchomeka kwa Moto",
    descriptionEn: "Burns from fire, flames, or touching hot metal or surfaces",
    descriptionSw: "Kuchomeka kutoka moto, miale, au kugusa chuma au uso moto",
    icon: "🔥",
    keywords: ["burn", "fire", "flame", "hot metal", "thermal", "choma", "moto"],
    steps: [
      {
        step: 1,
        titleEn: "Stop the burning process",
        titleSw: "Simamisha kuchomeka",
        instructionsEn: [
          "Move the person away from the heat source",
          "Stop, drop, and roll if clothing is on fire",
          "Remove smouldering clothing unless stuck to skin",
        ],
        instructionsSw: [
          "Ondoa mtu kutoka chanzo cha moto",
          "Simama, anguka, na viringisha ikiwa nguo zinawaka",
          "Ondoa nguo zinazochoma isipokuwa zimekwama kwenye ngozi",
        ],
        warningsEn: ["Do not use ice — it can damage tissue further"],
        warningsSw: ["Usitumie barafu — inaweza kuharibu tishu zaidi"],
      },
      {
        step: 2,
        titleEn: "Cool the burn",
        titleSw: "Poza kuchomeka",
        instructionsEn: [
          "Cool under running lukewarm water for 20 minutes",
          "Remove jewellery and tight clothing while cooling",
          "Do not break blisters",
        ],
        instructionsSw: [
          "Poza kwa maji ya kawaida yanayotiririka kwa dakika 20",
          "Ondoa mapambo na nguo zilizobana unapopoza",
          "Usipasue malengelenge",
        ],
      },
      {
        step: 3,
        titleEn: "Cover and seek help",
        titleSw: "Funika na tafuta msaada",
        instructionsEn: [
          "Cover loosely with clean, non-fluffy cloth or cling film",
          "Seek emergency care for burns on face, hands, feet, or joints",
          "Call 999 for burns larger than the person's palm",
        ],
        instructionsSw: [
          "Funika kwa upole kwa kitambaa safi kisicho na manyoya",
          "Tafuta huduma ya dharura kwa kuchomeka usoni, mikono, miguu, au viungo",
          "Piga 999 kwa kuchomeka kikubwa kuliko kiganja cha mtu",
        ],
      },
    ],
  },
  {
    id: "scald_burn",
    category: "burns",
    nameEn: "Scald Burns (Hot Liquids & Steam)",
    nameSw: "Kuchomeka kwa Maji Moto",
    descriptionEn: "Burns from boiling water, hot oil, tea, or steam",
    descriptionSw: "Kuchomeka kutoka maji yanayochemka, mafuta moto, chai, au mvuke",
    icon: "♨️",
    keywords: ["scald", "hot water", "steam", "boiling", "oil burn", "maji moto", "mvuke"],
    steps: [
      {
        step: 1,
        titleEn: "Remove from hot liquid immediately",
        titleSw: "Ondoa kutoka maji moto mara moja",
        instructionsEn: [
          "Remove wet hot clothing carefully — it holds heat",
          "Do not peel clothing stuck to skin",
          "Start cooling immediately with running water",
        ],
        instructionsSw: [
          "Ondoa nguo za maji moto kwa uangalifu — zinashikilia joto",
          "Usivue nguo zilizokwama kwenye ngozi",
          "Anza kupoza mara moja kwa maji yanayotiririka",
        ],
      },
      {
        step: 2,
        titleEn: "Cool for 20 minutes",
        titleSw: "Poza kwa dakika 20",
        instructionsEn: [
          "Use cool running water — not ice",
          "Continue cooling even if pain reduces",
          "Keep the person warm elsewhere to prevent shock",
        ],
        instructionsSw: [
          "Tumia maji baridi yanayotiririka — si barafu",
          "Endelea kupoza hata ikiwa maumivu yamepungua",
          "Weka mtu joto mahali pengine ili kuepuka mshtuko",
        ],
      },
      {
        step: 3,
        titleEn: "Do not apply home remedies",
        titleSw: "Usitumie dawa za kienyeji",
        instructionsEn: [
          "Do not apply butter, toothpaste, or raw egg to burns",
          "Cover with clean dry dressing",
          "Seek medical help for scalds on children or large areas",
        ],
        instructionsSw: [
          "Usipake siagi, dawa ya meno, au mayai kwenye kuchomeka",
          "Funika kwa bandeji safi na kavu",
          "Tafuta msaada kwa kuchomeka kwa watoto au eneo kubwa",
        ],
      },
    ],
  },
  {
    id: "chemical_burn",
    category: "burns",
    nameEn: "Chemical Burns",
    nameSw: "Kuchomeka kwa Kemikali",
    descriptionEn: "Burns from acids, alkalis, cleaning products, or industrial chemicals",
    descriptionSw: "Kuchomeka kutoka asidi, alkali, bidhaa za kusafisha, au kemikali za viwandani",
    icon: "🧪",
    keywords: ["chemical burn", "acid", "alkali", "bleach", "kemikali", "asidi"],
    steps: [
      {
        step: 1,
        titleEn: "Protect yourself and remove chemical",
        titleSw: "Jilinde na uondoe kemikali",
        instructionsEn: [
          "Wear gloves if available before helping",
          "Brush off dry powder chemicals before rinsing",
          "Remove contaminated clothing carefully",
        ],
        instructionsSw: [
          "Vaa glavu ikiwa zipo kabla ya kusaidia",
          "Futa kemikali za unga kavu kabla ya kusugua",
          "Ondoa nguo zilizochafuliwa kwa uangalifu",
        ],
        warningsEn: ["Do not neutralise acids with alkalis or vice versa"],
        warningsSw: ["Usilinganishe asidi na alkali au kinyume chake"],
      },
      {
        step: 2,
        titleEn: "Flush with water",
        titleSw: "Sugua kwa maji",
        instructionsEn: [
          "Rinse affected area with running water for at least 20 minutes",
          "For eye contact: flush eye open with water, holding eyelids apart",
          "Continue flushing while calling for help",
        ],
        instructionsSw: [
          "Sugua eneo lililoathirika kwa maji yanayotiririka kwa angalau dakika 20",
          "Kwa macho: sugua jicho lililofunguliwa, shikilia vipeo mbali",
          "Endelea kusugua ukimpigia simu msaada",
        ],
      },
      {
        step: 3,
        titleEn: "Seek urgent medical care",
        titleSw: "Tafuta huduma ya haraka",
        instructionsEn: [
          "Call 999 or go to hospital — chemical burns need specialist care",
          "Bring the chemical container or label if possible",
          "Do not cover the burn with tight dressings before medical review",
        ],
        instructionsSw: [
          "Piga 999 au nenda hospitali — kuchomeka kwa kemikali kunahitaji huduma maalum",
          "Beba chombo cha kemikali au lebo ikiwezekana",
          "Usifunge kuchomeka kwa bandeji zilizobana kabla ya uchunguzi wa kimatibabu",
        ],
      },
    ],
  },
  {
    id: "electrical_burn",
    category: "burns",
    nameEn: "Electrical Burns",
    nameSw: "Kuchomeka kwa Umeme",
    descriptionEn: "Burns from electric shock — entry and exit wounds may both exist",
    descriptionSw: "Kuchomeka kutoka mshtuko wa umeme — majeraha ya kuingia na kutoka yanaweza kuwepo",
    icon: "⚡",
    keywords: ["electrical burn", "electric shock", "umeme", "mshtuko"],
    steps: [
      {
        step: 1,
        titleEn: "Ensure the area is safe",
        titleSw: "Hakikisha eneo ni salama",
        instructionsEn: [
          "Do not touch the person until power is switched off",
          "Use a dry non-conductive object to move them if power cannot be cut",
          "Call 999 immediately — internal injury is likely even if skin looks minor",
        ],
        instructionsSw: [
          "Usimguse mtu hadi umeme uzimwe",
          "Tumia chombo kisicho na umeme kumhamisha ikiwa umeme hauwezi kuzimwa",
          "Piga 999 mara moja — jeraha la ndani linawezekana hata ikiwa ngozi inaonekana kidogo",
        ],
        warningsEn: ["Never touch someone in contact with live electricity"],
        warningsSw: ["Kamwe usimguse mtu aliye kwenye umeme hai"],
      },
      {
        step: 2,
        titleEn: "Check breathing and start CPR if needed",
        titleSw: "Angalia kupumua na anza CPR ikiwa inahitajika",
        instructionsEn: [
          "Electrical shock can stop the heart",
          "Check responsiveness and breathing",
          "Begin CPR if not breathing — see CPR guide",
        ],
        instructionsSw: [
          "Mshtuko wa umeme unaweza kusimamisha moyo",
          "Angalia kujibu na kupumua",
          "Anza CPR ikiwa hapumui — angalia mwongozo wa CPR",
        ],
      },
      {
        step: 3,
        titleEn: "Treat visible burns and monitor",
        titleSw: "Tibu kuchomeka na ufuatilie",
        instructionsEn: [
          "Cool small surface burns with running water if person is stable",
          "Do not cool large burns if person is in shock",
          "All electrical burns require hospital assessment",
        ],
        instructionsSw: [
          "Poza kuchomeka kidogo kwa maji ikiwa mtu ni thabiti",
          "Usipoeze kuchomeka kikubwa ikiwa mtu yuko mshtukoni",
          "Kuchomeka kwa umeme kwote kunahitaji uchunguzi wa hospitali",
        ],
      },
    ],
  },
  {
    id: "sunburn",
    category: "burns",
    nameEn: "Sunburn",
    nameSw: "Kuchomeka na Jua",
    descriptionEn: "Mild to moderate sunburn from overexposure",
    descriptionSw: "Kuchomeka kidogo hadi wastani kutoka jua kali",
    icon: "☀️",
    keywords: ["sunburn", "sun burn", "sun", "jua", "kuchomeka jua"],
    steps: [
      {
        step: 1,
        titleEn: "Get out of the sun",
        titleSw: "Ondoka kwenye jua",
        instructionsEn: [
          "Move to shade or indoors immediately",
          "Cool skin with cool (not ice-cold) water or a damp cloth",
          "Drink plenty of water to prevent dehydration",
        ],
        instructionsSw: [
          "Hamia kwenye kivuli au ndani mara moja",
          "Poza ngozi kwa maji baridi au kitambaa cha maji",
          "Kunywa maji mengi ili kuepuka upungufu wa maji",
        ],
      },
      {
        step: 2,
        titleEn: "Soothe the skin",
        titleSw: "Tuliza ngozi",
        instructionsEn: [
          "Apply aloe vera gel or moisturiser if available",
          "Take paracetamol for pain if needed",
          "Wear loose, soft clothing over burned areas",
        ],
        instructionsSw: [
          "Paka jeli ya aloe vera au moisturiser ikiwa ipo",
          "Tumia paracetamol kwa maumivu ikiwa inahitajika",
          "Vaa nguo za kupumua, laini juu ya maeneo yaliyochomeka",
        ],
      },
      {
        step: 3,
        titleEn: "When to seek help",
        titleSw: "Lini kutafuta msaada",
        instructionsEn: [
          "See a doctor if blisters cover large areas or you feel unwell",
          "Seek urgent care for fever, chills, or severe blistering",
          "Protect skin from sun while healing — use SPF 30+",
        ],
        instructionsSw: [
          "Ona daktari ikiwa malengelenge yamefunika eneo kubwa au unajisikia vibaya",
          "Tafuta huduma ya haraka kwa homa, baridi, au malengelenge makali",
          "Linda ngozi kutoka jua unapopona — tumia SPF 30+",
        ],
      },
    ],
  },

  // ── Breathing & CPR ────────────────────────────────────────────
  {
    id: "choking",
    category: "breathing_cpr",
    nameEn: "Choking",
    nameSw: "Kukwama Chakula",
    descriptionEn: "Blocked airway — adult and child over 1 year",
    descriptionSw: "Njia ya hewa imezuiwa — mtu mzima na mtoto zaidi ya mwaka 1",
    icon: "😮",
    keywords: ["choking", "cannot breathe", "airway", "degedege", "kukwama"],
    steps: [
      {
        step: 1,
        titleEn: "Assess severity",
        titleSw: "Tathmini ukali",
        instructionsEn: [
          "Mild: person can speak, cough, or breathe — encourage coughing",
          "Severe: cannot speak, weak cough, clutching throat — act immediately",
          "Call 999 if person cannot breathe after attempts",
        ],
        instructionsSw: [
          "Kidogo: anaweza kuzungumza, kukohoa, au kupumua — mhimize akohoe",
          "Kali: hawezi kuzungumza, kukohoa kidogo, anashika shingo — chukua hatua mara moje",
          "Piga 999 ikiwa mtu hawezi kupumua baada ya majaribio",
        ],
      },
      {
        step: 2,
        titleEn: "Back blows",
        titleSw: "Mapigo ya mgongo",
        instructionsEn: [
          "Stand to the side and slightly behind the person",
          "Lean them forward and give up to 5 sharp blows between shoulder blades",
          "Check mouth between blows — remove visible object with finger sweep only",
        ],
        instructionsSw: [
          "Simama upande na nyuma kidogo ya mtu",
          "Mwinamie mbele na toa hadi mapigo 5 makali kati ya mabega",
          "Angalia mdomo kati ya mapigo — ondoa kitu kinachoonekana tu kwa kidole",
        ],
      },
      {
        step: 3,
        titleEn: "Abdominal thrusts (Heimlich)",
        titleSw: "Shinikizo la tumbo (Heimlich)",
        instructionsEn: [
          "Stand behind, wrap arms around waist",
          "Make a fist above navel, grasp with other hand",
          "Give up to 5 quick inward and upward thrusts",
          "Alternate back blows and thrusts until object is expelled",
        ],
        instructionsSw: [
          "Simama nyuma, funga mikono kiunoni",
          "Fanya ngumi juu ya kitovu, shikilia kwa mkono mwingine",
          "Toa hadi shinikizo 5 za ndani na juu haraka",
          "Badilisha mapigo ya mgongo na shinikizo hadi kitu kitoke",
        ],
        warningsEn: ["For infants under 1 year, use back blows and chest thrusts — not abdominal thrusts"],
        warningsSw: ["Kwa watoto chini ya mwaka 1, tumia mapigo ya mgongo na kifua — si tumbo"],
      },
    ],
  },
  {
    id: "cpr",
    category: "breathing_cpr",
    nameEn: "CPR Basics",
    nameSw: "Misingi ya CPR",
    descriptionEn: "When someone is unresponsive and not breathing normally",
    descriptionSw: "Mtu asipojibu na hapumui kawaida",
    icon: "❤️",
    keywords: ["cpr", "not breathing", "unresponsive", "cardiac arrest", "hapumui"],
    steps: [
      {
        step: 1,
        titleEn: "Check responsiveness",
        titleSw: "Angalia kama anajibu",
        instructionsEn: [
          "Tap shoulders and shout loudly",
          "Check for normal breathing for no more than 10 seconds",
          "Call 999 or ask someone else to call",
        ],
        instructionsSw: [
          "Gusa mabega na piga kelele kwa sauti",
          "Angalia kupumua kwa kawaida kwa sekunde 10 tu",
          "Piga 999 au mwombe mtu mwingine apige",
        ],
      },
      {
        step: 2,
        titleEn: "Start chest compressions",
        titleSw: "Anza shinikizo la kifua",
        instructionsEn: [
          "Place heel of hand on centre of chest, other hand on top",
          "Push hard and fast — 100–120 compressions per minute",
          "Allow chest to rise fully between compressions",
          "Continue until help arrives or person starts breathing",
        ],
        instructionsSw: [
          "Weka kisigino cha mkono katikati ya kifua, mkono mwingine juu",
          "Shinikiza kwa nguvu na haraka — 100–120 kwa dakika",
          "Ruhusu kifua kinue kikamilifu kati ya shinikizo",
          "Endelea hadi msaada ufike au mtu aanze kupumua",
        ],
      },
      {
        step: 3,
        titleEn: "Rescue breaths (if trained)",
        titleSw: "Pumzi za uokoaji (ikiwa umefunzwa)",
        instructionsEn: [
          "After 30 compressions, give 2 rescue breaths if trained and willing",
          "If not trained, continue compressions only — this is still effective",
          "Use an AED (defibrillator) if one is available",
        ],
        instructionsSw: [
          "Baada ya shinikizo 30, toa pumzi 2 za uokoaji ikiwa umefunzwa",
          "Ikiwa hujafunzwa, endelea shinikizo tu — bado ni yenye ufanisi",
          "Tumia AED (defibrillator) ikiwa inapatikana",
        ],
      },
    ],
  },

  // ── Bones & Sprains ────────────────────────────────────────────
  {
    id: "fracture_sprain",
    category: "bones_muscles",
    nameEn: "Fractures & Sprains",
    nameSw: "Mifupa Iliyovunjika na Kuvutika",
    descriptionEn: "Broken bones, sprains, and joint injuries",
    descriptionSw: "Mifupa iliyovunjika, kuvutika, na majeraha ya viungo",
    icon: "🦴",
    keywords: ["fracture", "broken bone", "sprain", "twist", "mifupa", "kuvutika"],
    steps: [
      {
        step: 1,
        titleEn: "RICE — Rest, Ice, Compression, Elevation",
        titleSw: "RICE — Pumzika, Barafu, Shinikizo, Kuinua",
        instructionsEn: [
          "Rest: stop activity and avoid putting weight on the injury",
          "Ice: apply wrapped ice for 15–20 minutes every 2–3 hours",
          "Compression: wrap with elastic bandage — snug but not tight",
          "Elevation: raise injured limb above heart level",
        ],
        instructionsSw: [
          "Pumzika: acha shughuli na usiweke uzito kwenye jeraha",
          "Barafu: weka barafu iliyofunikwa kwa dakika 15–20 kila masaa 2–3",
          "Shinikizo: funga kwa bandeji ya elastic — iliyobana lakini si kali",
          "Kuinua: inua kiungo kilichojeruhiwa juu ya kiwango cha moyo",
        ],
      },
      {
        step: 2,
        titleEn: "Immobilise if fracture suspected",
        titleSw: "Simamisha ikiwa mifupa imevunjika",
        instructionsEn: [
          "Use a sling for arm injuries",
          "Splint leg injuries in the position found — do not straighten",
          "Do not move someone with a suspected neck or back fracture",
        ],
        instructionsSw: [
          "Tumia sling kwa majeraha ya mkono",
          "Weka splint kwa miguu katika nafasi ilipopatikana — usinyoshe",
          "Usimhamishe mtu aliye na shaka ya mifupa ya shingo au mgongo",
        ],
        warningsEn: ["Never try to push a broken bone back into place"],
        warningsSw: ["Kamwe usijaribu kurudisha mfupa uliovunjika mahali pake"],
      },
      {
        step: 3,
        titleEn: "Seek medical care",
        titleSw: "Tafuta huduma ya kimatibabu",
        instructionsEn: [
          "See a health facility for X-ray if fracture is suspected",
          "Signs of fracture: severe pain, swelling, deformity, inability to move",
          "Call 999 for open fractures (bone visible through skin)",
        ],
        instructionsSw: [
          "Tembelea kituo cha afya kwa X-ray ikiwa mifupa imevunjika",
          "Dalili: maumivu makali, uvimbe, ulemavu, kutoweza kusogea",
          "Piga 999 kwa mifupa iliyovunjika wazi (mfupa unaonekana)",
        ],
      },
    ],
  },

  // ── Other Emergencies ────────────────────────────────────────────
  {
    id: "fainting",
    category: "general",
    nameEn: "Fainting",
    nameSw: "Kuzimia",
    descriptionEn: "Brief loss of consciousness",
    descriptionSw: "Kupoteza fahamu kwa muda mfupi",
    icon: "😵",
    keywords: ["fainting", "faint", "passed out", "kuzimia", "amezimia"],
    steps: [
      {
        step: 1,
        titleEn: "Position safely",
        titleSw: "Weka katika nafasi salama",
        instructionsEn: [
          "Lay the person flat on their back",
          "Raise legs about 30 cm if possible",
          "Loosen tight clothing around neck and waist",
        ],
        instructionsSw: [
          "Mlaze mtu chali",
          "Inua miguu takriban cm 30 ikiwezekana",
          "Vua nguo zilizobana shingoni na kiunoni",
        ],
      },
      {
        step: 2,
        titleEn: "Monitor and seek help",
        titleSw: "Fuatilia na tafuta msaada",
        instructionsEn: [
          "Check breathing and responsiveness",
          "If they do not wake within 1–2 minutes, call 999",
          "Do not give food or drink until fully alert",
        ],
        instructionsSw: [
          "Angalia kupumua na kujibu",
          "Ikiwa haamki ndani ya dakika 1–2, piga 999",
          "Usipe chakula au vinywaji hadi aamke kikamilifu",
        ],
      },
    ],
  },
  {
    id: "allergic_reaction",
    category: "general",
    nameEn: "Allergic Reaction",
    nameSw: "Mzio",
    descriptionEn: "Mild to severe allergic reactions including anaphylaxis",
    descriptionSw: "Mzio wa kidogo hadi mkali ikiwa ni pamoja na anaphylaxis",
    icon: "🤧",
    keywords: ["allergy", "allergic", "rash", "hives", "swelling", "anaphylaxis", "mzio"],
    steps: [
      {
        step: 1,
        titleEn: "Recognise severity",
        titleSw: "Tambua ukali",
        instructionsEn: [
          "Mild: itching, hives, local swelling — monitor closely",
          "Severe: difficulty breathing, throat swelling, dizziness — call 999 immediately",
          "Ask if person has an epinephrine auto-injector (EpiPen)",
        ],
        instructionsSw: [
          "Kidogo: kuwasha, vipele, uvimbe — fuatilia kwa karibu",
          "Kali: ugumu wa kupumua, uvimbe wa koo, kizunguzungu — piga 999 mara moja",
          "Uliza ikiwa mtu ana sindano ya epinephrine (EpiPen)",
        ],
      },
      {
        step: 2,
        titleEn: "Use EpiPen if available",
        titleSw: "Tumia EpiPen ikiwa ipo",
        instructionsEn: [
          "Inject into outer thigh — can go through clothing",
          "Hold for 10 seconds, then massage injection site",
          "A second dose may be needed after 5–15 minutes if no improvement",
        ],
        instructionsSw: [
          "Choma kwenye paja la nje — inaweza kupitia nguo",
          "Shikilia kwa sekunde 10, kisha sukuma eneo la sindano",
          "Dozi ya pili inaweza kuhitajika baada ya dakika 5–15 ikiwa hakuna mabadiliko",
        ],
        warningsEn: ["Always call 999 after using an EpiPen — further treatment is needed"],
        warningsSw: ["Daima piga 999 baada ya kutumia EpiPen — matibabu zaidi yanahitajika"],
      },
      {
        step: 3,
        titleEn: "Position and monitor",
        titleSw: "Weka nafasi na ufuatilie",
        instructionsEn: [
          "If breathing is difficult, help person sit upright",
          "If faint or in shock, lay flat with legs raised",
          "Stay with person until emergency services arrive",
        ],
        instructionsSw: [
          "Ikiwa kupumua ni kugumu, msaidie aketi wima",
          "Ikiwa amezimia au mshtukoni, mlaze chali na miguu iinuliwe",
          "Kaa na mtu hadi huduma za dharura zifike",
        ],
      },
    ],
  },
  {
    id: "heat_exhaustion",
    category: "general",
    nameEn: "Heat Exhaustion",
    nameSw: "Uchovu wa Joto",
    descriptionEn: "Overheating from hot weather or strenuous activity",
    descriptionSw: "Joto kupita kiasi kutoka hali ya hewa au shughuli ngumu",
    icon: "🌡️",
    keywords: ["heat exhaustion", "overheating", "dehydration", "hot weather", "joto", "uchovu"],
    steps: [
      {
        step: 1,
        titleEn: "Move to a cool place",
        titleSw: "Hamia mahali pazuri",
        instructionsEn: [
          "Move to shade or an air-conditioned room",
          "Remove excess clothing",
          "Lie down with legs slightly raised",
        ],
        instructionsSw: [
          "Hamia kwenye kivuli au chumba chenye hewa baridi",
          "Vua nguo za ziada",
          "Lala chali na miguu iinuliwe kidogo",
        ],
      },
      {
        step: 2,
        titleEn: "Cool and rehydrate",
        titleSw: "Poza na rejesha maji",
        instructionsEn: [
          "Give small sips of water or oral rehydration solution",
          "Apply cool wet cloths to neck, armpits, and groin",
          "Fan the person while cooling",
        ],
        instructionsSw: [
          "Mpe maji kidogo kidogo au ORS",
          "Weka vitambaa baridi kwenye shingo, kwapa, na kinena",
          "Mpepea mtu unapomfanya baridi",
        ],
      },
      {
        step: 3,
        titleEn: "Watch for heatstroke",
        titleSw: "Angalia kiharusi cha joto",
        instructionsEn: [
          "Call 999 if person becomes confused, stops sweating, or loses consciousness",
          "Heatstroke is a medical emergency — skin may be hot and dry",
          "Do not give fluids if person is unconscious",
        ],
        instructionsSw: [
          "Piga 999 ikiwa mtu anachanganyikiwa, anaacha kutoa jasho, au anazimia",
          "Kiharusi cha joto ni dharura — ngozi inaweza kuwa moto na kavu",
          "Usipe maji ikiwa mtu amezimia",
        ],
        warningsEn: ["Heatstroke can be fatal — act quickly if symptoms worsen"],
        warningsSw: ["Kiharusi cha joto kinaweza kuua — chukua hatua haraka ikiwa dalili zinazidi"],
      },
    ],
  },
];

export function getFirstAidCategory(id: FirstAidCategoryId): FirstAidCategory | undefined {
  return FIRST_AID_CATEGORIES.find((c) => c.id === id);
}

export function getFirstAidGuide(id: string): FirstAidGuide | undefined {
  return FIRST_AID_GUIDES.find((g) => g.id === id);
}

export function getGuidesByCategory(categoryId: FirstAidCategoryId): FirstAidGuide[] {
  return FIRST_AID_GUIDES.filter((g) => g.category === categoryId);
}

export function searchFirstAidGuides(query: string): FirstAidGuide[] {
  const lower = query.toLowerCase().trim();
  if (!lower) return FIRST_AID_GUIDES;

  return FIRST_AID_GUIDES.filter((g) => {
    const category = getFirstAidCategory(g.category);
    return (
      g.nameEn.toLowerCase().includes(lower) ||
      g.nameSw.toLowerCase().includes(lower) ||
      g.descriptionEn.toLowerCase().includes(lower) ||
      g.descriptionSw.toLowerCase().includes(lower) ||
      g.keywords.some((kw) => kw.includes(lower) || lower.includes(kw)) ||
      category?.nameEn.toLowerCase().includes(lower) ||
      category?.nameSw.toLowerCase().includes(lower)
    );
  });
}
