"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const faqs = [
  ["How do I place an order?", "Choose a piece and use its WhatsApp enquiry button. We will confirm availability, sizing and delivery with you personally."],
  ["Can I order through WhatsApp?", "Yes. WhatsApp is our simplest way to help you choose and place an order. Each product page prepares a message with the item details."],
  ["Do you offer delivery?", "Delivery can be arranged in Nairobi and beyond. Send us your location on WhatsApp and we will confirm the available option and cost."],
  ["How long does delivery take?", "Timing depends on your location and item availability. We will share an estimated delivery time before you confirm your order."],
  ["Can I confirm product availability first?", "Of course. Message us with the product name or ID and we will check current availability before you decide."],
  ["What payment methods are available?", "We will confirm the current payment options directly with you when arranging your order."],
  ["Can I exchange an item?", "Please contact us before ordering so we can explain the exchange options for your item. Fit and condition requirements may apply."],
  ["How do I choose the right size?", "Send us your usual size and measurements on WhatsApp. We can share fit guidance for the specific piece."],
];

export function FaqList({ limit }: { limit?: number }) {
  const [open, setOpen] = useState<number | null>(0);
  return <div className="faq-list">{faqs.slice(0, limit).map(([question, answer], index) => <div className={`faq-item ${open === index ? "is-open" : ""}`} key={question}><button className="faq-question" aria-expanded={open === index} onClick={() => setOpen(open === index ? null : index)}><span><i>0{index + 1}</i>{question}</span><ChevronDown size={17} /></button><AnimatePresence initial={false}>{open === index && <motion.div className="faq-answer" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.24 }}><p>{answer}</p></motion.div>}</AnimatePresence></div>)}</div>;
}