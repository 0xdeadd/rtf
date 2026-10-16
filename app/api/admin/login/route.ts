import { NextResponse } from "next/server";
import {
  COOKIE_NAME,
  authConfigured,
  checkPassword,
  cookieOptions,
  createSessionToken,
} from "@/lib/auth";

export async function POST(request: Request) {
  if (!authConfigured()) {
    return NextResponse.json({ error: "Admin not configured" }, { status: 500 });
  }

  let password = "";
  try {
    const body = await request.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    // fall through with empty password
  }

  if (!checkPassword(password)) {
    await new Promise((r) => setTimeout(r, 500));
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, createSessionToken(), cookieOptions);
  return res;
}
