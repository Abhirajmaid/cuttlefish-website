'use client';

import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const Section = ({ children, className = '', id }: SectionProps) => {
  return (
    <section id={id} className={`w-full py-16 md:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
};
