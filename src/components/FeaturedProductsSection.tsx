'use client';

import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { Heading } from './Heading';
import { Text } from './Text';
import { Button } from './Button';
import { Section } from './Section';
import { Container } from './Container';

interface FeaturedProductsSectionProps {
  products: Product[];
  title: React.ReactNode;
  subtitle?: string;
  showViewAllButton?: boolean;
  viewAllHref?: string;
}

export const FeaturedProductsSection = ({
  products,
  title,
  subtitle,
  showViewAllButton = true,
  viewAllHref = '/shop',
}: FeaturedProductsSectionProps) => {
  return (
    <Section className="border-t border-b border-gray-200 pb-12 md:pb-12 mb-16">  
      <Container>
        <div className="space-y-12">
          {/* Header */}
          <div className="flex items-start justify-between gap-8 rounded-xl bg-background/65 px-1 py-2 pt-8 backdrop-blur-md">
            <div className="flex-1 space-y-4">
              {subtitle && <Text variant="label">{subtitle}</Text>}
              <Heading level={2} className='font-gambetta-italic-500 w-1/4'>{title}</Heading>
            </div>
            {showViewAllButton && (
              <Button href={viewAllHref} variant="ghost" className="whitespace-nowrap">
                View all
              </Button>
            )}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
