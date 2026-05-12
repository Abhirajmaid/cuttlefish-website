import { Product } from '@/types';

// Mock product data
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Mosaic Puffer',
    slug: 'mosaic-puffer',
    image: '/products/mosaic-puffer.jpg',
    price: 299,
    rating: 5,
    category: 'Jackets',
    description: 'Elegant designer puffer jacket with mosaic pattern',
  },
  {
    id: '2',
    name: 'Arden Runner',
    slug: 'arden-runner',
    image: '/products/arden-runner.jpg',
    price: 199,
    rating: 5,
    category: 'Shoes',
    description: 'Classic runner sneaker by Arden',
  },
  {
    id: '3',
    name: 'Classic Tote',
    slug: 'classic-tote',
    image: '/products/classic-tote.jpg',
    price: 159,
    rating: 4,
    category: 'Bags',
    description: 'Timeless designer tote bag',
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
