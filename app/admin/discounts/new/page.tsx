"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { createDiscount } from "@/lib/actions/discount-actions"
import type { DiscountFormData } from "@/lib/actions/discount-actions"

export default function NewDiscountPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage")
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)

      // Prepare the discount data
      const discountData: DiscountFormData = {
        code: formData.get("code") as string,
        type: discountType,
        value: Number.parseFloat(formData.get("value") as string),
        minPurchase: formData.get("minPurchase") ? Number.parseFloat(formData.get("minPurchase") as string) : undefined,
        maxUses: formData.get("maxUses") ? Number.parseInt(formData.get("maxUses") as string, 10) : undefined,
        startDate: startDate ? format(startDate, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
        endDate: endDate ? format(endDate, "yyyy-MM-dd") : undefined,
        description: formData.get("description") as string,
        products: [],
        categories: [],
      }

      // Call the server action to create the discount
      const result = await createDiscount(discountData)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Discount created",
          description: `Discount code ${discountData.code} has been created.`,
        })
        router.push("/admin/discounts")
      }
    } catch (error) {
      console.error("Error creating discount:", error)
      toast({
        title: "Error",
        description: "Failed to create discount. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Create Discount</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Discount Information</CardTitle>
                <CardDescription>Enter the basic information about your discount code.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Discount Code</Label>
                  <Input id="code" name="code" placeholder="e.g., SUMMER2023" className="uppercase" required />
                  <p className="text-xs text-muted-foreground">Customers will enter this code at checkout.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" placeholder="e.g., Summer sale discount" rows={3} />
                  <p className="text-xs text-muted-foreground">Internal description for your reference.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Discount Type</Label>
                    <Select
                      value={discountType}
                      onValueChange={(value) => setDiscountType(value as "percentage" | "fixed")}
                    >
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="value">{discountType === "percentage" ? "Percentage (%)" : "Amount ($)"}</Label>
                    <Input
                      id="value"
                      name="value"
                      type="number"
                      step={discountType === "percentage" ? "1" : "0.01"}
                      min="0"
                      max={discountType === "percentage" ? "100" : undefined}
                      placeholder={discountType === "percentage" ? "10" : "10.00"}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Validity Period</CardTitle>
                <CardDescription>Set when this discount code can be used.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !startDate && "text-muted-foreground",
                          )}
                        >
                          {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !endDate && "text-muted-foreground",
                          )}
                        >
                          {endDate ? format(endDate, "PPP") : <span>No end date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                          disabled={(date) => (startDate ? date < startDate : false)}
                        />
                      </PopoverContent>
                    </Popover>
                    <p className="text-xs text-muted-foreground">Leave empty for a discount with no expiration date.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Usage Limits</CardTitle>
                <CardDescription>Set optional limits for this discount code.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="minPurchase">Minimum Purchase Amount ($)</Label>
                  <Input id="minPurchase" name="minPurchase" type="number" step="0.01" min="0" placeholder="0.00" />
                  <p className="text-xs text-muted-foreground">Minimum order subtotal required to use this discount.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxUses">Maximum Uses</Label>
                  <Input id="maxUses" name="maxUses" type="number" min="1" placeholder="Unlimited" />
                  <p className="text-xs text-muted-foreground">Maximum number of times this discount can be used.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Discount Scope</CardTitle>
                <CardDescription>Choose which products or categories this discount applies to.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Applies To</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select scope" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Products</SelectItem>
                        <SelectItem value="specific_products">Specific Products</SelectItem>
                        <SelectItem value="specific_categories">Specific Categories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Product and category selection will be available in a future update.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Discount"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}

