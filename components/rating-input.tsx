"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingInputProps {
  initialValue?: number
  onChange?: (value: number) => void
  size?: "sm" | "md" | "lg"
  className?: string
  disabled?: boolean
}

export function RatingInput({
  initialValue = 0,
  onChange,
  size = "md",
  className,
  disabled = false,
}: RatingInputProps) {
  const [rating, setRating] = useState(initialValue)
  const [hoverRating, setHoverRating] = useState(0)

  // Determine star size based on the size prop
  const starSize = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }[size]

  const handleSetRating = (value: number) => {
    if (disabled) return
    setRating(value)
    if (onChange) onChange(value)
  }

  return (
    <div className={cn("flex", className)}>
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          className={cn(
            "p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
          )}
          onClick={() => handleSetRating(value)}
          onMouseEnter={() => !disabled && setHoverRating(value)}
          onMouseLeave={() => !disabled && setHoverRating(0)}
          disabled={disabled}
          aria-label={`Rate ${value} out of 5 stars`}
        >
          <Star
            className={cn(
              starSize,
              (hoverRating || rating) >= value ? "fill-primary text-primary" : "text-muted-foreground",
            )}
          />
        </button>
      ))}
    </div>
  )
}

