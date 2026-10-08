import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/header";
import { SiteFooter, WhatsAppFloat } from "@/components/site-shell";
import { businessConfig } from "@/lib/config";
import "@fontsource-variable/cormorant-garamond";
import "@fontsource-variable/dm-sans";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "VYQOR ATELIER | Curated fashion. Effortless elegance.", template: "%s | VYQOR ATELIER" },
  description: "Curated fashion. Effortless elegance. Discover dresses, handbags, sneakers and accessories in Nairobi, Kenya.",
  openGraph: { siteName: "VYQOR ATELIER", type: "website", locale: "en_KE", title: "VYQOR ATELIER | Curated fashion. Effortless elegance.", description: "Curated fashion. Effortless elegance." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-KE" data-scroll-behavior="smooth">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
