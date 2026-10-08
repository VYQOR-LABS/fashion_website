import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopBrowser } from "@/components/shop-browser";
import { Reveal } from "@/components/reveal";
import { products } from "@/lib/products";
import { businessConfig } from "@/lib/config";

export const metadata: Metadata = { title: "Shop the collection", description: `Explore considered dresses, handbags, sneakers and accessories from ${businessConfig.name}.` };

export default function ShopPage({ searchParams }: { searchParams: Promise<{ category?: string; new?: string }> }) {
  return <Suspense fallback={<div className="page-wrap shop-page"><div className="page-intro"><p className="eyebrow">THE FULL EDIT</p><h1>Pieces to make<br /><em>your own.</em></h1></div><div className="skeleton-grid">{Array.from({ length: 6 }, (_, index) => <div className="skeleton-product" key={index} />)}</div></div>}><ShopContent searchParams={searchParams} /></Suspense>;
}

async function ShopContent({ searchParams }: { searchParams: Promise<{ category?: string; new?: string }> }) {
  const params = await searchParams;
  const initialCategory = params.category && ["Dresses", "Handbags", "Sneakers", "Accessories"].includes(params.category) ? params.category : "All";
  return <div className="page-wrap shop-page"><div className="page-intro"><Reveal><p className="eyebrow">THE FULL EDIT</p><h1>Pieces to make<br /><em>your own.</em></h1><p>A thoughtful wardrobe starts with a few things you truly love.</p></Reveal><span className="page-index">MMXXV<br />Nº 001—009</span></div><ShopBrowser products={products} initialCategory={initialCategory} initialNewOnly={params.new === "true"} /></div>;
}