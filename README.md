# PataDaktari 🏥

**Health guidance for every Nairobi resident** — A production-ready web app that provides safe, guideline-based health triage in English and Swahili.

> **What is PataDaktari?**  
> PataDaktari helps Nairobi residents with common health concerns decide whether to stay home, visit a clinic, or call emergency services (999). It uses Kenya Ministry of Health Clinical Guidelines 2016 and Claude AI to provide safe, evidence-based guidance. **PataDaktari is NOT a doctor** — it supplements, never replaces, medical advice.

---

## Features

✅ **Multilingual**: English and Kiswahili  
✅ **Mobile-First**: Works on basic Android smartphones on 3G  
✅ **Emergency Detection**: Immediate escalation for critical symptoms  
✅ **RAG Pipeline**: Retrieval-Augmented Generation using local embeddings (no extra API keys)  
✅ **Facility Finder**: Locates 3 nearest health facilities using geolocation  
✅ **Privacy-First**: No data storage, no tracking, no cookies (only language preference)  
✅ **Scope-Controlled**: Covers 4 conditions only (malaria, respiratory, diarrheal, first aid)  
✅ **Kenya Ministry of Health Grounded**: All guidance from Clinical Guidelines 2016  

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15 | Full-stack framework, SSR |
| **React** | 19 | UI components |
| **TypeScript** | 5+ | Type safety |
| **Tailwind CSS** | 4 | Styling |
| **Claude AI** | `claude-sonnet-4-20250514` | Triage reasoning |
| **@xenova/transformers** | latest | Local embeddings (no API key) |
| **Anthropic SDK** | latest | Claude integration |
| **Vercel** | — | Deployment |

---

## Quick Start

### Prerequisites

- **Node.js** 20+
- **npm** 9+
- **Anthropic API Key** (free trial available at [console.anthropic.com](https://console.anthropic.com))
- **Kenya Clinical Guidelines 2016 PDF** (see below)

### Installation

```bash
# 1. Clone the repo (or navigate to existing directory)
cd patadactari

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Create .env.local and add your API key
echo "ANTHROPIC_API_KEY=your_key_here" > .env.local

# 4. Place Kenya Clinical Guidelines 2016 PDF here
# Place the file at: data/guidelines/Kenya_MoH_Clinical_Guidelines_2016.pdf

# 5. Run the ingestion script (generates vector store)
npm run ingest

# 6. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## PDF Setup

### How to Obtain the Guidelines

The **Kenya Ministry of Health Clinical Guidelines 2016** is publicly available from:
- Official MOH website: [www.health.go.ke](https://www.health.go.ke)
- WHO Country Office Kenya
- Official health documentation repositories

### Where to Place It

After downloading, place the PDF at:
```
patadactari/data/guidelines/Kenya_MoH_Clinical_Guidelines_2016.pdf
```

### Running the Ingestion Script

```bash
npm run ingest
```

This one-time process will:
1. ✅ Read and parse the PDF
2. ✅ Split it into ~500-token chunks with 50-token overlap
3. ✅ Generate embeddings using local `@xenova/transformers` model
4. ✅ Save the vector store to `data/faiss/index.json`
5. ✅ Ready to use!

**Output:**
```
[Ingest] PataDaktari PDF Ingestion Script
========================================

[Ingest] Reading PDF: Kenya_MoH_Clinical_Guidelines_2016.pdf
[Ingest] Extracted 125432 characters from 287 pages
[Ingest] Created 245 chunks
[Ingest] Generated 245 embeddings (384 dimensions)

✅ Ingestion complete!
   - 245 chunks processed
   - Vector store saved to data/faiss/
   - Ready to use with PataDaktari!
```

---

## Architecture

### RAG Pipeline (Retrieval-Augmented Generation)

```
User Input (Symptoms)
        ↓
[1] Emergency Check (Client-side)
        ├→ Yes? → Redirect to /emergency
        └→ No? → Continue to triage
        ↓
[2] POST /api/triage
        ↓
[3] Embed symptoms using local Xenova/all-MiniLM-L6-v2
        ↓
[4] Vector similarity search → Top 3 relevant guidelines
        ↓
[5] Build system prompt with guidelines context
        ↓
[6] Call Claude API with symptoms + context
        ↓
[7] Analyze response for urgency & condition
        ↓
[8] Return structured JSON
        ↓
Display: Guidance + Facilities + Disclaimer
```

### File Structure

```
patadactari/
├── app/
│   ├── layout.tsx                  # Root layout with language provider
│   ├── page.tsx                    # Landing: symptom input
│   ├── api/
│   │   ├── triage/route.ts         # POST /api/triage — RAG pipeline
│   │   └── facilities/route.ts     # GET /api/facilities — location lookup
│   ├── triage/page.tsx             # Results page
│   ├── emergency/page.tsx          # Emergency escalation
│   └── globals.css                 # Global styles
│
├── components/
│   ├── LanguageProvider.tsx        # Context for language persistence
│   ├── LanguageToggle.tsx          # EN/SW switcher
│   ├── SymptomForm.tsx             # Input textarea + submit
│   ├── TriageResponse.tsx          # Displays guidance with urgency badge
│   ├── FacilityCard.tsx            # Individual facility display
│   └── EmergencyBanner.tsx         # Red alert for emergencies
│
├── lib/
│   ├── i18n.ts                     # All translations (EN/SW)
│   ├── emergency.ts                # Emergency keyword detection
│   ├── facilities.ts               # Haversine distance + facility lookup
│   └── rag/
│       ├── prompt.ts               # Claude system prompt builder
│       ├── embeddings.ts           # @xenova/transformers wrapper
│       ├── vectorstore.ts          # Vector store CRUD + similarity search
│       └── pipeline.ts             # Orchestrates the full RAG flow
│
├── data/
│   ├── facilities.json             # 15 Nairobi public health facilities
│   ├── guidelines/                 # Place PDF here
│   └── faiss/                      # Generated vector store (after ingest)
│
├── scripts/
│   └── ingest.ts                   # PDF → chunks → embeddings → index
│
└── public/                         # SVG icons, logos

```

---

## Environment Variables

Create `.env.local`:

```env
ANTHROPIC_API_KEY=sk-ant-...
```

**No other API keys needed.** Embeddings run locally using `@xenova/transformers`.

---

## Development

### Run Development Server
```bash
npm run dev
```
Server runs at [http://localhost:3000](http://localhost:3000)  
Auto-reloads on file changes.

### Build for Production
```bash
npm run build
npm start
```

### Type Check
```bash
npx tsc --noEmit
```

---

## Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial PataDaktari setup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/patadactari.git
git push -u origin main
```

### 2. Deploy on Vercel

Use the Vercel Dashboard: [vercel.com/new](https://vercel.com/new)

### 3. Set Environment Variable

In Vercel Project Settings → Environment Variables:
```
ANTHROPIC_API_KEY = sk-ant-...
```

### 4. Include Vector Store

Commit the processed vector store to git before deploying:
```bash
# After running npm run ingest locally:
git add data/faiss/index.json
git commit -m "Add generated vector store"
git push
```

---

## Health Conditions Supported

PataDaktari covers exactly **4 conditions**:

1. **Malaria Suspicion** — Fever, chills, malaise
2. **Respiratory Infections** — Cough, cold, flu, pneumonia  
3. **Diarrheal Diseases** — Loose stools, vomiting, dehydration  
4. **Basic First Aid** — Cuts, burns, sprains  

---

## Privacy & Data Protection

✅ **No personal data stored**  
✅ **No user accounts or sign-in**  
✅ **No session logs of symptoms**  
✅ **No cookies** (except language preference)  
✅ **Compliant with Kenya Data Protection Act 2019**  
✅ **Symptoms sent only to Anthropic API** (encrypted in transit)

---

## Acknowledgements

- **Kenya Ministry of Health** — Clinical Guidelines 2016
- **Anthropic** — Claude AI
- **Xenova** — Open-source embeddings
- **Vercel** — Hosting & deployment

---

**PataDaktari** — Health guidance, locally grounded, globally accessible.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
