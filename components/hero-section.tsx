import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative bg-muted/40">
      <div className="container mx-auto px-4 py-32 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Discover Our Latest Collection</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-8">
          Shop the newest trends and find your perfect style with our curated selection of premium products.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/products">
            <Button size="lg" className="px-8">
              Shop Now
            </Button>
          </Link>
          <Link href="/categories">
            <Button size="lg" variant="outline" className="px-8">
              Browse Categories
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

