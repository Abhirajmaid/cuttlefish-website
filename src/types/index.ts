export interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  rating?: number;
  category?: string;
  description?: string;
  reviewCount?: number;
  inStock?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  shippingAddress: ShippingAddress;
  status: 'pending' | 'shipped' | 'delivered';
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  savedAddresses: ShippingAddress[];
  preferences: { currency: string; newsletter: boolean };
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  text: string;
  createdAt: Date;
}

export interface Testimonial {
  id: string;
  author: string;
  rating: number;
  content: string;
  avatar?: string;
  image?: string;
  productLink?: string;
  productName?: string;
}

export interface NavLink {
  label: string;
  href: string;
  sublabel?: string;
}

export interface InsiderArticle {
  id: string;
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: Date;
  readTime: string;
  category: string;
}