"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSaveSettings = () => {
    setIsSubmitting(true)

    // In a real app, this would call an API to save the settings
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Settings saved",
        description: "Your store settings have been updated successfully.",
      })
    }, 1500)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>

      <Tabs defaultValue="general">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-64 flex-shrink-0">
            <TabsList className="flex flex-col h-auto w-full bg-transparent p-0 space-y-1">
              <TabsTrigger value="general" className="justify-start px-4 py-2 h-auto data-[state=active]:bg-muted">
                General
              </TabsTrigger>
              <TabsTrigger value="shipping" className="justify-start px-4 py-2 h-auto data-[state=active]:bg-muted">
                Shipping & Delivery
              </TabsTrigger>
              <TabsTrigger value="payment" className="justify-start px-4 py-2 h-auto data-[state=active]:bg-muted">
                Payment Methods
              </TabsTrigger>
              <TabsTrigger value="tax" className="justify-start px-4 py-2 h-auto data-[state=active]:bg-muted">
                Tax Settings
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="justify-start px-4 py-2 h-auto data-[state=active]:bg-muted"
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger value="users" className="justify-start px-4 py-2 h-auto data-[state=active]:bg-muted">
                Users & Permissions
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1">
            <TabsContent value="general" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Store Information</CardTitle>
                  <CardDescription>Update your store details and contact information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="store-name">Store Name</Label>
                    <Input id="store-name" defaultValue="E-Store" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-email">Contact Email</Label>
                    <Input id="store-email" type="email" defaultValue="support@estore.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-phone">Contact Phone</Label>
                    <Input id="store-phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-address">Store Address</Label>
                    <Textarea
                      id="store-address"
                      defaultValue="123 Commerce Street, Suite 500, New York, NY 10001, United States"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-currency">Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger id="store-currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="cad">CAD (C$)</SelectItem>
                        <SelectItem value="aud">AUD (A$)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <Button onClick={handleSaveSettings} disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="shipping" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Methods</CardTitle>
                  <CardDescription>Configure shipping options for your store.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Standard Shipping</h3>
                        <p className="text-sm text-muted-foreground">3-5 business days</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Input type="number" defaultValue="5.99" className="w-24" min="0" step="0.01" />
                        <Switch defaultChecked />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Express Shipping</h3>
                        <p className="text-sm text-muted-foreground">1-2 business days</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Input type="number" defaultValue="14.99" className="w-24" min="0" step="0.01" />
                        <Switch defaultChecked />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Free Shipping</h3>
                        <p className="text-sm text-muted-foreground">For orders over a certain amount</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Input type="number" defaultValue="50" className="w-24" min="0" step="0.01" />
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shipping-countries">Shipping Countries</Label>
                    <Select defaultValue="worldwide">
                      <SelectTrigger id="shipping-countries">
                        <SelectValue placeholder="Select countries" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="worldwide">Worldwide</SelectItem>
                        <SelectItem value="domestic">Domestic Only</SelectItem>
                        <SelectItem value="custom">Custom Selection</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <Button onClick={handleSaveSettings} disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="payment" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Configure payment options for your store.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-6 bg-muted rounded flex items-center justify-center">
                          <svg
                            viewBox="0 0 24 24"
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <rect x="1" y="4" width="22" height="16" rx="2" />
                            <line x1="1" y1="10" x2="23" y2="10" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">Credit/Debit Cards</h3>
                          <p className="text-sm text-muted-foreground">Visa, Mastercard, Amex</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-6 bg-muted rounded flex items-center justify-center">
                          <svg
                            viewBox="0 0 24 24"
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z" />
                            <path d="M15.5 9.5c-.8-1-2-1.5-3.5-1.5-2.8 0-5 2.2-5 5s2.2 5 5 5c1.5 0 2.7-.5 3.5-1.5" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">PayPal</h3>
                          <p className="text-sm text-muted-foreground">Express checkout</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-6 bg-muted rounded flex items-center justify-center">
                          <svg
                            viewBox="0 0 24 24"
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
                            <rect x="2" y="10" width="20" height="8" rx="2" />
                            <path d="M12 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">Apple Pay</h3>
                          <p className="text-sm text-muted-foreground">Mobile payments</p>
                        </div>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="payment-currency">Transaction Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger id="payment-currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="cad">CAD (C$)</SelectItem>
                        <SelectItem value="aud">AUD (A$)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <Button onClick={handleSaveSettings} disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="tax" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Tax Settings</CardTitle>
                  <CardDescription>Configure tax rates and settings for your store.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="tax-enabled" defaultChecked />
                    <Label htmlFor="tax-enabled">Enable tax calculations</Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tax-display">Display Prices</Label>
                    <Select defaultValue="including">
                      <SelectTrigger id="tax-display">
                        <SelectValue placeholder="Select display option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="including">Including Tax</SelectItem>
                        <SelectItem value="excluding">Excluding Tax</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="default-tax">Default Tax Rate (%)</Label>
                    <Input id="default-tax" type="number" defaultValue="8.5" min="0" step="0.1" />
                  </div>

                  <div className="pt-4">
                    <h3 className="font-medium mb-2">Tax By Region</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p>New York</p>
                          <p className="text-sm text-muted-foreground">United States</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Input type="number" defaultValue="8.875" className="w-24" min="0" step="0.001" />
                          <span className="text-sm">%</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p>California</p>
                          <p className="text-sm text-muted-foreground">United States</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Input type="number" defaultValue="7.25" className="w-24" min="0" step="0.001" />
                          <span className="text-sm">%</span>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" className="mt-4">
                      Add Tax Region
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <Button onClick={handleSaveSettings} disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure email and system notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Admin Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p>New Order</p>
                          <p className="text-sm text-muted-foreground">When a customer places a new order</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p>Low Stock Alert</p>
                          <p className="text-sm text-muted-foreground">When product inventory is running low</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p>New Customer Registration</p>
                          <p className="text-sm text-muted-foreground">When a new customer creates an account</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Customer Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p>Order Confirmation</p>
                          <p className="text-sm text-muted-foreground">When a customer completes checkout</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p>Shipping Updates</p>
                          <p className="text-sm text-muted-foreground">
                            When an order ships or delivery status changes
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p>Abandoned Cart</p>
                          <p className="text-sm text-muted-foreground">Reminder for customers with items in cart</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p>Marketing Emails</p>
                          <p className="text-sm text-muted-foreground">Promotions, new products, and newsletters</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <Button onClick={handleSaveSettings} disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Users & Permissions</CardTitle>
                  <CardDescription>Manage admin users and their access levels.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-medium">SJ</span>
                        </div>
                        <div>
                          <p className="font-medium">Sarah Johnson</p>
                          <p className="text-sm text-muted-foreground">sarah.j@example.com</p>
                        </div>
                      </div>
                      <Badge>Admin</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-medium">MC</span>
                        </div>
                        <div>
                          <p className="font-medium">Michael Chen</p>
                          <p className="text-sm text-muted-foreground">michael.c@example.com</p>
                        </div>
                      </div>
                      <Badge variant="outline">Editor</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-medium">ED</span>
                        </div>
                        <div>
                          <p className="font-medium">Emma Davis</p>
                          <p className="text-sm text-muted-foreground">emma.d@example.com</p>
                        </div>
                      </div>
                      <Badge variant="outline">Viewer</Badge>
                    </div>
                  </div>

                  <Button variant="outline" className="mt-6">
                    Invite User
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}

