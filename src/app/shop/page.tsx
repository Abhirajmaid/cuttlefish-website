'use client';

import { FormEvent, useMemo, useState } from 'react';
import { Container } from '@/components/Container';
import { Heading } from '@/components/Heading';
import { Text } from '@/components/Text';
import { ProductFilter, type ShopFilters } from '@/components/ProductFilter';
import { ProductGrid } from '@/components/ProductGrid';
import { Button } from '@/components/Button';
import { useProducts } from '@/hooks/useProducts';
import EmailSubscriber from '@/components/EmailSubscriber';

export default function ShopPage() {
  const { allProducts } = useProducts();
  const [filters, setFilters] = useState<ShopFilters>({
    category: 'all',
    priceRange: [0, 2000],
    sortBy: 'newest',
    search: '',
  });
  const [email, setEmail] = useState('');

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];
    const q = filters.search.trim().toLowerCase();

    if (q) {
      result = result.filter((p) => {
        const hay = [p.name, p.description ?? '', p.category ?? ''].join(' ').toLowerCase();
        return hay.includes(q);
      });
    }

    if (filters.category !== 'all') {
      result = result.filter((p) => p.category === filters.category);
    }

    result = result.filter((p) => p.price <= filters.priceRange[1]);

    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    return result;
  }, [allProducts, filters]);

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <div className="pb-20">
      <Container>
        {/* Hero — matches Parcel shop headline rhythm */}
        <header className="border-b border-gray-200 pb-12 pt-6 md:pb-16 md:pt-10">
          <Text variant="label" className="mb-4 text-gray-500 text-center">
            Find your style
          </Text>
          <Heading
            level={1}
            className="text-balance font-gambetta-italic-500 text-4xl leading-[1.05] tracking-tight text-black md:text-5xl lg:text-6xl text-center"
          >
            Your <span className="font-gambetta-italic">comfort</span>, is our{' '} <br />
            <span className="font-gambetta-italic">priority</span>.
          </Heading>
        </header>

        <div className="pt-8 md:pt-10">
          <ProductFilter onFilterChange={setFilters} orientation="horizontal" />

          <div className="flex items-baseline justify-between border-gray-100 py-6">
            <p className="text-sm tabular-nums tracking-wide text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'}
            </p>
          </div>

          <div className="pt-4">
            <ProductGrid products={filteredProducts} layout="shop" />
          </div>
        </div>
        
        <EmailSubscriber />
      </Container>
    </div>
  );
}
