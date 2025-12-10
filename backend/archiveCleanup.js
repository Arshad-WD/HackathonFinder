import fs from "fs";

const ACTIVE_FILE = "results.json";
const ARCHIVE_FILE = "archive.json";

export function archiveExpiredEvents() {
  if (!fs.existsSync(ACTIVE_FILE)) return;

  let activeEvents = [];
  let archivedEvents = [];

  try {
    activeEvents = JSON.parse(fs.readFileSync(ACTIVE_FILE, "utf-8"));
  } catch {
    console.error("❌ Failed to parse results.json during archive cleanup");
    return;
  }

  if (fs.existsSync(ARCHIVE_FILE)) {
    try {
      archivedEvents = JSON.parse(fs.readFileSync(ARCHIVE_FILE, "utf-8"));
    } catch {
      console.error("❌ Failed to parse archive.json");
      archivedEvents = [];
    }
  }

  const today = new Date();

  const stillActive = [];
  const expiredToArchive = [];

  for (const event of activeEvents) {
    if (!event.deadline) {
      stillActive.push(event);
      continue;
    }

    const d = new Date(event.deadline);
    if (isNaN(d)) {
      stillActive.push(event);
      continue;
    }

    if (d < today) {
      expiredToArchive.push({
        ...event,
        archivedAt: new Date().toISOString()
      });
    } else {
      stillActive.push(event);
    }
  }

  //  Save updated active records
  fs.writeFileSync(ACTIVE_FILE, JSON.stringify(stillActive, null, 2));

  //  Append into archive.json
  if (expiredToArchive.length > 0) {
    const mergedArchive = [...archivedEvents, ...expiredToArchive];
    fs.writeFileSync(ARCHIVE_FILE, JSON.stringify(mergedArchive, null, 2));
  }

  console.log(
    expiredToArchive.length > 0
      ? `🧹 Archived ${expiredToArchive.length} expired events`
      : " No expired events to archive"
  );
}
