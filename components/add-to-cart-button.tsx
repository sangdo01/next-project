"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/lib/cart-context"

export default function AddToCartButton({ product, quantity = 1 }: { product: Product; quantity?: number }) {
  const { toast } = useToast()
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)

    // Add item to cart
    addItem(product, quantity)

    // Show toast notification
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })

    setTimeout(() => {
      setIsAdding(false)
    }, 500)
  }

  return (
    <Button onClick={handleAddToCart} className="flex-1" disabled={isAdding}>
      <ShoppingCart className="h-5 w-5 mr-2" />
      {isAdding ? "Adding..." : "Add to Cart"}
    </Button>
  )
}

