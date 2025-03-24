"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CheckoutPage() {
  const [step, setStep] = useState(1)

  const goToNextStep = () => {
    setStep(step + 1)
  }

  const goToPreviousStep = () => {
    setStep(step - 1)
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-lg border shadow-sm mb-8">
            <div className="p-6">
              <div className="flex items-center mb-8">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"} mr-2`}
                >
                  {step > 1 ? <Check className="h-4 w-4" /> : "1"}
                </div>
                <div className="font-medium">Shipping Information</div>
                <Separator className="flex-1 mx-4" />
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"} mr-2`}
                >
                  {step > 2 ? <Check className="h-4 w-4" /> : "2"}
                </div>
                <div className="font-medium">Payment Method</div>
                <Separator className="flex-1 mx-4" />
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"} mr-2`}
                >
                  3
                </div>
                <div className="font-medium">Review Order</div>
              </div>

              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-4">Shipping Information</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" className="mt-1" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" placeholder="123 Main St" className="mt-1" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="New York" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="state">State/Province</Label>
                      <Select>
                        <SelectTrigger id="state" className="mt-1">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ny">New York</SelectItem>
                          <SelectItem value="ca">California</SelectItem>
                          <SelectItem value="tx">Texas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP/Postal Code</Label>
                      <Input id="zip" placeholder="10001" className="mt-1" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select>
                      <SelectTrigger id="country" className="mt-1">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="(123) 456-7890" className="mt-1" />
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={goToNextStep}>Continue to Payment</Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-4">Payment Method</h2>

                  <RadioGroup defaultValue="card">
                    <div className="flex items-center space-x-2 border rounded-lg p-4 mb-4">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-2" />
                        Credit/Debit Card
                      </Label>
                    </div>

                    <div className="border rounded-lg p-6 space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiration Date</Label>
                          <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" className="mt-1" />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="nameOnCard">Name on Card</Label>
                        <Input id="nameOnCard" placeholder="John Doe" className="mt-1" />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 border rounded-lg p-4 mt-4">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal">PayPal</Label>
                    </div>
                  </RadioGroup>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={goToPreviousStep}>
                      Back
                    </Button>
                    <Button onClick={goToNextStep}>Review Order</Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-4">Review Your Order</h2>

                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Shipping Information</h3>
                      <p>John Doe</p>
                      <p>123 Main St</p>
                      <p>New York, NY 10001</p>
                      <p>United States</p>
                      <p>john.doe@example.com</p>
                      <p>(123) 456-7890</p>
                      <Button variant="link" className="p-0 h-auto" onClick={() => setStep(1)}>
                        Edit
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Payment Method</h3>
                      <p>Credit Card ending in 3456</p>
                      <Button variant="link" className="p-0 h-auto" onClick={() => setStep(2)}>
                        Edit
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Order Items</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Premium T-Shirt (2)</span>
                          <span>$59.98</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Leather Wallet (1)</span>
                          <span>$49.99</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={goToPreviousStep}>
                      Back
                    </Button>
                    <Link href="/order-confirmation">
                      <Button>Place Order</Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-lg border shadow-sm p-6 sticky top-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Premium T-Shirt (2)</span>
                <span>$59.98</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Leather Wallet (1)</span>
                <span>$49.99</span>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>$109.97</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>$5.99</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>$10.99</span>
              </div>

              <Separator />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>$126.95</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

