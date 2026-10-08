"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { formatPrice, getWhatsAppUrl } from "@/lib/products";
import { WhatsAppBrandIcon } from "@/components/ui/brand-icons";

export function ProductCard({ product }: { product: Product }) {
  const [saved, setSaved] = useState(false);
  const orderUrl = getWhatsAppUrl(product);
  return (
    <article className="product-card">
      <Link className="product-image-link" href={`/shop/${product.slug}`} aria-label={`View ${product.name}`}>
        <div className="product-image-wrap"><Image src={product.images[0]} alt={`${product.name}, ${product.category.toLowerCase()} from VYQOR ATELIER`} fill sizes="(max-width: 680px) 48vw, (max-width: 1100px) 32vw, 24vw" />
          {product.newArrival && <span className="product-badge">New arrival</span>}
        </div>
      </Link>
      <button className={`wishlist-button ${saved ? "is-saved" : ""}`} onClick={() => setSaved(!saved)} aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`} aria-pressed={saved}><Heart size={17} fill={saved ? "currentColor" : "none"} /></button>
      <div className="product-meta"><span>{product.category}</span><span>{product.colors[0]}</span></div>
      <div className="product-title-row"><Link href={`/shop/${product.slug}`}>{product.name}</Link><span>{formatPrice(product.price)}</span></div>
      <a className="product-order" href={orderUrl} target="_blank" rel="noreferrer"><WhatsAppBrandIcon size={15} />Order via WhatsApp <ArrowUpRight size={14} /></a>
    </article>
  );
}