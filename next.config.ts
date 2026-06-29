import type { NextConfig } from "next";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { loadEnvConfig } from "@next/env";

function readEnvFileContent(filePath: string): string {
  const buf = readFileSync(filePath);
  if (buf.length >= 2 && buf[0] === 0xff && buf[1] === 0xfe) {
    return buf.toString("utf16le").replace(/^\uFEFF/, "");
  }
  return buf.toString("utf8").replace(/^\uFEFF/, "");
}

function parseEnvLocal(): Record<string, string> {
  const envPath = join(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return {};
  const vars: Record<string, string> = {};
  for (const line of readEnvFileContent(envPath).split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i === -1) continue;
    vars[trimmed.slice(0, i).trim()] = trimmed.slice(i + 1).trim();
  }
  return vars;
}

const { combinedEnv } = loadEnvConfig(process.cwd(), true);
const local = parseEnvLocal();

const mapsApiKey =
  combinedEnv.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
  combinedEnv.GOOGLE_API_KEY ||
  local.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
  local.GOOGLE_API_KEY ||
  "";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: mapsApiKey,
  },
};

export default nextConfig;
