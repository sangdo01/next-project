import type { Product } from "@/lib/types"
import ProductCard from "./product-card"

// This would normally fetch from an API
async function getRelatedProducts(category: string, currentProductId: string): Promise<Product[]> {
  // Mock data - in a real app, this would be an API call
  const allProducts: Product[] = [
    {
      id: "2",
      name: "Designer Jeans",
      description: "Classic blue jeans with a comfortable stretch",
      price: 79.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "clothing",
    },
    {
      id: "5",
      name: "Graphic Hoodie",
      description: "Warm and stylish hoodie with unique design",
      price: 59.99,
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
      id: "8",
      name: "Sunglasses",
      description: "UV protection with polarized lenses",
      price: 89.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "accessories",
    },
  ]

  return allProducts.filter((product) => product.category === category && product.id !== currentProductId).slice(0, 4)
}

export default async function RelatedProducts({
  category,
  currentProductId,
}: {
  category: string
  currentProductId: string
}) {
  const products = await getRelatedProducts(category, currentProductId)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

