import cron from "node-cron";
import { runDeepSearch } from "./runSearch.js";

cron.schedule("0 0 */7 * *", async () => {
  console.log("🗓 Weekly auto crawl started...");
  await runDeepSearch();
});
