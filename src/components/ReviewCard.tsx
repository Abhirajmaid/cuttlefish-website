import { Review } from '@/types'
import { StarRating } from './StarRating'
import { Text } from './Text'

interface ReviewCardProps {
  review: Review
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="border-t pt-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-semibold text-sm">{review.author}</p>
          <Text size="xs" className="text-gray-500">
            {new Date(review.createdAt).toLocaleDateString()}
          </Text>
        </div>
        <StarRating rating={review.rating} />
      </div>
      <Text size="sm" className="text-gray-700">
        {review.text}
      </Text>
    </div>
  )
}
