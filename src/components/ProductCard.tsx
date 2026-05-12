'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  showPrice?: boolean;
  showRating?: boolean;
  className?: string;
  imageClassName?: string;
}

export const ProductCard = ({
  product,
  showPrice = true,
  showRating = true,
  className = '',
  imageClassName = '',
}: ProductCardProps) => {
  return (
    <Link href={`/shop/${product.slug}`}>
      <div className={`group cursor-pointer ${className}`}>
        <div
          className={`relative w-full aspect-square bg-gray-200 overflow-hidden mb-4 ${imageClassName}`}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="space-y-2 flex w-full justify-between">
          <h3 className="font-semibold text-lg text-black group-hover:underline">{product.name}</h3>
          {showPrice && <p className="text-lg font-bold text-black">${product.price}</p>}
        </div>
      </div>
    </Link>
  );
};
