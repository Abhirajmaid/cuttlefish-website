'use client';

import Link from 'next/link';
import { useCartStore } from '@/stores/cartStore';
import Image from 'next/image';

interface HeaderProps {
  showCart?: boolean;
}

export const Header = ({ showCart = true }: HeaderProps) => {
  const cartItems = useCartStore((state) => state.getTotalItems());

  return (
    <header 
      className="fixed w-full bg-white/10 backdrop-blur-xs z-50 px-20"
      style={{
        maskImage: 'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 60%)',
        WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 60%)',
      }}
    >
      <nav className="max-w-7xl py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {/* <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center">
            <span className="text-white font-bold">C</span>
          </div> */}
          <div className="relative w-12 h-12">
            <Image src="/assets/logo.jpg" alt="CuttleFish" fill className="object-contain" />
          </div>
          <span className="font-bold text-lg hidden sm:inline">CuttleFish</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <Link href="/shop" className="font-medium hover:text-gray-600 transition-colors">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/blog" className="font-medium hover:text-gray-600 transition-colors">
                Insider Edition
              </Link>
            </li>
          </ul>

          {/* Cart Icon */}
          {showCart && (
            <Link href="/cart" className="relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartItems}
                </span>
              )}
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};
