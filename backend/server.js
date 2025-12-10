import express from "express";
import cors from "cors";
import fs from "fs";
import "./cron.js"

import { runDeepSearch } from "./runSearch.js";

const app = express();
app.use(cors(
   origin= "*",
    methods= ["GET", "POST"]
));

const RESULT_FILE = "results.json";

//  MANUAL FETCH (BUTTON)
app.get("/fetch", async (req, res) => {
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

//  FRONTEND READS FROM HERE
app.get("/events", (req, res) => {
  if (!fs.existsSync(RESULT_FILE)) {
    return res.json([]);
  }

  const data = JSON.parse(fs.readFileSync(RESULT_FILE, "utf-8"));
  res.json(data);
});


app.get("/ping", (req, res) => {
  res.send("OK");
});


app.listen(3001, () => {
  console.log(" API running on http://localhost:3001");
});
