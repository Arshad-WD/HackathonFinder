import dotenv from "dotenv";
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { createRateLimiter } from "./rateLimiter.js"; //  MUST EXIST

dotenv.config();

//  SAFETY CHECK
if (!process.env.OPENROUTER_API_KEY) {
  console.error("OPENROUTER_API_KEY missing in .env");
  process.exit(1);
}

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost",
    "X-Title": "Opportunity AI Free Mode"
  }
});

//  STABLE FREE MODELS
const FREE_MODELS = [
  "openchat/openchat-7b:free",
  "mistralai/mistral-small-3.1-24b-instruct:free",
  "mistralai/mistral-7b-instruct:free",
  "mistralai/mixtral-8x22b-instruct"
];

//  RATE LIMITER (1 REQUEST EVERY 8 SECONDS)
const llmLimiter = createRateLimiter({
  maxRequests: 1,
  windowMs: 8000
});

//  CACHE CONFIG
const CACHE_DIR = path.join(process.cwd(), "llm-cache");
const CACHE_TTL_DAYS = 7;
const MAX_CACHE_FILES = 300;

if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR);
}

//  SAFE HASHED CACHE KEY
function getCacheKey(text) {
  return crypto.createHash("sha1").update(text.slice(0, 2000)).digest("hex");
}

function readFromCache(key) {
  const file = path.join(CACHE_DIR, `${key}.json`);
  if (!fs.existsSync(file)) return null;

  const stats = fs.statSync(file);
  const ageMs = Date.now() - stats.mtimeMs;
  const maxAge = CACHE_TTL_DAYS * 24 * 60 * 60 * 1000;

  if (ageMs > maxAge) {
    fs.unlinkSync(file);
    console.log("🧹 Expired LLM cache removed");
    return null;
  }

  return fs.readFileSync(file, "utf-8");
}

function writeToCache(key, data) {
  const file = path.join(CACHE_DIR, `${key}.json`);
  fs.writeFileSync(file, data);
  enforceCacheLimit();
}

function enforceCacheLimit() {
  const files = fs.readdirSync(CACHE_DIR);
  if (files.length <= MAX_CACHE_FILES) return;

  const sorted = files
    .map(name => ({
      name,
      time: fs.statSync(path.join(CACHE_DIR, name)).atimeMs
    }))
    .sort((a, b) => a.time - b.time);

  const excess = sorted.length - MAX_CACHE_FILES;

  for (let i = 0; i < excess; i++) {
    fs.unlinkSync(path.join(CACHE_DIR, sorted[i].name));
  }

  console.log(`🧹 LLM cache trimmed to ${MAX_CACHE_FILES} files`);
}

//  HARD JSON CLEANER
function cleanAndExtractJSON(text) {
  if (!text) return "[]";

  text = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .replace(/\[OUT\]/gi, "")
    .replace(/\n\n+/g, "\n")
    .trim();

  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");

  if (start === -1 || end === -1) {
    console.warn(" No JSON array detected in LLM output.");
    return "[]";
  }

  const sliced = text.slice(start, end + 1);

  try {
    JSON.parse(sliced);
    return sliced;
  } catch {
    console.warn(" JSON validation failed. Returning empty array.");
    return "[]";
  }
}

//   MAIN EXTRACTION FUNCTION
export async function extractInfo(text) {
  const cacheKey = getCacheKey(text);
  const cached = readFromCache(cacheKey);

  if (cached) {
    console.log("🧠 Using cached LLM result");
    return cached;
  }

  const truncated =
    text.length > 14000 ? text.substring(0, 14000) : text;

  const prompt = `
You are a strict information extraction engine.

Return ONLY a valid JSON array.

Schema:
[
  {
    "title": string,
    "type": "hackathon" | "internship",
    "mode": "online" | "offline",
    "location": string | null,
    "deadline": "YYYY-MM-DD" | null,
    "description": string | null,
    "url": string | null
  }
]

Rules:
- No markdown
- No explanations
- No fake data
- If online → location must be null
- If offline → location must be real place
- If unclear → return null

TEXT:
${truncated}

JSON:
`;

  for (let i = 0; i < FREE_MODELS.length; i++) {
    const model = FREE_MODELS[i];
    console.log(`🧠 Trying model [${i + 1}/${FREE_MODELS.length}]: ${model}`);

    try {
      const completion = await llmLimiter(() =>
        client.chat.completions.create({
          model,
          temperature: 0.2,
          max_tokens: 2200,
          messages: [{ role: "user", content: prompt }]
        })
      );

      const rawOutput =
        completion.choices?.[0]?.message?.content || "";

      console.log(" RAW LLM OUTPUT:\n", rawOutput);

      const cleaned = cleanAndExtractJSON(rawOutput);

      if (cleaned !== "[]") {
        writeToCache(cacheKey, cleaned);
        console.log(` CLEAN JSON RETURNED BY: ${model}`);
        return cleaned;
      }

      console.warn(` Model returned empty JSON: ${model}`);
    } catch (err) {
      console.warn(` Model failed: ${model}`);
      console.warn("Reason:", err?.message);

      if (err?.message?.includes("429")) {
        console.error("🚫 DAILY FREE OPENROUTER QUOTA EXHAUSTED");
        break;
      }
    }
  }

  console.error("All FREE OpenRouter models failed.");
  return "[]";
}
