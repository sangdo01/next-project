"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Search, ArrowUpDown, MoreHorizontal, Pencil, Trash2, Eye, Power, PowerOff } from "lucide-react"
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
import { getDiscounts, deleteDiscount, toggleDiscountStatus } from "@/lib/actions/discount-actions"
import type { Discount } from "@/lib/actions/discount-actions"

export default function DiscountsPage() {
  const [discounts, setDiscounts] = useState<Discount[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const loadDiscounts = async () => {
      try {
        const discountsData = await getDiscounts()
        setDiscounts(discountsData)
      } catch (error) {
        console.error("Failed to load discounts:", error)
        toast({
          title: "Error",
          description: "Failed to load discounts. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadDiscounts()
  }, [toast])

  const handleDelete = async (discountId: string, discountCode: string) => {
    try {
      const result = await deleteDiscount(discountId)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        // Update local state to remove the discount
        setDiscounts(discounts.filter((discount) => discount.id !== discountId))

        toast({
          title: "Discount deleted",
          description: `Discount code ${discountCode} has been deleted.`,
        })
      }
    } catch (error) {
      console.error("Failed to delete discount:", error)
      toast({
        title: "Error",
        description: "Failed to delete discount. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleToggleStatus = async (discountId: string, currentStatus: string, discountCode: string) => {
    try {
      const newStatus = currentStatus === "active" ? "disabled" : "active"
      const result = await toggleDiscountStatus(discountId, newStatus as "active" | "disabled")

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        // Update local state
        setDiscounts(
          discounts.map((discount) =>
            discount.id === discountId ? { ...discount, status: newStatus as any } : discount,
          ),
        )

        toast({
          title: `Discount ${newStatus === "active" ? "activated" : "disabled"}`,
          description: `Discount code ${discountCode} has been ${newStatus === "active" ? "activated" : "disabled"}.`,
        })
      }
    } catch (error) {
      console.error("Failed to update discount status:", error)
      toast({
        title: "Error",
        description: "Failed to update discount status. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Filter discounts based on search term, type, and status
  const filteredDiscounts = discounts.filter((discount) => {
    const matchesSearch =
      discount.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (discount.description && discount.description.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = selectedType === "all" || discount.type === selectedType
    const matchesStatus = selectedStatus === "all" || discount.status === selectedStatus

    return matchesSearch && matchesType && matchesStatus
  })

  // Format discount value for display
  const formatDiscountValue = (discount: Discount) => {
    return discount.type === "percentage" ? `${discount.value}%` : `$${discount.value.toFixed(2)}`
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Discounts</h1>
        <Link href="/admin/discounts/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Discount
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
                  placeholder="Search by code or description..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="percentage">Percentage</SelectItem>
                  <SelectItem value="fixed">Fixed Amount</SelectItem>
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="disabled">Disabled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">Loading discounts...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Code
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Usage
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Valid Period
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDiscounts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No discounts found. Try adjusting your filters or create a new discount.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDiscounts.map((discount) => (
                    <TableRow key={discount.id}>
                      <TableCell className="font-medium">
                        <div>
                          <p className="font-mono">{discount.code}</p>
                          {discount.description && (
                            <p className="text-xs text-muted-foreground mt-1">{discount.description}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {discount.type === "percentage" ? "Percentage" : "Fixed Amount"}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDiscountValue(discount)}</TableCell>
                      <TableCell>
                        <div>
                          <p>{discount.usedCount} used</p>
                          {discount.maxUses && (
                            <p className="text-xs text-muted-foreground">
                              {Math.max(0, discount.maxUses - discount.usedCount)} remaining
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>From: {new Date(discount.startDate).toLocaleDateString()}</p>
                          {discount.endDate && (
                            <p className="text-xs text-muted-foreground">
                              To: {new Date(discount.endDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            discount.status === "active"
                              ? "default"
                              : discount.status === "scheduled"
                                ? "secondary"
                                : discount.status === "expired"
                                  ? "destructive"
                                  : "outline"
                          }
                        >
                          {discount.status.charAt(0).toUpperCase() + discount.status.slice(1)}
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
                            <Link href={`/admin/discounts/${discount.id}`}>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                            </Link>
                            <Link href={`/admin/discounts/${discount.id}/edit`}>
                              <DropdownMenuItem>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                            </Link>
                            {(discount.status === "active" || discount.status === "scheduled") && (
                              <DropdownMenuItem
                                onClick={() => handleToggleStatus(discount.id, discount.status, discount.code)}
                              >
                                <PowerOff className="h-4 w-4 mr-2" />
                                Disable
                              </DropdownMenuItem>
                            )}
                            {discount.status === "disabled" && (
                              <DropdownMenuItem
                                onClick={() => handleToggleStatus(discount.id, discount.status, discount.code)}
                              >
                                <Power className="h-4 w-4 mr-2" />
                                Activate
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => handleDelete(discount.id, discount.code)}>
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
          )}
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

