import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { businessConfig, whatsappLink } from "@/lib/config";
import { InstagramBrandIcon, WhatsAppBrandIcon } from "@/components/ui/brand-icons";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand"><Link href="/" className="wordmark"><span>VYQOR</span> ATELIER</Link><p>{businessConfig.tagline}</p><a href={businessConfig.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramBrandIcon size={18} /></a></div>
        <div className="footer-column"><span className="footer-label">Explore</span><Link href="/shop?category=Dresses">Dresses</Link><Link href="/shop?category=Handbags">Handbags</Link><Link href="/shop?category=Sneakers">Sneakers</Link><Link href="/shop?category=Accessories">Accessories</Link></div>
        <div className="footer-column"><span className="footer-label">Atelier</span><Link href="/about">Our story</Link><Link href="/collections">Collections</Link><Link href="/contact">Contact</Link><Link href="/faq">Frequently asked</Link></div>
        <div className="footer-column"><span className="footer-label">Get in touch</span><span>{businessConfig.contact.name}</span><a href={`tel:${businessConfig.contact.phoneInternational}`}>{businessConfig.contact.phone}</a>{businessConfig.email && <a href={`mailto:${businessConfig.email}`}>{businessConfig.email}</a>}<span>{businessConfig.location}</span><span>{businessConfig.hours}</span><a href={whatsappLink()} target="_blank" rel="noreferrer"><WhatsAppBrandIcon size={15} />Chat on WhatsApp <ArrowUpRight size={13} /></a></div>
      </div>
      <div className="footer-bottom"><span>© 2026 {businessConfig.name}. All rights reserved.</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><a href={businessConfig.social.instagram} target="_blank" rel="noreferrer">Instagram</a><a href={businessConfig.social.tiktok} target="_blank" rel="noreferrer">TikTok</a>{businessConfig.social.facebook && <a href={businessConfig.social.facebook} target="_blank" rel="noreferrer">Facebook</a>}</div><span className="powered-by">Powered by <a href="https://vyqor.co.ke/" target="_blank" rel="noreferrer">VYQOR LABS</a></span></div>
    </footer>
  );
}

export function WhatsAppFloat() {
  return <a className="whatsapp-float" href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="Chat with VYQOR ATELIER on WhatsApp"><WhatsAppBrandIcon size={18} /><span>Chat on WhatsApp</span></a>;
}