'use client';

import { motion } from 'framer-motion';

interface WordFadeInProps {
  text: string;
  delay?: number;
  className?: string;
  staggerDelay?: number;
}

export const WordFadeIn = ({ text, delay = 0, className = '', staggerDelay = 0.1 }: WordFadeInProps) => {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      className={`inline-block ${className}`}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={child} className="inline-block mr-[0.25em]">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};
