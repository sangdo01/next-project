"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { ROLES } from "@/lib/auth-utils"

interface AdminRoleSelectorProps {
  userId: string
  initialRole: string
  onRoleChange?: (userId: string, newRole: string) => void
}

export default function AdminRoleSelector({ userId, initialRole, onRoleChange }: AdminRoleSelectorProps) {
  const [role, setRole] = useState(initialRole)
  const [isUpdating, setIsUpdating] = useState(false)
  const { toast } = useToast()

  const handleRoleChange = (newRole: string) => {
    setRole(newRole)
  }

  const handleUpdateRole = async () => {
    if (role === initialRole) return

    setIsUpdating(true)

    try {
      // In a real app, this would call an API to update the user's role
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Call the onRoleChange callback if provided
      if (onRoleChange) {
        onRoleChange(userId, role)
      }

      toast({
        title: "Role updated",
        description: `User role has been updated to ${ROLES[role as keyof typeof ROLES]?.name || role}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Select value={role} onValueChange={handleRoleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(ROLES).map(([key, value]) => (
            <SelectItem key={key} value={key}>
              {value.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {role !== initialRole && (
        <Button size="sm" onClick={handleUpdateRole} disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update"}
        </Button>
      )}
    </div>
  )
}

