import { NextRequest, NextResponse } from "next/server";
import { getSessions, setSessions, Session } from "@/lib/kv";

export type { Session };

export async function GET() {
  const sessions = await getSessions();
  return NextResponse.json(sessions);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const session: Session = {
    id: crypto.randomUUID(),
    date: body.date ?? new Date().toISOString().split("T")[0],
    durationMinutes: body.durationMinutes ?? 30,
    completedAt: body.completedAt ?? new Date().toISOString(),
    label: body.label ?? "Focus Session",
  };

  const sessions = await getSessions();
  sessions.push(session);
  await setSessions(sessions);

  return NextResponse.json(session, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, label } = body;
  if (!id || typeof label !== "string") {
    return NextResponse.json({ error: "Missing id or label" }, { status: 400 });
  }

  const sessions = await getSessions();
  const index = sessions.findIndex((s) => s.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  sessions[index].label = label;
  await setSessions(sessions);
  return NextResponse.json(sessions[index]);
}
