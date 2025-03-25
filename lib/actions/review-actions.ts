"use server"

import { revalidatePath } from "next/cache"
import type { Review } from "@/lib/types"

// Mock database for reviews
let reviews: Review[] = [
  {
    id: "1",
    productId: "1",
    rating: 5,
    title: "Excellent quality",
    comment:
      "This t-shirt is incredibly comfortable and fits perfectly. The material is soft and breathable. Highly recommend!",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    date: "2023-04-15",
    verified: true,
  },
  {
    id: "2",
    productId: "1",
    rating: 4,
    title: "Great shirt, runs a bit small",
    comment:
      "I love the quality and design of this shirt, but it does run a bit smaller than expected. Consider sizing up if you're between sizes.",
    name: "Michael Chen",
    email: "michael.c@example.com",
    date: "2023-03-22",
    verified: true,
  },
  {
    id: "3",
    productId: "2",
    rating: 5,
    title: "Perfect fit and style",
    comment:
      "These jeans are amazing! The stretch is comfortable while still maintaining the classic denim look. Will definitely buy more colors.",
    name: "Emma Davis",
    email: "emma.d@example.com",
    date: "2023-04-02",
    verified: true,
  },
  {
    id: "4",
    productId: "3",
    rating: 4.5,
    title: "Beautiful craftsmanship",
    comment:
      "This wallet is beautifully made with high-quality leather. The stitching is perfect and it has just the right amount of card slots.",
    name: "James Wilson",
    email: "james.w@example.com",
    date: "2023-03-18",
    verified: true,
  },
]

// Get reviews for a specific product
export async function getProductReviews(productId: string) {
  try {
    // In a real app, this would fetch from a database
    const productReviews = reviews.filter((review) => review.productId === productId)

    // Calculate average rating
    const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = productReviews.length > 0 ? totalRating / productReviews.length : 0

    return {
      reviews: productReviews,
      averageRating,
    }
  } catch (error) {
    console.error("Failed to get product reviews:", error)
    return { error: "Failed to get product reviews" }
  }
}

// Get average rating for a product
export async function getProductRating(productId: string) {
  try {
    const productReviews = reviews.filter((review) => review.productId === productId)
    const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = productReviews.length > 0 ? totalRating / productReviews.length : 0

    return {
      averageRating,
      totalReviews: productReviews.length,
    }
  } catch (error) {
    console.error("Failed to get product rating:", error)
    return { error: "Failed to get product rating" }
  }
}

// Submit a new review
export async function submitReview(reviewData: {
  productId: string
  rating: number
  title: string
  comment: string
  name: string
  email: string
}) {
  try {
    // Validate the review data
    if (!reviewData.productId || !reviewData.rating || !reviewData.title || !reviewData.comment) {
      return { error: "Missing required fields" }
    }

    // Create a new review
    const newReview: Review = {
      id: Date.now().toString(),
      productId: reviewData.productId,
      rating: reviewData.rating,
      title: reviewData.title,
      comment: reviewData.comment,
      name: reviewData.name,
      email: reviewData.email,
      date: new Date().toISOString().split("T")[0],
      verified: false, // New reviews are not verified by default
    }

    // Add to our mock database
    reviews.push(newReview)

    // Revalidate the product page to show the new review
    revalidatePath(`/products/${reviewData.productId}`)

    return { success: true, review: newReview }
  } catch (error) {
    console.error("Failed to submit review:", error)
    return { error: "Failed to submit review" }
  }
}

// Get all reviews (admin function)
export async function getAllReviews() {
  try {
    // In a real app, this would fetch from a database with pagination
    return { reviews }
  } catch (error) {
    console.error("Failed to get all reviews:", error)
    return { error: "Failed to get all reviews" }
  }
}

// Delete a review (admin function)
export async function deleteReview(reviewId: string) {
  try {
    const reviewToDelete = reviews.find((review) => review.id === reviewId)

    if (!reviewToDelete) {
      return { error: "Review not found" }
    }

    // Remove from our mock database
    reviews = reviews.filter((review) => review.id !== reviewId)

    // Revalidate the product page
    revalidatePath(`/products/${reviewToDelete.productId}`)

    return { success: true }
  } catch (error) {
    console.error("Failed to delete review:", error)
    return { error: "Failed to delete review" }
  }
}

