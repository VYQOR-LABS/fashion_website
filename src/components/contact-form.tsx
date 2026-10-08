"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";

export function ContactForm() {
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const [error, setError] = useState("");
    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus("sending");
        setError("");
        const form = event.currentTarget;
        const payload = Object.fromEntries(new FormData(form).entries());
        try {
            const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
            if (!response.ok) throw new Error("Please try again or contact us on WhatsApp.");
            form.reset();
            setStatus("sent");
        } catch (submitError) {
            setStatus("error");
            setError(submitError instanceof Error ? submitError.message : "Something went wrong. Please try again.");
        }
    }
    return <form className="contact-form" onSubmit={submit}>
        <div className="form-row"><label>Your name<input name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Name" /></label><label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" /></label></div>
        <div className="form-row"><label>Phone <span>(optional)</span><input name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="+254" /></label><label>Subject<input name="subject" required maxLength={120} placeholder="How can we help?" /></label></div>
        <label>Your message<textarea name="message" required minLength={10} maxLength={3000} rows={5} placeholder="Tell us what you have in mind..." /></label>
        <div className="form-submit"><button className="button button-dark" type="submit" disabled={status === "sending"}>{status === "sending" ? <><LoaderCircle className="spin" size={16} /> Sending</> : <>Send your message <ArrowUpRight size={15} /></>}</button><span className={`form-status ${status}`}>{status === "sent" && <><Check size={15} /> Thank you. Your message has been sent successfully.</>}{status === "error" && error}</span></div>
    </form>;
}