"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, ShoppingBag, Users, Package, Tag, Settings, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import AdminNavbar from "@/components/admin-navbar"
import { useAdminProtection } from "@/lib/auth-utils"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    products: true,
    customers: false,
  })

  // Check if user has admin permissions
  const { isAuthorized } = useAdminProtection()

  // Prevent hydration errors
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  // Show loading state while checking authorization
  if (isAuthorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // If not authorized, don't render the admin layout
  if (isAuthorized === false) {
    return null
  }

  const toggleCollapsible = (key: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + "/")
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
      exact: true,
    },
    {
      title: "Products",
      key: "products",
      icon: <ShoppingBag className="h-5 w-5" />,
      children: [
        { title: "All Products", href: "/admin/products" },
        { title: "Add Product", href: "/admin/products/new" },
        { title: "Categories", href: "/admin/products/categories" },
      ],
    },
    {
      title: "Orders",
      href: "/admin/orders",
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: "Customers",
      key: "customers",
      icon: <Users className="h-5 w-5" />,
      children: [
        { title: "All Customers", href: "/admin/customers" },
        { title: "Customer Groups", href: "/admin/customers/groups" },
      ],
    },
    {
      title: "Discounts",
      href: "/admin/discounts",
      icon: <Tag className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const renderNavItems = (items: typeof navItems, mobile = false) => (
    <ul className={`space-y-2 ${mobile ? "mt-8" : ""}`}>
      {items.map((item, index) => {
        if ("children" in item && item.children) {
          return (
            <li key={index}>
              <Collapsible open={openItems[item.key]} onOpenChange={() => toggleCollapsible(item.key)}>
                <CollapsibleTrigger asChild>
                  <button
                    className={`flex items-center justify-between w-full p-2 rounded-md text-sm ${isActive(item.children[0].href) ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}
                  >
                    <div className="flex items-center">
                      {item.icon}
                      <span className="ml-3">{item.title}</span>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${openItems[item.key] ? "transform rotate-180" : ""}`}
                    />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-10 space-y-1 mt-1">
                  {item.children.map((child, childIndex) => (
                    <Link
                      key={childIndex}
                      href={child.href}
                      className={`block p-2 rounded-md text-sm ${isActive(child.href) ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}
                    >
                      {child.title}
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </li>
          )
        }

        return (
          <li key={index}>
            <Link
              href={item.href}
              className={`flex items-center p-2 rounded-md text-sm ${
                item.exact
                  ? pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                  : isActive(item.href)
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.title}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  )

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Admin Navbar - This replaces the client navbar */}
      <AdminNavbar />

      <div className="flex">
        {/* Mobile Navigation */}
        <div className="lg:hidden sticky top-16 z-30 flex items-center justify-between p-4 bg-background border-b">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex items-center justify-between mb-6">
                <Link href="/admin" className="font-bold text-xl">
                  Admin Menu
                </Link>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </SheetTrigger>
              </div>
              {renderNavItems(navItems, true)}
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 border-r bg-background min-h-screen fixed top-16">
          <div className="p-6">
            <h2 className="font-medium text-lg">Admin Menu</h2>
          </div>
          <nav className="px-4 pb-6">{renderNavItems(navItems)}</nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 min-h-screen pt-16 lg:pt-0">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

