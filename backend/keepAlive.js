import fetch from "node-fetch";

const SERVER_URL = "https://your-render-app.onrender.com/ping";

console.log("✅ Keep-Alive service started");

setInterval(async () => {
  try {
    const res = await fetch(SERVER_URL);

    console.log(
      `Pinged server at ${new Date().toLocaleTimeString()} — Status: ${res.status}`
    );
  } catch (err) {
    console.error("❌ Keep-alive ping failed:", err.message);
  }
}, 15 * 60 * 1000); 
