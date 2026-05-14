import { Testimonial } from '@/types';

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    author: 'Charles M.',
    rating: 5,
    content: 'Incredible experience! Found the most comfortable boots I have ever owned, and they are now the envy of my wardrobe.',
    avatar: 'https://i.pravatar.cc/300',
    productLink: 'http://localhost:3000/shop',
    productName: 'Orthopedic Sliders',
  },
  {
    id: '2',
    author: 'Daniel M',
    rating: 5,
    content: 'The selection of comfortable footwear is unmatched. Quality and all-day support guaranteed!',
    avatar: 'https://i.pravatar.cc/300/?img=2',
  },
  {
    id: '3',
    author: 'Sarah K.',
    rating: 5,
    content: 'Best place to find authentic comfort at reasonable prices. My feet have never felt better! Highly recommend!',
    avatar: 'https://i.pravatar.cc/300/?img=3',
    image: '/assets/testimonial/sarah.webp',
    productLink: 'http://localhost:3000/shop',
    productName: 'Running Sneakers',
  },
  {
    id: '4',
    author: 'Jessica L.',
    rating: 5,
    content: 'Amazing customer service and fast shipping. My new favorite shoe shop!',
    avatar: 'https://i.pravatar.cc/300/?img=4',
  },
  {
    id: '5',
    author: 'Marcus T.',
    rating: 5,
    content: 'Found exactly what I was looking for. The fit is exceptional and the prices are fair.',
    avatar: 'https://i.pravatar.cc/300/?img=5',
  },
  {
    id: '6',
    author: 'Emma R.',
    rating: 5,
    content: 'Obsessed with my purchase! Every pair feels like walking on clouds. Will definitely shop again.',
    avatar: 'https://i.pravatar.cc/300/?img=6',
  },
  {
    id: '7',
    author: 'Alexander P.',
    rating: 5,
    content: 'The ergonomic design here is impeccable. Such a refreshing alternative to stiff, painful shoes.',
    avatar: 'https://i.pravatar.cc/300/?img=7',
  },
  {
    id: '8',
    author: 'Olivia N.',
    rating: 5,
    content: 'Incredible selection of cozy pieces. This is a treasure trove for anyone who values comfort!',
    avatar: 'https://i.pravatar.cc/300/?img=8',
    productLink: 'http://localhost:3000/shop',
    productName: 'Summer Collection',
  },
];

export const getTestimonials = (): Testimonial[] => {
  return mockTestimonials;
};

export const getTestimonialById = (id: string): Testimonial | undefined => {
  return mockTestimonials.find((t) => t.id === id);
};
