"use client"

import { useState } from "react"
import { Search, ArrowUpDown, MoreHorizontal, Eye, Mail, UserX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
const customers = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    orders: 12,
    spent: 1249.99,
    lastOrder: "2023-03-15",
    status: "Active",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.c@example.com",
    orders: 5,
    spent: 459.49,
    lastOrder: "2023-03-14",
    status: "Active",
  },
  {
    id: "3",
    name: "Emma Davis",
    email: "emma.d@example.com",
    orders: 8,
    spent: 789.99,
    lastOrder: "2023-03-14",
    status: "Active",
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james.w@example.com",
    orders: 15,
    spent: 1649.95,
    lastOrder: "2023-03-13",
    status: "Active",
  },
  {
    id: "5",
    name: "Olivia Smith",
    email: "olivia.s@example.com",
    orders: 3,
    spent: 234.99,
    lastOrder: "2023-03-12",
    status: "Active",
  },
  {
    id: "6",
    name: "Noah Brown",
    email: "noah.b@example.com",
    orders: 7,
    spent: 899.99,
    lastOrder: "2023-03-11",
    status: "Inactive",
  },
  {
    id: "7",
    name: "Sophia Martinez",
    email: "sophia.m@example.com",
    orders: 9,
    spent: 879.98,
    lastOrder: "2023-03-10",
    status: "Active",
  },
  {
    id: "8",
    name: "Liam Taylor",
    email: "liam.t@example.com",
    orders: 2,
    spent: 145.5,
    lastOrder: "2023-03-09",
    status: "Inactive",
  },
  {
    id: "9",
    name: "Ava Anderson",
    email: "ava.a@example.com",
    orders: 11,
    spent: 1124.75,
    lastOrder: "2023-03-08",
    status: "Active",
  },
  {
    id: "10",
    name: "William Thomas",
    email: "william.t@example.com",
    orders: 6,
    spent: 567.25,
    lastOrder: "2023-03-07",
    status: "Active",
  },
]

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const handleEmailCustomer = (customerName: string, customerEmail: string) => {
    // In a real app, this would open an email compose modal or redirect to email service
    toast({
      title: "Email customer",
      description: `Preparing to email ${customerName} at ${customerEmail}`,
    })
  }

  const handleDeactivateCustomer = (customerId: string, customerName: string) => {
    // In a real app, this would call an API to deactivate the customer
    toast({
      title: "Customer deactivated",
      description: `${customerName}'s account has been deactivated.`,
    })
  }

  // Filter customers based on search term
  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <Button>Add Customer</Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search customers by name or email..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
                    Customer
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Email</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Orders
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Total Spent
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No customers found. Try adjusting your search.
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.orders}</TableCell>
                    <TableCell>${customer.spent.toFixed(2)}</TableCell>
                    <TableCell>{new Date(customer.lastOrder).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={customer.status === "Active" ? "default" : "secondary"}>{customer.status}</Badge>
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
                          <DropdownMenuItem onClick={() => handleEmailCustomer(customer.name, customer.email)}>
                            <Mail className="h-4 w-4 mr-2" />
                            Email Customer
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeactivateCustomer(customer.id, customer.name)}>
                            <UserX className="h-4 w-4 mr-2" />
                            Deactivate Account
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

