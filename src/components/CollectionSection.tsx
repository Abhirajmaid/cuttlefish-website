'use client';

import { ReactNode } from 'react';
import { Heading } from './Heading';
import { Text } from './Text';
import { Section } from './Section';
import { Container } from './Container';
import Image from 'next/image';

interface CollectionSectionProps {
  title: ReactNode;
  subtitle?: string;
}

const COLLECTIONS = [
  { name: 'Traditions', image: '/assets/collections/tradition.jpeg', tone: 'from-gray-900 to-gray-700' },
  { name: 'Runners', image: '/assets/collections/runner.jpeg', tone: 'from-gray-900 to-gray-700' },
  { name: 'Nights', image: '/assets/collections/nights.jpeg', tone: 'from-gray-900 to-gray-700' },
  { name: 'Summer', image: '/assets/collections/summer.jpeg', tone: 'from-gray-900 to-gray-700' },
];

export const CollectionSection = ({ title, subtitle }: CollectionSectionProps) => {
  return (
    <Section className="border-t border-gray-200 bg-background pt-16">
      <Container>
        <div className="space-y-12">
          <div className="flex flex-col gap-4">
            {subtitle ? <Text variant="label">{subtitle}</Text> : null}
            <Heading level={2} className="font-gambetta-italic-500 leading-tight">
              {title}
            </Heading>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {COLLECTIONS.map((collection) => (
              <article
                key={collection.name}
                className={`group relative min-h-80 overflow-hidden rounded-xl bg-gradient-to-br ${collection.tone} p-6`}
              >
                {collection.image && (
                  <div className="absolute inset-0">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-b from-black/20 to-black/60 transition group-hover:bg-black/20" />
                <div className="relative flex h-full flex-col justify-end">
                  <Text className="text-xs uppercase tracking-[0.2em] text-white/75">Collection</Text>
                  <Heading level={4} className="font-gambetta-italic-500 text-white">
                    {collection.name}
                  </Heading>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
