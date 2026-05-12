import { Testimonial } from '@/types';

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    author: 'Charles M.',
    rating: 5,
    content: 'Incredible experience! Found a rare designer coat at a steal, and it\'s now the envy of my wardrobe.',
    avatar: '/avatars/charles.jpg',
  },
  {
    id: '2',
    author: 'Daniel M',
    rating: 5,
    content: 'The selection of vintage designer pieces is unmatched. Quality and authenticity guaranteed!',
    avatar: '/avatars/daniel.jpg',
  },
  {
    id: '3',
    author: 'Sarah K.',
    rating: 5,
    content: 'Best place to find authentic luxury at reasonable prices. Highly recommend!',
    avatar: '/avatars/sarah.jpg',
  },
];

export const getTestimonials = (): Testimonial[] => {
  return mockTestimonials;
};

export const getTestimonialById = (id: string): Testimonial | undefined => {
  return mockTestimonials.find((t) => t.id === id);
};
