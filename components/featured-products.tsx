import type { Product } from "@/lib/types"
import ProductCard from "./product-card"

// This would normally fetch from an API
async function getFeaturedProducts(): Promise<Product[]> {
  return [
    {
      id: "1",
      name: "Premium T-Shirt",
      description: "Soft cotton t-shirt with a modern fit",
      price: 29.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "clothing",
    },
    {
      id: "2",
      name: "Designer Jeans",
      description: "Classic blue jeans with a comfortable stretch",
      price: 79.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "clothing",
    },
    {
      id: "3",
      name: "Leather Wallet",
      description: "Handcrafted genuine leather wallet",
      price: 49.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "accessories",
    },
    {
      id: "4",
      name: "Wireless Headphones",
      description: "Premium sound quality with noise cancellation",
      price: 129.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "electronics",
    },
  ]
}

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

