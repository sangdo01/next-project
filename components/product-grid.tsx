import type { Product } from "@/lib/types"
import ProductCard from "./product-card"

// This would normally fetch from an API based on category
async function getProductsByCategory(category: string): Promise<Product[]> {
  // Mock data - in a real app, this would be an API call
  const allProducts: Product[] = [
    {
      id: "5",
      name: "Graphic Hoodie",
      description: "Warm and stylish hoodie with unique design",
      price: 59.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "new-arrivals",
    },
    {
      id: "6",
      name: "Smart Watch",
      description: "Track your fitness and stay connected",
      price: 199.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "new-arrivals",
    },
    {
      id: "7",
      name: "Canvas Backpack",
      description: "Durable backpack with multiple compartments",
      price: 69.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "new-arrivals",
    },
    {
      id: "8",
      name: "Sunglasses",
      description: "UV protection with polarized lenses",
      price: 89.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "new-arrivals",
    },
  ]

  return allProducts.filter((product) => product.category === category)
}

export default async function ProductGrid({ category }: { category: string }) {
  const products = await getProductsByCategory(category)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

