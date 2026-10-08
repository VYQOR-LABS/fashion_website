import { NextResponse } from "next/server";

type ContactInquiry = { name: string; email: string; phone?: string; subject: string; message: string };

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Please check the information and try again." }, { status: 400 });
  }
  const input = body as Partial<ContactInquiry>;
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim() : "";
  const phone = typeof input.phone === "string" ? input.phone.trim() : "";
  const subject = typeof input.subject === "string" ? input.subject.trim() : "";
  const message = typeof input.message === "string" ? input.message.trim() : "";
  if (name.length < 2 || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || phone.length > 30 || subject.length < 2 || subject.length > 120 || message.length < 10 || message.length > 3000) {
    return NextResponse.json({ error: "Please check the information and try again." }, { status: 400 });
  }

  const apiKey = process.env.EMAIL_API_KEY;
  const businessEmail = process.env.BUSINESS_EMAIL;
  const sender = process.env.EMAIL_FROM;
  if (!apiKey || !businessEmail || !sender) return NextResponse.json({ error: "Email service is not configured." }, { status: 503 });

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: sender,
        to: [businessEmail],
        reply_to: email,
        subject: `Website inquiry: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return NextResponse.json({ error: "Unable to send your message." }, { status: 502 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unable to send your message." }, { status: 502 });
  }
}