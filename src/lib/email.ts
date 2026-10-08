import "server-only";

import nodemailer, { type Transporter } from "nodemailer";
import { businessConfig } from "@/lib/config";

export interface EmailMessage {
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
}

export type ContactEmailData = {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
};

export class EmailConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EmailConfigurationError";
  }
}

let transporter: Transporter | undefined;

function getTransporter(): Transporter {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass || !Number.isInteger(port) || port < 1 || port > 65535) {
    throw new EmailConfigurationError("Email service is not configured.");
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });
  }

  return transporter;
}

export function getContactInbox(): string {
  const address = process.env.CONTACT_EMAIL || process.env.SMTP_TO || process.env.SMTP_USER;
  if (!address) throw new EmailConfigurationError("Contact inbox is not configured.");
  return address;
}

export async function sendEmail(message: EmailMessage): Promise<void> {
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  if (!from) throw new EmailConfigurationError("Email sender is not configured.");

  await getTransporter().sendMail({
    from,
    to: message.to,
    replyTo: message.replyTo,
    subject: message.subject.replace(/[\r\n]+/g, " "),
    text: message.text,
    html: message.html,
  });
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function detailRows(fields: ReadonlyArray<readonly [string, string]>): string {
  return `<table role="presentation" style="width:100%;border-collapse:collapse;margin-top:22px">${fields.map(([label, value]) => `<tr><td style="padding:11px 0;border-bottom:1px solid #e5ddd5;color:#71685f;font-size:13px;vertical-align:top;width:35%">${escapeHtml(label)}</td><td style="padding:11px 0;border-bottom:1px solid #e5ddd5;color:#211d1a;font-size:13px;vertical-align:top;white-space:pre-wrap;word-break:break-word">${escapeHtml(value)}</td></tr>`).join("")}</table>`;
}

function brandedEmail(eyebrow: string, title: string, intro: string, content: string): string {
  const businessEmail = businessConfig.email
    ? `<br /><a href="mailto:${escapeHtml(businessConfig.email)}" style="color:#8b6f5a;text-decoration:none">${escapeHtml(businessConfig.email)}</a>`
    : "";

  return `<!doctype html><html lang="en"><body style="margin:0;padding:0;background:#f4f0eb;font-family:Arial,Helvetica,sans-serif;color:#211d1a"><table role="presentation" style="width:100%;border-collapse:collapse;background:#f4f0eb"><tr><td align="center" style="padding:28px 14px"><table role="presentation" style="width:100%;max-width:620px;border-collapse:collapse;background:#fff"><tr><td style="padding:26px 30px;background:#211d1a;color:#faf8f5;border-bottom:4px solid #b9a18d"><div style="font-family:Georgia,serif;font-size:22px;letter-spacing:2px">VYQOR ATELIER</div><div style="margin-top:5px;color:#ded1c4;font-size:10px;letter-spacing:2px;text-transform:uppercase">Curated fashion. Effortless elegance.</div></td></tr><tr><td style="padding:30px 24px 34px"><p style="margin:0 0 10px;color:#8b6f5a;font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase">${eyebrow}</p><h1 style="margin:0;color:#211d1a;font-family:Georgia,serif;font-size:29px;font-weight:500;line-height:1.2">${title}</h1><p style="margin:14px 0 0;color:#6f6862;font-size:15px;line-height:24px">${intro}</p>${content}</td></tr><tr><td style="padding:22px 24px;background:#f7f4f0;color:#6f6862;font-size:12px;line-height:20px"><strong style="color:#211d1a">${escapeHtml(businessConfig.name)}</strong><br />${escapeHtml(businessConfig.location)}${businessEmail}</td></tr></table></td></tr></table></body></html>`;
}

export async function sendContactEmail(data: ContactEmailData): Promise<void> {
  const fields = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "Not provided"],
    ["Subject", data.subject],
    ["Message", data.message],
  ] as const;

  await sendEmail({
    to: getContactInbox(),
    replyTo: data.email,
    subject: `Website enquiry: ${data.subject}`,
    text: `NEW WEBSITE ENQUIRY\n\n${fields.map(([label, value]) => `${label}: ${value}`).join("\n")}`,
    html: brandedEmail(
      "New website enquiry",
      escapeHtml(data.subject),
      `${escapeHtml(data.name)} · ${escapeHtml(data.email)} · ${escapeHtml(data.phone || "No phone provided")}`,
      detailRows(fields),
    ),
  });
}

export async function sendContactConfirmation(data: ContactEmailData): Promise<void> {
  const fields = [["Subject", data.subject]] as const;

  await sendEmail({
    to: data.email,
    replyTo: getContactInbox(),
    subject: `We received your message | ${businessConfig.name}`,
    text: `Hello ${data.name},\n\nThank you for contacting ${businessConfig.name}. We have received your message and our team will get back to you shortly.\n\nSubject: ${data.subject}\n\n${businessConfig.name}\n${businessConfig.location}`,
    html: brandedEmail(
      `Thank you, ${escapeHtml(data.name)}`,
      "We have your message.",
      `Thank you for contacting ${escapeHtml(businessConfig.name)}. Our team will review your enquiry and get back to you shortly.`,
      detailRows(fields),
    ),
  });
}