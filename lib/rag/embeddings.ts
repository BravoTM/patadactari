import { pipeline } from "@xenova/transformers";

// Cache for the model to avoid reloading on each request
let embeddingModel: any = null;

/**
 * Get or initialize the embedding model
 * Uses Xenova's all-MiniLM-L6-v2 which runs locally without API keys
 */
async function getEmbeddingModel() {
  if (!embeddingModel) {
    console.log("[Embeddings] Loading all-MiniLM-L6-v2 model...");
    embeddingModel = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
    console.log("[Embeddings] Model loaded successfully");
  }
  return embeddingModel;
}

/**
 * Generate embedding vector for a text string
 * Returns a 384-dimensional embedding vector
 */
export async function getEmbedding(text: string): Promise<number[]> {
  try {
    const model = await getEmbeddingModel();
    
    // Limit text length to avoid memory issues
    const maxLength = 512;
    const truncatedText = text.substring(0, maxLength);
    
    // Get embedding
    const output = await model(truncatedText, {
      pooling: "mean",
      normalize: true,
    });

    // Convert to array if necessary
    let embedding: number[];
    if (output.data instanceof Float32Array) {
      embedding = Array.from(output.data);
    } else if (Array.isArray(output.data)) {
      embedding = output.data.map((x: any) => parseFloat(x));
    } else {
      // Handle tensor output
      embedding = Array.from(output.data);
    }

    console.log(`[Embeddings] Generated ${embedding.length}-dimensional embedding`);
    return embedding;
  } catch (error) {
    console.error("[Embeddings] Error generating embedding:", error);
    // Return zero vector as fallback
    return new Array(384).fill(0);
  }
}

/**
 * Generate embeddings for multiple texts
 */
export async function getEmbeddings(texts: string[]): Promise<number[][]> {
  const embeddings: number[][] = [];
  
  for (const text of texts) {
    const embedding = await getEmbedding(text);
    embeddings.push(embedding);
  }
  
  return embeddings;
}
