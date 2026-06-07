"use client";

import { Lang, t } from "@/lib/i18n";

interface TriageResponseProps {
  guidance: string;
  urgency: "routine" | "urgent" | "emergency";
  condition?: "malaria" | "respiratory" | "diarrheal" | "firstaid" | "out_of_scope";
  language: Lang;
}

export function TriageResponse({
  guidance,
  urgency,
  condition,
  language,
}: TriageResponseProps) {
  const translations = t[language];

  const urgencyColors = {
    routine: "bg-green-100 border-green-500 text-green-800",
    urgent: "bg-amber-100 border-amber-500 text-amber-800",
    emergency: "bg-red-100 border-red-500 text-red-800",
  };

  const conditionLabels: Record<string, string> = {
    malaria: translations.condition_malaria as string,
    respiratory: translations.condition_respiratory as string,
    diarrheal: translations.condition_diarrheal as string,
    firstaid: translations.condition_firstaid as string,
    out_of_scope: translations.condition_out_of_scope as string,
  };

  const conditionLabel = condition ? conditionLabels[condition] : "";

  const urgencyLabel = translations.urgencyLabels[urgency];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Urgency Badge */}
      <div
        className={`border-l-4 p-4 rounded mb-4 ${urgencyColors[urgency]}`}
        role="status"
        aria-live="polite"
      >
        <span className="font-bold text-lg">{urgencyLabel}</span>
      </div>

      {/* Condition/Disease Suggestion */}
      {condition && condition !== "out_of_scope" && (
        <div className="bg-gradient-to-r from-primary-green to-light-green text-white rounded-lg p-6 mb-4 shadow-md">
          <p className="text-sm font-semibold opacity-90">
            {translations.possibleDisease}
          </p>
          <h3 className="text-2xl font-bold mt-2">{conditionLabel}</h3>
          {condition === "malaria" && (
            <p className="text-sm mt-3 opacity-90">
              {language === "en"
                ? "Check for fever, chills, and body aches. Get tested to confirm."
                : "Jua kama una homa, baridi, na maumivu ya mwili. Jaribu kupatanisha."}
            </p>
          )}
          {condition === "respiratory" && (
            <p className="text-sm mt-3 opacity-90">
              {language === "en"
                ? "Monitor cough, difficulty breathing, and chest discomfort."
                : "Fuatilia kikohozi, ugumu wa kupumzika, na maumivu ya kifua."}
            </p>
          )}
          {condition === "diarrheal" && (
            <p className="text-sm mt-3 opacity-90">
              {language === "en"
                ? "Stay hydrated. Avoid food until symptoms improve."
                : "Kunywa maji kutosha. Epuka chakula hadi dalili zipungue."}
            </p>
          )}
          {condition === "firstaid" && (
            <p className="text-sm mt-3 opacity-90">
              {language === "en"
                ? "Immediate care required. Follow first aid steps."
                : "Jinsi mara moja inahitajika. Fuata hatua za kwanza."}
            </p>
          )}
        </div>
      )}

      {/* Main Guidance */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h4 className="font-bold text-primary-green mb-4 text-sm uppercase tracking-wide">
          {translations.recommendations}
        </h4>
        <div className="prose prose-sm max-w-none whitespace-pre-wrap text-gray-700 leading-relaxed text-sm">
          {guidance}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4 text-sm text-amber-900">
        <p className="font-semibold mb-1">⚠️ {language === "en" ? "Important" : "Muhimu"}</p>
        <p>
          {language === "en"
            ? "This guidance is based on Kenya Ministry of Health guidelines. If symptoms worsen or do not improve, seek professional medical care immediately."
            : "Mwongozo huu unategemea mwongozo wa Wizara ya Afya ya Kenya. Ikiwa dalili hazipungui, tafuta huduma za kimatibabu mara moja."}
        </p>
      </div>
    </div>
  );
}
