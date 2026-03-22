const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Free model on Groq — fast and capable
const MODEL = "llama-3.1-8b-instant";

const VALID_SCAM_TYPES = ["phishing", "job_scam", "lottery_scam", "upi_fraud", "unknown"];

/**
 * Classifies the scam type from extracted text using GPT
 * @param {string} text - Cleaned OCR text
 * @returns {Promise<{type: string, confidence: number, reason: string}>}
 */
const classifyScam = async (text) => {
  const systemPrompt = `You are a cybercrime classification expert for India.
Analyze the given message text and classify it into one of these exact categories:
- phishing
- job_scam
- lottery_scam
- upi_fraud
- unknown

Return ONLY a valid JSON object with these exact fields:
{
  "type": "<one of the categories above>",
  "confidence": <integer 0-100>,
  "reason": "<one sentence explaining why, max 20 words>"
}

Do NOT include any markdown, code fences, or extra text. Just the JSON object.`;

  const userPrompt = `Classify this message:\n\n${text.slice(0, 1500)}`;

  const response = await groq.chat.completions.create({
    model: MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.2,
    max_tokens: 150,
  });

  const raw = response.choices[0]?.message?.content?.trim() || "{}";

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    console.error("OpenAI returned invalid JSON for classification:", raw);
    return { type: "unknown", confidence: 0, reason: "Could not determine scam type." };
  }

  // Validate type
  if (!VALID_SCAM_TYPES.includes(parsed.type)) {
    parsed.type = "unknown";
  }

  return {
    type: parsed.type || "unknown",
    confidence: Math.min(100, Math.max(0, parseInt(parsed.confidence) || 0)),
    reason: parsed.reason || "No explanation provided.",
  };
};

/**
 * Generates action steps for a given scam type
 * @param {string} scamType
 * @returns {Promise<string[]>}
 */
const generateActions = async (scamType) => {
  const systemPrompt = `You are a cybercrime legal advisor in India.
Return ONLY a valid JSON array of 4-5 short, actionable steps a victim should take immediately.
Each step must be a plain string under 15 words.
No markdown, no numbering, no extra text — just a raw JSON array.
Example: ["Call your bank immediately", "Block the sender's number"]`;

  const userPrompt = `Generate immediate action steps for a victim of: ${scamType.replace(/_/g, " ")} scam in India.`;

  const response = await groq.chat.completions.create({
    model: MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.3,
    max_tokens: 200,
  });

  const raw = response.choices[0]?.message?.content?.trim() || "[]";

  try {
    const actions = JSON.parse(raw);
    if (Array.isArray(actions)) return actions;
  } catch {
    console.error("OpenAI returned invalid JSON for actions:", raw);
  }

  // Fallback actions
  return [
    "Do not share personal or financial information",
    "Report to cybercrime.gov.in immediately",
    "Take screenshots and preserve evidence",
    "Contact your bank if financial details were shared",
  ];
};

module.exports = { classifyScam, generateActions };
