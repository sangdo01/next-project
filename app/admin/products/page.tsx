"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, ArrowUpDown, MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

// Mock data - would come from API in real app
const products = [
  {
    id: "1",
    name: "Premium T-Shirt",
    description: "Soft cotton t-shirt with a modern fit",
    price: 29.99,
    category: "Clothing",
    inventory: 45,
    status: "Active",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Designer Jeans",
    description: "Classic blue jeans with a comfortable stretch",
    price: 79.99,
    category: "Clothing",
    inventory: 12,
    status: "Active",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Leather Wallet",
    description: "Handcrafted genuine leather wallet",
    price: 49.99,
    category: "Accessories",
    inventory: 28,
    status: "Active",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Wireless Headphones",
    description: "Premium sound quality with noise cancellation",
    price: 129.99,
    category: "Electronics",
    inventory: 18,
    status: "Active",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Graphic Hoodie",
    description: "Warm and stylish hoodie with unique design",
    price: 59.99,
    category: "Clothing",
    inventory: 32,
    status: "Active",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "6",
    name: "Smart Watch",
    description: "Track your fitness and stay connected",
    price: 199.99,
    category: "Electronics",
    inventory: 7,
    status: "Low Stock",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "7",
    name: "Canvas Backpack",
    description: "Durable backpack with multiple compartments",
    price: 69.99,
    category: "Accessories",
    inventory: 22,
    status: "Active",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "8",
    name: "Sunglasses",
    description: "UV protection with polarized lenses",
    price: 89.99,
    category: "Accessories",
    inventory: 0,
    status: "Out of Stock",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "9",
    name: "Running Shoes",
    description: "Lightweight and comfortable athletic shoes",
    price: 119.99,
    category: "Footwear",
    inventory: 15,
    status: "Active",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "10",
    name: "Coffee Mug",
    description: "Ceramic mug with modern design",
    price: 14.99,
    category: "Home Goods",
    inventory: 38,
    status: "Active",
    image: "/placeholder.svg?height=40&width=40",
  },
]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const { toast } = useToast()

  const handleDelete = (productId: string, productName: string) => {
    // In a real app, this would call an API to delete the product
    toast({
      title: "Product deleted",
      description: `${productName} has been removed from your inventory.`,
    })
  }

  // Filter products based on search term, category, and status
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || product.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <Link href="/admin/products/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Clothing">Clothing</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                  <SelectItem value="Footwear">Footwear</SelectItem>
                  <SelectItem value="Home Goods">Home Goods</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Product
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Category</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Price
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Inventory
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No products found. Try adjusting your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-10 h-10 rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-[250px]">{product.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.inventory}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          product.status === "Active"
                            ? "default"
                            : product.status === "Low Stock"
                              ? "warning"
                              : "destructive"
                        }
                      >
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Link href={`/admin/products/${product.id}`}>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                          </Link>
                          <Link href={`/admin/products/${product.id}/edit`}>
                            <DropdownMenuItem>
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem onClick={() => handleDelete(product.id, product.name)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <div className="p-4 border-t">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

