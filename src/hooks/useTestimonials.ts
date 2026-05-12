'use client';

import { getTestimonials, getTestimonialById } from '@/stores/testimonialsStore';
import { useMemo } from 'react';

export const useTestimonials = () => {
  const testimonials = useMemo(() => getTestimonials(), []);
  return testimonials;
};

export const useTestimonialById = (id: string) => {
  const testimonial = useMemo(() => getTestimonialById(id), [id]);
  return testimonial;
};
