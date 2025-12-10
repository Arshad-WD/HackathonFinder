import express from "express";
import cors from "cors";
import fs from "fs";
import "./cron.js";

import { runDeepSearch } from "./runSearch.js";

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"]
}));

app.use(express.json());

const RESULT_FILE = "results.json";

app.post("/trigger", async (req, res) => {
  try {
    console.log("🖱 Manual fetch triggered");

    const data = await runDeepSearch();

    return res.json({
      success: true,
      count: data.length
    });
  } catch (err) {
    console.error("Fetch failed:", err.message);
    return res.status(500).json({ success: false });
  }
});

app.get("/api/events", (req, res) => {
  if (!fs.existsSync(RESULT_FILE)) {
    return res.json([]);
  }

  const data = JSON.parse(fs.readFileSync(RESULT_FILE, "utf-8"));
  res.json(data);
});

app.get("/ping", (req, res) => {
  res.send("OK");
});

app.listen(PORT, () => {
  console.log(`✅ API running on port ${PORT}`);
});
