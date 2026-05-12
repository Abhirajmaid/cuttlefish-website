'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import { Button } from './Button';
import { Heading } from './Heading';
import { Text } from './Text';
import { Section } from './Section';
import { Container } from './Container';

interface HeroSectionProps {
  title: ReactNode;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  backgroundImage?: string;
  backgroundGradient?: string;
}

export const HeroSection = ({
  title,
  description,
  ctaText = 'Find my style',
  ctaHref = '/shop',
  backgroundImage,
  backgroundGradient = 'from-cyan-900 to-blue-900',
}: HeroSectionProps) => {
  return (
    <Section className={`bg-linear-to-br ${backgroundGradient} py-20 md:py-32 mt-18 rounded-4xl h-screen`}>
      <Container>
        <div className="grid grid-cols-1 gap-12 items-center justify-center">
          {/* Content */}
          <div className="space-y-6 max-w-2xl text-center mx-auto">
            <Text variant="label" className="font-supreme">
              always authenticated
            </Text>
            <Heading level={1} className="leading-tight font-gambetta-italic font-medium">
              {title}
            </Heading>
            {description && <Text variant="large">{description}</Text>}
            <div className="pt-4">
              <Button href={ctaHref} variant="primary">
                {ctaText}
              </Button>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          {backgroundImage && (
            <div className="relative w-full aspect-square bg-gray-300 rounded-lg overflow-hidden">
              <Image
                src={backgroundImage}
                alt="Hero"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};
