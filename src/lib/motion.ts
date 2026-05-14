import type { Transition, Variants } from 'framer-motion';

/** Snappy spring for UI micro-interactions */
export const springSnappy: Transition = { type: 'spring', stiffness: 420, damping: 28 };

export const springSoft: Transition = { type: 'spring', stiffness: 280, damping: 32 };

export const easeOut: Transition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] };

export const viewportOnce = { once: true as const, margin: '-60px 0px' };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: easeOut },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: springSoft },
};

export const tapScale = { scale: 0.97 };
export const hoverLift = { y: -3, transition: springSnappy };
