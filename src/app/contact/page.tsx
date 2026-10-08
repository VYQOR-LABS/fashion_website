import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowUpRight, Clock3, ExternalLink, Mail, MapPin, MessageCircle, Music2 } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { businessConfig, whatsappLink } from "@/lib/config";
import { InstagramBrandIcon, WhatsAppBrandIcon } from "@/components/ui/brand-icons";

export const metadata: Metadata = {
  title: "Get in touch",
  description: `Talk with ${businessConfig.name} about product availability, sizing, delivery and styling.`,
};

type ContactSearchParams = Promise<{ product?: string; size?: string; color?: string; quantity?: string }>;

export default function ContactPage({ searchParams }: { searchParams: ContactSearchParams }) {
  return <Suspense fallback={<div className="page-wrap contact-page"><div className="page-intro"><p className="eyebrow">WE’RE HERE FOR YOU</p><h1>A conversation<br />can change <em>everything.</em></h1></div><div className="contact-skeleton" /></div>}><ContactContent searchParams={searchParams} /></Suspense>;
}

async function ContactContent({ searchParams }: { searchParams: ContactSearchParams }) {
  const { product, size, color, quantity } = await searchParams;
  return (
    <div className="page-wrap contact-page">
      <div className="page-intro">
        <Reveal>
          <p className="eyebrow">WE’RE HERE FOR YOU</p>
          <h1>A conversation<br />can change <em>everything.</em></h1>
          <p>Questions about fit, a piece you have your eye on, or just need a little guidance? We’d love to hear from you.</p>
        </Reveal>
        <span className="page-index">SAY HELLO<br />WE’LL REPLY PERSONALLY</span>
      </div>
      <div className="contact-layout">
        <Reveal>
          <div className="contact-details">
            <p className="eyebrow">REACH THE ATELIER</p>
            <h2>Let’s make it <em>easy.</em></h2>
            <div className="contact-detail"><span><MessageCircle size={18} /></span><div><small>CONTACT</small><strong>{businessConfig.contact.name}</strong></div></div>
            {businessConfig.email && <a href={`mailto:${businessConfig.email}`} className="contact-detail"><span><Mail size={18} /></span><div><small>EMAIL</small><strong>{businessConfig.email}</strong></div><ArrowUpRight size={16} /></a>}
            <a href={`tel:${businessConfig.contact.phoneInternational}`} className="contact-detail"><span><MessageCircle size={18} /></span><div><small>PHONE</small><strong>{businessConfig.contact.phone}</strong></div><ArrowUpRight size={16} /></a>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="contact-detail"><span><WhatsAppBrandIcon size={18} /></span><div><small>WHATSAPP</small><strong>{businessConfig.contact.phone}</strong></div><ExternalLink size={16} /></a>
            <div className="contact-detail"><span><MapPin size={18} /></span><div><small>BASED IN</small><strong>{businessConfig.location}</strong></div></div>
            <div className="contact-detail"><span><Clock3 size={18} /></span><div><small>HOURS</small><strong>{businessConfig.hours}</strong></div></div>
            <a href={businessConfig.social.instagram} target="_blank" rel="noreferrer" className="contact-detail"><span><InstagramBrandIcon size={18} /></span><div><small>INSTAGRAM</small><strong>{businessConfig.social.instagramHandle}</strong></div><ExternalLink size={16} /></a>
            <a href={businessConfig.social.tiktok} target="_blank" rel="noreferrer" className="contact-detail"><span><Music2 size={18} /></span><div><small>TIKTOK</small><strong>{businessConfig.social.tiktokHandle}</strong></div><ExternalLink size={16} /></a>
            <a href={whatsappLink()} className="button button-outline contact-whatsapp" target="_blank" rel="noreferrer">Chat on WhatsApp <ArrowUpRight size={15} /></a>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="contact-form-wrap" id="contact-form">
            <p className="eyebrow">SEND A NOTE</p>
            <h2>What’s on your <em>mind?</em></h2>
            <ContactForm />
            {product && <p className="contact-prefill-note">Enquiry: {product}{size ? ` · Size ${size}` : ""}{color ? ` · ${color}` : ""}{quantity ? ` · Qty ${quantity}` : ""}. Please include these details in your note.</p>}
          </div>
        </Reveal>
      </div>
    </div>
  );
}