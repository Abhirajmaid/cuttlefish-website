'use client';

import { Heading } from './Heading';
import { Text } from './Text';
import { Section } from './Section';
import { Container } from './Container';
import { Button } from './Button';
import { InsiderArticle } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface InsiderEditionSectionProps {
  title: string;
  cta: string;
  ctaHref: string;
  insiderBlogs: InsiderArticle[];
}

export const InsiderEditionSection = ({ title, cta, ctaHref, insiderBlogs }: InsiderEditionSectionProps) => {
  if (insiderBlogs.length === 0) {
    return null;
  }

  const [featured, ...rest] = insiderBlogs;

  return (
    <Section className="bg-background py-16">
      <Container>
        <div className="space-y-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <Text variant="label">{title.toUpperCase()}</Text>
              <Heading level={2} className="font-gambetta-italic-500 leading-tight">
                <span className="font-gambetta-italic">Thoughts</span> from <br /> industry leaders
              </Heading>
            </div>

            <Button
              href={ctaHref}
              variant="outline"
              className="!inline-flex w-fit text-sm uppercase tracking-wide"
            >
              {cta}
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            <Link
              href={`/blog/${featured.slug}`}
              className='lg:col-span-3'
            >
              <article
                key={featured.slug}
                className="group col-span-1 border border-gray-200 bg-background transition hover:border-gray-300 lg:col-span-3 flex"
              >
                <div className="relative w-full md:w-2/3 min-h-[300px] md:min-h-[400px]">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex w-full md:w-1/3 flex-col justify-between p-6 md:p-10">
                  <div>
                    <Text variant="label" className="mb-4 text-gray-500">
                      {featured.category}
                    </Text>
                    <Heading level={4} className="mb-4 text-balance leading-snug">
                      {featured.title}
                    </Heading>
                    <Text className="mb-6 text-gray-600 line-clamp-4">{featured.excerpt}</Text>
                  </div>
                  <div className="flex flex-col gap-2 border-t border-gray-200 pt-4">
                    <Text variant="label" className="text-gray-500">
                      {featured.category}
                    </Text>
                    <Text size="xs" className="text-gray-500">
                      {featured.readTime}
                    </Text>
                  </div>
                </div>
              </article>
            </Link>
            {rest.map((article) => (
              <article
                key={article.slug}
                className="group relative overflow-hidden border border-gray-200 bg-background p-6 transition hover:border-gray-300 aspect-5/6"
              >
                {/* Background image element that scales on hover */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${article.image})` }}
                />

                {/* Dark overlay above the background */}
                <div className="absolute inset-0 bg-black/40 z-10" />

                <div className="absolute top-0 left-0 z-20 bg-white/80 p-4 backdrop-blur-sm w-fit h-fit">
                  <Text variant="label" className="text-gray-500">
                    {article.tag}
                  </Text>
                </div>

                <Heading level={5} className="absolute bottom-0 left-0 m-4 text-balance leading-snug text-gray-50 z-20">
                  {article.title}
                </Heading>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
