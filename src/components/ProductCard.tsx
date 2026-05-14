'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { formatPrice } from '@/utils/formatPrice';

interface ProductCardProps {
  product: Product;
  showPrice?: boolean;
  showRating?: boolean;
  className?: string;
  imageClassName?: string;
  layout?: 'default' | 'shop';
}

export const ProductCard = ({
  product,
  showPrice = true,
  showRating: _showRating = true,
  className = '',
  imageClassName = '',
  layout = 'default',
}: ProductCardProps) => {
  const isShop = layout === 'shop'
  const aspect = isShop ? 'aspect-[3/4]' : 'aspect-square'
  const titleClass = isShop
    ? 'text-sm font-medium leading-snug text-black md:text-base font-gambetta'
    : 'text-lg text-black group-hover:underline font-gambetta font-medium'
  const priceClass = isShop ? 'text-sm font-medium text-black md:text-base font-gambetta' : 'text-lg font-gambetta font-medium text-black'

  return (
    <Link href={`/shop/${product.slug}`} className={`group block ${className}`}>
      <motion.article 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={isShop ? 'space-y-3' : 'space-y-4'}
      >
        <div className={`relative ${aspect} overflow-hidden bg-gray-100 ${imageClassName}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/35 text-white text-xs uppercase tracking-[0.3em] backdrop-blur-sm">
              Sold out
            </div>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 space-y-1">
              <h3 className={`${titleClass} group-hover:underline`}>{product.name}</h3>
            </div>

            {showPrice && <p className={`shrink-0 tabular-nums ${priceClass}`}>{formatPrice(product.price)}</p>}
          </div>
        </div>
      </motion.article>
    </Link>
  );
};
