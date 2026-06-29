import { isEmergency, getEmergencyKeywordMatches } from "../lib/emergency";

const cases: { text: string; expected: boolean; label: string }[] = [
  { text: "I am bleeding heavily from my arm", expected: true, label: "severe bleeding" },
  { text: "there is blood everywhere", expected: true, label: "blood everywhere" },
  { text: "I see blood coming from the wound", expected: true, label: "blood from wound" },
  { text: "coughing up blood", expected: true, label: "coughing blood" },
  { text: "kutoka damu nyingi", expected: true, label: "Swahili heavy bleeding" },
  { text: "I have a mild fever and headache", expected: false, label: "routine symptoms" },
  { text: "I need a blood test for malaria", expected: false, label: "blood test benign" },
  { text: "my blood pressure is high", expected: false, label: "blood pressure benign" },
  { text: "chest pain and difficulty breathing", expected: true, label: "chest pain emergency" },
  { text: "choking on food", expected: true, label: "choking" },
];

let passed = 0;
let failed = 0;

console.log("Emergency keyword detection tests\n" + "=".repeat(40));

for (const { text, expected, label } of cases) {
  const result = isEmergency(text);
  const matches = getEmergencyKeywordMatches(text);
  const ok = result === expected;
  if (ok) {
    passed++;
    console.log(`✓ ${label}`);
  } else {
    failed++;
    console.log(`✗ ${label}`);
    console.log(`  input:    "${text}"`);
    console.log(`  expected: ${expected}, got: ${result}`);
    console.log(`  matches:  ${matches.join(", ") || "(none)"}`);
  }
}

console.log("\n" + "=".repeat(40));
console.log(`Results: ${passed} passed, ${failed} failed`);

if (failed > 0) {
  process.exit(1);
}
