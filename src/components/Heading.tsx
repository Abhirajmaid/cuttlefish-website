'use client';

import type { ElementType, ReactNode } from 'react';

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  className?: string;
  highlight?: boolean;
}

export const Heading = ({ level = 1, children, className = '', highlight = false }: HeadingProps) => {
  const baseClasses = 'font-bold text-black';

  const levelClasses = {
    1: 'text-4xl md:text-5xl lg:text-6xl',
    2: 'text-3xl md:text-4xl lg:text-5xl',
    3: 'text-2xl md:text-3xl lg:text-4xl',
    4: 'text-xl md:text-2xl lg:text-3xl',
    5: 'text-lg md:text-xl lg:text-2xl',
    6: 'text-base md:text-lg lg:text-xl',
  };

  const Component = `h${level}` as ElementType;

  const finalClassName = `${baseClasses} ${levelClasses[level]} ${className}`;

  return (
    <Component className={finalClassName}>
      {highlight ? <em className="not-italic font-bold">{children}</em> : children}
    </Component>
  );
};
