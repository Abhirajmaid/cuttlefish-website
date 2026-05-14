'use client'

import { Container } from '@/components/Container'
import EmailSubscriber from '@/components/EmailSubscriber'
import { Heading } from '@/components/Heading'
import { Text } from '@/components/Text'
import { useBlogStore } from '@/stores/blogStore'
import Image from 'next/image'
import Link from 'next/link'

export default function BlogPage() {
  const { posts } = useBlogStore()

  if (posts.length === 0) {
    return null
  }

  const [featured, ...rest] = posts

  return (
    <div className="py-16">
      <Container>
        <header className="border-b border-gray-200 pb-12 pt-6 md:pb-16 md:pt-10 mb-10">
          <Text variant="label" className="mb-4 text-gray-500 text-center">
            INSIDER EDITION
          </Text>
          <Heading
            level={1}
            className="text-balance font-gambetta-italic-500 text-4xl leading-[1.05] tracking-tight text-black md:text-5xl lg:text-6xl text-center"
          >
            <span className="font-gambetta-italic">Thoughts</span> from <br /> industry leaders
          </Heading>
        </header>

        <div className="space-y-10">

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            <Link
              href={`/blog/${featured.slug}`}
              className="group col-span-1 border border-gray-200 bg-background transition hover:border-gray-300 lg:col-span-3 flex flex-col md:flex-row"
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
            </Link>

            {rest.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group relative overflow-hidden border border-gray-200 bg-background p-6 transition hover:border-gray-300 aspect-[4/5] md:aspect-5/6 block"
              >
                {/* Background image element that scales on hover */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${article.image})` }}
                />

                {/* Dark overlay above the background */}
                <div className="absolute inset-0 bg-black/40 z-10 transition-opacity group-hover:bg-black/50" />

                <div className="absolute top-0 left-0 z-20 bg-white/80 p-3 backdrop-blur-sm w-fit h-fit m-4">
                  <Text variant="label" className="text-gray-500 !m-0 text-xs">
                    {article.category}
                  </Text>
                </div>

                <Heading level={5} className="absolute bottom-0 left-0 m-6 text-balance leading-snug text-gray-50 z-20">
                  {article.title}
                </Heading>
              </Link>
            ))}
          </div>
        </div>
        <EmailSubscriber />
      </Container>
    </div>
  )
}
