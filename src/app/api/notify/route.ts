// src/app/api/notify/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type NotifyPayload = {
  email: string;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_term?: string | null;
  utm_content?: string | null;
  referrer?: string | null;
};

const bucket = new Map<string, { n: number; t: number }>();
const WINDOW = 60_000;
const LIMIT = 8;

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is missing. Add it to .env.local or Vercel env.");
  return new Resend(key);
}

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return "Server error";
}

export async function POST(req: Request) {
  try {
    const ip =
      (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "0.0.0.0";

    // rate limit
    const now = Date.now();
    const cur = bucket.get(ip);
    if (!cur || now - cur.t > WINDOW) {
      bucket.set(ip, { n: 1, t: now });
    } else {
      if (cur.n >= LIMIT) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
      cur.n += 1;
    }

    const body = (await req.json().catch(() => ({}))) as Partial<NotifyPayload>;
    const {
      email,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      referrer,
    } = body;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const resend = getResend();

    const to = process.env.NOTIFY_TO!;
    const from = process.env.NOTIFY_FROM!;
    const subject = `New BudMeet waitlist: ${email}`;

    const lines = [
      `Email: ${email}`,
      `UTM Source: ${utm_source ?? "-"}`,
      `UTM Medium: ${utm_medium ?? "-"}`,
      `UTM Campaign: ${utm_campaign ?? "-"}`,
      `UTM Term: ${utm_term ?? "-"}`,
      `UTM Content: ${utm_content ?? "-"}`,
      `Referrer: ${referrer ?? "-"}`,
      `User-Agent: ${req.headers.get("user-agent") || "-"}`,
      `IP: ${ip}`,
      `Time: ${new Date().toISOString()}`,
    ];
    const text = lines.join("\n");
    const html = `<pre style="font:14px/1.45 ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace">${lines.join(
      "\n"
    )}</pre>`;

    await resend.emails.send({ from, to, subject, text, html });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: getErrorMessage(err) }, { status: 500 });
  }
}
