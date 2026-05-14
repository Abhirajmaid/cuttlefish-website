'use client';

import { ReactNode } from 'react';

interface GridProps {
  children: ReactNode;
  cols?:
    | number
    | {
        base?: number;
        md?: number;
        lg?: number;
      };
  gap?:
    | number
    | 'sm'
    | 'md'
    | 'lg'
    | {
        base?: number;
        md?: number;
        lg?: number;
      };
  className?: string;
}

const columnClasses: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
};

const gapClasses: Record<number, string> = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  7: 'gap-7',
  8: 'gap-8',
  9: 'gap-9',
  10: 'gap-10',
  11: 'gap-11',
  12: 'gap-12',
};

const resolveResponsiveColumns = (value: GridProps['cols'] = 3) => {
  if (typeof value === 'number') {
    return columnClasses[value] ?? 'grid-cols-3';
  }

  return [
    columnClasses[value.base ?? 1] ?? 'grid-cols-1',
    `md:${columnClasses[value.md ?? 2] ?? 'grid-cols-2'}`,
    `lg:${columnClasses[value.lg ?? 3] ?? 'grid-cols-3'}`,
  ].join(' ');
};

const resolveResponsiveGap = (value: GridProps['gap'] = 'md') => {
  if (typeof value === 'number') {
    return gapClasses[value] ?? 'gap-6';
  }

  if (typeof value === 'string') {
    if (value === 'sm') return 'gap-4';
    if (value === 'lg') return 'gap-8';
    return 'gap-6';
  }

  return [
    gapClasses[value.base ?? 4] ?? 'gap-4',
    `md:${gapClasses[value.md ?? 6] ?? 'gap-6'}`,
    `lg:${gapClasses[value.lg ?? 8] ?? 'gap-8'}`,
  ].join(' ');
};

export const Grid = ({ children, cols = 3, gap = 'md', className = '' }: GridProps) => {
  const colsClass = resolveResponsiveColumns(cols);
  const gapClass = resolveResponsiveGap(gap);

  return <div className={`grid ${colsClass} ${gapClass} ${className}`}>{children}</div>;
};
