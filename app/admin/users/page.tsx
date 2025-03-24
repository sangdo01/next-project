"use client"

import { useState } from "react"
import { Search, ArrowUpDown, MoreHorizontal, Eye, Mail, UserX, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
import AdminRoleSelector from "@/components/admin-role-selector"


// Mock data - would come from API in real app
const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    lastLogin: "2023-05-15T10:30:00Z",
    status: "Active",
  },
  {
    id: "2",
    name: "Manager User",
    email: "manager@example.com",
    role: "manager",
    lastLogin: "2023-05-14T14:45:00Z",
    status: "Active",
  },
  {
    id: "3",
    name: "Editor User",
    email: "editor@example.com",
    role: "editor",
    lastLogin: "2023-05-13T09:15:00Z",
    status: "Active",
  },
  {
    id: "4",
    name: "John Smith",
    email: "john.smith@example.com",
    role: "editor",
    lastLogin: "2023-05-10T16:20:00Z",
    status: "Inactive",
  },
  {
    id: "5",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    role: "manager",
    lastLogin: "2023-05-12T11:05:00Z",
    status: "Active",
  },
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()
  const [adminUsers, setAdminUsers] = useState(users)

  const handleDeactivateUser = (userId: string, userName: string) => {
    // In a real app, this would call an API to deactivate the user
    setAdminUsers(adminUsers.map((user) => (user.id === userId ? { ...user, status: "Inactive" } : user)))

    toast({
      title: "User deactivated",
      description: `${userName}'s account has been deactivated.`,
    })
  }

  const handleActivateUser = (userId: string, userName: string) => {
    // In a real app, this would call an API to activate the user
    setAdminUsers(adminUsers.map((user) => (user.id === userId ? { ...user, status: "Active" } : user)))

    toast({
      title: "User activated",
      description: `${userName}'s account has been activated.`,
    })
  }

  const handleRoleChange = (userId: string, newRole: string) => {
    // In a real app, this would be handled by the API call in AdminRoleSelector
    setAdminUsers(adminUsers.map((user) => (user.id === userId ? { ...user, role: newRole } : user)))
  }

  // Filter users based on search term
  const filteredUsers = adminUsers.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Admin Users</h1>
        <Button>Add User</Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users by name, email, or role..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <div className="flex items-center gap-1">
                    User
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Email</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Role
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No users found. Try adjusting your search.
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <AdminRoleSelector userId={user.id} initialRole={user.role} onRoleChange={handleRoleChange} />
                    </TableCell>
                    <TableCell>
                      {new Date(user.lastLogin).toLocaleDateString()} at{" "}
                      {new Date(user.lastLogin).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
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
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" />
                            Email User
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Shield className="h-4 w-4 mr-2" />
                            Permissions
                          </DropdownMenuItem>
                          {user.status === "Active" ? (
                            <DropdownMenuItem onClick={() => handleDeactivateUser(user.id, user.name)}>
                              <UserX className="h-4 w-4 mr-2" />
                              Deactivate
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleActivateUser(user.id, user.name)}>
                              <Shield className="h-4 w-4 mr-2" />
                              Activate
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
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

