export const businessConfig = {
  name: "VYQOR ATELIER",
  tagline: "Curated fashion. Effortless elegance.",
  contact: {
    name: "Wilfred",
    phone: "0791 614 036",
    phoneInternational: "+254791614036",
    whatsappNumber: "254791614036",
  },
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? "",
  social: {
    instagram: "https://www.instagram.com/wilf.red318/",
    instagramHandle: "@wilf.red318",
    tiktok: "https://www.tiktok.com/@mr_vyqorlabs",
    tiktokHandle: "@mr_vyqorlabs",
    facebook: "",
  },
  location: "Nairobi, Kenya",
  hours: process.env.NEXT_PUBLIC_BUSINESS_HOURS ?? "Hours shared on request",
  currency: "KES",
};

export function whatsappLink(message = `Hello, I'd like to know more about ${businessConfig.name}'s fashion collection.`) {
  return `https://wa.me/${businessConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const images = {
  hero: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1800&q=88",
  editorial: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1300&q=85",
  about: "/images/about-editorial.jpg",
  categories: {
    Dresses: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=85",
    Handbags: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
    Sneakers: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    Accessories: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85",
  },
};