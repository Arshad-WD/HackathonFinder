import fs from "fs";
import path from "path";
import { deepSearch } from "./deepSearch.js";
import { targets } from "./targets.js";
import { deduplicate } from "./deduplicate.js";
import { scoreEvent } from "./priority.js";

const RESULT_FILE = path.join(process.cwd(), "results.json");

export async function runDeepSearch() {
  console.log("🚀 Starting Deep Search...");
  console.log("📂 Writing results to:", RESULT_FILE);

  let existing = [];

  if (fs.existsSync(RESULT_FILE)) {
    existing = JSON.parse(fs.readFileSync(RESULT_FILE, "utf-8"));
    console.log(`📁 Loaded ${existing.length} existing records`);
  }

  let newResults = [];

  for (const url of targets) {
    const { items } = await deepSearch(url);

    console.log(`📥 Extracted ${items.length} items from ${url}`);

    const scored = items.map(item => {
      const priorityData = scoreEvent(item);
      return {
      ...item,
      priority: priorityData.score,
      priorityReasons: priorityData.reasons,
      source: url,
      indexedAt: new Date().toISOString()
      }
    });

    newResults.push(...scored);
  }

  // ✅ CRITICAL: Only write if we actually got new data
  if (newResults.length === 0) {
    console.warn("⚠️ No new results found. Keeping old data.");
    return existing;
  }

  const merged = deduplicate([...existing, ...newResults]);

  fs.writeFileSync(
    RESULT_FILE,
    JSON.stringify(merged, null, 2)
  );

  console.log(`✅ RESULTS WRITTEN`);
  console.log(`✅ FINAL TOTAL: ${merged.length}`);

  return merged;
}
