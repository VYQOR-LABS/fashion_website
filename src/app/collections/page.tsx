import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { collectionItems } from "@/lib/products";
import { businessConfig, images } from "@/lib/config";

export const metadata: Metadata = { title: "Curated collections", description: `Explore the ${businessConfig.name} edits, assembled around the way you dress and live.` };

export default function CollectionsPage() {
  return (
    <div className="page-wrap collections-page">
      <section className="collections-hero" aria-labelledby="collections-heading">
        <Image src={images.about} alt="Fashion editorial portrait for the VYQOR ATELIER collection" fill preload sizes="100vw" />
        <div className="collections-hero-shade" />
        <div className="page-intro collections-hero-content">
          <div>
            <p className="eyebrow">A WARDROBE IN CHAPTERS</p>
            <h1 id="collections-heading">Curated, not<br /><em>complicated.</em></h1>
            <p>Start with the feeling. We’ll take it from there. From everyday essentials to after-dark favourites, each edit brings together pieces that feel considered and entirely your own.</p>
          </div>
          <span className="page-index">THE EDITS<br />01—04</span>
        </div>
      </section>
      <div className="collection-list">{collectionItems.map((item, index) => <Reveal key={item.slug} delay={index * 0.05}><Link href={`/collections/${item.slug}`} className={`collection-feature ${index % 2 ? "reverse" : ""}`}><div className="collection-feature-image"><Image src={item.image} alt={`${item.title} fashion collection`} fill sizes="(max-width: 760px) 100vw, 55vw" /></div><div className="collection-feature-copy"><span>{item.number} / THE COLLECTION</span><h2>{item.title}</h2><p>{item.text}</p><span className="text-link">Explore the edit <ArrowUpRight size={15} /></span></div></Link></Reveal>)}</div>
    </div>
  );
}