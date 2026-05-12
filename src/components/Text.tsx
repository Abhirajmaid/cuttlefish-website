'use client';

import { ReactNode } from 'react';

interface TextProps {
  children: ReactNode;
  variant?: 'body' | 'small' | 'large' | 'label';
  className?: string;
  highlight?: boolean;
}

export const Text = ({ children, variant = 'body', className = '', highlight = false }: TextProps) => {
  const variants = {
    body: 'text-base leading-relaxed',
    small: 'text-sm leading-relaxed',
    large: 'text-lg leading-relaxed',
    label: 'text-xs font-semibold uppercase tracking-wider',
  };

  return (
    <p className={`${variants[variant]} ${highlight ? 'font-semibold' : ''} ${className}`}>
      {children}
    </p>
  );
};
