'use client';

import { Testimonial } from '@/types';
import { TestimonialCard } from './TestimonialCard';
import { Heading } from './Heading';
import { Button } from './Button';
import { Section } from './Section';
import { Container } from './Container';
import { useState, useEffect } from 'react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  title: string;
  itemsPerView?: number;
}

export const TestimonialsSection = ({
  testimonials,
  title,
  itemsPerView = 2,
}: TestimonialsSectionProps) => {
  const [current, setCurrent] = useState(0);
  const totalPages = Math.ceil(testimonials.length / itemsPerView);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalPages);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalPages]);

  const startIndex = current * itemsPerView;
  const visibleTestimonials = testimonials.slice(startIndex, startIndex + itemsPerView);

  return (
    <Section className="bg-gray-50">
      <Container>
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <Heading level={3}>{title}</Heading>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-64">
            {visibleTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              onClick={() => setCurrent((prev) => (prev - 1 + totalPages) % totalPages)}
              variant="ghost"
            >
              ← Previous
            </Button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === current ? 'bg-black w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <Button
              onClick={() => setCurrent((prev) => (prev + 1) % totalPages)}
              variant="ghost"
            >
              Next →
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
};
