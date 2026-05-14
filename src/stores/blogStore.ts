interface BlogPost {
  id: string
  slug: string
  tag: string
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
    tag: 'Materials',
    title: 'The Ultimate Guide to Premium Footwear Materials',
    excerpt: 'Learn what makes quality craftsmanship. We break down memory foam, supportive insoles, and breathable fabrics.',
    content: 'Full article content here...',
    image: '/assets/insider/materials.jpeg',
    date: new Date('2026-05-08'),
    readTime: '5 min read',
    category: 'Guides',
  },
  {
    id: '2',
    slug: 'care-tips',
    tag: 'Care',
    title: 'How to Care for Your Cuttle Fish Shoes',
    excerpt: 'Extend the life of your favorite comfortable footwear with these simple maintenance tips.',
    content: 'Full article content here...',
    image: '/assets/insider/care.jpeg',
    date: new Date('2026-05-01'),
    readTime: '4 min read',
    category: 'Care',
  },
  {
    id: '3',
    slug: 'sustainability',
    tag: 'Footwear',
    title: 'Our Commitment to Sustainable Production',
    excerpt: 'Discover how we balance supreme comfort and quality with environmental responsibility.',
    content: 'Full article content here...',
    image: '/assets/insider/sustainable.jpg',
    // image: 'public/assets/insider/sustainable.jpg'
    date: new Date('2026-04-24'),
    readTime: '6 min read',
    category: 'Sustainability',
  },
  {
    id: '4',
    slug: 'styling-tips',
    tag: 'Style',
    title: 'Styling Tips for Comfortable Footwear',
    excerpt: 'Get inspired with our top tips for incorporating ergonomic shoes into modern, stylish looks.',
    content: 'Full article content here...',
    image: '/assets/insider/style.jpeg',
    date: new Date('2026-04-17'),
    readTime: '5 min read',
    category: 'Style',
  }
]

export const useBlogStore = () => ({
  posts: BLOG_POSTS,
  getPostBySlug: (slug: string) => BLOG_POSTS.find((p) => p.slug === slug),
  getRecentPosts: (limit = 3) => BLOG_POSTS.slice(0, limit),
})
