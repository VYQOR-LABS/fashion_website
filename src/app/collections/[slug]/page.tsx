import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { collectionItems, products } from "@/lib/products";

export function generateStaticParams() { return collectionItems.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const collection = collectionItems.find((item) => item.slug === slug);
  return collection ? { title: collection.title, description: collection.text } : { title: "Collection not found" };
}
export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = collectionItems.find((item) => item.slug === slug);
  if (!collection) notFound();
  const pieces = products.filter((product) => product.category === collection.category);
  return <div className="page-wrap collection-detail-page"><div className="collection-detail-hero"><Image src={collection.image} alt={`${collection.title} collection`} fill priority sizes="100vw" /><div className="collection-detail-overlay"><p className="eyebrow">{collection.number} / VYQOR EDIT</p><h1>{collection.title}</h1><p>{collection.text}</p></div></div><section className="related-section"><Reveal><p className="eyebrow">THE PIECES</p><h2>Made for <em>the moment.</em></h2></Reveal><div className="product-grid">{pieces.map((product) => <ProductCard key={product.id} product={product} />)}</div></section></div>;
}