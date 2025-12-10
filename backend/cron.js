import cron from "node-cron";
import { runDeepSearch } from "./runSearch.js";
import { archiveExpiredEvents } from "./archiveCleanup.js";


console.log("Cron scheduler started");
// Runs every Sunday at 9 AM
cron.schedule("0 9 * * 0", async () => {
  console.log("⏱ Weekly auto-fetch started");
  await runDeepSearch();
  console.log("✅ Weekly auto-fetch completed");
});

//  Daily cleanup at 2 AM
cron.schedule("0 2 * * *", () => {
  console.log("⏱ Running expired events cleanup");
  archiveExpiredEvents
});