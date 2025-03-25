import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-6">Our Story</h1>
          <p className="text-muted-foreground mb-6">
            Founded in 2015, E-Store began with a simple mission: to provide high-quality products at affordable prices
            with exceptional customer service. What started as a small online shop has grown into a trusted e-commerce
            destination serving customers worldwide.
          </p>
          <p className="text-muted-foreground mb-6">
            Our journey has been defined by our commitment to quality, innovation, and customer satisfaction. We
            carefully select each product in our catalog, ensuring it meets our rigorous standards for craftsmanship,
            durability, and value.
          </p>
          <p className="text-muted-foreground">
            Today, we continue to expand our offerings while staying true to our founding principles. We're proud of how
            far we've come and excited about where we're headed.
          </p>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image src="/placeholder.svg?height=800&width=1200" alt="Our store" fill className="object-cover" />
        </div>
      </div>

      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Our Mission & Values</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto mb-12">
          At E-Store, we're guided by a set of core values that inform everything we do, from product selection to
          customer service.
        </p>

        <Tabs defaultValue="quality" className="max-w-3xl mx-auto">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="quality">Quality</TabsTrigger>
            <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>
          <TabsContent value="quality" className="text-left p-6 bg-muted/30 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Commitment to Quality</h3>
            <p className="mb-4">
              We believe that quality should never be compromised. Every product in our catalog undergoes rigorous
              testing and evaluation before we offer it to our customers.
            </p>
            <p>
              Our team works directly with manufacturers and suppliers to ensure that each item meets our exacting
              standards for materials, craftsmanship, and durability. We stand behind everything we sell with our
              satisfaction guarantee.
            </p>
          </TabsContent>
          <TabsContent value="sustainability" className="text-left p-6 bg-muted/30 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Environmental Responsibility</h3>
            <p className="mb-4">
              We're committed to reducing our environmental footprint through sustainable practices across our business
              operations. This includes eco-friendly packaging, carbon-neutral shipping options, and partnering with
              suppliers who share our values.
            </p>
            <p>
              We're constantly seeking ways to improve our sustainability efforts and are transparent about our progress
              and challenges in this ongoing journey.
            </p>
          </TabsContent>
          <TabsContent value="community" className="text-left p-6 bg-muted/30 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Supporting Our Community</h3>
            <p className="mb-4">
              We believe in giving back to the communities that support us. Through our Community Impact Program, we
              donate a portion of our profits to local and global causes that align with our values.
            </p>
            <p>
              We also prioritize working with small businesses and artisans, helping to support local economies and
              preserve traditional craftsmanship in an increasingly mass-produced world.
            </p>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "Sarah Johnson",
              role: "Founder & CEO",
              image: "/placeholder.svg?height=400&width=400",
              bio: "With over 15 years of retail experience, Sarah founded E-Store with a vision to transform online shopping.",
            },
            {
              name: "Michael Chen",
              role: "Chief Product Officer",
              image: "/placeholder.svg?height=400&width=400",
              bio: "Michael leads our product team, ensuring we offer only the highest quality items in our catalog.",
            },
            {
              name: "Aisha Patel",
              role: "Customer Experience Director",
              image: "/placeholder.svg?height=400&width=400",
              bio: "Aisha is dedicated to creating exceptional shopping experiences for every customer.",
            },
            {
              name: "David Rodriguez",
              role: "Operations Manager",
              image: "/placeholder.svg?height=400&width=400",
              bio: "David oversees our logistics and fulfillment, making sure orders reach customers quickly and accurately.",
            },
          ].map((member) => (
            <Card key={member.name} className="overflow-hidden">
              <div className="aspect-square relative">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{member.role}</p>
                <p className="text-sm">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-muted/30 rounded-lg p-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {[
            {
              quote: "E-Store has been my go-to for quality products for years. Their customer service is unmatched!",
              author: "Jessica T.",
              location: "New York, NY",
            },
            {
              quote:
                "I appreciate their commitment to sustainability. It's rare to find a company that truly walks the talk.",
              author: "Marcus L.",
              location: "Portland, OR",
            },
            {
              quote:
                "Fast shipping, beautiful packaging, and products that exceed expectations. What more could you ask for?",
              author: "Emma R.",
              location: "Chicago, IL",
            },
          ].map((testimonial, index) => (
            <div key={index} className="bg-background p-6 rounded-lg shadow-sm">
              <svg
                className="h-8 w-8 text-primary/40 mb-4 mx-auto"
                fill="currentColor"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="mb-4">{testimonial.quote}</p>
              <p className="font-medium">{testimonial.author}</p>
              <p className="text-sm text-muted-foreground">{testimonial.location}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Join Our Journey</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          We're always looking for passionate individuals to join our growing team. Check out our current openings or
          reach out to learn more.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/careers">
            <Button size="lg">View Careers</Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

