"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

// Define user types
export interface User {
  id: string
  email: string
  role: "admin" | "manager" | "editor" | "customer"
  name?: string
}

// Define the auth context type
interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  adminLogin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isAuthenticated: boolean
  isAdmin: boolean
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock admin users - in a real app, this would come from a database
const ADMIN_USERS: User[] = [
  { id: "1", email: "admin@example.com", role: "admin", name: "Admin User" },
  { id: "2", email: "manager@example.com", role: "manager", name: "Manager User" },
  { id: "3", email: "editor@example.com", role: "editor", name: "Editor User" },
]

// Mock customer users - in a real app, this would come from a database
const CUSTOMER_USERS: User[] = [
  { id: "101", email: "john@example.com", role: "customer", name: "John Doe" },
  { id: "102", email: "sarah@example.com", role: "customer", name: "Sarah Johnson" },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      setIsLoading(true)

      // Check localStorage for user data
      const storedUser = localStorage.getItem("currentUser")
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (error) {
          console.error("Failed to parse user from localStorage:", error)
          localStorage.removeItem("currentUser")
        }
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [])

  // Redirect if accessing admin pages without admin privileges
  useEffect(() => {
    if (!isLoading && pathname?.startsWith("/admin")) {
      const isAdminUser = user && ["admin", "manager", "editor"].includes(user.role)

      if (!isAdminUser) {
        router.push("/auth/admin-login")
      }
    }
  }, [isLoading, user, pathname, router])

  // Regular customer login
  const login = async (email: string, password: string) => {
    // In a real app, this would call an API endpoint
    const user = CUSTOMER_USERS.find((u) => u.email === email)

    if (user && password === "password") {
      // Simple password check for demo
      setUser(user)
      localStorage.setItem("currentUser", JSON.stringify(user))
      return { success: true }
    }

    return { success: false, error: "Invalid email or password" }
  }

  // Admin login
  const adminLogin = async (email: string, password: string) => {
    // In a real app, this would call an API endpoint with proper security
    const adminUser = ADMIN_USERS.find((u) => u.email === email)

    if (adminUser && password === "password") {
      // Simple password check for demo
      setUser(adminUser)
      localStorage.setItem("currentUser", JSON.stringify(adminUser))
      return { success: true }
    }

    return { success: false, error: "Invalid admin credentials" }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("currentUser")

    // Redirect based on current path
    if (pathname?.startsWith("/admin")) {
      router.push("/auth/admin-login")
    } else {
      router.push("/auth/login")
    }
  }

  const isAuthenticated = !!user
  const isAdmin = user ? ["admin", "manager", "editor"].includes(user.role) : false

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        adminLogin,
        logout,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  console.log('context', context);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

