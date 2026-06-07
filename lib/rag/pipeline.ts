import { Anthropic } from "@anthropic-ai/sdk";
import { env } from "process";
import {
  buildSystemPrompt,
  buildUserMessage,
  detectCondition,
  detectUrgency,
} from "./prompt";
import { similaritySearch } from "./vectorstore";
import { getEmbedding } from "./embeddings";

interface TriageResponse {
  guidance: string;
  condition: "malaria" | "respiratory" | "diarrheal" | "firstaid" | "out_of_scope";
  urgency: "routine" | "urgent" | "emergency";
  language: "en" | "sw";
}

/**
 * Main RAG pipeline: embed → search → Claude → response
 */
export async function runTriagePipeline(
  symptoms: string,
  language: "en" | "sw"
): Promise<TriageResponse> {
  const apiKey = env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY environment variable not set");
  }

  const client = new Anthropic({
    apiKey,
  });

  try {
    console.log("[RAG] Step 1: Embedding symptoms...");
    // Step 1: Embed the symptom text using local model
    const queryEmbedding = await getEmbedding(symptoms);

    console.log("[RAG] Step 2: Searching vector store...");
    // Step 2: Search for top 3 relevant chunks
    const relevantChunks = await similaritySearch(queryEmbedding, 3);

    console.log("[RAG] Step 3: Building prompt...");
    // Step 3: Build context from retrieved chunks
    const context = relevantChunks.join("\n\n---\n\n") || 
      "Kenya Clinical Guidelines 2016: General guidance for common health conditions. " +
      "For respiratory infections: rest, adequate fluids, antipyretics for fever. " +
      "For malaria: seek prompt diagnosis and treatment. " +
      "For diarrhea: maintain hydration, seek care if severe.";

    const systemPrompt = buildSystemPrompt(context);
    const userMessage = buildUserMessage(symptoms);

    console.log("[RAG] Step 4: Calling Claude...");
    // Step 4: Call Claude with the prompt
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 500,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    // Extract text from response
    const guidance =
      response.content[0].type === "text" ? response.content[0].text : "";

    console.log("[RAG] Step 5: Analyzing response...");
    // Step 5: Detect condition and urgency
    const condition = detectCondition(guidance);
    const urgency = detectUrgency(guidance);

    console.log("[RAG] Triage complete:", {
      condition,
      urgency,
      language,
    });

    return {
      guidance,
      condition,
      urgency,
      language,
    };
  } catch (error) {
    console.error("[RAG] Error in triage pipeline:", error);
    throw error;
  }
}

/**
 * Generate a fallback response when the RAG system is unavailable
 */
export function generateFallbackResponse(
  symptoms: string,
  language: "en" | "sw"
): TriageResponse {
  const guidance =
    language === "en"
      ? "PataDaktari is currently unable to process your symptoms. Please visit your nearest health facility for an assessment. If you experience severe symptoms like chest pain, difficulty breathing, or are unconscious, call 999 immediately.\n\n⚠️ This guidance does not replace a doctor. If symptoms are severe or getting worse, go to the nearest health facility immediately."
      : "PataDaktari haiwezi kuchakata dalili zako kwa sasa. Tafadhali nenda kituo cha afya karibu nawe kwa tathmini. Ikiwa una dalili mbaya kama maumivu ya kifua, kushindwa kupumua, au kuzimia, piga 999 haraka.\n\n⚠️ Hii si mahali pa daktari. Ikiwa dalili ni mbaya au inabadilika, nenda haraka kwa hospitali.";

  return {
    guidance,
    condition: "out_of_scope",
    urgency: "routine",
    language,
  };
}
