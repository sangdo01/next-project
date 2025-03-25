"use client"
import Image from "next/image"
import Link from "next/link"
import { Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart()
  const shipping = items.length > 0 ? 5.99 : 0
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-16 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/products">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-lg border shadow-sm">
            <div className="p-6">
              <div className="hidden md:grid md:grid-cols-6 text-sm text-muted-foreground mb-4">
                <div className="col-span-3">Product</div>
                <div className="text-center">Price</div>
                <div className="text-center">Quantity</div>
                <div className="text-right">Total</div>
              </div>

              <Separator className="mb-6" />

              {items.map((item) => (
                <div key={item.id} className="mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                    <div className="col-span-3 flex items-center gap-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-md"
                      />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-sm text-muted-foreground flex items-center mt-1 hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="text-center md:text-center">
                      <span className="md:hidden text-sm text-muted-foreground mr-2">Price:</span>$
                      {item.price.toFixed(2)}
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-r-none"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <div className="h-8 w-12 flex items-center justify-center border-y">{item.quantity}</div>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-l-none"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="md:hidden text-sm text-muted-foreground mr-2">Total:</span>$
                      {(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>

                  {items.indexOf(item) < items.length - 1 && <Separator className="my-6" />}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <Link href="/products">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-lg border shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>

              <Separator />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <Input placeholder="Discount code" />
              <Button variant="outline" className="w-full">
                Apply Discount
              </Button>
              <Link href="/checkout">
                <Button className="w-full">Proceed to Checkout</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

