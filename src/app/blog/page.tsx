'use client'

import { Container } from '@/components/Container'
import { Heading } from '@/components/Heading'
import { BlogCard } from '@/components/BlogCard'
import { Grid } from '@/components/Grid'
import { useBlogStore } from '@/stores/blogStore'

export default function BlogPage() {
  const { posts } = useBlogStore()

  return (
    <main>
      <Container>
        <div className="py-12">
          <Heading level={1} className="mb-8">
            Blog
          </Heading>

          <p className="text-gray-600 mb-12 max-w-2xl">
            Stories, guides, and insights from the Parcel community. Learn about
            materials, care, sustainability, and more.
          </p>

          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={{ base: 8, md: 10 }}>
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                image={post.image}
                date={post.date}
                readTime={post.readTime}
                category={post.category}
              />
            ))}
          </Grid>
        </div>
      </Container>
    </main>
  )
}
