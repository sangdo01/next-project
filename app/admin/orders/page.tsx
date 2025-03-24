"use client"

import { useState } from "react"
import { Search, ArrowUpDown, MoreHorizontal, Eye, FileText, Truck } from "lucide-react"
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
const orders = [
  {
    id: "ORD-7352",
    customer: "Sarah Johnson",
    email: "sarah.j@example.com",
    date: "2023-03-15",
    total: 129.99,
    status: "Completed",
    items: 3,
  },
  {
    id: "ORD-7351",
    customer: "Michael Chen",
    email: "michael.c@example.com",
    date: "2023-03-14",
    total: 59.49,
    status: "Processing",
    items: 1,
  },
  {
    id: "ORD-7350",
    customer: "Emma Davis",
    email: "emma.d@example.com",
    date: "2023-03-14",
    total: 89.99,
    status: "Shipped",
    items: 2,
  },
  {
    id: "ORD-7349",
    customer: "James Wilson",
    email: "james.w@example.com",
    date: "2023-03-13",
    total: 149.95,
    status: "Completed",
    items: 4,
  },
  {
    id: "ORD-7348",
    customer: "Olivia Smith",
    email: "olivia.s@example.com",
    date: "2023-03-12",
    total: 34.99,
    status: "Processing",
    items: 1,
  },
  {
    id: "ORD-7347",
    customer: "Noah Brown",
    email: "noah.b@example.com",
    date: "2023-03-11",
    total: 199.99,
    status: "Shipped",
    items: 1,
  },
  {
    id: "ORD-7346",
    customer: "Sophia Martinez",
    email: "sophia.m@example.com",
    date: "2023-03-10",
    total: 79.98,
    status: "Completed",
    items: 2,
  },
  {
    id: "ORD-7345",
    customer: "Liam Taylor",
    email: "liam.t@example.com",
    date: "2023-03-09",
    total: 45.5,
    status: "Cancelled",
    items: 1,
  },
  {
    id: "ORD-7344",
    customer: "Ava Anderson",
    email: "ava.a@example.com",
    date: "2023-03-08",
    total: 124.75,
    status: "Completed",
    items: 3,
  },
  {
    id: "ORD-7343",
    customer: "William Thomas",
    email: "william.t@example.com",
    date: "2023-03-07",
    total: 67.25,
    status: "Refunded",
    items: 2,
  },
]

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const { toast } = useToast()

  const handleUpdateStatus = (orderId: string, status: string) => {
    // In a real app, this would call an API to update the order status
    toast({
      title: "Order status updated",
      description: `Order ${orderId} has been marked as ${status}.`,
    })
  }

  // Filter orders based on search term and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <Button variant="outline" className="gap-2">
          <FileText className="h-4 w-4" />
          Export
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by order ID, customer name, or email..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                  <SelectItem value="Refunded">Refunded</SelectItem>
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
                <TableHead>
                  <div className="flex items-center gap-1">
                    Order ID
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Date
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Items</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Total
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No orders found. Try adjusting your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <p>{order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === "Completed"
                            ? "default"
                            : order.status === "Processing"
                              ? "outline"
                              : order.status === "Shipped"
                                ? "secondary"
                                : order.status === "Cancelled"
                                  ? "destructive"
                                  : "warning"
                        }
                      >
                        {order.status}
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
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "Shipped")}>
                            <Truck className="h-4 w-4 mr-2" />
                            Mark as Shipped
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "Completed")}>
                            <FileText className="h-4 w-4 mr-2" />
                            Mark as Completed
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

