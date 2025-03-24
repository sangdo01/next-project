"use server"

import { revalidatePath } from "next/cache"

// Define order types
export type OrderStatus = "Processing" | "Shipped" | "Completed" | "Cancelled" | "Refunded"

export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  customer: {
    id: string
    name: string
    email: string
  }
  items: OrderItem[]
  total: number
  status: OrderStatus
  date: string
  shippingAddress: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  paymentMethod: string
  notes?: string
}

// Mock database
const orders: Order[] = [
  {
    id: "ORD-7352",
    customer: {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
    },
    items: [
      {
        productId: "1",
        name: "Premium T-Shirt",
        price: 29.99,
        quantity: 2,
      },
      {
        productId: "3",
        name: "Leather Wallet",
        price: 49.99,
        quantity: 1,
      },
    ],
    total: 109.97,
    status: "Completed",
    date: "2023-03-15",
    shippingAddress: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-7351",
    customer: {
      id: "2",
      name: "Michael Chen",
      email: "michael.c@example.com",
    },
    items: [
      {
        productId: "2",
        name: "Designer Jeans",
        price: 79.99,
        quantity: 1,
      },
    ],
    total: 79.99,
    status: "Processing",
    date: "2023-03-14",
    shippingAddress: {
      street: "456 Oak Ave",
      city: "San Francisco",
      state: "CA",
      zip: "94107",
      country: "United States",
    },
    paymentMethod: "PayPal",
  },
]

export async function getOrders() {
  // In a real app, this would fetch from a database
  return [...orders]
}

export async function getOrderById(id: string) {
  // In a real app, this would fetch from a database
  return orders.find((order) => order.id === id)
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  try {
    // Find the order index
    const orderIndex = orders.findIndex((o) => o.id === id)

    if (orderIndex === -1) {
      return { error: "Order not found" }
    }

    // Update the order status
    orders[orderIndex].status = status

    // Revalidate the order pages
    revalidatePath("/admin/orders")
    revalidatePath(`/admin/orders/${id}`)

    return { success: true, order: orders[orderIndex] }
  } catch (error) {
    console.error("Failed to update order status:", error)
    return { error: "Failed to update order status" }
  }
}

export async function createOrder(orderData: Omit<Order, "id" | "date">) {
  try {
    // Validate the order data
    if (!orderData.customer || !orderData.items || orderData.items.length === 0) {
      return { error: "Customer and items are required" }
    }

    // Create a new order
    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: orderData.customer,
      items: orderData.items,
      total: orderData.total,
      status: orderData.status || "Processing",
      date: new Date().toISOString().split("T")[0],
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      notes: orderData.notes,
    }

    // Add to our mock database
    orders.push(newOrder)

    // Revalidate the orders page
    revalidatePath("/admin/orders")

    return { success: true, order: newOrder }
  } catch (error) {
    console.error("Failed to create order:", error)
    return { error: "Failed to create order" }
  }
}

