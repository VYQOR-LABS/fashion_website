import { FaInstagram, FaWhatsapp } from "react-icons/fa6";

type BrandIconProps = { size?: number };

export function WhatsAppBrandIcon({ size = 18 }: BrandIconProps) {
  return <FaWhatsapp className="brand-whatsapp-icon" aria-hidden="true" size={size} />;
}

export function InstagramBrandIcon({ size = 18 }: BrandIconProps) {
  const markSize = Math.round(size * 0.72);
  return <span className="brand-instagram-icon" style={{ width: size, height: size }} aria-hidden="true"><FaInstagram size={markSize} /></span>;
}