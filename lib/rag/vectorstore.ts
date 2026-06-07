import fs from "fs";
import path from "path";

// In-memory cache for the vector store
let vectorStoreCache: {
  embeddings: number[][];
  chunks: string[];
  metadata: Array<{ source: string; pageNumber?: number }>;
} | null = null;

/**
 * Load vector store from disk
 * In a production setup, this would load a FAISS index
 * For now, we use JSON serialization as a fallback
 */
export async function loadVectorStore() {
  // Return cached version if available
  if (vectorStoreCache) {
    return vectorStoreCache;
  }

  const faissPath = path.join(process.cwd(), "data", "faiss");
  const indexPath = path.join(faissPath, "index.json");

  try {
    if (fs.existsSync(indexPath)) {
      const data = fs.readFileSync(indexPath, "utf-8");
      vectorStoreCache = JSON.parse(data);
      if (vectorStoreCache) {
        console.log(
          `[RAG] Loaded vector store with ${vectorStoreCache.chunks.length} chunks`
        );
      }
      return vectorStoreCache;
    }
  } catch (error) {
    console.error("[RAG] Error loading vector store:", error);
  }

  // Return empty fallback store
  return {
    embeddings: [],
    chunks: [],
    metadata: [],
  };
}

/**
 * Clear the cache (useful for testing or reloading)
 */
export function clearVectorStoreCache() {
  vectorStoreCache = null;
}

/**
 * Save vector store to disk as JSON (fallback for FAISS)
 */
export async function saveVectorStore(
  embeddings: number[][],
  chunks: string[],
  metadata: Array<{ source: string; pageNumber?: number }>
) {
  const faissPath = path.join(process.cwd(), "data", "faiss");
  const indexPath = path.join(faissPath, "index.json");

  // Ensure directory exists
  if (!fs.existsSync(faissPath)) {
    fs.mkdirSync(faissPath, { recursive: true });
  }

  const data = {
    embeddings,
    chunks,
    metadata,
  };

  fs.writeFileSync(indexPath, JSON.stringify(data, null, 2));
  vectorStoreCache = data;
  console.log(
    `[RAG] Saved vector store with ${chunks.length} chunks to ${indexPath}`
  );
}

/**
 * Perform similarity search using cosine similarity
 * Returns indices of top-k most similar chunks
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Search for the most similar chunks in the vector store
 * @param queryEmbedding - The embedding of the query
 * @param k - Number of results to return
 * @returns Array of chunk strings sorted by similarity (highest first)
 */
export async function similaritySearch(
  queryEmbedding: number[],
  k: number = 3
): Promise<string[]> {
  const store = await loadVectorStore();

  if (!store || !store.embeddings || store.embeddings.length === 0) {
    console.warn(
      "[RAG] Vector store is empty. Returning empty search results."
    );
    return [];
  }

  // Calculate similarity scores
  const scores = store.embeddings.map((emb) =>
    cosineSimilarity(queryEmbedding, emb)
  );

  // Get top-k indices
  const topIndices = scores
    .map((score, idx) => ({ score, idx }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((item) => item.idx);

  // Return corresponding chunks
  return topIndices.map((idx) => store.chunks[idx]);
}
