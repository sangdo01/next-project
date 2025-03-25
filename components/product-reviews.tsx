"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/ui/star-rating"
import { ReviewForm } from "@/components/review-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getProductReviews } from "@/lib/actions/review-actions"
import type { Review } from "@/lib/types"

interface ProductReviewsProps {
  productId: string
  initialReviews?: Review[]
  averageRating?: number
  totalReviews?: number
}

export function ProductReviews({
  productId,
  initialReviews = [],
  averageRating = 0,
  totalReviews = 0,
}: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [isLoading, setIsLoading] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [stats, setStats] = useState({
    average: averageRating,
    total: totalReviews,
    distribution: [0, 0, 0, 0, 0], // 5 stars to 1 star
  })

  // Calculate rating distribution
  useEffect(() => {
    if (reviews.length > 0) {
      const distribution = [0, 0, 0, 0, 0]
      reviews.forEach((review) => {
        const index = Math.min(Math.max(Math.floor(review.rating) - 1, 0), 4)
        distribution[4 - index]++
      })

      setStats((prev) => ({
        ...prev,
        distribution,
      }))
    }
  }, [reviews]) // Only recalculate when reviews change

  // Load reviews if not provided initially
  useEffect(() => {
    if (initialReviews.length === 0) {
      loadReviews()
    }
  }, [initialReviews.length, productId]) // Add proper dependencies

  const loadReviews = async () => {
    setIsLoading(true)
    try {
      const result = await getProductReviews(productId)
      if (result.reviews) {
        setReviews(result.reviews)
        setStats({
          average: result.averageRating || 0,
          total: result.reviews.length,
          distribution: [0, 0, 0, 0, 0], // Will be calculated in useEffect
        })
      }
    } catch (error) {
      console.error("Failed to load reviews:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReviewSubmitted = () => {
    setShowReviewForm(false)
    loadReviews()
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="mt-12">
      <Tabs defaultValue="reviews">
        <TabsList className="mb-6">
          <TabsTrigger value="reviews">Reviews ({stats.total})</TabsTrigger>
          <TabsTrigger value="write">Write a Review</TabsTrigger>
        </TabsList>

        <TabsContent value="reviews">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Rating summary */}
            <div className="bg-muted/30 p-6 rounded-lg">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold">{stats.average.toFixed(1)}</h3>
                <StarRating rating={stats.average} size="lg" className="justify-center my-2" />
                <p className="text-sm text-muted-foreground">
                  Based on {stats.total} {stats.total === 1 ? "review" : "reviews"}
                </p>
              </div>

              {/* Rating distribution */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star, index) => {
                  const count = stats.distribution[index]
                  const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0

                  return (
                    <div key={star} className="flex items-center gap-2">
                      <div className="text-sm w-8">{star} ★</div>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${percentage}%` }} />
                      </div>
                      <div className="text-sm text-muted-foreground w-8 text-right">{count}</div>
                    </div>
                  )
                })}
              </div>

              <Button variant="outline" className="w-full mt-6" onClick={() => setShowReviewForm(true)}>
                Write a Review
              </Button>
            </div>

            {/* Reviews list */}
            <div className="md:col-span-2">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading reviews...</p>
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-8 bg-muted/30 rounded-lg">
                  <p className="text-muted-foreground mb-4">No reviews yet</p>
                  <Button onClick={() => setShowReviewForm(true)}>Be the first to review</Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <div key={review.id || index} className="border-b pb-6 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{review.title}</h4>
                        <StarRating rating={review.rating} size="sm" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        By {review.name} on {formatDate(review.date)}
                      </p>
                      <p className="text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="write">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Share Your Experience</h3>
            <ReviewForm productId={productId} onSuccess={handleReviewSubmitted} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

