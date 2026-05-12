'use client';

import { ReactNode } from 'react';

interface GridProps {
  children: ReactNode;
  columns?: number;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Grid = ({ children, columns = 3, gap = 'md', className = '' }: GridProps) => {
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} ${gapClasses[gap]} ${className}`}
    >
      {children}
    </div>
  );
};
