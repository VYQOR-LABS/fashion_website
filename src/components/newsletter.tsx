"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

export function Newsletter() {
  const [joined, setJoined] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setJoined(true);
  }
  return <form className="newsletter-form" onSubmit={submit}>{joined ? <p className="newsletter-success"><Check size={17} /> You’re on the list. We’ll be in touch.</p> : <><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" required placeholder="Your email address" /><button type="submit" aria-label="Subscribe to newsletter"><ArrowUpRight size={19} /></button></>}</form>;
}