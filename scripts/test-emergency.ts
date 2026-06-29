import { isEmergency, getEmergencyKeywordMatches } from "../src/lib/emergency";

const cases = [
  { text: "there is blood everywhere", expected: true },
  { text: "I see blood coming from the wound", expected: true },
  { text: "coughing up blood", expected: true },
  { text: "severe bleeding from my arm", expected: true },
  { text: "just the word blood", expected: true },
  { text: "I need a blood test for malaria", expected: false },
  { text: "my blood pressure is high", expected: false },
  { text: "I have a mild headache", expected: false },
  { text: "chest pain and difficulty breathing", expected: true },
];

let passed = 0;
let failed = 0;

console.log("Emergency keyword detection tests\n" + "=".repeat(40));

for (const { text, expected } of cases) {
  const result = isEmergency(text);
  const matches = getEmergencyKeywordMatches(text);
  const ok = result === expected;
  if (ok) passed++;
  else failed++;

  console.log(`${ok ? "✓" : "✗"} "${text}"`);
  console.log(`  expected: ${expected}, got: ${result}, matches: [${matches.join(", ")}]`);
}

console.log("\n" + "=".repeat(40));
console.log(`Results: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
