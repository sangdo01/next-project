import type { Product } from "@/lib/types"
import ProductCard from "../components/product-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// This would normally fetch from an API
async function getAllProducts(): Promise<Product[]> {
  // Combine both featured and new arrivals for the products page
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
    {
      id: "5",
      name: "Graphic Hoodie",
      description: "Warm and stylish hoodie with unique design",
      price: 59.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "clothing",
    },
    {
      id: "6",
      name: "Smart Watch",
      description: "Track your fitness and stay connected",
      price: 199.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "electronics",
    },
    {
      id: "7",
      name: "Canvas Backpack",
      description: "Durable backpack with multiple compartments",
      price: 69.99,
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
}

export default async function ProductsPage() {
  const products = await getAllProducts()

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="w-full md:w-1/3">
          <Input type="search" placeholder="Search products..." className="w-full" />
        </div>
        <div className="w-full md:w-1/3">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-1/3">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

