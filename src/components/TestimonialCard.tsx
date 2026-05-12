'use client';

import { Testimonial } from '@/types';
import { StarRating } from './StarRating';
import Image from 'next/image';

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export const TestimonialCard = ({ testimonial, className = '' }: TestimonialCardProps) => {
  return (
    <div className={`bg-gray-50 rounded-lg p-6 space-y-4 ${className}`}>
      <div className="flex items-center gap-4">
        {testimonial.avatar && (
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-300">
            <Image
              src={testimonial.avatar}
              alt={testimonial.author}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div>
          <h4 className="font-semibold text-black">{testimonial.author}</h4>
          <StarRating rating={testimonial.rating} size="sm" />
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed">{testimonial.content}</p>
    </div>
  );
};
