'use client';

import { ReactNode, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from './Button';
import HeroCtaButton from './HeroCtaButton';
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
  /** Tailwind gradient utility classes (e.g. `from-pink-200 to-blue-100`). Omit for the default brand “Framer” panel. */
  backgroundGradient?: string;
}

export const HeroSection = ({
  title,
  description,
  ctaText = 'Find my style',
  ctaHref = '/shop',
  backgroundImage,
  backgroundGradient,
}: HeroSectionProps) => {
  const useLegacyGradient = Boolean(backgroundGradient);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);
  const contenty = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  const surfaceClass = useLegacyGradient
    ? `relative rounded-3xl bg-linear-to-br ${backgroundGradient} overflow-hidden`
    : 'hero-framer-surface relative';

  return (
    <Section className="relative z-10 mt-0 mb-8 md:mb-16 bg-transparent">
      <Container>
        <div
          ref={containerRef}
          className={`flex flex-col justify-start ${surfaceClass} pt-28`}
        >
          {useLegacyGradient ? (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-b from-transparent from-[35%] via-background/40 to-background"
            />
          ) : null}
          <div className="relative z-1 flex flex-col items-center justify-start w-full">
            {/* Centered Content Wrapper */}
            <div className="flex flex-col justify-center min-h-[80vh] w-full">
              <motion.div className="space-y-6 max-w-4xl text-center mx-auto relative z-20" style={{ y: contenty }}>
                <Text variant="label" className="font-supreme">
                  always authenticated
                </Text>
                <Heading level={1} className="leading-tight font-gambetta-italic font-medium" animate={false}>
                  {title}
                </Heading>
                {description && <Text variant="large">{description}</Text>}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  className="pt-4 flex justify-center w-full"
                >
                  <HeroCtaButton href={ctaHref} />
                </motion.div>
              </motion.div>

              {/* Hero Image Placeholder */}
              {backgroundImage && (
                <motion.div
                  style={{ y: imageY }}
                  className="relative z-10 w-full flex justify-center -mt-10 md:-mt-20 lg:-mt-32"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                    className="relative w-3/4 aspect-square overflow-hidden"
                  >
                    <Image
                      src={backgroundImage}
                      alt="Hero"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover drop-shadow-2xl -scale-x-100"
                    />
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
