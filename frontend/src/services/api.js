const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function fetchEvents() {
  const res = await fetch(`${BASE_URL}/events`);
  return res.json();
}

export async function triggerFetch() {
  const res = await fetch(`${BASE_URL}/fetch`);
  return res.json();
}
