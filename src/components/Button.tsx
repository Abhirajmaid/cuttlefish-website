'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  disabled?: boolean;
  external?: boolean;
}

export const Button = ({
  href,
  onClick,
  children,
  variant = 'primary',
  className = '',
  disabled = false,
  external = false,
}: ButtonProps) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200';

  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800',
    secondary: 'bg-gray-200 text-black hover:bg-gray-300',
    ghost: 'bg-transparent text-black border border-black hover:bg-black hover:text-white',
  };

  const finalClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} className={finalClassName} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={finalClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={finalClassName} disabled={disabled}>
      {children}
    </button>
  );
};
