import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { ProductDetails } from "@/components/product-details";
import { Reveal } from "@/components/reveal";
import { getProduct, products } from "@/lib/products";
import { businessConfig } from "@/lib/config";

export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return product ? { title: product.name, description: product.description, openGraph: { title: `${product.name} | ${businessConfig.name}`, description: product.description, images: [product.images[0]] } } : { title: "Piece not found" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);
  return <div className="page-wrap product-page"><ProductDetails product={product} />{related.length > 0 && <section className="related-section"><div className="section-heading"><Reveal><p className="eyebrow">A FEW MORE YOU MIGHT LOVE</p><h2>Keep <em>looking.</em></h2></Reveal></div><div className="product-grid">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>}</div>;
}