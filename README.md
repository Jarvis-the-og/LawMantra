# ⚖️ Legal First-Aid — Cybercrime Scam Analyzer

An AI-powered tool that helps cybercrime victims identify scams, understand their legal rights under Indian law, and take immediate action.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- An OpenAI API key

---

### 1. Clone & Setup

```bash
git clone <your-repo-url>
cd legal-firstaid
```

---

### 2. Backend Setup

```bash
cd server
npm install

# Create your .env file
cp .env.example .env
```

Edit `server/.env`:
```env
PORT=5000
OPENAI_API_KEY=sk-your-key-here
NODE_ENV=development
```

Start the server:
```bash
npm run dev
# Server runs at http://localhost:5000
```

---

### 3. Frontend Setup

Open a new terminal:
```bash
cd client
npm install
npm run dev
# App runs at http://localhost:3000
```

---

## 📁 Project Structure

```
legal-firstaid/
├── client/                  # React + Vite frontend
│   └── src/
│       ├── components/
│       │   ├── Upload.jsx       # Drag & drop image uploader
│       │   ├── ResultCard.jsx   # Scam type, risk, legal info
│       │   ├── ActionList.jsx   # Checkable action steps
│       │   └── Loader.jsx       # Animated analysis loader
│       ├── pages/
│       │   ├── Home.jsx         # Upload page
│       │   └── Result.jsx       # Results + PDF download
│       └── services/
│           └── api.js           # Axios API calls
│
└── server/                  # Node.js + Express backend
    ├── routes/
    │   └── analyze.js           # POST /api/analyze, /api/generate-pdf
    ├── controllers/
    │   └── analyzeController.js # Orchestrates the full pipeline
    ├── services/
    │   ├── ocr.js               # Tesseract.js OCR
    │   ├── ai.js                # OpenAI classification + actions
    │   ├── legalMap.js          # ⚠️ Static legal sections (no AI)
    │   └── pdf.js               # pdfkit complaint generator
    └── utils/
        └── cleanText.js         # OCR text normalization
```

---

## 🔄 How It Works

```
User uploads screenshot
        ↓
  Tesseract.js OCR
        ↓
  OpenAI classifies scam type + confidence
        ↓
  Static legalMap.js → returns verified legal sections
        ↓
  OpenAI generates action steps
        ↓
  Frontend shows results
        ↓
  Optional: pdfkit generates complaint PDF
```

---

## 🔌 API Endpoints

### `POST /api/analyze`
- **Body**: `multipart/form-data` with `image` (file)
- **Returns**: JSON with `scamType`, `confidence`, `riskLevel`, `law`, `actions`, `explanation`, `extractedText`

### `POST /api/generate-pdf`
- **Body**: `{ scamType, description, name, law, actions }`
- **Returns**: PDF file download

---

## ⚖️ Supported Scam Types

| Type | Legal Sections |
|------|---------------|
| `phishing` | IT Act 66C, 66D |
| `upi_fraud` | IT Act 66D + IPC 420 |
| `job_scam` | IPC 420, 406 |
| `lottery_scam` | IPC 420 + Prize Chits Act 1978 |
| `unknown` | IT Act 66 + IPC 420 |

> ⚠️ **Legal sections are statically defined — AI never generates laws.**

---

## 🛡️ Design Decisions

- **Tesseract.js** — Free OCR, runs server-side, no external API needed
- **OpenAI GPT-3.5-turbo** — Used only for classification + action generation
- **Static legal mapping** — Zero hallucination risk for legal content
- **pdfkit** — Server-side PDF, no third-party service needed
- **No database** — Stateless, fast, privacy-respecting

---

## 🧪 Demo Flow

1. Upload a WhatsApp scam screenshot
2. Watch the 4-step analysis animation
3. See: scam type, risk level, legal sections, actions
4. Enter your name → download complaint PDF

---

## Created jointly by-

1. Rishabh Dev Pandey
2. Mohak Jain
3. Richa Singh
4. Siddharth

---

## 📞 Useful Links

- Report cybercrime: [cybercrime.gov.in](https://cybercrime.gov.in)
- National helpline: **1930**
