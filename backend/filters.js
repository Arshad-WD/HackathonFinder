// filters.js

export function isValidDateString(s) {
  if (!s || typeof s !== "string") return false;
  const d = new Date(s);
  return d.toString() !== "Invalid Date";
}

export function isFutureOrToday(dateStr, now = new Date()) {
  if (!isValidDateString(dateStr)) return false;
  const d = new Date(dateStr);
  // Compare only date (ignore time) if you prefer:
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return target >= today;
}

export function matchesIndiaOrOnline(location) {
  if (!location || typeof location !== "string") return false;
  const loc = location.toLowerCase();
  return loc.includes("india") || loc.includes("online");
}
