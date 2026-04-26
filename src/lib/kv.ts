import { createClient } from "@vercel/kv";

export interface Session {
  id: string;
  date: string;
  durationMinutes: number;
  completedAt: string;
  label?: string;
}

const kv = createClient({
  url: process.env.KV_REST_API_URL || process.env.KV_URL,
  token: process.env.KV_REST_API_TOKEN || process.env.KV_REST_API_READ_ONLY_TOKEN,
});

const SESSIONS_KEY = "sessions";

export async function getSessions(): Promise<Session[]> {
  try {
    const data = await kv.get<string>(SESSIONS_KEY);
    if (!data) return [];
    return JSON.parse(data) as Session[];
  } catch (err) {
    console.error("KV read error:", err);
    return [];
  }
}

export async function setSessions(sessions: Session[]): Promise<void> {
  try {
    await kv.set(SESSIONS_KEY, JSON.stringify(sessions));
  } catch (err) {
    console.error("KV write error:", err);
    throw err;
  }
}
