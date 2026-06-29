import { loadEnvConfig } from "@next/env";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

const PLACEHOLDER_KEYS = new Set([
  "your_google_api_key_here",
  "your_gemini_api_key_here",
  "your_openai_api_key_here",
  "your_api_key_here",
  "sk-your_openai_api_key_here",
]);

function readEnvFileContent(filePath: string): string {
  const buf = readFileSync(filePath);
  if (buf.length >= 2 && buf[0] === 0xff && buf[1] === 0xfe) {
    return buf.toString("utf16le").replace(/^\uFEFF/, "");
  }
  return buf.toString("utf8").replace(/^\uFEFF/, "");
}

function parseEnvFile(filePath: string): Record<string, string> {
  if (!existsSync(filePath)) return {};
  const vars: Record<string, string> = {};
  for (const line of readEnvFileContent(filePath).split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i === -1) continue;
    const name = trimmed.slice(0, i).trim();
    let value = trimmed.slice(i + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    vars[name] = value;
  }
  return vars;
}

function lookupEnv(names: string[]): string {
  const { combinedEnv } = loadEnvConfig(process.cwd(), true);

  for (const name of names) {
    const fromLoaded = combinedEnv[name];
    if (fromLoaded) return fromLoaded;
  }

  for (const name of names) {
    const fromProcess = process.env[name];
    if (fromProcess) return fromProcess;
  }

  const root = process.cwd();
  for (const file of [".env.local", ".env"]) {
    const local = parseEnvFile(join(root, file));
    for (const name of names) {
      const value = local[name];
      if (value) return value;
    }
  }

  return "";
}

export function isValidApiKey(key: string): boolean {
  const trimmed = key.trim();
  return Boolean(trimmed && !PLACEHOLDER_KEYS.has(trimmed));
}

/** Google Maps key — server-side only. */
export function getMapsApiKey(): string {
  return lookupEnv(["NEXT_PUBLIC_GOOGLE_MAPS_API_KEY", "GOOGLE_API_KEY"]);
}

/** Gemini / Generative Language API key — server-side only (not the Maps JS key). */
export function getGeminiApiKey(): string {
  return lookupEnv(["GEMINI_API_KEY", "GOOGLE_GENERATIVE_AI_API_KEY"]);
}

/** OpenAI API key — server-side only (used for AI triage chat). */
export function getOpenAIApiKey(): string {
  return lookupEnv(["OPENAI_API_KEY"]);
}

/** Preferred key for triage: OpenAI first, then Gemini. */
export function getTriageApiKey(): { provider: "openai" | "gemini"; key: string } | null {
  const openai = getOpenAIApiKey();
  if (isValidApiKey(openai)) return { provider: "openai", key: openai };

  const gemini = getGeminiApiKey();
  if (isValidApiKey(gemini)) return { provider: "gemini", key: gemini };

  return null;
}
