import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { FaqList } from "@/components/faq-list";
import { businessConfig } from "@/lib/config";

export const metadata: Metadata = { title: "Frequently asked questions", description: `Answers about ordering, delivery, product availability, sizing and exchanges at ${businessConfig.name}.` };
export default function FAQPage() { return <div className="page-wrap faq-page"><div className="page-intro"><Reveal><p className="eyebrow">A LITTLE CLARITY</p><h1>Good to <em>know.</em></h1><p>The details, made simple. Still wondering? We’re just a message away.</p></Reveal><span className="page-index">HELP, PERSONALLY<br />ALWAYS</span></div><FaqList /></div>; }