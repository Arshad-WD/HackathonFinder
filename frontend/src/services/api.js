const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchEvents() {
  const res = await fetch(`${BASE_URL}/api/events`);
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

export async function triggerFetch() {
  const res = await fetch(`${BASE_URL}/trigger`, {
    method: "POST"
  });

  if (!res.ok) throw new Error("Failed to trigger fetch");
  return res.json();
}
