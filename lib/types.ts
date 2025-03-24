export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface Order {
  id: string
  date: string
  status: "pending" | "processing" | "shipped" | "delivered"
  total: number
  items: CartItem[]
}

export interface User {
  id: string
  name: string
  email: string
  address?: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
}

