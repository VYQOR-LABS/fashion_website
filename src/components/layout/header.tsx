"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { startTransition, useEffect, useState } from "react";
import { businessConfig, whatsappLink } from "@/lib/config";
import { WhatsAppBrandIcon } from "@/components/ui/brand-icons";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
const [brandFirst, ...brandRest] = businessConfig.name.split(" ");

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("vyqor-atelier-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefersDark;
    startTransition(() => setDark(isDark));
    document.documentElement.classList.toggle("theme-dark", isDark);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("theme-dark", next);
    window.localStorage.setItem("vyqor-atelier-theme", next ? "dark" : "light");
  }

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="wordmark" aria-label={`${businessConfig.name} home`}>{brandFirst} <span>{brandRest.join(" ")}</span></Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
          </nav>
          <div className="header-actions">
            <Link href="/shop" className="header-search" aria-label="Search products"><span>Search</span><ArrowUpRight size={15} /></Link>
            <a className="header-whatsapp" href={whatsappLink()} target="_blank" rel="noreferrer"><WhatsAppBrandIcon size={16} />Chat on WhatsApp <ArrowUpRight size={14} /></a>
            <button className="icon-button theme-button" onClick={toggleTheme} aria-label={`Switch to ${dark ? "light" : "dark"} theme`}>
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button className="icon-button menu-button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav className="mobile-menu" aria-label="Mobile navigation" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }}>
            {navLinks.map((link, index) => <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{link.label}<ArrowUpRight size={18} /></Link>)}
            <a className="mobile-menu-contact" href={whatsappLink()} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}