import fs from "fs";
import path from "path";

const envPath = path.join(process.cwd(), ".env.local");

if (!fs.existsSync(envPath)) {
  console.error("No .env.local file found");
  process.exit(1);
}

const raw = fs.readFileSync(envPath);
let content: string;

// Windows editors sometimes save .env.local as UTF-16, which Next.js cannot parse.
if (raw.includes(0)) {
  content = raw.toString("utf16le");
} else {
  content = raw.toString("utf8");
}

content = content.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").trimEnd() + "\n";
fs.writeFileSync(envPath, content, "utf8");
console.log("Fixed .env.local encoding to UTF-8");
