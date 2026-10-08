import { businessConfig, images } from "@/lib/config";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: "Dresses" | "Handbags" | "Sneakers" | "Accessories";
  price: number;
  description: string;
  details: string;
  materials: string;
  care: string;
  images: string[];
  sizes?: string[];
  colors: string[];
  featured?: boolean;
  newArrival?: boolean;
};

export const products: Product[] = [
  {
    id: "DRS-014", slug: "satin-evening-dress", name: "Satin Evening Dress", category: "Dresses", price: 7800,
    description: "A fluid, bias-cut silhouette with a soft sheen, made for evenings that deserve a little more.",
    details: "An elegant floor-length profile with adjustable straps and a softly draped neckline.", materials: "Satin-touch polyester blend", care: "Hand wash cold or dry clean. Hang to dry.",
    images: ["https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1100&q=85", "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1100&q=85"],
    sizes: ["S", "M", "L", "XL"], colors: ["Midnight", "Champagne"], featured: true, newArrival: true,
  },
  {
    id: "BAG-001", slug: "classic-leather-handbag", name: "The Everyday Tote", category: "Handbags", price: 6500,
    description: "A beautifully structured carryall with room for the things you take everywhere.",
    details: "A clean, structured shape with a secure top closure and an interior pocket.", materials: "Textured vegan leather with a cotton lining", care: "Wipe gently with a soft, dry cloth.",
    images: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1100&q=85", "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1100&q=85"],
    colors: ["Cocoa", "Black"], featured: true,
  },
  {
    id: "SNK-008", slug: "urban-platform-sneakers", name: "City Platform Sneaker", category: "Sneakers", price: 5900,
    description: "A considered everyday sneaker with a clean profile and just enough height.",
    details: "A cushioned footbed and tonal platform sole make this a natural daily uniform.", materials: "Synthetic leather upper, rubber sole", care: "Spot clean with a damp cloth.",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1100&q=85", "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1100&q=85"],
    sizes: ["36", "37", "38", "39", "40", "41"], colors: ["Chalk", "Stone"], featured: true, newArrival: true,
  },
  {
    id: "DRS-021", slug: "elegant-maxi-dress", name: "The Sunday Maxi", category: "Dresses", price: 7200,
    description: "An easy, sweeping dress with a relaxed waist and a quietly romantic finish.",
    details: "A breathable, full-length dress designed to move effortlessly from day to dinner.", materials: "Lightweight cotton blend", care: "Machine wash cold on a gentle cycle.",
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1100&q=85", "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1100&q=85"],
    sizes: ["S", "M", "L", "XL"], colors: ["Ivory", "Olive"], featured: true,
  },
  {
    id: "BAG-012", slug: "structured-shoulder-bag", name: "Sculpted Shoulder Bag", category: "Handbags", price: 5800,
    description: "A compact, sculptural shape that brings a polished finish to everyday dressing.",
    details: "A softly curved profile with an adjustable strap and magnetic closure.", materials: "Smooth vegan leather", care: "Store in its dust bag and keep away from moisture.",
    images: ["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1100&q=85", "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1100&q=85"],
    colors: ["Espresso", "Sand"], newArrival: true,
  },
  {
    id: "SNK-016", slug: "minimal-white-sneakers", name: "The Minimal Court", category: "Sneakers", price: 5200,
    description: "An understated court-inspired pair that works with almost everything.",
    details: "A versatile low-top with tonal laces, a padded collar and a flexible sole.", materials: "Faux leather upper, rubber outsole", care: "Wipe clean after wear; air dry away from direct sun.",
    images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1100&q=85", "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=1100&q=85"],
    sizes: ["36", "37", "38", "39", "40", "41"], colors: ["White", "Cream"], newArrival: true,
  },
  {
    id: "DRS-033", slug: "classic-black-dress", name: "The Modern Classic", category: "Dresses", price: 6800,
    description: "A confident little black dress, pared back to the details that matter.",
    details: "A tailored midi silhouette with a clean neckline and discreet side pockets.", materials: "Viscose blend", care: "Cool hand wash. Iron on low heat inside out.",
    images: ["https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1100&q=85", "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1100&q=85"],
    sizes: ["S", "M", "L", "XL"], colors: ["Black"], featured: true,
  },
  {
    id: "BAG-024", slug: "everyday-crossbody-bag", name: "Daylight Crossbody", category: "Handbags", price: 4300,
    description: "A hands-free essential with a neat profile and space for your daily edit.",
    details: "A zip-top crossbody with an adjustable strap and one interior slip pocket.", materials: "Grain-textured vegan leather", care: "Wipe with a soft, slightly damp cloth.",
    images: ["https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1100&q=85", "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1100&q=85"],
    colors: ["Tan", "Black"], newArrival: true,
  },
  {
    id: "ACC-006", slug: "golden-hour-earrings", name: "Golden Hour Hoops", category: "Accessories", price: 1800,
    description: "Light-catching sculptural hoops, made to become your everyday finishing touch.",
    details: "A softly rounded medium hoop with a secure post-back fastening.", materials: "Gold-tone stainless steel", care: "Keep dry and store separately when not in use.",
    images: ["https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1100&q=85", "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1100&q=85"],
    colors: ["Gold"], featured: true,
  },
];

export const categories = ["Dresses", "Handbags", "Sneakers", "Accessories"] as const;

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(price: number) {
  return `KES ${new Intl.NumberFormat("en-KE").format(price)}`;
}

export function getWhatsAppUrl(product: Product, quantity = 1, options: { size?: string; color?: string } = {}) {
  const message = `Hello, I am interested in ${product.name} from ${businessConfig.name}.\n\nProduct: ${product.name}\nPrice: ${formatPrice(product.price)}\nProduct ID: ${product.id}${options.size ? `\nSize: ${options.size}` : ""}${options.color ? `\nColour: ${options.color}` : ""}\nQuantity: ${quantity}\n\nKindly confirm availability and delivery details.`;
  return `https://wa.me/${businessConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const collectionItems = [
  { number: "01", title: "Everyday Ease", slug: "everyday-ease", category: "Handbags", text: "Thoughtful pieces for wherever the day takes you.", image: images.categories.Handbags },
  { number: "02", title: "The Evening Edit", slug: "evening-edit", category: "Dresses", text: "A little occasion, a lot of feeling.", image: images.editorial },
  { number: "03", title: "Off-Duty, Elevated", slug: "off-duty-elevated", category: "Sneakers", text: "Comfort, with a considered point of view.", image: images.categories.Sneakers },
  { number: "04", title: "Finishing Touches", slug: "finishing-touches", category: "Accessories", text: "The small details that make it yours.", image: images.categories.Accessories },
];