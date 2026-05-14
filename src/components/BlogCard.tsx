import { Text } from './Text'
import Image from 'next/image'
import Link from 'next/link'

interface BlogCardProps {
  slug: string
  title: string
  excerpt: string
  image: string
  date: Date
  readTime: string
  category: string
}

export const BlogCard = ({
  slug,
  title,
  excerpt,
  image,
  date,
  readTime,
  category,
}: BlogCardProps) => {
  return (
    <Link href={`/blog/${slug}`}>
      <article className="group cursor-pointer">
        <div className="relative aspect-video bg-gray-100 overflow-hidden mb-4">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition"
          />
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs uppercase tracking-wide font-semibold text-gray-500">
            {category}
          </span>
          <Text size="xs" className="text-gray-500">
            {readTime}
          </Text>
        </div>

        <h3 className="font-semibold text-lg mb-2 group-hover:underline">{title}</h3>

        <Text size="sm" className="text-gray-600 mb-3">
          {excerpt}
        </Text>

        <Text size="xs" className="text-gray-500">
          {date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </Text>
      </article>
    </Link>
  )
}
