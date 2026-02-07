const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchEvents() {
  const res = await fetch(`${BASE_URL}/api/events?t=${Date.now()}`, {
    cache: "no-store",
    headers: {
      "Cache-Control": "no-cache",
      "Pragma": "no-cache"
    }
  });
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

export async function triggerFetch() {
  const res = await fetch(`${BASE_URL}/trigger`, {
    method: "POST"
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Trigger blocked");
  }

  return res.json();
}
