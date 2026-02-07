import fs from "fs";
import path from "path";
import { Octokit } from "@octokit/rest";
import { deepSearch } from "./deepSearch.js";
import { targets } from "../config/targets.js";
import { deduplicate } from "../utils/deduplicate.js";
import { scoreEvent } from "../utils/priority.js";

const RESULT_FILE = path.join(process.cwd(), "data", "results.json");

// ✅ GITHUB CONFIG
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const REPO_OWNER = "Arshad-WD"; // Based on your workspace info
const REPO_NAME = "HackathonFinder";

async function pushToGithub(content) {
  if (!process.env.GITHUB_TOKEN) {
    console.warn("⚠️ GITHUB_TOKEN not found. Skipping GitHub sync.");
    return;
  }

  try {
    const filePath = "backend/data/results.json";
    let sha;
    
    try {
      const { data } = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: filePath,
      });
      sha = data.sha;
    } catch (e) {
      console.log("🆕 New file on GitHub");
    }

    await octokit.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: filePath,
      message: "🤖 chore: update search results [skip ci]",
      content: Buffer.from(JSON.stringify(content, null, 2)).toString("base64"),
      sha,
    });
    console.log("✅ Results pushed to GitHub");
  } catch (err) {
    console.error("❌ GitHub sync failed:", err.message);
  }
}

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
    try {
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
    } catch (err) {
      console.error(`❌ Search failed for ${url}:`, err.message);
    }
  }

  if (newResults.length === 0) {
    console.warn("⚠️ No new results found. Keeping old data.");
    return existing;
  }

  const merged = deduplicate([...existing, ...newResults]);

  // Save locally
  fs.writeFileSync(RESULT_FILE, JSON.stringify(merged, null, 2));
  console.log(`✅ LOCAL RESULTS WRITTEN`);

  // Sync to GitHub
  await pushToGithub(merged);

  console.log(`✅ FINAL TOTAL: ${merged.length}`);
  return merged;
}
