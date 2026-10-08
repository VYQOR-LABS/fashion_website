"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Minus, Plus } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice, getWhatsAppUrl } from "@/lib/products";
import { WhatsAppBrandIcon } from "@/components/ui/brand-icons";

export function ProductDetails({ product }: { product: Product }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [openPanel, setOpenPanel] = useState("Details");
  const orderUrl = getWhatsAppUrl(product, quantity, { size, color });
  return <section className="product-detail-layout">
    <div className="detail-gallery"><div className="detail-main-image"><Image src={product.images[imageIndex]} alt={`${product.name} in ${product.colors[0]}`} fill preload sizes="(max-width: 800px) 100vw, 56vw" /></div><div className="detail-thumbnails">{product.images.map((image, index) => <button key={image} className={index === imageIndex ? "active" : ""} onClick={() => setImageIndex(index)} aria-label={`View product image ${index + 1}`}><Image src={image} alt="" fill sizes="80px" /></button>)}</div></div>
    <div className="detail-info"><Link href="/shop" className="back-link"><ArrowLeft size={14} /> The collection</Link><p className="eyebrow">{product.category.toUpperCase()} <span>·</span> {product.id}</p><h1>{product.name}</h1><div className="detail-price">{formatPrice(product.price)}</div><p className="detail-description">{product.description}</p>
      <div className="detail-option"><span>Colour <strong>{color}</strong></span><div className="color-swatches">{product.colors.map((item) => <button key={item} title={item} aria-label={item} aria-pressed={color === item} onClick={() => setColor(item)} className={`color-swatch swatch-${item.toLowerCase()}`} />)}</div></div>
      {product.sizes && <div className="detail-option"><span>Choose a size <Link href="/faq">Size guidance</Link></span><div className="size-options">{product.sizes.map((item) => <button key={item} className={size === item ? "active" : ""} onClick={() => setSize(item)} aria-pressed={size === item}>{item}</button>)}</div></div>}
      <div className="detail-quantity"><span>Quantity</span><div><button aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={14} /></button><span>{quantity}</span><button aria-label="Increase quantity" onClick={() => setQuantity(quantity + 1)}><Plus size={14} /></button></div></div>
      <a className={`button button-dark detail-order ${product.sizes && !size ? "disabled" : ""}`} href={product.sizes && !size ? "#size-options" : orderUrl} target="_blank" rel="noreferrer" onClick={(event) => { if (product.sizes && !size) { event.preventDefault(); document.querySelector(".size-options")?.scrollIntoView({ behavior: "smooth", block: "center" }); } }}><WhatsAppBrandIcon size={17} />Order via WhatsApp <ArrowUpRight size={16} /></a>
      <p className="detail-assurance">Personal assistance · Availability confirmed before ordering</p>
      <div className="detail-accordions">{[["Details", product.details], ["Materials & care", `${product.materials}. ${product.care}`], ["Delivery", "Delivery arrangements and timing are confirmed personally before your order is placed. Message us with your location and we will share the available options."]].map(([title, content]) => <div className="detail-accordion" key={title}><button onClick={() => setOpenPanel(openPanel === title ? "" : title)} aria-expanded={openPanel === title}>{title}<span>{openPanel === title ? "−" : "+"}</span></button>{openPanel === title && <p>{content}</p>}</div>)}</div>
    </div>
  </section>;
}