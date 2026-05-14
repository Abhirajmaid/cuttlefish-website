'use client';

import Link from 'next/link';
import { useCartStore } from '@/stores/cartStore';
import Image from 'next/image';
import { useState } from 'react';
import { CartDrawer } from './CartDrawer';

interface HeaderProps {
  showCart?: boolean;
}

export const Header = ({ showCart = true }: HeaderProps) => {
  const cartItems = useCartStore((state) => state.getTotalItems());
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header
        className="fixed w-full bg-background/10 backdrop-blur-xs z-50 px-16"
        style={{
          maskImage: 'linear-gradient(to top, rgba(256,256,256,0) 0%, rgba(256,256,256,1) 40%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(256,256,256,0) 0%, rgba(256,256,256,1) 40%)',
        }}
      >
        <nav className="w-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {/* <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center">
            <span className="text-white font-bold">C</span>
          </div> */}
            <div className="relative aspect-[1/1.44] w-16">
              <Image src="/assets/logo.png" alt="CuttleFish" fill className="object-cover" />
            </div>
            <span className="font-bold text-lg hidden sm:inline font-gambetta">Cuttle Fish</span>
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
              <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:bg-background/10 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center font-bold">
                    {cartItems}
                  </span>
                )}
              </button>
            )}
          </div>
        </nav>
      </header>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
