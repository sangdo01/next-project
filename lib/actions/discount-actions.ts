"use server"

import { revalidatePath } from "next/cache"

export interface Discount {
  id: string
  code: string
  type: "percentage" | "fixed"
  value: number
  minPurchase?: number
  maxUses?: number
  usedCount: number
  startDate: string
  endDate?: string
  status: "active" | "expired" | "scheduled" | "disabled"
  products?: string[] // Product IDs this discount applies to (empty means all products)
  categories?: string[] // Category IDs this discount applies to (empty means all categories)
  description?: string
  createdAt: string
}

// Mock database
let discounts: Discount[] = [
  {
    id: "1",
    code: "SUMMER2023",
    type: "percentage",
    value: 20,
    minPurchase: 50,
    maxUses: 1000,
    usedCount: 423,
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    status: "expired",
    description: "Summer sale discount",
    createdAt: "2023-05-15",
  },
  {
    id: "2",
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    usedCount: 892,
    startDate: "2023-01-01",
    status: "active",
    description: "New customer discount",
    createdAt: "2023-01-01",
  },
  {
    id: "3",
    code: "FREESHIP",
    type: "fixed",
    value: 15,
    minPurchase: 75,
    maxUses: 500,
    usedCount: 289,
    startDate: "2023-07-15",
    endDate: "2023-12-31",
    status: "active",
    description: "Free shipping on orders over $75",
    createdAt: "2023-07-01",
  },
  {
    id: "4",
    code: "FLASH50",
    type: "percentage",
    value: 50,
    maxUses: 200,
    usedCount: 200,
    startDate: "2023-09-15",
    endDate: "2023-09-16",
    status: "expired",
    categories: ["electronics"],
    description: "Flash sale on electronics",
    createdAt: "2023-09-10",
  },
  {
    id: "5",
    code: "HOLIDAY25",
    type: "percentage",
    value: 25,
    minPurchase: 100,
    maxUses: 2000,
    usedCount: 0,
    startDate: "2023-12-01",
    endDate: "2023-12-25",
    status: "scheduled",
    description: "Holiday season discount",
    createdAt: "2023-11-01",
  },
]

export async function getDiscounts() {
  // In a real app, this would fetch from a database
  return [...discounts]
}

export async function getDiscountById(id: string) {
  // In a real app, this would fetch from a database
  return discounts.find((discount) => discount.id === id)
}

export async function getDiscountByCode(code: string) {
  // In a real app, this would fetch from a database
  return discounts.find((discount) => discount.code.toLowerCase() === code.toLowerCase())
}

export type DiscountFormData = Omit<Discount, "id" | "usedCount" | "createdAt" | "status"> & {
  id?: string
  status?: "active" | "disabled" | "scheduled"
}

export async function createDiscount(formData: DiscountFormData) {
  try {
    // Validate the form data
    if (!formData.code || !formData.type || formData.value === undefined) {
      return { error: "Code, type, and value are required" }
    }

    // Check if code already exists
    const existingDiscount = await getDiscountByCode(formData.code)
    if (existingDiscount) {
      return { error: "Discount code already exists" }
    }

    // Determine status based on dates
    let status: Discount["status"] = "active"
    const now = new Date()
    const startDate = new Date(formData.startDate)

    if (startDate > now) {
      status = "scheduled"
    } else if (formData.endDate && new Date(formData.endDate) < now) {
      status = "expired"
    } else {
      status = formData.status || "active"
    }

    // Create a new discount
    const newDiscount: Discount = {
      id: Date.now().toString(),
      code: formData.code.toUpperCase(),
      type: formData.type,
      value: formData.value,
      minPurchase: formData.minPurchase,
      maxUses: formData.maxUses,
      usedCount: 0,
      startDate: formData.startDate,
      endDate: formData.endDate,
      status,
      products: formData.products,
      categories: formData.categories,
      description: formData.description,
      createdAt: new Date().toISOString().split("T")[0],
    }

    // Add to our mock database
    discounts.push(newDiscount)

    // Revalidate the discounts page
    revalidatePath("/admin/discounts")

    return { success: true, discount: newDiscount }
  } catch (error) {
    console.error("Failed to create discount:", error)
    return { error: "Failed to create discount" }
  }
}

export async function updateDiscount(formData: DiscountFormData & { id: string }) {
  try {
    // Validate the form data
    if (!formData.id || !formData.code || !formData.type || formData.value === undefined) {
      return { error: "ID, code, type, and value are required" }
    }

    // Find the discount index
    const discountIndex = discounts.findIndex((d) => d.id === formData.id)

    if (discountIndex === -1) {
      return { error: "Discount not found" }
    }

    // Check if code already exists and belongs to another discount
    const existingDiscount = await getDiscountByCode(formData.code)
    if (existingDiscount && existingDiscount.id !== formData.id) {
      return { error: "Discount code already exists" }
    }

    // Determine status based on dates
    let status: Discount["status"] = discounts[discountIndex].status
    const now = new Date()
    const startDate = new Date(formData.startDate)

    if (formData.status) {
      status = formData.status
    } else if (startDate > now) {
      status = "scheduled"
    } else if (formData.endDate && new Date(formData.endDate) < now) {
      status = "expired"
    }

    // Update the discount
    const updatedDiscount: Discount = {
      ...discounts[discountIndex],
      code: formData.code.toUpperCase(),
      type: formData.type,
      value: formData.value,
      minPurchase: formData.minPurchase,
      maxUses: formData.maxUses,
      startDate: formData.startDate,
      endDate: formData.endDate,
      status,
      products: formData.products,
      categories: formData.categories,
      description: formData.description,
    }

    discounts[discountIndex] = updatedDiscount

    // Revalidate the discounts page
    revalidatePath("/admin/discounts")
    revalidatePath(`/admin/discounts/${formData.id}`)

    return { success: true, discount: updatedDiscount }
  } catch (error) {
    console.error("Failed to update discount:", error)
    return { error: "Failed to update discount" }
  }
}

export async function deleteDiscount(id: string) {
  try {
    // Find the discount
    const discountExists = discounts.some((d) => d.id === id)

    if (!discountExists) {
      return { error: "Discount not found" }
    }

    // Remove the discount
    discounts = discounts.filter((d) => d.id !== id)

    // Revalidate the discounts page
    revalidatePath("/admin/discounts")

    return { success: true }
  } catch (error) {
    console.error("Failed to delete discount:", error)
    return { error: "Failed to delete discount" }
  }
}

export async function toggleDiscountStatus(id: string, status: "active" | "disabled") {
  try {
    // Find the discount index
    const discountIndex = discounts.findIndex((d) => d.id === id)

    if (discountIndex === -1) {
      return { error: "Discount not found" }
    }

    // Update the discount status
    discounts[discountIndex].status = status

    // Revalidate the discounts page
    revalidatePath("/admin/discounts")

    return { success: true, discount: discounts[discountIndex] }
  } catch (error) {
    console.error("Failed to update discount status:", error)
    return { error: "Failed to update discount status" }
  }
}

