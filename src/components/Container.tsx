'use client';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'full' | 'wide' | 'default';
}

export const Container = ({ children, className = '', variant = 'default' }: ContainerProps) => {
  const variants = {
    full: 'w-full',
    wide: 'max-w-6xl mx-auto',
    default: 'max-w-7xl mx-auto',
  };

  return <div className={`${variants[variant]} ${className}`}>{children}</div>;
};
