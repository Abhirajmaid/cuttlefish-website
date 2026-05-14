'use client';

import { Testimonial } from '@/types';
import { StarRating } from './StarRating';
import Image from 'next/image';
import Link from 'next/link';

import { GoArrowUpRight } from "react-icons/go";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export const TestimonialCard = ({ testimonial, className = '' }: TestimonialCardProps) => {
  return (
    <div className={`flex justify-between flex-col px-6 py-8 space-y-4 ${className} border-r border-b border-gray-200 aspect-6/5`}>
      <div>
        <div className="flex items-center gap-4">
          {testimonial.avatar && (
            <div className="relative w-12 h-12 overflow-hidden rounded-full">
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
        <p className="text-gray-700 leading-relaxed mt-6 text-lg font-medium">{testimonial.content}</p>
      </div>
      <div className="items-end">
        {testimonial.productLink && (
          <Link href={testimonial.productLink} className="w-full text-2xl font-gambetta hover:underline mt-4 inline-block border-t border-gray-300 pt-2">
            <div className="flex items-center gap-2">
              {testimonial.productName ? `View ${testimonial.productName}` : 'View Product'} <GoArrowUpRight />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
