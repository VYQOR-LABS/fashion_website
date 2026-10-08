import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { businessConfig, images } from "@/lib/config";

export const metadata: Metadata = { title: "Our story", description: `${businessConfig.tagline} Meet the independent Nairobi fashion atelier behind the collection.` };

export default function AboutPage() {
  return (
    <div className="page-wrap about-page">
      <section className="about-hero">
        <div className="about-image"><Image src={images.about} alt={`Fashion editorial portrait for ${businessConfig.name}`} fill preload sizes="100vw" /></div>
        <div className="about-hero-shade" />
        <div className="page-intro about-hero-content"><div><p className="eyebrow">A NOTE FROM VYQOR ATELIER</p><h1>Getting dressed<br />should feel like <em>you.</em></h1><p>We believe a good wardrobe is less about having more, and more about finding the pieces that feel right. Our considered edit brings together clothing and accessories chosen to make getting dressed feel effortless, personal, and entirely your own.</p></div><span className="page-index">OUR STORY<br />EST. WITH INTENTION</span></div>
      </section>
      <section className="about-story"><Reveal><p className="eyebrow">WHY WE’RE HERE</p><h2>A wardrobe can be<br /><em>personal again.</em></h2></Reveal><Reveal><div><p>{businessConfig.name} began with a simple thought: finding something beautiful to wear should feel considered, never overwhelming. So we bring together pieces with a point of view, then make choosing them feel personal.</p><p>From a dress for a night you’ll remember to the bag you reach for every morning, each piece is here because it earns its place.</p><Link href="/shop" className="text-link">Discover the collection <ArrowUpRight size={15} /></Link></div></Reveal></section>
      <section className="philosophy-section"><div><p className="eyebrow">WHAT GUIDES US</p><h2>Less noise.<br /><em>More meaning.</em></h2></div><div className="philosophy-points">{[["01", "Quality over quantity", "Pieces chosen for how they wear, feel and live with you."], ["02", "Confidence, your way", "Style should make room for your individuality, not compete with it."], ["03", "A human touch", "Real help, thoughtful answers and a more personal way to shop."]].map(([number, title, copy]) => <div key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><Check size={17} /></div>)}</div></section>
      <div className="about-last"><p>Good style should feel like coming home to yourself.</p><Link href="/contact" className="button button-dark">Say hello <ArrowUpRight size={15} /></Link></div>
    </div>
  );
}