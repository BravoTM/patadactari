"use client";

import { useState } from "react";
import { FirstAidGuide } from "@/lib/firstaid";
import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";

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
    <div className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-primary-green">
      <div className="bg-primary-green text-white p-6">
        <h2 className="text-2xl font-bold mb-2">{name}</h2>
        <p className="text-light-green text-sm">{description}</p>
      </div>

      <div className="p-6 space-y-4">
        {guide.steps.map((step) => (
          <div key={step.step} className="border rounded-lg overflow-hidden">
            <button
              onClick={() =>
                setExpandedStep(
                  expandedStep === step.step ? null : step.step
                )
              }
              className="w-full bg-light-green hover:bg-primary-green text-white px-6 py-4 text-left font-semibold transition-colors flex items-center justify-between"
            >
              <span>
                <span className="font-bold text-lg mr-3">Step {step.step}:</span>
                {step.title}
              </span>
              <span className="text-xl">
                {expandedStep === step.step ? "−" : "+"}
              </span>
            </button>

            {expandedStep === step.step && (
              <div className="bg-bg-light p-6 space-y-4">
                <p className="text-text-primary font-semibold">
                  {step.description}
                </p>

                <div>
                  <h4 className="font-bold text-primary-green mb-2">
                    Instructions:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-text-primary">
                    {step.instructions.map((instruction, idx) => (
                      <li key={idx} className="ml-2">
                        {instruction}
                      </li>
                    ))}
                  </ul>
                </div>

                {step.warnings && step.warnings.length > 0 && (
                  <div className="bg-emergency-red bg-opacity-10 border-l-4 border-emergency-red rounded px-4 py-3">
                    <h4 className="font-bold text-emergency-red mb-2">
                      ⚠️ Warnings:
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-emergency-red">
                      {step.warnings.map((warning, idx) => (
                        <li key={idx} className="ml-2">
                          {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-bg-light p-6 border-t">
        <p className="text-sm text-text-primary">
          <strong>Emergency? Call 999 immediately.</strong> These guidelines are
          for reference only. Always seek professional medical help.
        </p>
      </div>
    </div>
  );
}
