import { crawlPage } from "./crawler.js";
import { extractInfo } from "../utils/openrouterLLM.js";
import { isFutureOrToday } from "../utils/filters.js";


function estimateDeadline() {
  const d = new Date();
  d.setDate(d.getDate() + 21); // default: 3 weeks from now
  return d.toISOString().split("T")[0];
}


// ✅ REGEX FALLBACK EXTRACTOR
function regexExtract(text) {
  const results = [];
  const lines = text.split("\n");

  for (const line of lines) {
    const lower = line.toLowerCase();

    if (lower.includes("hackathon") || lower.includes("internship")) {
      results.push({
        title: line.slice(0, 120),
        type: lower.includes("intern") ? "internship" : "hackathon",
        mode: lower.includes("online") ? "online" : "offline",
        location: lower.includes("online") ? null : "India",
        deadline: null,
        description: null,
        url: null
      });
    }
  }

  return results;
}

export async function deepSearch(url) {
  console.log("🌐 Crawling:", url);

  const rawText = await crawlPage(url);
  if (!rawText) {
    return { url, items: [] };
  }

  let items = [];

  // ✅ AI FIRST, REGEX FALLBACK IF AI FAILS
  try {
    const extractedRaw = await extractInfo(rawText);
    const parsed = JSON.parse(extractedRaw);
    items = Array.isArray(parsed) ? parsed : [parsed];
  } catch (err) {
    console.warn("⚠️ AI failed → Using regex fallback");
    items = regexExtract(rawText); // ✅ RESTORED
  }

  // ✅ NORMALIZE STRUCTURE
  const normalized = items
    .filter(Boolean)
    .map(item => {
      let mode = item.mode?.toLowerCase()?.trim();

      if (mode === "in_person") mode = "offline";
      if (mode === "hybrid") mode = "offline";

      return {
        title: item.title?.trim() || null,
        type: item.type?.toLowerCase().trim() || null,
        mode: mode || "online",
        location:
          mode === "online"
            ? null
            : item.location?.trim() || "India",

        deadline: item.deadline?.trim() || estimateDeadline(),
        description: item.description?.trim() || null,

        // ✅ URL GUARANTEE
        url: item.url?.trim() || url
      };
    });

  // ✅ FILTER LOGIC (SAFE)
  const filtered = normalized.filter(item => {
    const deadlineOk =
      !item.deadline || isFutureOrToday(item.deadline);

    const modeOk =
      item.mode === "online" ||
      (item.mode === "offline" && item.location);

    return deadlineOk && modeOk && item.title;
  });

  console.log(
    `✅ FINAL FILTERED ITEMS FROM ${url}:`,
    filtered.length
  );

  return { url, items: filtered };
}
