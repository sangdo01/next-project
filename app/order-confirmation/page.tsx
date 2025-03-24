import Link from "next/link"
import { CheckCircle, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function OrderConfirmationPage() {
  // In a real app, this would fetch the order details from an API
  const orderNumber = "ORD-" + Math.floor(100000 + Math.random() * 900000)

  return (
    <div className="container mx-auto py-12 max-w-3xl">
      <div className="text-center mb-8">
        <CheckCircle className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-3xl font-bold mb-2">Thank You for Your Order!</h1>
        <p className="text-muted-foreground">Your order has been received and is being processed.</p>
      </div>

      <div className="rounded-lg border shadow-sm p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Order Details</h2>
          <span className="text-muted-foreground">Order #{orderNumber}</span>
        </div>

        <Separator className="mb-4" />

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Order Date</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment Method</span>
            <span>Credit Card ending in 3456</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping Address</span>
            <div className="text-right">
              <p>John Doe</p>
              <p>123 Main St</p>
              <p>New York, NY 10001</p>
              <p>United States</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Premium T-Shirt (2)</span>
            <span>$59.98</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Leather Wallet (1)</span>
            <span>$49.99</span>
          </div>

          <Separator />

          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>$109.97</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>$5.99</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span>$10.99</span>
          </div>

          <Separator />

          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>$126.95</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border shadow-sm p-6 mb-8 bg-muted/20">
        <div className="flex items-start gap-4">
          <Package className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold mb-2">What's Next?</h3>
            <p className="text-muted-foreground mb-2">
              You will receive an email confirmation shortly at john.doe@example.com with your order details.
            </p>
            <p className="text-muted-foreground">
              We'll notify you when your order ships. You can also check your order status anytime in your account.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Link href="/">
          <Button variant="outline">Continue Shopping</Button>
        </Link>
        <Link href="/account/orders">
          <Button>View My Orders</Button>
        </Link>
      </div>
    </div>
  )
}

