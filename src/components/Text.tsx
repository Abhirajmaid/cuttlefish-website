'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface TextProps {
  children: ReactNode;
  size?: 'body' | 'xs' | 'sm' | 'small' | 'lg' | 'large' | 'label';
  variant?: 'body' | 'xs' | 'sm' | 'small' | 'lg' | 'large' | 'label';
  className?: string;
  highlight?: boolean;
  animate?: boolean;
}

export const Text = ({
  children,
  size,
  variant,
  className = '',
  highlight = false,
  animate = true,
}: TextProps) => {
  const resolvedSize = size ?? variant ?? 'body';

  const variants = {
    body: 'text-base leading-relaxed',
    xs: 'text-xs leading-relaxed',
    sm: 'text-sm leading-relaxed',
    small: 'text-sm leading-relaxed',
    lg: 'text-lg leading-relaxed',
    large: 'text-lg leading-relaxed',
    label: 'text-xs font-semibold uppercase tracking-wider',
  };

  const finalClassName = `${variants[resolvedSize]} ${highlight ? 'font-semibold' : ''} ${className}`;

  if (animate) {
    return (
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={finalClassName}
      >
        {children}
      </motion.p>
    );
  }

  return <p className={finalClassName}>{children}</p>;
};
