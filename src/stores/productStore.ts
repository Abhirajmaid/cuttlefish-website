import { Product } from '@/types';

const img = {
  puffer: '/assets/products/heels1.webp',
  runner: '/assets/products/carolina1.webp',
  boots: '/assets/products/boots.webp',
} as const;

// Mock catalog — footwear names and categories
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Cloud Walker Sliders',
    slug: 'cloud-walker-sliders',
    image: img.runner,
    price: 145,
    rating: 5,
    category: 'Sliders',
    description: 'Ultra-lightweight sliders with memory foam insoles for all-day poolside comfort.',
    inStock: true,
  },
  {
    id: '2',
    name: 'Cozy Sherpa Sliders',
    slug: 'cozy-sherpa-sliders',
    image: img.boots,
    price: 185,
    rating: 5,
    category: 'Sliders',
    description: 'Fleece-lined indoor sliders designed to keep your feet warm and supported around the house.',
    inStock: true,
  },
  {
    id: '3',
    name: 'Classic Comfort Heels',
    slug: 'classic-comfort-heels',
    image: img.puffer,
    price: 120,
    rating: 5,
    category: 'Heels',
    description: 'Supple leather block heels with an ergonomic arch design for evening elegance without the ache.',
    inStock: true,
  },
  {
    id: '4',
    name: 'Haven Slip-ons',
    slug: 'haven-slip-ons',
    image: img.runner,
    price: 95,
    rating: 4,
    category: 'Slip-ons',
    description: 'Breathable knit slip-ons that mold to the shape of your foot.',
    inStock: true,
  },
  {
    id: '5',
    name: 'Aura Platform Heels',
    slug: 'aura-platform-heels',
    image: img.runner,
    price: 160,
    rating: 5,
    category: 'Heels',
    description: 'Elevated platform heels engineered with maximum shock absorption.',
    inStock: true,
  },
  {
    id: '6',
    name: 'Luna Suede Mules',
    slug: 'luna-suede-mules',
    image: img.boots,
    price: 110,
    rating: 4,
    category: 'Mules',
    description: 'Soft suede mules with a plush footbed and durable outsole.',
    inStock: true,
  },
  {
    id: '7',
    name: 'Nova Orthopedic Sliders',
    slug: 'nova-orthopedic-sliders',
    image: img.puffer,
    price: 85,
    rating: 5,
    category: 'Sliders',
    description: 'Supportive summer sliders with adjustable straps and deep heel cups.',
    inStock: true,
  },
  {
    id: '8',
    name: 'Mosaic Woven Wedges',
    slug: 'mosaic-woven-wedges',
    image: img.puffer,
    price: 135,
    rating: 5,
    category: 'Wedges',
    description: 'Elegant woven wedges that provide height without sacrificing support and stability.',
    inStock: true,
  },
  {
    id: '9',
    name: 'Arden Strappy Heels',
    slug: 'arden-strappy-heels',
    image: img.runner,
    price: 130,
    rating: 5,
    category: 'Heels',
    description: 'The perfect evening heel with wide straps that won\'t dig into your skin.',
    inStock: true,
  },
  {
    id: '10',
    name: 'Classic Leather Booties',
    slug: 'classic-leather-booties',
    image: img.boots,
    price: 195,
    rating: 4,
    category: 'Boots',
    description: 'Timeless ankle booties with a low, stable block heel and cushioned interior.',
    inStock: true,
  },
  {
    id: '11',
    name: 'Noir Velvet Slippers',
    slug: 'noir-velvet-slippers',
    image: img.boots,
    price: 75,
    rating: 5,
    category: 'Slippers',
    description: 'Luxurious house slippers with a thick faux-fur lining and supportive sole.',
    inStock: true,
  },
  {
    id: '12',
    name: 'Savona Travel Wedges',
    slug: 'savona-travel-wedges',
    image: img.boots,
    price: 145,
    rating: 4,
    category: 'Wedges',
    description: 'Lightweight, shock-absorbing wedges perfect for all-day comfort while traveling.',
    inStock: true,
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return mockProducts.find((p) => p.slug === slug);
};

export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find((p) => p.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return mockProducts.slice(0, 3);
};

export const getAllProducts = (): Product[] => {
  return mockProducts;
};
