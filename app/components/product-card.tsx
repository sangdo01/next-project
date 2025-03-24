"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function ProductCard({ product }: { product: Product }) {
  const { toast } = useToast()

  const addToCart = () => {
    // In a real app, this would dispatch to a cart state manager
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="group rounded-lg border bg-card text-card-foreground shadow-sm">
      <Link href={`/products/${product.id}`} className="block overflow-hidden rounded-t-lg">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={400}
          height={400}
          className="h-[200px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:underline">{product.name}</h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <Button size="sm" onClick={addToCart}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

