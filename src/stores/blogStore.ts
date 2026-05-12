interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  date: Date
  readTime: string
  category: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'materials-guide',
    title: 'The Ultimate Guide to Premium Materials',
    excerpt: 'Learn what makes quality craftsmanship. We break down fabrics, leathers, and finishes.',
    content: 'Full article content here...',
    image: '/blog/materials.jpg',
    date: new Date('2026-05-08'),
    readTime: '5 min read',
    category: 'Guides',
  },
  {
    id: '2',
    slug: 'care-tips',
    title: 'How to Care for Your Parcel Products',
    excerpt: 'Extend the life of your items with these simple maintenance tips.',
    content: 'Full article content here...',
    image: '/blog/care.jpg',
    date: new Date('2026-05-01'),
    readTime: '4 min read',
    category: 'Care',
  },
  {
    id: '3',
    slug: 'sustainability',
    title: 'Our Commitment to Sustainable Production',
    excerpt: 'Discover how we balance quality with environmental responsibility.',
    content: 'Full article content here...',
    image: '/blog/sustainability.jpg',
    date: new Date('2026-04-24'),
    readTime: '6 min read',
    category: 'Sustainability',
  },
]

export const useBlogStore = () => ({
  posts: BLOG_POSTS,
  getPostBySlug: (slug: string) => BLOG_POSTS.find((p) => p.slug === slug),
  getRecentPosts: (limit = 3) => BLOG_POSTS.slice(0, limit),
})
