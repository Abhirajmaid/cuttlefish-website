'use client';

import { HeroSection } from '@/components/HeroSection';
import { FeaturedProductsSection } from '@/components/FeaturedProductsSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { useFeaturedProducts } from '@/hooks/useProducts';
import { useTestimonials } from '@/hooks/useTestimonials';

export default function Home() {
  const featuredProducts = useFeaturedProducts();
  const testimonials = useTestimonials();

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title={
          <span className="font-gambetta-italic-400">
            Experience ultimate comfort with <span className="font-gambetta-italic">our premium collection</span>
          </span>
        }
        ctaText="Find my style"
        ctaHref="/shop"
        backgroundGradient="from-cyan-50 to-blue-50"
      />

      {/* Featured Products Section */}
      <FeaturedProductsSection
        products={featuredProducts}
        title="Discover vintage designer"
        subtitle="NEW STOCK • JUST IN"
        showViewAllButton={true}
        viewAllHref="/shop"
      />

      {/* Testimonials Section */}
      <TestimonialsSection
        testimonials={testimonials}
        title="Ooh, don't just take our word for it. Here's what the family has to say."
        itemsPerView={2}
      />
    </>
  );
}
