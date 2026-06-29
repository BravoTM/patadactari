import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { Document } from "@langchain/core/documents";
import path from "path";
console.log("API KEY:", process.env.GOOGLE_API_KEY);

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

let cachedChunks: Document[] | null = null;
let cachedEmbeddings: number[][] | null = null;

function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
}

async function loadChunks(): Promise<Document[]> {
  if (cachedChunks) return cachedChunks;
  const pdfPath = path.join(process.cwd(), "public", "guidelines", "moh_guidelines.pdf");
  const loader = new PDFLoader(pdfPath);
  const docs = await loader.load();
  const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
  cachedChunks = await splitter.splitDocuments(docs);
  return cachedChunks;
}

async function getSimilarChunks(query: string, chunks: Document[]): Promise<string> {
  try {
    const embeddings = new GoogleGenerativeAIEmbeddings({
     apiKey: "change to your api key",
      model: "text-embedding-004",
    });

    if (!cachedEmbeddings) {
      cachedEmbeddings = await embeddings.embedDocuments(
        chunks.map((c) => c.pageContent)
      );
    }

    const queryEmbedding = await embeddings.embedQuery(query);
    const scored = cachedEmbeddings.map((emb, i) => ({
      score: cosineSimilarity(queryEmbedding, emb),
      content: chunks[i].pageContent,
    }));

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 4).map((s) => s.content).join("\n\n");
  } catch {
    return "";
  }
}

export async function getTriage(userMessage: string): Promise<string> {
  const llm = new ChatGoogleGenerativeAI({
   apiKey: "change to your api key",
    model: "gemini-2.0-flash",
    maxOutputTokens: 800,
  });

  let context = "";

  try {
    const chunks = await loadChunks();
    context = await getSimilarChunks(userMessage, chunks);
  } catch {
    console.error("Could not load MoH PDF. Running without guidelines context.");
  }

  const userPrompt = context
    ? `Context from Kenya MoH Clinical Guidelines:\n${context}\n\nPatient describes: ${userMessage}`
    : `Patient describes: ${userMessage}`;

  const response = await llm.invoke([
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: userPrompt },
  ]);

  return response.content as string;
}