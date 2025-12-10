import fs from "fs";

const RESULTS_FILE = "results.json";

export function removeExpiredEvents() {
  if (!fs.existsSync(RESULTS_FILE)) return;

  const raw = fs.readFileSync(RESULTS_FILE, "utf-8");
  let events = [];

  try {
    events = JSON.parse(raw);
  } catch {
    console.error("Failed to parse results.json during cleanup");
    return;
  }

  const today = new Date();
  const before = events.length;

  const filtered = events.filter(event => {
    if (!event.deadline) return true;

    const d = new Date(event.deadline);
    if (isNaN(d)) return true;

    return d >= today;
  });

  const after = filtered.length;

  if (before !== after) {
    fs.writeFileSync(RESULTS_FILE, JSON.stringify(filtered, null, 2));
    console.log(`🧹 Removed ${before - after} expired events`);
  } else {
    console.log("✅ No expired events found");
  }
}
