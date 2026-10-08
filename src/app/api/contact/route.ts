import { NextResponse } from "next/server";
import { EmailConfigurationError, sendContactConfirmation, sendContactEmail } from "@/lib/email";

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

  try {
    const contact = { name, email, phone, subject, message };
    await Promise.all([sendContactEmail(contact), sendContactConfirmation(contact)]);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof EmailConfigurationError) {
      return NextResponse.json({ error: "Email service is not configured." }, { status: 503 });
    }
    return NextResponse.json({ error: "Unable to send your message." }, { status: 502 });
  }
}