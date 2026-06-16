"use client";

import { useState } from "react";
import { FirstAidGuide } from "@/lib/firstaid";
import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";
import { ChevronDown, AlertTriangle, CheckCircle, Info } from "lucide-react";

interface FirstAidGuideComponentProps {
  guide: FirstAidGuide;
}

export default function FirstAidGuideComponent({
  guide,
}: FirstAidGuideComponentProps) {
  const { language } = useLanguage();
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const name = language === "en" ? guide.nameEn : guide.nameSw;
  const description =
    language === "en" ? guide.descriptionEn : guide.descriptionSw;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 sm:p-8">
        <h2 className="text-3xl font-bold mb-3">{name}</h2>
        <p className="text-red-100 text-lg">{description}</p>
      </div>

      {/* Steps Container */}
      <div className="p-4 sm:p-8 space-y-3">
        {guide.steps.map((step, index) => (
          <div
            key={step.step}
            className="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-red-300 transition"
          >
            <button
              onClick={() =>
                setExpandedStep(
                  expandedStep === step.step ? null : step.step
                )
              }
              className="w-full bg-gradient-to-r from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100 text-left px-5 sm:px-6 py-4 font-semibold flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-gray-900 font-bold">{step.title}</p>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
              <ChevronDown
                size={20}
                className={`flex-shrink-0 text-gray-600 transition-transform ml-4 ${
                  expandedStep === step.step ? "transform rotate-180" : ""
                }`}
              />
            </button>

            {/* Expanded Content */}
            {expandedStep === step.step && (
              <div className="bg-gradient-to-b from-gray-50 to-white px-5 sm:px-6 py-6 space-y-5 border-t-2 border-gray-200">
                {/* Main Description */}
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                  <div className="flex items-start gap-3">
                    <Info size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-900 font-medium">{step.description}</p>
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle size={18} className="text-emerald-600" />
                    {language === "en" ? "Step-by-Step Instructions:" : "Maagizo Hatua kwa Hatua:"}
                  </h4>
                  <ol className="space-y-2 ml-2">
                    {step.instructions.map((instruction, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold">
                          {idx + 1}
                        </span>
                        <span className="text-gray-700 pt-0.5">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Warnings */}
                {step.warnings && step.warnings.length > 0 && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                    <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                      <AlertTriangle size={18} className="text-red-600" />
                      {language === "en" ? "⚠️ Important Warnings:" : "⚠️ Onyo Muhimu:"}
                    </h4>
                    <ul className="space-y-2">
                      {step.warnings.map((warning, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-red-800">
                          <span className="inline-block w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                          <span>{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Progress Indicator */}
                <div className="pt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-600 to-orange-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${(step.step / guide.steps.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Step {step.step} of {guide.steps.length}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Emergency Disclaimer Footer */}
      <div className="bg-red-50 border-t-2 border-red-200 px-4 sm:px-8 py-6">
        <div className="flex items-start gap-3">
          <AlertTriangle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-red-900 mb-1">
              {language === "en"
                ? "🚑 Call 999 for Life-Threatening Emergencies"
                : "🚑 Piga 999 kwa Dharura za Kifo"}
            </p>
            <p className="text-xs text-red-800 leading-relaxed">
              {language === "en"
                ? "These guidelines are for educational reference only. For any medical emergency, call emergency services immediately (999). Do not delay seeking professional medical help."
                : "Mwongozo huu ni kwa rejea ya elimu tu. Kwa dharura yoyote ya kimatibabu, piga huduma za dharura mara moja (999). Usichele katika kumtafuta msaada wa mtaalamu."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
