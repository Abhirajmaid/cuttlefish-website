'use client';

import { Testimonial } from '@/types';
import { TestimonialCard } from './TestimonialCard';
import { Heading } from './Heading';
import { Section } from './Section';
import { Container } from './Container';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  title: string;
}

export const TestimonialsSection = ({ testimonials, title }: TestimonialsSectionProps) => {
  // Use first 8 testimonials and render a 3x3 grid where the first cell is the title
  const tiles = [
    <div key="title" className="flex items-end justify-center p-6 border-r border-b border-gray-200 w-full h-full">
      <Heading level={6} className="text-left">
        {title}
      </Heading>
    </div>,
    ...testimonials.slice(0, 8).map((t) => (
      <TestimonialCard key={t.id} testimonial={t} />
    )),
  ];

  return (
    <Section className="bg-background">
      <Container variant="full">
        <div className="grid grid-cols-1 md:grid-cols-3 w-full border-t border-b border-gray-200">
          {tiles.map((node, idx) => (
            <div key={idx} className="min-h-32">
              {node}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
