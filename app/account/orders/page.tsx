import Link from "next/link"
import type { Order } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// This would normally fetch from an API
async function getOrders(): Promise<Order[]> {
  return [
    {
      id: "ORD-123456",
      date: "2023-03-15",
      status: "delivered",
      total: 109.97,
      items: [
        {
          id: "1",
          name: "Premium T-Shirt",
          price: 29.99,
          quantity: 2,
          image: "/placeholder.svg?height=100&width=100",
        },
        {
          id: "3",
          name: "Leather Wallet",
          price: 49.99,
          quantity: 1,
          image: "/placeholder.svg?height=100&width=100",
        },
      ],
    },
    {
      id: "ORD-789012",
      date: "2023-02-28",
      status: "shipped",
      total: 199.99,
      items: [
        {
          id: "6",
          name: "Smart Watch",
          price: 199.99,
          quantity: 1,
          image: "/placeholder.svg?height=100&width=100",
        },
      ],
    },
    {
      id: "ORD-345678",
      date: "2023-01-10",
      status: "delivered",
      total: 159.98,
      items: [
        {
          id: "2",
          name: "Designer Jeans",
          price: 79.99,
          quantity: 2,
          image: "/placeholder.svg?height=100&width=100",
        },
      ],
    },
  ]
}

export default async function OrdersPage() {
  const orders = await getOrders()

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Order #{order.id}</CardTitle>
                <CardDescription>Placed on {new Date(order.date).toLocaleDateString()}</CardDescription>
              </div>
              <Badge className="capitalize">{order.status}</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-muted rounded-md overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">${item.price.toFixed(2)}</p>
                  </div>
                ))}

                <div className="pt-4 border-t">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Link href={`/account/orders/${order.id}`}>
                    <Button variant="outline">View Details</Button>
                  </Link>
                  <Button>Track Order</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

