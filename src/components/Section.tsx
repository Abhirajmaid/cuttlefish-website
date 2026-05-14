'use client';

import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const Section = ({ children, className = '', id }: SectionProps) => {
  return (
    <section id={id} className={`w-full my-8 md:my-16 ${className}`}>
      <div>{children}</div>
    </section>
  );
};
