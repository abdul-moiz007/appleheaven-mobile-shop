export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  specs: string[];
  isFeatured?: boolean;
  inStock: boolean;
}

export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Grid' },
  { id: 'cases', name: 'Premium Cases & Covers', icon: 'Shield' },
  { id: 'chargers', name: 'Fast Chargers & Cables', icon: 'Zap' },
  { id: 'audio', name: 'Earbuds & Headphones', icon: 'Headphones' },
  { id: 'screen-guards', name: 'Screen Protectors', icon: 'Smartphone' },
  { id: 'magsafe', name: 'MagSafe & Power Banks', icon: 'BatteryCharging' },
  { id: 'car-holders', name: 'Car Mounts & Accessories', icon: 'Car' },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'AuraShield MagSafe Matte Armour Case for iPhone 15 Pro Max',
    slug: 'aurashield-magsafe-matte-armour-case-iphone-15-pro-max',
    category: 'cases',
    price: 2499,
    oldPrice: 3200,
    rating: 4.9,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?auto=format&fit=crop&q=80&w=800',
    description: 'Military-grade drop protection with a smooth anti-fingerprint matte finish and ultra-strong MagSafe magnetic alignment.',
    specs: ['MagSafe Compatible', 'Drop Tested up to 10 Feet', 'Anti-Yellowing TPU Material', 'Raised Camera Lens Guard'],
    isFeatured: true,
    inStock: true,
  },
  {
    id: 'prod-2',
    name: 'AuraSpeed 65W GaN Dual USB-C Ultra Fast Wall Charger',
    slug: 'auraspeed-65w-gan-dual-usb-c-fast-charger',
    category: 'chargers',
    price: 3899,
    oldPrice: 4800,
    rating: 4.8,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=800',
    description: 'Compact 65W GaN technology powers up laptops, iPhones, and Android smartphones at lightning speeds safely with heat protection.',
    specs: ['65W Total Output', 'Dual USB-C Power Delivery 3.0', 'GaN III Chipset', 'Universal Fast Charge (PD/QC/PPS)'],
    isFeatured: true,
    inStock: true,
  },
  {
    id: 'prod-3',
    name: 'AuraBuds Pro Active Noise Cancelling Wireless Earbuds',
    slug: 'aurabuds-pro-anc-wireless-earbuds',
    category: 'audio',
    price: 5999,
    oldPrice: 7500,
    rating: 4.9,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800',
    description: 'Immersive sound quality with 32dB Hybrid ANC, low latency gaming mode, crystal clear HD microphone, and 36-hour total playtime.',
    specs: ['Hybrid Active Noise Cancellation', 'Bluetooth 5.3 Low Latency', 'IPX5 Sweat & Water Resistant', '36 Hours Battery Life with Case'],
    isFeatured: true,
    inStock: true,
  },
  {
    id: 'prod-4',
    name: 'AuraPower 10,000mAh Magnetic Wireless Power Bank 20W',
    slug: 'aurapower-10000mah-magnetic-wireless-power-bank',
    category: 'magsafe',
    price: 4999,
    oldPrice: 6200,
    rating: 4.7,
    reviewsCount: 86,
    image: 'https://images.unsplash.com/photo-1622445268465-843dcb69c85d?auto=format&fit=crop&q=80&w=800',
    description: 'Sleek aluminum body with LED battery display, 15W wireless charging, and 20W PD USB-C fast wired charging input/output.',
    specs: ['10,000mAh High Density Battery', '15W Wireless + 20W Wired PD', 'Built-in Foldable Kickstand', 'Smart Thermal Protection'],
    isFeatured: true,
    inStock: true,
  },
  {
    id: 'prod-5',
    name: 'AuraGlass 9H Tempered Glass Curved Privacy Screen Protector',
    slug: 'auraglass-9h-curved-privacy-screen-protector',
    category: 'screen-guards',
    price: 1299,
    oldPrice: 1800,
    rating: 4.8,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&q=80&w=800',
    description: 'Keep your personal information safe from prying eyes with 28-degree privacy angle glass and shatterproof 9H hardness layer.',
    specs: ['28° Anti-Spy Privacy Coating', '9H Surface Hardness Scratch Resistance', 'Oleophobic Anti-Fingerprint Layer', 'Easy Auto-Alignment Tray Included'],
    isFeatured: false,
    inStock: true,
  },
  {
    id: 'prod-6',
    name: 'AuraDrive Auto-Clamping Wireless Car Charger Mount 15W',
    slug: 'auradrive-auto-clamping-wireless-car-charger-mount',
    category: 'car-holders',
    price: 3499,
    oldPrice: 4200,
    rating: 4.6,
    reviewsCount: 62,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=800',
    description: 'Infrared sensor automatically opens and grips your smartphone securely on rough roads while wirelessly charging up to 15W.',
    specs: ['Automatic Smart Infrared Sensor', '15W Fast Wireless Charging', '360-Degree Ball Joint Rotation', 'Heavy-Duty Air Vent Clip'],
    isFeatured: false,
    inStock: true,
  },
  {
    id: 'prod-7',
    name: 'AuraFlex Braided 100W USB-C to USB-C Fast Charging Cable 2m',
    slug: 'auraflex-braided-100w-usbc-cable-2m',
    category: 'chargers',
    price: 1499,
    oldPrice: 2000,
    rating: 4.9,
    reviewsCount: 175,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
    description: 'Ultra-durable nylon braided 100W PD fast charge cable with E-Marker chip for phones, tablets, and MacBooks.',
    specs: ['100W Power Delivery Support', '480Mbps Data Transfer Rate', '20,000+ Bend Lifetime', 'Tangle-Free High Density Nylon'],
    isFeatured: false,
    inStock: true,
  },
  {
    id: 'prod-8',
    name: 'AuraGrip Translucent Magsafe Stand Case for Samsung S24 Ultra',
    slug: 'auragrip-magsafe-stand-case-samsung-s24-ultra',
    category: 'cases',
    price: 2799,
    oldPrice: 3500,
    rating: 4.8,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1533228876829-65c94e7b5025?auto=format&fit=crop&q=80&w=800',
    description: 'Sleek frosted back plate with an invisible zinc alloy kickstand ring supporting horizontal and vertical hands-free viewing angles.',
    specs: ['Built-in Ring Kickstand (0-120°)', 'Strong Magnetic Attachment', 'Shock-Absorbing Corner Airbags', 'Precise Cutouts & Tactile Buttons'],
    isFeatured: true,
    inStock: true,
  }
];
