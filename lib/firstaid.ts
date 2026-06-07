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
