'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { springSnappy, tapScale } from '@/lib/motion';

const MotionLink = motion.create(Link);
const MotionA = motion.a;

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  className?: string;
  disabled?: boolean;
  external?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const motionProps = {
  whileHover: { y: -2, transition: springSnappy },
  whileTap: tapScale,
};

export const Button = ({
  href,
  onClick,
  children,
  variant = 'primary',
  className = '',
  disabled = false,
  external = false,
  type = 'button',
}: ButtonProps) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 px-6 py-3 font-medium transition-colors duration-200 rounded-full';

  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800',
    secondary: 'bg-gray-200 text-black hover:bg-gray-300',
    ghost: 'bg-transparent text-black hover:text-primary p-0',
    outline: 'border border-black bg-transparent text-black hover:bg-secondary hover:text-white',
  };

  const finalClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <MotionA href={href} className={finalClassName} target="_blank" rel="noopener noreferrer" {...motionProps}>
          {children}
        </MotionA>
      );
    }
    return (
      <MotionLink href={href} className={finalClassName} {...motionProps}>
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={finalClassName}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -2, transition: springSnappy }}
      whileTap={disabled ? undefined : tapScale}
    >
      {children}
    </motion.button>
  );
};
