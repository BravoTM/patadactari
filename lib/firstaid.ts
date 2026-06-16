export interface FirstAidStep {
  step: number;
  title: string;
  description: string;
  instructions: string[];
  warnings?: string[];
}

export interface FirstAidGuide {
  id: string;
  nameEn: string;
  nameSw: string;
  descriptionEn: string;
  descriptionSw: string;
  steps: FirstAidStep[];
  emergencyKeywords: string[];
}

export interface Disease {
  id: string;
  nameEn: string;
  nameSw: string;
  descriptionEn: string;
  descriptionSw: string;
  symptoms: string[]; // lowercase keywords to match against
  commonSymptoms: string[];
  severity: "low" | "medium" | "high" | "critical";
  recommendations: string[];
  whenToSeekHelp: string[];
}

export const DISEASES_DATABASE: Disease[] = [
  {
    id: "flu",
    nameEn: "Influenza (Flu)",
    nameSw: "Mafua (Flu)",
    descriptionEn: "Viral respiratory infection causing fever, body aches, and fatigue",
    descriptionSw: "Maambukizo ya kuvimba vya kupumzika yanayosababisha homa, maumivu ya mwili",
    symptoms: ["fever", "cough", "body aches", "fatigue", "headache", "chills", "homa", "kikohozi", "maumivu"],
    commonSymptoms: ["High fever (39-40°C)", "Dry cough", "Severe body aches", "Fatigue", "Headache", "Chills"],
    severity: "medium",
    recommendations: [
      "Rest and get plenty of sleep",
      "Stay hydrated - drink water, warm tea",
      "Gargle with salt water for sore throat",
      "Use warm compress for body aches",
      "Eat nutritious foods when able",
    ],
    whenToSeekHelp: [
      "Fever persists more than 5-7 days",
      "Difficulty breathing",
      "Chest pain",
      "Confusion or severe weakness",
      "If high-risk (elderly, pregnant, chronic illness)",
    ],
  },
  {
    id: "common_cold",
    nameEn: "Common Cold",
    nameSw: "Baridi ya Kawaida",
    descriptionEn: "Mild viral infection with runny nose, sneezing, cough",
    descriptionSw: "Maambukizo dogo ya kuvimba na kufua maji, kunechemea, kikohozi",
    symptoms: ["runny nose", "sneezing", "cough", "sore throat", "mild fever", "congestion", "maji", "nechemea"],
    commonSymptoms: ["Runny or stuffy nose", "Sneezing", "Mild cough", "Sore throat", "Mild fatigue"],
    severity: "low",
    recommendations: [
      "Rest at home",
      "Drink warm liquids (tea with honey)",
      "Use saline nasal drops",
      "Gargle with salt water",
      "Take vitamin C",
    ],
    whenToSeekHelp: [
      "Symptoms last more than 2 weeks",
      "High fever (over 39°C)",
      "Difficulty breathing",
      "Severe headache",
    ],
  },
  {
    id: "malaria",
    nameEn: "Malaria",
    nameSw: "Malaria",
    descriptionEn: "Parasitic disease transmitted by mosquitoes causing fever cycles",
    descriptionSw: "Ugonjwa wa parasite uliotumwa na mbu unasababisha mzunguko wa homa",
    symptoms: ["fever", "chills", "sweating", "headache", "malaria", "cycles", "mzunguko wa homa", "malaria", "kufa"],
    commonSymptoms: ["Cyclic high fever (comes in waves)", "Severe chills", "Profuse sweating", "Severe headache", "Body aches", "Weakness"],
    severity: "high",
    recommendations: [
      "Seek medical help immediately - requires blood test",
      "Start antimalarial medication as prescribed",
      "Stay in bed and rest",
      "Drink fluids to prevent dehydration",
      "Use mosquito nets at night",
    ],
    whenToSeekHelp: [
      "Any suspected malaria should be confirmed with blood test",
      "Fever with chills and sweating",
      "Confusion or severe weakness",
      "In endemic areas, always seek testing",
    ],
  },
  {
    id: "typhoid",
    nameEn: "Typhoid Fever",
    nameSw: "Homa ya Typhoid",
    descriptionEn: "Bacterial infection from contaminated food/water causing prolonged fever",
    descriptionSw: "Maambukizo ya bacterial kutoka kwa chakula/maji mengine yanayosababisha homa mrefu",
    symptoms: ["sustained fever", "headache", "weakness", "stomach pain", "typhoid", "diarrhea", "constipation", "rose spots"],
    commonSymptoms: ["Sustained high fever (gradually increasing)", "Severe headache", "Weakness", "Abdominal pain", "Rash on chest"],
    severity: "high",
    recommendations: [
      "Seek medical evaluation and blood test",
      "May require hospitalization and antibiotics",
      "Rest completely in bed",
      "Drink clean water and oral rehydration solution",
      "Eat soft, easily digestible foods",
    ],
    whenToSeekHelp: [
      "Fever lasting more than 3-5 days",
      "Sustained high fever over 39°C",
      "Severe headache and weakness",
      "Any abdominal complications",
      "Contact medical facility immediately",
    ],
  },
  {
    id: "cholera",
    nameEn: "Cholera",
    nameSw: "Cholera",
    descriptionEn: "Severe diarrheal disease causing rapid dehydration - medical emergency",
    descriptionSw: "Ugonjwa mkubwa wa kufula unasababisha kufa kwa haraka kwa maji - dharura ya kimatibabu",
    symptoms: ["watery diarrhea", "vomiting", "cholera", "dehydration", "severe", "cramping", "kufula", "kupumzika"],
    commonSymptoms: ["Profuse watery diarrhea (rice water stools)", "Severe vomiting", "Rapid dehydration", "Muscle cramps", "Shock"],
    severity: "critical",
    recommendations: [
      "EMERGENCY - Call 999 immediately",
      "Replace fluids with ORS (Oral Rehydration Solution)",
      "Do not eat solid food initially",
      "Seek immediate medical care",
      "Hospitalization likely needed",
    ],
    whenToSeekHelp: [
      "Any suspected cholera is an emergency",
      "Severe watery diarrhea requires immediate care",
      "Signs of severe dehydration",
      "Call emergency services immediately",
    ],
  },
  {
    id: "pneumonia",
    nameEn: "Pneumonia",
    nameSw: "Pneumonia",
    descriptionEn: "Lung infection causing cough, chest pain, difficulty breathing",
    descriptionSw: "Maambukizo ya mapafu yanayosababisha kikohozi, maumivu ya kifua, mgogoro",
    symptoms: ["cough", "chest pain", "fever", "pneumonia", "difficulty breathing", "breathless", "mgogoro", "mapafu"],
    commonSymptoms: ["Productive cough (with phlegm)", "Chest pain when breathing", "Fever", "Difficulty breathing", "Shortness of breath"],
    severity: "high",
    recommendations: [
      "Seek medical evaluation",
      "Get chest X-ray if suspected",
      "May require antibiotics",
      "Rest in upright position",
      "Drink warm liquids",
      "Use cool mist humidifier",
    ],
    whenToSeekHelp: [
      "Persistent cough with fever",
      "Chest pain when breathing",
      "Shortness of breath",
      "High fever (over 39°C)",
      "Confusion or severe weakness",
    ],
  },
  {
    id: "gastroenteritis",
    nameEn: "Gastroenteritis (Stomach Flu)",
    nameSw: "Gastroenteritis",
    descriptionEn: "Viral or bacterial infection causing nausea, vomiting, diarrhea",
    descriptionSw: "Maambukizo ya viral au bacterial yanayosababisha mbuvu, kupiga, kufula",
    symptoms: ["nausea", "vomiting", "diarrhea", "stomach pain", "kufula", "mbuvu", "tumboni", "gastro"],
    commonSymptoms: ["Nausea and vomiting", "Watery diarrhea", "Stomach cramps", "Loss of appetite", "Mild fever"],
    severity: "medium",
    recommendations: [
      "Rest and avoid solid food initially",
      "Use ORS for rehydration",
      "Gradually return to bland foods (rice, bread)",
      "Stay hydrated with small frequent sips",
      "Avoid dairy and fatty foods",
    ],
    whenToSeekHelp: [
      "Severe dehydration signs (dark urine, dizziness)",
      "Vomiting lasting more than 2-3 hours",
      "Bloody stools or vomit",
      "Severe abdominal pain",
      "High fever or symptoms in children/elderly",
    ],
  },
  {
    id: "asthma",
    nameEn: "Asthma Attack",
    nameSw: "Mkazo wa Asthma",
    descriptionEn: "Narrowing of airways causing difficulty breathing - may be emergency",
    descriptionSw: "Kupungua kwa njia za kupumzika kunasababisha mgogoro - inaweza kuwa dharura",
    symptoms: ["shortness of breath", "wheezing", "chest tightness", "asthma", "difficulty breathing", "breathless", "mgogoro"],
    commonSymptoms: ["Difficulty breathing", "Wheezing", "Chest tightness", "Coughing at night", "Fatigue during exertion"],
    severity: "high",
    recommendations: [
      "Use rescue inhaler if available",
      "Sit upright and try to stay calm",
      "Breathe slowly and deeply",
      "Identify and avoid triggers",
      "Keep rescue inhaler accessible",
    ],
    whenToSeekHelp: [
      "Difficulty speaking full sentences",
      "Severe shortness of breath",
      "Blue lips or face",
      "No improvement after rescue inhaler",
      "Severe anxiety or panic",
    ],
  },
  {
    id: "hypertension",
    nameEn: "High Blood Pressure",
    nameSw: "Shinikizo la Juu la Damu",
    descriptionEn: "Elevated blood pressure increasing heart disease and stroke risk",
    descriptionSw: "Shinikizo lililobadilika la damu linaloongeza hatari ya saratani ya moyo",
    symptoms: ["high blood pressure", "headache", "dizziness", "chest pain", "shortness of breath", "hypertension"],
    commonSymptoms: ["Often no symptoms (silent killer)", "Headache", "Dizziness", "Shortness of breath", "Fatigue"],
    severity: "high",
    recommendations: [
      "Get blood pressure checked regularly",
      "Reduce salt intake",
      "Exercise regularly (30 mins/day)",
      "Manage stress",
      "Take prescribed medications",
      "Maintain healthy weight",
    ],
    whenToSeekHelp: [
      "Blood pressure consistently above 140/90",
      "Severe headache with very high BP",
      "Chest pain",
      "Severe shortness of breath",
      "Confusion or vision changes",
    ],
  },
  {
    id: "diabetes",
    nameEn: "Diabetes Symptoms",
    nameSw: "Dalili za Sukari",
    descriptionEn: "Elevated blood sugar causing increased thirst, urination, fatigue",
    descriptionSw: "Sukari ya juu ya damu yanasababisha tamaa nyingi, kuburudika nyingi, uchovu",
    symptoms: ["diabetes", "increased thirst", "frequent urination", "fatigue", "blurred vision", "sore", "sukari"],
    commonSymptoms: ["Excessive thirst", "Frequent urination", "Fatigue", "Blurred vision", "Slow healing wounds"],
    severity: "medium",
    recommendations: [
      "Get blood sugar tested",
      "Maintain healthy diet (reduce sugar)",
      "Exercise regularly",
      "Maintain healthy weight",
      "Monitor blood sugar if diabetic",
      "Take medications as prescribed",
    ],
    whenToSeekHelp: [
      "Persistent excessive thirst and urination",
      "Unexplained weight loss",
      "Blurred vision",
      "Frequent infections",
      "Get fasting blood sugar test done",
    ],
  },
  {
    id: "dengue",
    nameEn: "Dengue Fever",
    nameSw: "Homa ya Dengue",
    descriptionEn: "Mosquito-borne viral infection causing high fever and joint pain",
    descriptionSw: "Maambukizo ya kuvimba yenye juu sana iliyotumwa na mbu inasababisha homa na maumivu ya kiungo",
    symptoms: ["dengue", "high fever", "joint pain", "rash", "pain behind eyes", "dengue", "mbu", "maumivu"],
    commonSymptoms: ["Sudden high fever (39-40°C)", "Severe joint and muscle pain", "Rash on body", "Pain behind eyes", "Headache"],
    severity: "high",
    recommendations: [
      "See doctor for confirmation (blood test)",
      "Rest completely",
      "Drink plenty of fluids",
      "Use acetaminophen for pain (not aspirin)",
      "Use mosquito nets",
    ],
    whenToSeekHelp: [
      "High fever with severe pain",
      "Any dengue symptoms in endemic areas",
      "Petechial rash (small red spots)",
      "Bleeding or severe weakness",
      "Confusion or severe headache",
    ],
  },
  {
    id: "migraine",
    nameEn: "Migraine Headache",
    nameSw: "Maumivu ya Kichwa (Migraine)",
    descriptionEn: "Severe one-sided headache with nausea and sensitivity to light",
    descriptionSw: "Maumivu makubwa ya upande mmoja wa kichwa na mbuvu na kuzuia kwa taa",
    symptoms: ["migraine", "severe headache", "nausea", "light sensitivity", "visual disturbance", "aura", "kichwa"],
    commonSymptoms: ["One-sided severe headache", "Nausea and vomiting", "Sensitivity to light and sound", "Visual disturbances", "Numbness"],
    severity: "medium",
    recommendations: [
      "Rest in quiet, dark room",
      "Apply cold or warm compress",
      "Stay hydrated",
      "Take pain relievers (paracetamol/ibuprofen)",
      "Identify triggers (stress, foods, sleep)",
    ],
    whenToSeekHelp: [
      "Sudden worst headache of your life",
      "Headache with fever and stiff neck",
      "Change in migraine pattern",
      "Headache with vision changes",
      "Confusion or difficulty speaking",
    ],
  },
];

export function getDiseasesFromSymptoms(symptoms: string): Disease[] {
  if (!symptoms.trim()) return [];
  
  const userSymptoms = symptoms.toLowerCase().split(/[\s,]+/).filter(s => s.length > 2);
  
  const matches = DISEASES_DATABASE.map(disease => {
    const matchCount = userSymptoms.filter(symptom =>
      disease.symptoms.some(diseaseSymptom =>
        diseaseSymptom.includes(symptom) || symptom.includes(diseaseSymptom)
      )
    ).length;
    
    return { disease, matchCount };
  })
    .filter(item => item.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, 6) // Return top 6 matches
    .map(item => item.disease);
  
  return matches;
}

export const FIRST_AID_GUIDES: FirstAidGuide[] = [
  {
    id: "cpr",
    nameEn: "CPR (Cardiopulmonary Resuscitation)",
    nameSw: "CPR (Ubuvu wa Moyo na Kupumzika)",
    descriptionEn:
      "Immediate life-saving technique for unresponsive individuals who are not breathing",
    descriptionSw:
      "Mbinu ya kuokoa maisha kwa haraka kwa watu wasiojitambua wasiodada",
    steps: [
      {
        step: 1,
        title: "Check Responsiveness",
        description: "Ensure the person is unresponsive",
        instructions: [
          "Tap the person's shoulders",
          "Shout 'Are you okay?'",
          "Check if they respond to pain",
        ],
        warnings: [
          "Do not move them unless in immediate danger",
          "Call emergency services (999) immediately",
        ],
      },
      {
        step: 2,
        title: "Open Airway",
        description: "Position the head to open the airway",
        instructions: [
          "Place the person on their back",
          "Tilt head back slightly (head tilt-chin lift)",
          "Lift chin to open airway",
        ],
        warnings: [
          "Avoid hyperextending the neck",
          "If spinal injury suspected, do not move neck",
        ],
      },
      {
        step: 3,
        title: "Check Breathing",
        description: "Determine if the person is breathing",
        instructions: [
          "Look, listen, and feel for breathing",
          "Check for no more than 10 seconds",
          "If not breathing, begin CPR",
        ],
      },
      {
        step: 4,
        title: "Hand Position",
        description: "Position hands on the chest",
        instructions: [
          "Place heel of one hand on center of chest",
          "Place other hand on top, interlace fingers",
          "Keep arms straight",
        ],
      },
      {
        step: 5,
        title: "Chest Compressions",
        description: "Perform chest compressions at correct rate",
        instructions: [
          "Push hard and fast at 100-120 compressions per minute",
          "Push down at least 2 inches (5 cm)",
          "Allow chest to recoil completely between compressions",
        ],
        warnings: [
          "Do not stop unless told by medical professionals",
          "Rotate with another person if exhausted",
        ],
      },
      {
        step: 6,
        title: "Rescue Breaths",
        description: "Give rescue breaths (optional for lay rescuers)",
        instructions: [
          "Give 2 breaths after every 30 compressions",
          "Pinch nose, seal mouth over mouth",
          "Give each breath for 1 second",
        ],
        warnings: [
          "If uncomfortable, continue compressions only",
          "If trained, follow proper technique",
        ],
      },
    ],
    emergencyKeywords: ["cpr", "not breathing", "unresponsive", "cardiac arrest"],
  },
  {
    id: "choking",
    nameEn: "Choking - Heimlich Maneuver",
    nameSw: "Degedege - Mbinu ya Heimlich",
    descriptionEn: "Emergency response for airway obstruction",
    descriptionSw: "Jibu la dharura kwa kuzuia njia ya kupumzika",
    steps: [
      {
        step: 1,
        title: "Identify Choking",
        description: "Recognize signs of choking",
        instructions: [
          "Person cannot speak or cry",
          "Weak or no cough",
          "Difficulty breathing",
          "Skin turning pale or blue",
        ],
      },
      {
        step: 2,
        title: "Encourage Coughing",
        description: "If person can cough, encourage it",
        instructions: [
          "Encourage forceful coughing",
          "Do not interfere if they can cough",
          "Monitor closely in case it worsens",
        ],
      },
      {
        step: 3,
        title: "Position Yourself",
        description: "Stand behind the person",
        instructions: [
          "Stand behind the person",
          "Wrap arms around waist",
          "Tip person forward slightly",
        ],
      },
      {
        step: 4,
        title: "Hand Position",
        description: "Place hands correctly",
        instructions: [
          "Make a fist just above navel",
          "Place fist between navel and rib cage",
          "Grasp fist with other hand",
        ],
      },
      {
        step: 5,
        title: "Heimlich Maneuver",
        description: "Perform quick upward thrusts",
        instructions: [
          "Press into abdomen with quick upward thrusts",
          "Repeat thrusts until object is dislodged",
          "Or until person becomes unconscious",
        ],
        warnings: [
          "If person becomes unconscious, begin CPR",
          "Call emergency services immediately",
        ],
      },
      {
        step: 6,
        title: "For Unconscious Person",
        description: "Begin CPR and check mouth",
        instructions: [
          "Place person on back",
          "Open mouth and check for object",
          "Remove object if visible (finger sweep)",
          "Begin CPR if needed",
        ],
      },
    ],
    emergencyKeywords: [
      "choking",
      "chocking",
      "degedege",
      "cannot breathe",
      "airway",
    ],
  },
  {
    id: "severe_bleeding",
    nameEn: "Severe Bleeding",
    nameSw: "Kutoka Damu Nyingi",
    descriptionEn: "Control and stop life-threatening blood loss",
    descriptionSw: "Kudhibiti na kusimamisha kutoka damu kupiga maisha",
    steps: [
      {
        step: 1,
        title: "Ensure Safety",
        description: "Protect yourself from bloodborne pathogens",
        instructions: [
          "Wear gloves if available",
          "Avoid direct contact with blood",
          "Use barrier protection",
        ],
      },
      {
        step: 2,
        title: "Apply Pressure",
        description: "Apply direct pressure to wound",
        instructions: [
          "Use clean cloth or gauze",
          "Press firmly on the wound",
          "Do not remove first cloth; add more if needed",
        ],
        warnings: [
          "Do not poke or probe the wound",
          "Maintain pressure for 10-15 minutes minimum",
        ],
      },
      {
        step: 3,
        title: "Elevate if Possible",
        description: "Raise injured area above heart",
        instructions: [
          "Elevate the bleeding area above heart level",
          "This reduces blood flow to the wound",
          "Continue applying pressure",
        ],
      },
      {
        step: 4,
        title: "Apply Pressure Points",
        description: "Use pressure points if bleeding continues",
        instructions: [
          "For arm: apply pressure to inner elbow",
          "For leg: apply pressure to groin",
          "Continue applying direct pressure simultaneously",
        ],
      },
      {
        step: 5,
        title: "Apply Tourniquet (if needed)",
        description: "Use tourniquet for life-threatening limb bleeding",
        instructions: [
          "Place tourniquet 2-3 inches above wound",
          "Tighten until bleeding stops",
          "Note the time applied",
          "Do not remove; let medical professionals do it",
        ],
        warnings: [
          "Only use if wound is on limb",
          "Do not apply for more than 2 hours if possible",
          "Mark skin with tourniquet time",
        ],
      },
      {
        step: 6,
        title: "Dress and Support",
        description: "Bandage and immobilize",
        instructions: [
          "Apply sterile bandage once bleeding stops",
          "Immobilize the injured area",
          "Keep person calm and warm",
          "Call emergency services immediately",
        ],
      },
    ],
    emergencyKeywords: [
      "severe bleeding",
      "bleeding",
      "kutoka damu",
      "hemorrhage",
      "blood loss",
    ],
  },
  {
    id: "burns",
    nameEn: "Burns",
    nameSw: "Kuchomeka",
    descriptionEn: "Treat thermal, chemical, or electrical burns",
    descriptionSw: "Tibu ya kuchomeka kwa moto, kemikali, au umeme",
    steps: [
      {
        step: 1,
        title: "Stop the Burning",
        description: "Remove source of heat",
        instructions: [
          "Remove person from heat source",
          "Remove burning clothing (unless stuck)",
          "Cool the burn with water immediately",
        ],
        warnings: [
          "Do not touch if person is on fire",
          "Do not use ice (can damage tissue)",
          "Do not pop blisters",
        ],
      },
      {
        step: 2,
        title: "Cool the Burn",
        description: "Cool with running water",
        instructions: [
          "Cool for 10-20 minutes under running water",
          "Use room-temperature water",
          "Keep area clean",
        ],
      },
      {
        step: 3,
        title: "Remove Jewelry",
        description: "Remove constrictive items",
        instructions: [
          "Remove rings, bracelets, watches",
          "Remove tight clothing",
          "Do this while burn is still cool",
        ],
      },
      {
        step: 4,
        title: "Cover the Burn",
        description: "Apply sterile, non-stick dressing",
        instructions: [
          "Use clean, non-stick cloth",
          "Do not use cotton or fluffy materials",
          "Secure loosely, do not wrap tightly",
        ],
      },
      {
        step: 5,
        title: "Pain Management",
        description: "Treat pain and shock",
        instructions: [
          "Give over-the-counter pain reliever",
          "Keep person warm with blankets",
          "Elevate burned area",
        ],
      },
      {
        step: 6,
        title: "Seek Medical Help",
        description: "Know when to get emergency care",
        instructions: [
          "Seek help for burns larger than 3 inches",
          "Seek help for burns on face, hands, feet, genitals",
          "Seek help for deep or blistering burns",
        ],
      },
    ],
    emergencyKeywords: ["burn", "burns", "choma", "scald", "thermal"],
  },
  {
    id: "fracture",
    nameEn: "Bone Fractures & Sprains",
    nameSw: "Mifupa Iliyovunjika na Matatizo ya Maungo",
    descriptionEn: "Immobilize and care for broken bones and sprains",
    descriptionSw: "Kusimamisha na kuangalia mifupa iliyovunjika",
    steps: [
      {
        step: 1,
        title: "RICE Protocol",
        description: "Rest, Ice, Compression, Elevation",
        instructions: [
          "Rest: Stop activity immediately",
          "Ice: Apply ice for 15-20 minutes every 2-3 hours",
          "Compression: Wrap with elastic bandage",
          "Elevation: Raise injured area above heart",
        ],
      },
      {
        step: 2,
        title: "Immobilize",
        description: "Prevent movement of injured area",
        instructions: [
          "Use sling for arm injuries",
          "Use splint for leg injuries",
          "Keep area still to prevent further injury",
        ],
      },
      {
        step: 3,
        title: "Signs of Fracture",
        description: "Recognize when to seek emergency care",
        instructions: [
          "Severe pain and swelling",
          "Visible deformity",
          "Inability to move or bear weight",
          "Numbness or tingling",
        ],
      },
      {
        step: 4,
        title: "Do Not Move",
        description: "Avoid movement if serious fracture",
        instructions: [
          "Do not straighten bent limb",
          "Do not apply pressure to deformed area",
          "Keep person warm and calm",
        ],
      },
      {
        step: 5,
        title: "Seek Medical Care",
        description: "Get professional evaluation",
        instructions: [
          "See doctor for suspected fractures",
          "Get X-ray to confirm",
          "Follow medical treatment plan",
        ],
      },
    ],
    emergencyKeywords: [
      "fracture",
      "broken bone",
      "sprain",
      "vunjika",
      "dislocation",
    ],
  },
  {
    id: "poisoning",
    nameEn: "Poisoning & Overdose",
    nameSw: "Kupigwa Sumu na Kuzidisha Kwa Dawa",
    descriptionEn: "Respond to poisoning, drug overdose, or toxic ingestion",
    descriptionSw: "Jibu kwa kupigwa sumu au kuzidisha kwa dawa",
    steps: [
      {
        step: 1,
        title: "Identify Poison",
        description: "Determine what was ingested",
        instructions: [
          "Look for empty bottles or containers",
          "Ask conscious person what they took",
          "Check for spilled substance",
          "Note time of ingestion if known",
        ],
      },
      {
        step: 2,
        title: "Call Poison Control",
        description: "Get expert guidance immediately",
        instructions: [
          "Call emergency services (999)",
          "Describe what was ingested",
          "Provide person's age and weight",
          "Follow their instructions",
        ],
      },
      {
        step: 3,
        title: "Do Not Induce Vomiting",
        description: "Avoid making it worse",
        instructions: [
          "Do not make person vomit",
          "Some substances cause more damage coming up",
          "Follow poison control instructions",
        ],
      },
      {
        step: 4,
        title: "Activated Charcoal",
        description: "Only if instructed by poison control",
        instructions: [
          "Give only if poison control advises",
          "Usually within 1 hour of ingestion",
          "Do not give if person is unconscious",
        ],
      },
      {
        step: 5,
        title: "Monitor Closely",
        description: "Watch for changes in condition",
        instructions: [
          "Monitor breathing and consciousness",
          "Keep person warm",
          "Position on side if unconscious",
          "Be ready to perform CPR",
        ],
      },
      {
        step: 6,
        title: "Provide Information",
        description: "Give hospital all details",
        instructions: [
          "Tell doctors what was ingested",
          "Provide the container or medication",
          "Describe symptoms and timeline",
        ],
      },
    ],
    emergencyKeywords: [
      "poisoning",
      "poison",
      "overdose",
      "sumu",
      "toxic",
      "ingestion",
    ],
  },
  {
    id: "shock",
    nameEn: "Shock (Severe)",
    nameSw: "Mshtuko Mkubwa",
    descriptionEn: "Manage life-threatening shock condition",
    descriptionSw: "Dhibiti hali ya mshtuko unaoweza kuua",
    steps: [
      {
        step: 1,
        title: "Identify Shock Signs",
        description: "Recognize symptoms of shock",
        instructions: [
          "Pale, cold, clammy skin",
          "Rapid weak pulse",
          "Shallow or rapid breathing",
          "Confusion or anxiety",
          "Loss of consciousness",
        ],
      },
      {
        step: 2,
        title: "Call Emergency",
        description: "Get immediate medical help",
        instructions: ["Call 999 immediately", "Start basic life support if trained"],
      },
      {
        step: 3,
        title: "Lay Person Flat",
        description: "Position to improve blood flow",
        instructions: [
          "Lay person on back",
          "Elevate legs 12 inches (if no spinal injury)",
          "Turn head to side",
        ],
      },
      {
        step: 4,
        title: "Keep Warm",
        description: "Prevent heat loss",
        instructions: [
          "Cover with blankets",
          "Do not overheat",
          "Keep environment warm",
        ],
      },
      {
        step: 5,
        title: "Do Not Give Fluids",
        description: "Avoid oral fluids",
        instructions: [
          "Do not give food or drink",
          "If thirsty, wet lips only",
          "Intravenous fluids needed at hospital",
        ],
      },
      {
        step: 6,
        title: "Monitor and Reassure",
        description: "Keep person conscious if possible",
        instructions: [
          "Talk to person calmly",
          "Monitor breathing and pulse",
          "Be ready to perform CPR",
        ],
      },
    ],
    emergencyKeywords: ["shock", "mshtuko", "pale", "cold", "clammy", "trauma"],
  },
  {
    id: "heatstroke",
    nameEn: "Heat Stroke",
    nameSw: "Kuumiza kwa Joto",
    descriptionEn: "Emergency response to severe overheating",
    descriptionSw: "Jibu la dharura kwa kuumiza sana kwa joto",
    steps: [
      {
        step: 1,
        title: "Identify Heat Stroke",
        description: "Recognize critical symptoms",
        instructions: [
          "Body temperature above 103°F (39.4°C)",
          "Hot, dry, red skin",
          "Confusion or loss of consciousness",
          "No sweating",
          "Rapid, strong pulse",
        ],
      },
      {
        step: 2,
        title: "Move to Cool Area",
        description: "Get out of heat immediately",
        instructions: [
          "Move to air-conditioned or shaded area",
          "Lay person down",
          "Call emergency services (999)",
        ],
      },
      {
        step: 3,
        title: "Cool the Body",
        description: "Lower body temperature urgently",
        instructions: [
          "Apply ice to neck, armpits, groin",
          "Spray with water and fan",
          "Apply cold compresses",
          "Immerse in cool water if possible",
        ],
      },
      {
        step: 4,
        title: "Clothing",
        description: "Remove excess clothing",
        instructions: [
          "Remove unnecessary clothing",
          "Leave underwear on",
          "Keep body exposed for cooling",
        ],
      },
      {
        step: 5,
        title: "Monitoring",
        description: "Watch for improvement",
        instructions: [
          "Monitor temperature if possible",
          "Continue cooling until temperature drops",
          "Watch for changes in consciousness",
        ],
      },
      {
        step: 6,
        title: "Hospital Care",
        description: "Complete recovery needs medical care",
        instructions: [
          "Do not leave person alone",
          "Even if improved, seek medical care",
          "Heat stroke can cause organ damage",
        ],
      },
    ],
    emergencyKeywords: ["heat stroke", "heatstroke", "overheating", "joto"],
  },
  {
    id: "allergic_reaction",
    nameEn: "Severe Allergic Reaction (Anaphylaxis)",
    nameSw: "Mwitiko Mkubwa wa Mzunguko (Anaphylaxis)",
    descriptionEn: "Emergency response to anaphylactic shock",
    descriptionSw: "Jibu la dharura kwa mwitiko wa mzunguko wa kutosha",
    steps: [
      {
        step: 1,
        title: "Identify Anaphylaxis",
        description: "Recognize life-threatening reaction",
        instructions: [
          "Difficulty breathing",
          "Swelling of face, lips, tongue, throat",
          "Rapid or weak pulse",
          "Dizziness or fainting",
          "Skin reactions: hives, rash, itching",
          "Stomach pain, vomiting, diarrhea",
        ],
      },
      {
        step: 2,
        title: "Call Emergency",
        description: "Get immediate medical help",
        instructions: ["Call 999 immediately"],
      },
      {
        step: 3,
        title: "Use EpiPen if Available",
        description: "Administer epinephrine auto-injector",
        instructions: [
          "Remove EpiPen from carrier tube",
          "Swing and push firmly into outer thigh",
          "Hold for 3-10 seconds",
          "Remove and massage injection site",
          "Can repeat after 5-15 minutes if needed",
        ],
        warnings: [
          "Do this while calling emergency",
          "Do not put thumb/fingers on auto-injector",
        ],
      },
      {
        step: 4,
        title: "Position Person",
        description: "Lay flat with legs elevated",
        instructions: [
          "Lay on back",
          "Elevate legs",
          "If vomiting, turn head to side",
          "If unconscious, recovery position",
        ],
      },
      {
        step: 5,
        title: "Monitor",
        description: "Watch for changes",
        instructions: [
          "Monitor breathing continuously",
          "Be ready to perform CPR",
          "Note time of EpiPen administration",
        ],
      },
      {
        step: 6,
        title: "Hospital Care",
        description: "Medical evaluation essential",
        instructions: [
          "Hospital care is mandatory after anaphylaxis",
          "Bring any allergen containers/medication",
          "Even if improved, go to hospital",
        ],
      },
    ],
    emergencyKeywords: [
      "anaphylaxis",
      "allergic reaction",
      "anaphylactic",
      "breathing difficulty",
      "swelling",
    ],
  },
  {
    id: "fainting",
    nameEn: "Fainting / Loss of Consciousness",
    nameSw: "Kufa Fahamu / Kupoteza Fahamu",
    descriptionEn: "Sudden temporary loss of consciousness - requires immediate action",
    descriptionSw: "Kufa haraka kwa muda sana ya fahamu - inahitaji hatua ya haraka",
    steps: [
      {
        step: 1,
        title: "Call Emergency",
        description: "Get medical help immediately",
        instructions: ["Call 999 immediately if unresponsive"],
      },
      {
        step: 2,
        title: "Check Responsiveness",
        description: "Assess level of consciousness",
        instructions: [
          "Tap shoulders and shout",
          "Check if person responds to pain",
          "Look for signs of life",
        ],
      },
      {
        step: 3,
        title: "Recovery Position",
        description: "Place person safely on side",
        instructions: [
          "Roll person onto side",
          "Head tilted back to keep airway open",
          "Leg bent for stability",
          "Arm supporting head",
        ],
      },
      {
        step: 4,
        title: "Monitor Breathing",
        description: "Watch for normal breathing",
        instructions: [
          "Watch chest for rising and falling",
          "Listen for breathing sounds",
          "Feel for breath on cheek",
          "If not breathing, begin CPR",
        ],
      },
      {
        step: 5,
        title: "Keep Warm",
        description: "Prevent shock",
        instructions: [
          "Cover with blankets",
          "Keep environment warm",
          "Do not give anything to eat or drink",
        ],
      },
      {
        step: 6,
        title: "Upon Awakening",
        description: "Reassure and assess",
        instructions: [
          "Keep person calm and still",
          "Do not allow them to stand immediately",
          "Ask what they remember",
          "Continue monitoring until medical help arrives",
        ],
      },
    ],
    emergencyKeywords: ["fainting", "faint", "unconscious", "passed out", "unresponsive"],
  },
  {
    id: "stroke_fast",
    nameEn: "Stroke - F.A.S.T. Method",
    nameSw: "Kumfunga Njia za Damu - Mbinu ya F.A.S.T.",
    descriptionEn: "Recognize and respond to stroke using F.A.S.T. protocol - time critical",
    descriptionSw: "Tambua na jibu kumfunga njia kwa kutumia mbinu ya F.A.S.T. - muda muhimu",
    steps: [
      {
        step: 1,
        title: "F - Face Drooping",
        description: "Check for facial weakness",
        instructions: [
          "Ask person to smile",
          "Look for one side of face drooping",
          "One side hanging lower than other",
          "If yes, possible stroke",
        ],
      },
      {
        step: 2,
        title: "A - Arm Weakness",
        description: "Check for arm weakness",
        instructions: [
          "Ask person to raise both arms",
          "Look for arm drift downward",
          "One arm lower than the other",
          "If yes, possible stroke",
        ],
      },
      {
        step: 3,
        title: "S - Speech Difficulty",
        description: "Check for speech problems",
        instructions: [
          "Ask person to repeat simple sentence",
          "Listen for slurred speech",
          "Listen for difficulty finding words",
          "If yes, possible stroke",
        ],
      },
      {
        step: 4,
        title: "T - Time to Call 999",
        description: "Call emergency immediately",
        instructions: [
          "Note time symptoms started",
          "Call 999 IMMEDIATELY",
          "Say 'STROKE' to dispatcher",
          "Time is critical - treatment works if given early",
        ],
      },
      {
        step: 5,
        title: "Additional Symptoms",
        description: "Other stroke warning signs",
        instructions: [
          "Numbness on one side",
          "Vision problems",
          "Difficulty understanding",
          "Severe sudden headache",
          "Loss of balance or coordination",
        ],
      },
      {
        step: 6,
        title: "While Waiting",
        description: "Keep person safe",
        instructions: [
          "Do not give food or drink",
          "Keep person calm and still",
          "Do not move unless in danger",
          "Position head elevated if possible",
          "Be ready for CPR if needed",
        ],
      },
    ],
    emergencyKeywords: [
      "stroke",
      "kumfunga",
      "drooping face",
      "slurred speech",
      "arm weakness",
      "fast",
    ],
  },
  {
    id: "heart_attack",
    nameEn: "Heart Attack",
    nameSw: "Shambulio la Moyo",
    descriptionEn: "Recognize and respond to acute myocardial infarction - medical emergency",
    descriptionSw: "Tambua na jibu shambulio la moyo - dharura ya kimatibabu",
    steps: [
      {
        step: 1,
        title: "Identify Heart Attack Symptoms",
        description: "Recognize warning signs",
        instructions: [
          "Chest pain or pressure (crushing)",
          "Pain spreading to arm, neck, jaw",
          "Shortness of breath",
          "Nausea or cold sweats",
          "Lightheadedness or fainting",
        ],
      },
      {
        step: 2,
        title: "Call Emergency",
        description: "Get immediate medical help",
        instructions: [
          "Call 999 immediately",
          "Say 'Heart attack' or 'chest pain'",
          "Chew aspirin if available and not allergic",
          "Do not delay",
        ],
      },
      {
        step: 3,
        title: "Position Person",
        description: "Minimize strain on heart",
        instructions: [
          "Have person sit down",
          "Loosen tight clothing",
          "Lean back or lie with head elevated",
          "Feet elevated if blood pressure is low",
        ],
      },
      {
        step: 4,
        title: "Keep Calm",
        description: "Reduce anxiety and stress",
        instructions: [
          "Reassure person they are getting help",
          "Stay calm yourself",
          "Speak in soothing tone",
          "Minimize activity and movement",
        ],
      },
      {
        step: 5,
        title: "Monitor Vitals",
        description: "Watch for changes",
        instructions: [
          "Monitor breathing and consciousness",
          "Be ready to perform CPR",
          "If unconscious, use recovery position",
          "Continue CPR until emergency arrives",
        ],
      },
      {
        step: 6,
        title: "Provide Medical Information",
        description: "Help emergency team",
        instructions: [
          "Tell paramedics time pain started",
          "Provide list of current medications",
          "Provide medical history",
          "Stay with person if possible",
        ],
      },
    ],
    emergencyKeywords: [
      "heart attack",
      "chest pain",
      "shambulio",
      "myocardial",
      "crushing pain",
    ],
  },
  {
    id: "seizures",
    nameEn: "Seizures / Convulsions",
    nameSw: "Mzunguko / Mapigano",
    descriptionEn: "Respond safely to person having a seizure",
    descriptionSw: "Jibu kwa salama kwa mtu anayelipwa na mzunguko",
    steps: [
      {
        step: 1,
        title: "Stay Calm",
        description: "Ensure your safety first",
        instructions: [
          "Do not panic",
          "Do not restrain person",
          "Move dangerous objects away",
          "Clear area around person",
        ],
      },
      {
        step: 2,
        title: "Protect Head",
        description: "Prevent head injury",
        instructions: [
          "Place pillow under head",
          "Or use soft object to cushion head",
          "Do not put anything in mouth",
          "Keep head turned to side",
        ],
      },
      {
        step: 3,
        title: "Move Away Hazards",
        description: "Prevent injury during seizure",
        instructions: [
          "Move person away from stairs",
          "Move away from fire or sharp objects",
          "Move away from water",
          "Keep space clear around person",
        ],
      },
      {
        step: 4,
        title: "Time the Seizure",
        description: "Note duration for medical team",
        instructions: [
          "Look at watch or clock",
          "Note start and end time",
          "Most seizures last 1-2 minutes",
          "Seizures lasting over 5 min = emergency",
        ],
      },
      {
        step: 5,
        title: "After the Seizure",
        description: "Recovery period guidance",
        instructions: [
          "Keep person on side",
          "Wipe away saliva/foam if present",
          "Allow person to rest",
          "Person may be confused or sleepy",
          "Stay with person",
        ],
      },
      {
        step: 6,
        title: "When to Call 999",
        description: "Know emergency indicators",
        instructions: [
          "Call if first seizure",
          "Call if seizure lasts over 5 minutes",
          "Call if multiple seizures in a row",
          "Call if person doesn't regain consciousness",
          "Call if person injured during seizure",
        ],
      },
    ],
    emergencyKeywords: [
      "seizure",
      "convulsion",
      "mapigano",
      "fit",
      "epilepsy",
      "shaking",
    ],
  },
  {
    id: "eye_injury",
    nameEn: "Eye Injuries",
    nameSw: "Maumiko ya Macho",
    descriptionEn: "Treat chemical, object, or trauma injuries to the eye",
    descriptionSw: "Tibu ya kemikali, kitu, au maumiko ya trauma kwa jicho",
    steps: [
      {
        step: 1,
        title: "Chemical in Eye",
        description: "Flush immediately with water",
        instructions: [
          "Rinse immediately with clean water",
          "Flush for at least 15-20 minutes",
          "Hold eyelid open while rinsing",
          "Rinse from inside corner outward",
        ],
      },
      {
        step: 2,
        title: "Foreign Object",
        description: "Remove visible particles carefully",
        instructions: [
          "Do not rub eye",
          "Try to blink and let tears flush it out",
          "If visible, try to remove with corner of cloth",
          "If stuck, cover eye and seek help",
        ],
      },
      {
        step: 3,
        title: "Blunt Trauma",
        description: "Apply cold compress",
        instructions: [
          "Apply ice pack wrapped in cloth",
          "Apply for 15 minutes on, 15 minutes off",
          "Do not apply ice directly to eye",
          "Do not apply pressure",
        ],
      },
      {
        step: 4,
        title: "Penetrating Injury",
        description: "Protect and seek immediate help",
        instructions: [
          "Do not remove object",
          "Cover eye gently with cup",
          "Apply sterile gauze around it",
          "Call 999 immediately",
          "Keep head still",
        ],
      },
      {
        step: 5,
        title: "Serious Symptoms",
        description: "Recognize when to seek emergency help",
        instructions: [
          "Severe pain",
          "Vision loss or blurred vision",
          "Blood in eye",
          "Eye bulging out",
          "Inability to move eye",
        ],
      },
      {
        step: 6,
        title: "General Care",
        description: "Supportive measures",
        instructions: [
          "Do not allow rubbing",
          "Wear protective eyewear",
          "Seek medical help for all serious injuries",
          "See eye doctor as soon as possible",
        ],
      },
    ],
    emergencyKeywords: [
      "eye injury",
      "chemical eye",
      "eye trauma",
      "macho",
      "foreign body",
    ],
  },
  {
    id: "hypothermia",
    nameEn: "Hypothermia (Severe Cold)",
    nameSw: "Kufanya Baridi Sana (Hypothermia)",
    descriptionEn: "Treat dangerous drop in body temperature",
    descriptionSw: "Tibu ya kupungua kupiga sana kwa joto la mwili",
    steps: [
      {
        step: 1,
        title: "Move to Warmth",
        description: "Get person out of cold",
        instructions: [
          "Move indoors immediately",
          "Remove from wind and moisture",
          "Handle gently (rough handling dangerous)",
          "Call emergency if very cold",
        ],
      },
      {
        step: 2,
        title: "Remove Wet Clothing",
        description: "Prevent further heat loss",
        instructions: [
          "Remove wet garments",
          "Replace with dry clothing/blankets",
          "Do not leave person bare",
          "Cover head and neck",
        ],
      },
      {
        step: 3,
        title: "Rewarm Gradually",
        description: "Slow passive rewarming",
        instructions: [
          "Do not use direct heat",
          "Do not give hot drinks",
          "Use blankets and warm (not hot) environment",
          "Avoid rapid temperature changes",
        ],
      },
      {
        step: 4,
        title: "Monitor Vitals",
        description: "Watch for changes",
        instructions: [
          "Check for breathing (may be very slow)",
          "Feel for pulse (may be faint)",
          "Monitor consciousness",
          "Be ready for CPR",
        ],
      },
      {
        step: 5,
        title: "Seek Medical Help",
        description: "Get professional care",
        instructions: [
          "Severe hypothermia needs hospital",
          "Person may seem unconscious but recoverable",
          "Do not give up on resuscitation",
          "Warm up at hospital with specialized equipment",
        ],
      },
      {
        step: 6,
        title: "Prevention",
        description: "Future safety",
        instructions: [
          "Dress warmly in cold weather",
          "Avoid prolonged cold exposure",
          "Stay dry",
          "Eat and stay hydrated",
        ],
      },
    ],
    emergencyKeywords: [
      "hypothermia",
      "severe cold",
      "baridi",
      "freezing",
      "cold exposure",
    ],
  },
];


export function getFirstAidGuide(id: string): FirstAidGuide | undefined {
  return FIRST_AID_GUIDES.find((guide) => guide.id === id);
}

export function searchFirstAidGuides(query: string): FirstAidGuide[] {
  const lowerQuery = query.toLowerCase();
  return FIRST_AID_GUIDES.filter(
    (guide) =>
      guide.nameEn.toLowerCase().includes(lowerQuery) ||
      guide.nameSw.toLowerCase().includes(lowerQuery) ||
      guide.descriptionEn.toLowerCase().includes(lowerQuery) ||
      guide.descriptionSw.toLowerCase().includes(lowerQuery) ||
      guide.emergencyKeywords.some((kw) => kw.includes(lowerQuery))
  );
}

export function getFirstAidByKeyword(keyword: string): FirstAidGuide | undefined {
  const lowerKeyword = keyword.toLowerCase();
  return FIRST_AID_GUIDES.find((guide) =>
    guide.emergencyKeywords.some((kw) => kw.includes(lowerKeyword))
  );
}
