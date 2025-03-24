"use server"

import { revalidatePath } from "next/cache"
import type { Product } from "@/lib/types"

// Mock database - in a real app, this would be replaced with actual database operations
let products: Product[] = [
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
]

export type ProductFormData = Omit<Product, "id"> & { id?: string }

export async function getProducts() {
  // In a real app, this would fetch from a database
  return [...products]
}

export async function getProductById(id: string) {
  // In a real app, this would fetch from a database
  return products.find((product) => product.id === id)
}

export async function createProduct(formData: ProductFormData) {
  try {
    // Validate the form data
    if (!formData.name || !formData.price) {
      return { error: "Name and price are required" }
    }

    // Create a new product with a unique ID
    const newProduct: Product = {
      id: Date.now().toString(), // Simple ID generation
      name: formData.name,
      description: formData.description || "",
      price: Number(formData.price),
      image: formData.image || "/placeholder.svg?height=400&width=400",
      category: formData.category || "other",
    }

    // Add to our mock database
    products.push(newProduct)

    // Revalidate the products page to show the new product
    revalidatePath("/admin/products")
    revalidatePath("/products")

    return { success: true, product: newProduct }
  } catch (error) {
    console.error("Failed to create product:", error)
    return { error: "Failed to create product" }
  }
}

export async function updateProduct(formData: ProductFormData) {
  try {
    // Validate the form data
    if (!formData.id || !formData.name || !formData.price) {
      return { error: "ID, name, and price are required" }
    }

    // Find the product index
    const productIndex = products.findIndex((p) => p.id === formData.id)

    if (productIndex === -1) {
      return { error: "Product not found" }
    }

    // Update the product
    const updatedProduct: Product = {
      id: formData.id,
      name: formData.name,
      description: formData.description || "",
      price: Number(formData.price),
      image: formData.image || products[productIndex].image,
      category: formData.category || products[productIndex].category,
    }

    products[productIndex] = updatedProduct

    // Revalidate the product pages
    revalidatePath("/admin/products")
    revalidatePath(`/admin/products/${formData.id}`)
    revalidatePath("/products")
    revalidatePath(`/products/${formData.id}`)

    return { success: true, product: updatedProduct }
  } catch (error) {
    console.error("Failed to update product:", error)
    return { error: "Failed to update product" }
  }
}

export async function deleteProduct(id: string) {
  try {
    // Find the product
    const productExists = products.some((p) => p.id === id)

    if (!productExists) {
      return { error: "Product not found" }
    }

    // Remove the product
    products = products.filter((p) => p.id !== id)

    // Revalidate the product pages
    revalidatePath("/admin/products")
    revalidatePath("/products")

    return { success: true }
  } catch (error) {
    console.error("Failed to delete product:", error)
    return { error: "Failed to delete product" }
  }
}

