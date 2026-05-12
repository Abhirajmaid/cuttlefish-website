'use client';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

export const Badge = ({ label, variant = 'primary', className = '' }: BadgeProps) => {
  const variants = {
    primary: 'bg-black text-white',
    secondary: 'bg-gray-200 text-black',
    accent: 'bg-cyan-100 text-cyan-900',
  };

  return (
    <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${variants[variant]} ${className}`}>
      {label}
    </span>
  );
};
