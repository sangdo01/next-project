import Link from "next/link"
import { ArrowUpRight, ArrowDown, ArrowUp, DollarSign, ShoppingCart, Users, Package } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminDashboard() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-4">
          <Link href="/" target="_blank">
            <Button variant="outline" className="gap-2">
              <ArrowUpRight className="h-4 w-4" />
              View Store
            </Button>
          </Link>
          <Button>Refresh Data</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                +20.1%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                +12.2%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,338</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                +18.4%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.24%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-rose-500 flex items-center">
                <ArrowDown className="h-3 w-3 mr-1" />
                -1.1%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-6 lg:grid-cols-12 mt-6">
        <Card className="col-span-6 lg:col-span-8">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>View your store's sales performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
              {/* This would be a chart component in a real app */}
              <p className="text-muted-foreground">Sales Chart Visualization</p>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-6 lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from your store</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "ORD-7352", customer: "Sarah Johnson", total: "$129.99", status: "Completed" },
                { id: "ORD-7351", customer: "Michael Chen", total: "$59.49", status: "Processing" },
                { id: "ORD-7350", customer: "Emma Davis", total: "$89.99", status: "Shipped" },
                { id: "ORD-7349", customer: "James Wilson", total: "$149.95", status: "Completed" },
                { id: "ORD-7348", customer: "Olivia Smith", total: "$34.99", status: "Processing" },
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.total}</p>
                    <p
                      className={`text-sm ${
                        order.status === "Completed"
                          ? "text-emerald-500"
                          : order.status === "Shipped"
                            ? "text-blue-500"
                            : "text-amber-500"
                      }`}
                    >
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Link href="/admin/orders">
                <Button variant="outline" className="w-full">
                  View All Orders
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="popular">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Products</h2>
            <TabsList>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="inventory">Low Inventory</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="popular" className="m-0">
            <Card>
              <CardContent className="p-0">
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead>
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <th className="h-12 px-4 text-left align-middle font-medium">Product</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Category</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Price</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Sales</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            id: 1,
                            name: "Wireless Headphones",
                            category: "Electronics",
                            price: "$129.99",
                            sales: 342,
                            status: "In Stock",
                          },
                          {
                            id: 2,
                            name: "Premium T-Shirt",
                            category: "Clothing",
                            price: "$29.99",
                            sales: 265,
                            status: "In Stock",
                          },
                          {
                            id: 3,
                            name: "Smart Watch",
                            category: "Electronics",
                            price: "$199.99",
                            sales: 189,
                            status: "In Stock",
                          },
                          {
                            id: 4,
                            name: "Designer Jeans",
                            category: "Clothing",
                            price: "$79.99",
                            sales: 176,
                            status: "Low Stock",
                          },
                          {
                            id: 5,
                            name: "Leather Wallet",
                            category: "Accessories",
                            price: "$49.99",
                            sales: 154,
                            status: "In Stock",
                          },
                        ].map((product) => (
                          <tr key={product.id} className="border-b transition-colors hover:bg-muted/50">
                            <td className="p-4 align-middle">{product.name}</td>
                            <td className="p-4 align-middle">{product.category}</td>
                            <td className="p-4 align-middle">{product.price}</td>
                            <td className="p-4 align-middle">{product.sales}</td>
                            <td className="p-4 align-middle">
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  product.status === "In Stock"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {product.status}
                              </span>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm">
                                  Edit
                                </Button>
                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="recent" className="m-0">
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Recently added products will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="inventory" className="m-0">
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Products with low inventory will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

