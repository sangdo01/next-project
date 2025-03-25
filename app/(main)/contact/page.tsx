"use client"

import type React from "react"

import { useState } from "react"
import { Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Message sent",
        description: "We've received your message and will respond shortly.",
      })
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Contact Us</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have a question, feedback, or need assistance? We're here to help. Reach out to our team using the form below
          or through our contact information.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              Phone
            </CardTitle>
            <CardDescription>Call us directly</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-medium">Customer Support</p>
            <p className="text-muted-foreground mb-2">+1 (555) 123-4567</p>
            <p className="font-medium">Business Inquiries</p>
            <p className="text-muted-foreground">+1 (555) 987-6543</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Email
            </CardTitle>
            <CardDescription>Send us an email</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-medium">Customer Support</p>
            <p className="text-muted-foreground mb-2">support@estore.com</p>
            <p className="font-medium">Business Inquiries</p>
            <p className="text-muted-foreground">business@estore.com</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Address
            </CardTitle>
            <CardDescription>Visit our office</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-medium">Headquarters</p>
            <p className="text-muted-foreground">
              123 Commerce Street
              <br />
              Suite 500
              <br />
              New York, NY 10001
              <br />
              United States
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What are your shipping times?</AccordionTrigger>
              <AccordionContent>
                We process orders within 1-2 business days. Standard shipping typically takes 3-5 business days, while
                express shipping delivers within 1-2 business days. International shipping may take 7-14 business days
                depending on the destination.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How can I track my order?</AccordionTrigger>
              <AccordionContent>
                Once your order ships, you'll receive a confirmation email with a tracking number. You can also view
                your order status by logging into your account and visiting the "Order History" section.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What is your return policy?</AccordionTrigger>
              <AccordionContent>
                We offer a 30-day return policy for most items. Products must be in their original condition with tags
                attached. To initiate a return, log into your account and select the order you wish to return, or
                contact our customer support team.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
              <AccordionContent>
                Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by
                location. You can view shipping options and estimated delivery times during checkout.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>How can I change or cancel my order?</AccordionTrigger>
              <AccordionContent>
                You can request changes or cancellations within 1 hour of placing your order by contacting our customer
                support team. After this window, we may have already begun processing your order for shipment.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-8 p-6 bg-muted/30 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Need Immediate Assistance?</h3>
            <p className="text-muted-foreground mb-4">
              Our customer support team is available Monday through Friday, 9am to 6pm EST. For urgent matters, please
              call our support line for the fastest response.
            </p>
            <Button variant="outline" className="w-full">
              Live Chat
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden h-[400px] relative">
        {/* This would be replaced with an actual map component in a real application */}
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-primary/50 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Our Location</h3>
            <p className="text-muted-foreground">123 Commerce Street, New York, NY 10001</p>
          </div>
        </div>
      </div>
    </div>
  )
}

