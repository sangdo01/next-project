import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  className?: string
  showValue?: boolean
  totalReviews?: number
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  className,
  showValue = false,
  totalReviews,
}: StarRatingProps) {
  // Calculate the number of full and partial stars
  const fullStars = Math.floor(rating)
  const partialStar = rating % 1
  const emptyStars = Math.floor(maxRating - rating)

  // Determine star size based on the size prop
  const starSize = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }[size]

  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} className={cn(starSize, "fill-primary text-primary")} />
        ))}

        {/* Partial star */}
        {partialStar > 0 && (
          <span className="relative">
            {/* Background star (empty) */}
            <Star className={cn(starSize, "text-muted-foreground")} />
            {/* Foreground star (filled partially) - using clip-path to show only part of the star */}
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - partialStar * 100}% 0 0)` }}
            >
              <Star className={cn(starSize, "fill-primary text-primary")} />
            </span>
          </span>
        )}

        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className={cn(starSize, "text-muted-foreground")} />
        ))}
      </div>

      {/* Show numerical rating value if requested */}
      {showValue && (
        <span className="ml-2 text-sm text-muted-foreground">
          {rating.toFixed(1)}
          {totalReviews !== undefined && <span className="ml-1">({totalReviews})</span>}
        </span>
      )}
    </div>
  )
}

