'use client';

import { getAllProducts, getProductBySlug, getFeaturedProducts } from '@/stores/productStore';
import { useMemo } from 'react';

export const useProducts = () => {
  const allProducts = useMemo(() => getAllProducts(), []);

  return {
    allProducts,
  };
};

export const useProductBySlug = (slug: string) => {
  const product = useMemo(() => getProductBySlug(slug), [slug]);
  return product;
};

export const useFeaturedProducts = () => {
  const featured = useMemo(() => getFeaturedProducts(), []);
  return featured;
};
