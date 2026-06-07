/**
 * PDF Ingestion Script
 * Run once to:
 * 1. Load Kenya Clinical Guidelines 2016 PDF
 * 2. Split into chunks
 * 3. Generate embeddings
 * 4. Save FAISS index
 *
 * Usage: npm run ingest
 */

import fs from "fs";
import path from "path";
// @ts-ignore
import pdfParse from "pdf-parse/legacy/build/pdf.js";
import { getEmbeddings } from "../lib/rag/embeddings";
import { saveVectorStore } from "../lib/rag/vectorstore";

interface Chunk {
  text: string;
  pageNumber: number;
}

/**
 * Split text into chunks of approximately maxTokens
 * Roughly assumes 1 token ≈ 4 characters
 */
function chunkText(text: string, maxTokens: number = 500, overlapTokens: number = 50): Chunk[] {
  const chunks: Chunk[] = [];
  const maxChars = maxTokens * 4;
  const overlapChars = overlapTokens * 4;

  // Split by page breaks first
  const pages = text.split(/\f/);

  for (let pageNum = 0; pageNum < pages.length; pageNum++) {
    const page = pages[pageNum];
    let position = 0;

    while (position < page.length) {
      const chunkText = page.substring(position, position + maxChars);
      chunks.push({
        text: chunkText.trim(),
        pageNumber: pageNum + 1,
      });

      position += maxChars - overlapChars;
    }
  }

  return chunks.filter((c) => c.text.length > 50); // Filter out tiny chunks
}

async function main() {
  const guidelinesDir = path.join(process.cwd(), "data", "guidelines");
  const pdfPath = path.join(guidelinesDir, "Kenya_MoH_Clinical_Guidelines_2016.pdf");

  console.log("[Ingest] PataDaktari PDF Ingestion Script");
  console.log("========================================\n");

  // Check if PDF exists
  if (!fs.existsSync(pdfPath)) {
    console.error("❌ ERROR: PDF not found!");
    console.error(`   Expected at: ${pdfPath}\n`);
    console.error(
      "To proceed, please place the Kenya Ministry of Health Clinical Guidelines 2016 PDF"
    );
    console.error(
      "at the following location and run this script again:\n"
    );
    console.error(`   ${pdfPath}\n`);
    console.error(
      "You can obtain this document from the Kenya MoH website or official channels."
    );
    process.exit(1);
  }

  try {
    console.log(`[Ingest] Reading PDF: ${path.basename(pdfPath)}`);
    const pdfBuffer = fs.readFileSync(pdfPath);

    console.log("[Ingest] Parsing PDF content...");
    const pdfData = await pdfParse(pdfBuffer);
    const text = pdfData.text;

    console.log(`[Ingest] Extracted ${text.length} characters from ${pdfData.numpages} pages`);

    console.log("[Ingest] Chunking text...");
    const chunks = chunkText(text, 500, 50);
    console.log(`[Ingest] Created ${chunks.length} chunks`);

    console.log("[Ingest] Generating embeddings...");
    const chunkTexts = chunks.map((c) => c.text);
    const embeddings = await getEmbeddings(chunkTexts);

    console.log(`[Ingest] Generated ${embeddings.length} embeddings (${embeddings[0]?.length || 0} dimensions)`);

    console.log("[Ingest] Saving vector store...");
    const metadata = chunks.map((c) => ({
      source: "Kenya_MoH_Clinical_Guidelines_2016",
      pageNumber: c.pageNumber,
    }));

    await saveVectorStore(embeddings, chunkTexts, metadata);

    console.log("\n✅ Ingestion complete!");
    console.log(`   - ${chunks.length} chunks processed`);
    console.log(`   - Vector store saved to data/faiss/`);
    console.log("   - Ready to use with PataDaktari!\n");
  } catch (error) {
    console.error("[Ingest] ERROR:", error);
    process.exit(1);
  }
}

// Run the script
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
