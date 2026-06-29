import {
  getFirstAidByKeyword,
  searchFirstAidGuides,
  type FirstAidGuide,
} from "@/lib/firstaid";

/** Match symptom text to the most relevant first aid guide, if any. */
export function matchFirstAidGuide(symptoms: string): FirstAidGuide | undefined {
  const trimmed = symptoms.trim();
  if (trimmed.length < 2) return undefined;

  const byKeyword = getFirstAidByKeyword(trimmed);
  if (byKeyword) return byKeyword;

  const results = searchFirstAidGuides(trimmed);
  return results[0];
}
