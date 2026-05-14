import { Container } from '@/components/Container'
import { Heading } from '@/components/Heading'
import { Text } from '@/components/Text'
import { Button } from '@/components/Button'
import { BLOG_POSTS } from '@/stores/blogStore'
import Image from 'next/image'
import Link from 'next/link'

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((entry) => entry.slug === params.slug)

  if (!post) {
    return (
      <main>
        <Container>
          <div className="py-24 text-center space-y-6">
            <Heading level={1}>Article not found</Heading>
            <Text className="text-gray-600">This story may have been moved or removed.</Text>
            <Link href="/blog">
              <Button>Back to Blog</Button>
            </Link>
          </div>
        </Container>
      </main>
    )
  }

  const relatedPosts = BLOG_POSTS.filter((entry) => entry.slug !== post.slug).slice(0, 2)

  return (
    <main>
      <Container>
        <article className="py-12 lg:py-16 space-y-12">
          <header className="max-w-3xl space-y-4">
            <Text variant="label" className="text-gray-500">
              {post.category} • {post.readTime}
            </Text>
            <Heading level={1}>{post.title}</Heading>
            <Text className="text-gray-600 text-lg">{post.excerpt}</Text>
            <Text size="xs" className="text-gray-500">
              {post.date.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          </header>

          <div className="relative aspect-video overflow-hidden bg-gray-100">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority />
          </div>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="space-y-6 max-w-3xl">
              <Text className="text-gray-700 leading-8">
                {post.content}
              </Text>
              <Text className="text-gray-700 leading-8">
                We are turning this editorial space into a real content system next, so the blog can grow without changing the design language.
              </Text>
            </div>

            <aside className="space-y-4 border border-gray-200 p-6 bg-background/80 backdrop-blur-sm h-fit">
              <Text variant="label" className="text-gray-500">
                Related stories
              </Text>
              <div className="space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="block group">
                    <p className="font-semibold group-hover:underline">{relatedPost.title}</p>
                    <Text size="xs" className="text-gray-500">
                      {relatedPost.readTime}
                    </Text>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </article>
      </Container>
    </main>
  )
}