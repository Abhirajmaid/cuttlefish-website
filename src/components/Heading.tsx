'use client';

import type { ElementType, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  className?: string;
  highlight?: boolean;
  animate?: boolean;
}

const motionHeadings = {
  1: motion.h1,
  2: motion.h2,
  3: motion.h3,
  4: motion.h4,
  5: motion.h5,
  6: motion.h6,
};

export const Heading = ({ level = 1, children, className = '', highlight = false, animate = true }: HeadingProps) => {
  const baseClasses = 'font-bold text-black';

  const levelClasses = {
    1: 'text-2xl md:text-5xl lg:text-6xl',
    2: 'text-xl md:text-2xl lg:text-3xl font-gambetta-italic-500',
    3: 'text-2xl md:text-3xl lg:text-4xl font-medium',
    4: 'text-xl md:text-2xl lg:text-3xl',
    5: 'text-lg md:text-xl lg:text-2xl',
    6: 'text-base md:text-lg lg:text-xl',
  };

  const Component = animate ? motionHeadings[level] : `h${level}` as ElementType;

  const finalClassName = `${baseClasses} ${levelClasses[level]} ${className}`;

  if (animate) {
    const MotionComponent = Component as typeof motion.h1;
    return (
      <MotionComponent
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={finalClassName}
      >
        {highlight ? <em className="not-italic">{children}</em> : children}
      </MotionComponent>
    );
  }

  const RegularComponent = Component as ElementType;
  return (
    <RegularComponent className={finalClassName}>
      {highlight ? <em className="not-italic">{children}</em> : children}
    </RegularComponent>
  );
};
