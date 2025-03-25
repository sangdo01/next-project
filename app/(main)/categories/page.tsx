import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// This would normally fetch from an API
async function getCategories() {
  return [
    {
      id: "clothing",
      name: "Clothing",
      description: "Stylish and comfortable clothing for everyday wear",
      image: "/placeholder.svg?height=400&width=600",
      productCount: 42,
    },
    {
      id: "electronics",
      name: "Electronics",
      description: "The latest gadgets and tech accessories",
      image: "/placeholder.svg?height=400&width=600",
      productCount: 38,
    },
    {
      id: "accessories",
      name: "Accessories",
      description: "Complete your look with our range of accessories",
      image: "/placeholder.svg?height=400&width=600",
      productCount: 56,
    },
    {
      id: "home-decor",
      name: "Home Decor",
      description: "Beautiful items to enhance your living space",
      image: "/placeholder.svg?height=400&width=600",
      productCount: 29,
    },
    {
      id: "beauty",
      name: "Beauty",
      description: "Premium beauty and skincare products",
      image: "/placeholder.svg?height=400&width=600",
      productCount: 34,
    },
    {
      id: "sports",
      name: "Sports & Fitness",
      description: "Everything you need for an active lifestyle",
      image: "/placeholder.svg?height=400&width=600",
      productCount: 47,
    },
  ]
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Shop by Category</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse our wide selection of products across various categories to find exactly what you're looking for.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
            </div>
            <CardHeader>
              <CardTitle>{category.name}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{category.productCount} products</p>
            </CardContent>
            <CardFooter>
              <Link href={`/products?category=${category.id}`} className="w-full">
                <Button className="w-full">
                  Browse {category.name}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 bg-muted/40 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Looking for Something Specific?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Our extensive catalog has thousands of products across dozens of categories. Use our search feature to find
          exactly what you need.
        </p>
        <div className="flex max-w-md mx-auto">
          <input
            type="search"
            placeholder="Search products..."
            className="flex h-10 w-full rounded-l-md border border-input bg-background px-3 py-2 text-sm"
          />
          <Button className="rounded-l-none">Search</Button>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-primary/5 p-8 rounded-lg text-center">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-primary"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium mb-2">Curated Collections</h3>
          <p className="text-muted-foreground">
            Handpicked products selected by our expert team for quality and style.
          </p>
        </div>

        <div className="bg-primary/5 p-8 rounded-lg text-center">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-primary"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            </svg>
          </div>
          <h3 className="text-xl font-medium mb-2">Quality Guaranteed</h3>
          <p className="text-muted-foreground">
            Every product is thoroughly tested to ensure it meets our high standards.
          </p>
        </div>

        <div className="bg-primary/5 p-8 rounded-lg text-center">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-primary"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <h3 className="text-xl font-medium mb-2">New Arrivals Weekly</h3>
          <p className="text-muted-foreground">Check back often to see our latest products and seasonal collections.</p>
        </div>
      </div>
    </div>
  )
}

