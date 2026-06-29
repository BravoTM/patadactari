import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { readFileSync } from "fs";
import path from "path";
import { PDFParse } from "pdf-parse";
import { getGeminiApiKey, getTriageApiKey, isValidApiKey } from "@/lib/env.server";

const SYSTEM_PROMPT = `You are PataDaktari, a health triage assistant built specifically for Nairobi residents.

You ONLY handle these 4 conditions:
1. Malaria Suspicion
2. Respiratory Infections (cough, flu, pneumonia warning signs)
3. Diarrheal Diseases (including dehydration assessment)
4. Basic First Aid (burns, cuts, minor injuries)

Your rules:
- You NEVER diagnose. You NEVER prescribe medication.
- You give triage advice only — what to do next and where to go.
- If symptoms are outside your 4 conditions, say so clearly and tell them to visit a doctor.
- Always end every response with: "Kumbuka: Tafuta ushauri wa daktari halisi. / Remember: Always seek advice from a real doctor."
- Respond in the same language the user writes in.
- Be clear, simple and easy to understand. Avoid complex medical terms.`;

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

async function invokeOpenAI(apiKey: string, userPrompt: string): Promise<string> {
  const messages = [new SystemMessage(SYSTEM_PROMPT), new HumanMessage(userPrompt)];

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

async function invokeGemini(apiKey: string, userPrompt: string): Promise<string> {
  const messages = [new SystemMessage(SYSTEM_PROMPT), new HumanMessage(userPrompt)];

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

  try {
    if (auth.provider === "openai") {
      return await invokeOpenAI(auth.key, userPrompt);
    }
    return await invokeGemini(auth.key, userPrompt);
  } catch (primaryError) {
    if (auth.provider === "openai") {
      const geminiKey = getGeminiApiKey();
      if (isValidApiKey(geminiKey)) {
        console.warn("OpenAI failed; trying Gemini fallback.");
        return invokeGemini(geminiKey, userPrompt);
      }
    }
    throw primaryError;
  }
}