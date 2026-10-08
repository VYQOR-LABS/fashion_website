import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { FaqList } from "@/components/faq-list";
import { Newsletter } from "@/components/newsletter";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { businessConfig, images, whatsappLink } from "@/lib/config";
import { collectionItems, products } from "@/lib/products";
import { InstagramBrandIcon, WhatsAppBrandIcon } from "@/components/ui/brand-icons";

const featured = products.filter((product) => product.featured).slice(0, 4);
const newArrivals = products.filter((product) => product.newArrival);
const socialHref = businessConfig.social.instagram;

export const metadata: Metadata = {
  title: { absolute: `${businessConfig.name} | ${businessConfig.tagline}` },
  description: businessConfig.tagline,
  openGraph: { title: `${businessConfig.name} | ${businessConfig.tagline}`, description: businessConfig.tagline },
};

export default function Home() {
  return <>
    <section className="hero">
      <div className="hero-photo"><Image src={images.hero} alt="Fashion portrait styled for VYQOR ATELIER" fill preload sizes="100vw" /></div>
      <div className="hero-shade" />
      <div className="hero-content"><p className="eyebrow light-eyebrow"><span /> Nairobi, Kenya <i>·</i> A new point of view</p><h1>Dress like<br />you <em>mean it.</em></h1><p className="hero-copy">{businessConfig.tagline}</p><div className="hero-actions"><Link href="/shop" className="button button-cream">Explore the collection <ArrowUpRight size={15} /></Link><a href={whatsappLink()} className="hero-text-link" target="_blank" rel="noreferrer"><WhatsAppBrandIcon size={16} />Chat on WhatsApp <span>↗</span></a></div></div>
      <div className="hero-caption"><span>01 / 04</span><span>THE NEW SEASON EDIT</span><span>Scroll to discover <ArrowDown size={13} /></span></div>
      <div className="hero-side-note">STYLE, WITH INTENTION — MMXXV</div>
    </section>

    <div className="trust-strip"><span>Considered pieces</span><i>✳</i><span>Personal service</span><i>✳</i><span>Easy ordering</span><i>✳</i><span>Made for your everyday</span></div>

    <section className="section categories-section" id="categories"><div className="section-heading"><Reveal><p className="eyebrow">THE VYQOR EDIT</p><h2>Find your <em>feeling.</em></h2></Reveal><Reveal delay={0.1}><p className="section-note">A few good pieces can change the whole rhythm of getting dressed.</p></Reveal></div><div className="category-grid">{Object.entries(images.categories).map(([name, image], index) => <Reveal key={name} delay={index * 0.07}><Link className="category-card" href={`/shop?category=${name}`}><div className="category-photo"><Image src={image} alt={`${name} collection`} fill sizes="(max-width: 680px) 48vw, 25vw" /></div><span className="category-index">0{index + 1}</span><div className="category-caption"><span>{name}</span><ArrowUpRight size={18} /></div></Link></Reveal>)}</div></section>

    <section className="section featured-section"><div className="section-heading"><Reveal><p className="eyebrow">A FEW FAVOURITES</p><h2>Considered <em>pieces.</em></h2></Reveal><Reveal delay={0.1}><Link href="/shop" className="text-link">View everything <ArrowUpRight size={15} /></Link></Reveal></div><div className="product-grid">{featured.map((product, index) => <Reveal key={product.id} delay={index * 0.06}><ProductCard product={product} /></Reveal>)}</div></section>

    <section className="editorial-band"><div className="editorial-image"><Image src={images.editorial} alt="Contemporary fashion portrait in warm evening light" fill sizes="(max-width: 760px) 100vw, 50vw" /></div><div className="editorial-copy"><Reveal><p className="eyebrow">A NOTE ON PERSONAL STYLE</p><span className="editorial-number">01 — 04</span><h2>Fashion is<br /><em>personal.</em></h2><p>Your style is more than what you wear. It is how you express confidence, individuality and the moments that matter. We believe the right piece feels like it was always yours.</p><Link href="/about" className="text-link">A little about us <ArrowUpRight size={15} /></Link></Reveal></div></section>

    <section className="section arrivals-section"><div className="section-heading"><Reveal><p className="eyebrow">JUST FOUND ITS WAY HERE</p><h2>New to the <em>edit.</em></h2></Reveal><Reveal delay={0.1}><Link href="/shop?new=true" className="text-link">View new arrivals <ArrowUpRight size={15} /></Link></Reveal></div><div className="arrival-rail">{newArrivals.map((product) => <div className="arrival-item" key={product.id}><ProductCard product={product} /></div>)}</div></section>

    <section className="section collection-section"><div className="section-heading"><Reveal><p className="eyebrow">MADE TO GO TOGETHER</p><h2>Curated <em>for you.</em></h2></Reveal><Reveal delay={0.1}><Link href="/collections" className="text-link">All collections <ArrowUpRight size={15} /></Link></Reveal></div><div className="collection-grid">{collectionItems.slice(0, 3).map((collection, index) => <Reveal key={collection.slug} delay={index * 0.08}><Link href={`/collections/${collection.slug}`} className="collection-card"><div className="collection-photo"><Image src={collection.image} alt={`${collection.title} collection`} fill sizes="(max-width: 700px) 85vw, 33vw" /></div><div className="collection-info"><span>{collection.number} / COLLECTION</span><h3>{collection.title}</h3><p>{collection.text}</p><ArrowUpRight size={16} /></div></Link></Reveal>)}</div></section>

    <section className="benefits-band"><div className="benefits-intro"><p className="eyebrow">THE VYQOR WAY</p><h2>A little more<br /><em>considered.</em></h2></div><div className="benefit"><span className="benefit-icon"><Check size={17} /></span><h3>Chosen with care</h3><p>Every piece is selected with quality, versatility and feeling in mind.</p></div><div className="benefit"><span className="benefit-icon"><ArrowUpRight size={17} /></span><h3>Easy, personal ordering</h3><p>Ask questions, check availability and order directly through WhatsApp.</p></div><div className="benefit"><span className="benefit-icon"><Check size={17} /></span><h3>Here to help</h3><p>Real guidance on fit, styling and delivery, whenever you need it.</p></div></section>

    <section className="section testimonials-section"><div className="section-heading"><Reveal><p className="eyebrow">KIND WORDS, GOOD PIECES</p><h2>A little love <em>goes a long way.</em></h2></Reveal><span className="sample-note-label">SAMPLE NOTES · REPLACE WITH VERIFIED CUSTOMER FEEDBACK</span></div><div className="testimonial-grid">{["The dress looked even better in person. Absolutely loved it.", "Very smooth ordering experience and the bag was beautiful.", "The sneakers are exactly what I wanted."].map((note, index) => <Reveal key={note} delay={index * 0.08}><blockquote className="testimonial-card"><span>0{index + 1} / SAMPLE CUSTOMER NOTE</span><p>“{note}”</p></blockquote></Reveal>)}</div></section>

    <section className="quote-section"><Reveal><p className="eyebrow">A THOUGHT TO TAKE WITH YOU</p><span className="quote-mark">“</span><blockquote>The best pieces never ask you<br className="desktop-break" /> to be anyone else.</blockquote><span className="quote-credit">THE VYQOR ATELIER PHILOSOPHY</span></Reveal></section>

    <section className="social-section"><div className="section-heading"><Reveal><p className="eyebrow">VYQOR ATELIER ON INSTAGRAM</p><h2>Follow our <em>style.</em></h2></Reveal><Reveal><a className="text-link" href={socialHref} target="_blank" rel="noreferrer">{businessConfig.social.instagramHandle} <InstagramBrandIcon size={17} /></a></Reveal></div><div className="social-grid">{[images.editorial, images.categories.Dresses, images.categories.Handbags, images.categories.Sneakers, images.categories.Accessories].map((image, index) => <a key={image} href={socialHref} target="_blank" rel="noreferrer" className="social-photo" aria-label={`View VYQOR ATELIER on Instagram, image ${index + 1}`}><Image src={image} alt={`VYQOR ATELIER fashion inspiration ${index + 1}`} fill sizes="20vw" /><span><InstagramBrandIcon size={20} /></span></a>)}</div></section>

    <section className="newsletter-section"><Reveal><p className="eyebrow">NOTES FROM VYQOR ATELIER</p><h2>Stay in <em>style.</em></h2><p>First looks, new arrivals and a little inspiration for your inbox.</p><Newsletter /><span className="newsletter-footnote">Only the good things. Unsubscribe whenever.</span></Reveal></section>

    <section className="section home-faq"><div className="section-heading"><Reveal><p className="eyebrow">GOOD TO KNOW</p><h2>A few <em>questions.</em></h2></Reveal><Reveal><Link href="/faq" className="text-link">All questions <ArrowUpRight size={15} /></Link></Reveal></div><FaqList limit={4} /></section>
  </>;
}