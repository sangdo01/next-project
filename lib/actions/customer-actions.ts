"use server"

import { revalidatePath } from "next/cache"

export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  address?: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  orders: number
  totalSpent: number
  lastOrderDate?: string
  status: "Active" | "Inactive"
  notes?: string
  createdAt: string
}

// Mock database
const customers: Customer[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    orders: 12,
    totalSpent: 1249.99,
    lastOrderDate: "2023-03-15",
    status: "Active",
    createdAt: "2022-01-15",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.c@example.com",
    phone: "+1 (555) 987-6543",
    address: {
      street: "456 Oak Ave",
      city: "San Francisco",
      state: "CA",
      zip: "94107",
      country: "United States",
    },
    orders: 5,
    totalSpent: 459.49,
    lastOrderDate: "2023-03-14",
    status: "Active",
    createdAt: "2022-03-22",
  },
]

export async function getCustomers() {
  // In a real app, this would fetch from a database
  return [...customers]
}

export async function getCustomerById(id: string) {
  // In a real app, this would fetch from a database
  return customers.find((customer) => customer.id === id)
}

export async function updateCustomerStatus(id: string, status: "Active" | "Inactive") {
  try {
    // Find the customer index
    const customerIndex = customers.findIndex((c) => c.id === id)

    if (customerIndex === -1) {
      return { error: "Customer not found" }
    }

    // Update the customer status
    customers[customerIndex].status = status

    // Revalidate the customer pages
    revalidatePath("/admin/customers")
    revalidatePath(`/admin/customers/${id}`)

    return { success: true, customer: customers[customerIndex] }
  } catch (error) {
    console.error("Failed to update customer status:", error)
    return { error: "Failed to update customer status" }
  }
}

export async function createCustomer(customerData: Omit<Customer, "id" | "createdAt" | "orders" | "totalSpent">) {
  try {
    // Validate the customer data
    if (!customerData.name || !customerData.email) {
      return { error: "Name and email are required" }
    }

    // Create a new customer
    const newCustomer: Customer = {
      id: Date.now().toString(),
      name: customerData.name,
      email: customerData.email,
      phone: customerData.phone,
      address: customerData.address,
      orders: 0,
      totalSpent: 0,
      status: customerData.status || "Active",
      notes: customerData.notes,
      createdAt: new Date().toISOString().split("T")[0],
    }

    // Add to our mock database
    customers.push(newCustomer)

    // Revalidate the customers page
    revalidatePath("/admin/customers")

    return { success: true, customer: newCustomer }
  } catch (error) {
    console.error("Failed to create customer:", error)
    return { error: "Failed to create customer" }
  }
}

export async function updateCustomer(customerData: Partial<Customer> & { id: string }) {
  try {
    // Find the customer index
    const customerIndex = customers.findIndex((c) => c.id === customerData.id)

    if (customerIndex === -1) {
      return { error: "Customer not found" }
    }

    // Update the customer
    customers[customerIndex] = {
      ...customers[customerIndex],
      ...customerData,
    }

    // Revalidate the customer pages
    revalidatePath("/admin/customers")
    revalidatePath(`/admin/customers/${customerData.id}`)

    return { success: true, customer: customers[customerIndex] }
  } catch (error) {
    console.error("Failed to update customer:", error)
    return { error: "Failed to update customer" }
  }
}

