import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import "../cron.js";
import { runDeepSearch } from "./core/runSearch.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"]
}));

app.use(express.json());

const RESULT_FILE = path.join(process.cwd(), "data", "results.json");

// ✅ PROTECTION SYSTEM
let isJobRunning = false;
let lastRunTime = 0;
const COOLDOWN_MS = 10 * 60 * 1000; // 10 minutes

// ✅ SAFE TRIGGER
app.post("/trigger", async (req, res) => {
  const now = Date.now();

  if (isJobRunning) {
    return res.status(429).json({
      success: false,
      message: "⚠️ A fetch is already in progress. Please wait."
    });
  }

  if (now - lastRunTime < COOLDOWN_MS) {
    const wait = Math.ceil((COOLDOWN_MS - (now - lastRunTime)) / 1000);
    return res.status(429).json({
      success: false,
      message: `⏳ Please wait ${wait}s before triggering again.`
    });
  }

  try {
    isJobRunning = true;
    lastRunTime = now;

    console.log("🖱 Manual fetch triggered");

    const data = await runDeepSearch();

    return res.json({
      success: true,
      count: data.length
    });
  } catch (err) {
    console.error("Fetch failed:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal fetch error"
    });
  } finally {
    isJobRunning = false;
  }
});

// ✅ FRONTEND READS FROM HERE
app.get("/api/events", async (req, res) => {
  // Try local first
  if (fs.existsSync(RESULT_FILE)) {
    const data = JSON.parse(fs.readFileSync(RESULT_FILE, "utf-8"));
    return res.json(data);
  }

  // Fallback to GitHub (for Vercel/Serverless)
  try {
    const GITHUB_RAW_URL = "https://raw.githubusercontent.com/Arshad-WD/HackathonFinder/main/backend/data/results.json";
    const response = await fetch(GITHUB_RAW_URL);
    if (response.ok) {
      const data = await response.json();
      return res.json(data);
    }
  } catch (err) {
    console.error("❌ GitHub fallback failed:", err.message);
  }

  res.json([]);
});

app.get("/ping", (req, res) => {
  res.send("OK");
});

app.listen(PORT, () => {
  console.log(`✅ API running on port ${PORT}`);
});
