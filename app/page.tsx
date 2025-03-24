import Image from "next/image";

import Link from "next/link"
import { ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import ProductGrid from "@/components/product-grid"
import FeaturedProducts from "@/components/featured-products"
import HeroSection from "@/components/hero-section"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
    <HeroSection />
    <section className="container mx-auto py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
        <Link href="/products">
          <Button variant="outline">View all products</Button>
        </Link>
      </div>
      <FeaturedProducts />
    </section>
    <section className="container mx-auto py-12 bg-muted/40 rounded-lg">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight mb-4">New Arrivals</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Check out our latest products and find something that suits your style.
        </p>
      </div>
      <ProductGrid category="new-arrivals" />
    </section>
    <section className="container mx-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-primary/5 p-8 rounded-lg text-center">
          <ShoppingBag className="mx-auto h-10 w-10 mb-4 text-primary" />
          <h3 className="text-xl font-medium mb-2">Free Shipping</h3>
          <p className="text-muted-foreground">On all orders over $50</p>
        </div>
        <div className="bg-primary/5 p-8 rounded-lg text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-10 w-10 mb-4 text-primary"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <h3 className="text-xl font-medium mb-2">Satisfaction Guarantee</h3>
          <p className="text-muted-foreground">30-day money back guarantee</p>
        </div>
        <div className="bg-primary/5 p-8 rounded-lg text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-10 w-10 mb-4 text-primary"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 12h7" />
            <path d="M12 20V12a2 2 0 0 1 2-2h3" />
            <path d="M16 5V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2" />
            <path d="M12 12V3" />
            <path d="M4 8h2a2 2 0 0 1 2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-8" />
          </svg>
          <h3 className="text-xl font-medium mb-2">Secure Checkout</h3>
          <p className="text-muted-foreground">Safe & protected payment processing</p>
        </div>
      </div>
    </section>
  </main>
  );
}
