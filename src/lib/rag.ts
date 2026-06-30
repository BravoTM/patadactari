import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { readFileSync } from "fs";
import path from "path";
import { PDFParse } from "pdf-parse";
import { getGeminiApiKey, getTriageApiKey, isValidApiKey } from "@/lib/env.server";
import {
  detectMessageLanguage,
  ensureDisclaimer,
  type MessageLanguage,
} from "@/lib/language";

function buildSystemPrompt(lang: MessageLanguage): string {
  const languageRule =
    lang === "sw"
      ? `- LAZIMA ujibu kwa Kiswahili pekee. Usitumie Kiingereza popote kwenye jibu lako.
- Malizia kila jibu kwa: "Kumbuka: Tafuta ushauri wa daktari halisi."`
      : `- You MUST reply in English only. Do not use Swahili anywhere in your response.
- End every response with: "Remember: Always seek advice from a real doctor."`;

  return `You are PataDaktari, a health triage assistant built specifically for Nairobi residents.

You ONLY handle these 4 conditions:
1. Malaria Suspicion
2. Respiratory Infections (cough, flu, pneumonia warning signs)
3. Diarrheal Diseases (including dehydration assessment)
4. Basic First Aid (burns, cuts, minor injuries)

Your rules:
- You NEVER diagnose. You NEVER prescribe medication.
- You give triage advice only — what to do next and where to go.
- If symptoms are outside your 4 conditions, say so clearly and tell them to visit a doctor.
${languageRule}
- Be clear, simple and easy to understand. Avoid complex medical terms.`;
}

const OPENAI_MODELS = ["gpt-4o-mini", "gpt-4o"] as const;
const GEMINI_MODELS = ["gemini-2.0-flash", "gemini-2.5-flash", "gemini-1.5-flash"] as const;

let cachedChunks: Document[] | null = null;
let cachedEmbeddings: { key: string; vectors: number[][] } | null = null;

function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
}

function messageText(content: string | { text?: string }[]): string {
  if (typeof content === "string") return content;
  return content.map((part) => part.text ?? "").join("");
}

async function loadChunks(): Promise<Document[]> {
  if (cachedChunks) return cachedChunks;
  const pdfPath = path.join(process.cwd(), "public", "guidelines", "moh_guidelines.pdf");
  const workerPath = path.join(
    process.cwd(),
    "node_modules",
    "pdfjs-dist",
    "legacy",
    "build",
    "pdf.worker.mjs"
  );
  PDFParse.setWorker(`file://${workerPath.replace(/\\/g, "/")}`);
  const parser = new PDFParse({ data: readFileSync(pdfPath) });
  try {
    const { text } = await parser.getText();
    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
    cachedChunks = await splitter.createDocuments([text]);
    return cachedChunks;
  } finally {
    await parser.destroy();
  }
}

async function getSimilarChunks(
  query: string,
  chunks: Document[],
  provider: "openai" | "gemini",
  apiKey: string
): Promise<string> {
  try {
    const cacheKey = `${provider}:${chunks.length}`;
    const embeddings =
      provider === "openai"
        ? new OpenAIEmbeddings({ apiKey, model: "text-embedding-3-small" })
        : new GoogleGenerativeAIEmbeddings({ apiKey, model: "text-embedding-004" });

    if (!cachedEmbeddings || cachedEmbeddings.key !== cacheKey) {
      cachedEmbeddings = {
        key: cacheKey,
        vectors: await embeddings.embedDocuments(chunks.map((c) => c.pageContent)),
      };
    }

    const queryEmbedding = await embeddings.embedQuery(query);
    const scored = cachedEmbeddings.vectors.map((emb, i) => ({
      score: cosineSimilarity(queryEmbedding, emb),
      content: chunks[i].pageContent,
    }));

    scored.sort((a, b) => b.score - a.score);
    return scored
      .slice(0, 4)
      .map((s) => s.content)
      .join("\n\n");
  } catch (error) {
    console.error("Embedding lookup failed:", error);
    return "";
  }
}

async function invokeOpenAI(apiKey: string, systemPrompt: string, userPrompt: string): Promise<string> {
  const messages = [new SystemMessage(systemPrompt), new HumanMessage(userPrompt)];

  let lastError: unknown;
  for (const model of OPENAI_MODELS) {
    try {
      const llm = new ChatOpenAI({ apiKey, model, maxTokens: 800 });
      const response = await llm.invoke(messages);
      const text = messageText(response.content as string | { text?: string }[]);
      if (text.trim()) return text;
    } catch (error) {
      lastError = error;
      console.error(`OpenAI model ${model} failed:`, error);
    }
  }

  throw lastError ?? new Error("All OpenAI models failed");
}

async function invokeGemini(apiKey: string, systemPrompt: string, userPrompt: string): Promise<string> {
  const messages = [new SystemMessage(systemPrompt), new HumanMessage(userPrompt)];

  let lastError: unknown;
  for (const model of GEMINI_MODELS) {
    try {
      const llm = new ChatGoogleGenerativeAI({
        apiKey,
        model,
        maxOutputTokens: 800,
      });
      const response = await llm.invoke(messages);
      const text = messageText(response.content as string | { text?: string }[]);
      if (text.trim()) return text;
    } catch (error) {
      lastError = error;
      console.error(`Gemini model ${model} failed:`, error);
    }
  }

  throw lastError ?? new Error("All Gemini models failed");
}

export async function getTriage(userMessage: string): Promise<string> {
  const auth = getTriageApiKey();
  if (!auth) {
    throw new Error("No AI API key configured (set OPENAI_API_KEY or GEMINI_API_KEY)");
  }

  const lang = detectMessageLanguage(userMessage);
  const systemPrompt = buildSystemPrompt(lang);

  let context = "";

  try {
    const chunks = await loadChunks();
    context = await getSimilarChunks(userMessage, chunks, auth.provider, auth.key);
  } catch (error) {
    console.error("Could not load MoH PDF. Running without guidelines context.", error);
  }

  const userPrompt = context
    ? `Context from Kenya MoH Clinical Guidelines:\n${context}\n\nPatient describes: ${userMessage}`
    : `Patient describes: ${userMessage}`;

  let response: string;
  try {
    if (auth.provider === "openai") {
      response = await invokeOpenAI(auth.key, systemPrompt, userPrompt);
    } else {
      response = await invokeGemini(auth.key, systemPrompt, userPrompt);
    }
  } catch (primaryError) {
    if (auth.provider === "openai") {
      const geminiKey = getGeminiApiKey();
      if (isValidApiKey(geminiKey)) {
        console.warn("OpenAI failed; trying Gemini fallback.");
        response = await invokeGemini(geminiKey, systemPrompt, userPrompt);
      } else {
        throw primaryError;
      }
    } else {
      throw primaryError;
    }
  }

  return ensureDisclaimer(response, lang);
}