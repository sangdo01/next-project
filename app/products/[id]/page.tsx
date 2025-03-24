"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { notFound, useParams } from "next/navigation"
import { Heart, ShoppingCart } from "lucide-react"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

// This would normally fetch from an API
async function getProductById(id: string): Promise<Product | undefined> {
  const allProducts: Product[] = [
    {
      id: "1",
      name: "Premium T-Shirt",
      description:
        "Soft cotton t-shirt with a modern fit. Made from 100% organic cotton, this t-shirt is both comfortable and environmentally friendly. Available in multiple colors and sizes.",
      price: 29.99,
      image: "/placeholder.svg?height=600&width=600",
      category: "clothing",
    },
    {
      id: "2",
      name: "Designer Jeans",
      description:
        "Classic blue jeans with a comfortable stretch. These premium denim jeans feature a modern cut with just the right amount of stretch for all-day comfort. Durable construction ensures they'll last for years.",
      price: 79.99,
      image: "/placeholder.svg?height=600&width=600",
      category: "clothing",
    },
    {
      id: "3",
      name: "Leather Wallet",
      description: "Handcrafted genuine leather wallet with multiple card slots and a coin pocket.",
      price: 49.99,
      image: "/placeholder.svg?height=600&width=600",
      category: "accessories",
    },
    {
      id: "4",
      name: "Wireless Headphones",
      description: "Premium sound quality with noise cancellation and long battery life.",
      price: 129.99,
      image: "/placeholder.svg?height=600&width=600",
      category: "electronics",
    },
    {
      id: "5",
      name: "Graphic Hoodie",
      description: "Warm and stylish hoodie with unique design and soft inner lining.",
      price: 59.99,
      image: "/placeholder.svg?height=600&width=600",
      category: "clothing",
    },
    {
      id: "6",
      name: "Smart Watch",
      description: "Track your fitness and stay connected with this feature-packed smart watch.",
      price: 199.99,
      image: "/placeholder.svg?height=600&width=600",
      category: "electronics",
    },
    {
      id: "7",
      name: "Canvas Backpack",
      description: "Durable backpack with multiple compartments for all your essentials.",
      price: 69.99,
      image: "/placeholder.svg?height=600&width=600",
      category: "accessories",
    },
    {
      id: "8",
      name: "Sunglasses",
      description: "UV protection with polarized lenses in a stylish frame.",
      price: 89.99,
      image: "/placeholder.svg?height=600&width=600",
      category: "accessories",
    },
  ]

  return allProducts.find((product) => product.id === id)
}

// This would normally fetch from an API
async function getRelatedProducts(category: string, currentProductId: string): Promise<Product[]> {
  const allProducts: Product[] = [
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
      id: "5",
      name: "Graphic Hoodie",
      description: "Warm and stylish hoodie with unique design",
      price: 59.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "clothing",
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

export default function ProductPage() {
  const params = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const { addItem } = useCart()
  const { toast } = useToast()

  // Fetch product data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProductById(params.id)
        if (!productData) {
          notFound()
        }
        setProduct(productData)

        const related = await getRelatedProducts(productData.category, productData.id)
        setRelatedProducts(related)
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const handleAddToCart = () => {
    if (!product) return

    addItem(product, quantity)

    toast({
      title: "Added to cart",
      description: `${product.name} (${quantity}) has been added to your cart.`,
    })
  }

  if (isLoading || !product) {
    return (
      <div className="container mx-auto py-12 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mx-auto mb-4"></div>
          <div className="h-64 bg-muted rounded mb-4"></div>
          <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="rounded-lg overflow-hidden border">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-bold mb-6">${product.price.toFixed(2)}</p>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Size</h3>
            <div className="flex gap-2">
              {["S", "M", "L", "XL"].map((size) => (
                <Button key={size} variant="outline" className="w-12 h-12">
                  {size}
                </Button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium mb-2">Quantity</h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={decrementQuantity}>
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={incrementQuantity}>
                +
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="group rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="overflow-hidden rounded-t-lg">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="h-[200px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:underline">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

