'use client';

import { HeroSection } from '@/components/HeroSection';
import { FeaturedProductsSection } from '@/components/FeaturedProductsSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { CollectionSection } from '@/components/CollectionSection';
import { AboutSection } from '@/components/AboutSection';
import { InsiderEditionSection } from '@/components/InsiderEditionSection';
import { WordFadeIn } from '@/components/WordFadeIn';
import { useFeaturedProducts } from '@/hooks/useProducts';
import { useTestimonials } from '@/hooks/useTestimonials';
import { useBlogStore } from '@/stores/blogStore';
import EmailSubscriber from '@/components/EmailSubscriber';

export default function Home() {
  const featuredProducts = useFeaturedProducts();
  const testimonials = useTestimonials();
  const { posts } = useBlogStore();

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title={
          <span className="font-gambetta-italic-400">
            <WordFadeIn text="Experience the comfort" staggerDelay={0.08} />
            <WordFadeIn text="with " delay={0.08 * 3} className="font-gambetta-italic" staggerDelay={0.08} />
            <WordFadeIn text="the cloud" delay={0.08 * 4} className="font-gambetta-italic" staggerDelay={0.08} />
            <WordFadeIn text="collection" delay={0.08 * 5} className="font-gambetta-italic" staggerDelay={0.08} />
          </span>
        }
        backgroundImage='/assets/hero.png'
        ctaText="Find my style"
        ctaHref="/shop"
      />

      {/* Featured Products Section */}
      <FeaturedProductsSection
        products={featuredProducts}
        title={
          <span>
            Discover ultimate<br />comfort
          </span>
        }
        subtitle="NEW ARRIVALS • JUST IN"
        showViewAllButton={true}
        viewAllHref="/shop"
      />

      {/* Testimonials Section */}
      <TestimonialsSection
        testimonials={testimonials}
        title="Ooh, don't just take our word for it. Here's what the family has to say."
      />

      <CollectionSection
        title={
          <span>
            Our Collections
          </span>
        }
        subtitle="Pick your style"
      />

      <AboutSection
        title={
          <span>
            Incredibly cozy <span className='text-primary'>&</span> stylish<br /> <span className='italic'>footwear</span>
          </span>
        }
      />

      <InsiderEditionSection
        title="Insider Edition"
        cta="READ INSIDER EDITION"
        ctaHref="/insider-edition"
        insiderBlogs={posts.slice(0, 4)}
      />

      <EmailSubscriber />
    </>
  );
}
