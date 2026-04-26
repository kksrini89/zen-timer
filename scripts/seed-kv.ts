import { createClient } from "@vercel/kv";
import fs from "fs/promises";

const kv = createClient({
  url: process.env.KV_REST_API_URL || process.env.KV_URL,
  token: process.env.KV_REST_API_TOKEN,
});

async function seed() {
  const raw = await fs.readFile("./data/sessions.json", "utf-8");
  const sessions = JSON.parse(raw);
  await kv.set("sessions", sessions);
  console.log(`Seeded ${sessions.length} sessions into KV`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
