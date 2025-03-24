"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

// Mock admin users - in a real app, this would come from a database
const ADMIN_USERS = [
  { id: "1", email: "admin@example.com", role: "admin" },
  { id: "2", email: "manager@example.com", role: "manager" },
]

// Define user roles and their permissions
export const ROLES = {
  admin: {
    name: "Administrator",
    permissions: [
      "view_admin",
      "manage_products",
      "manage_orders",
      "manage_customers",
      "manage_discounts",
      "manage_settings",
    ],
  },
  manager: {
    name: "Manager",
    permissions: ["view_admin", "manage_products", "manage_orders", "manage_customers", "manage_discounts"],
  },
  editor: {
    name: "Editor",
    permissions: ["view_admin", "manage_products"],
  },
}

// Mock function to get the current user - in a real app, this would use your authentication system
export function getCurrentUser() {
  // In a real app, this would check the session/auth state
  // For demo purposes, we'll simulate a logged-in admin user
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      return JSON.parse(storedUser)
    }
  }

  return null
}

// Mock login function - in a real app, this would authenticate with your backend
export function loginUser(email: string, password: string) {
  // Find the admin user with the provided email
  const user = ADMIN_USERS.find((user) => user.email === email)

  // In a real app, you would verify the password here
  if (user && password === "password") {
    // Store the user in localStorage for demo purposes
    // In a real app, you would use a proper auth solution like NextAuth.js
    localStorage.setItem("currentUser", JSON.stringify(user))
    return user
  }

  return null
}

// Mock logout function
export function logoutUser() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("currentUser")
  }
}

// Check if the current user has a specific permission
export function hasPermission(permission: string) {
  const currentUser = getCurrentUser()
  if (!currentUser) return false

  const userRole = currentUser.role
  return ROLES[userRole as keyof typeof ROLES]?.permissions.includes(permission) || false
}

// Hook to protect admin routes
export function useAdminProtection() {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if the user has permission to view admin pages
    const authorized = hasPermission("view_admin")
    setIsAuthorized(authorized)

    // If not authorized and trying to access an admin page, redirect to login
    if (!authorized && pathname?.startsWith("/admin")) {
      router.push("/auth/admin-login")
    }
  }, [router, pathname])

  return { isAuthorized }
}

