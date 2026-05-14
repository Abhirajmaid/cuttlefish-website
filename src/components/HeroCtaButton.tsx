'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroCtaButtonProps {
  href?: string;
}

const HeroCtaButton = ({ href = '/shop' }: HeroCtaButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className="relative flex items-center h-16 w-56 rounded-full border border-primary bg-transparent overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ isolation: 'isolate' }}
    >
      {/* The expanding circle */}
      <motion.div
        className="absolute left-1 top-1 bottom-1 bg-gradient-to-r from-primary to-secondary rounded-full z-10"
        initial={false}
        animate={{ width: isHovered ? 'calc(100% - 8px)' : 54 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Icon inside the circle */}
      <motion.div
        className="absolute left-1 w-[54px] h-[54px] flex items-center justify-center z-20"
        animate={{ 
          rotate: isHovered ? -45 : 0,
          x: isHovered ? 162 : 0
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </motion.div>

      {/* Text Container */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none overflow-hidden">
        <AnimatePresence mode="wait">
          {!isHovered ? (
            <motion.span
              key="base-text"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="text-secondary font-supreme font-medium text-lg pl-10"
            >
              Find my style
            </motion.span>
          ) : (
            <motion.span
              key="hover-text"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="text-white font-supreme font-medium text-lg pr-10"
            >
              Shop now
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </Link>
  );
};

export default HeroCtaButton;