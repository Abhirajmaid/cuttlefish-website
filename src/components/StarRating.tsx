'use client';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StarRating = ({ rating, maxRating = 5, size = 'md', className = '' }: StarRatingProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div className={`flex gap-1 ${className}`}>
      {Array.from({ length: maxRating }).map((_, i) => (
        <svg
          key={i}
          className={`${sizeClasses[size]} ${
            i < Math.floor(rating) ? 'fill-pink-700' : 'fill-gray-300'
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
};
