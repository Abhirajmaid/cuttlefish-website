'use client';

import { useState, useCallback } from 'react';

export const useCarousel = (itemCount: number) => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % itemCount);
  }, [itemCount]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + itemCount) % itemCount);
  }, [itemCount]);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < itemCount) {
      setCurrent(index);
    }
  }, [itemCount]);

  return {
    current,
    next,
    prev,
    goTo,
    itemCount,
  };
};
