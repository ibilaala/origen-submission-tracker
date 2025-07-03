"use client"

import type React from "react"

import { useUser } from "@stackframe/stack"
import { Button } from "@/components/ui/button"
import { Shield, LogIn } from "lucide-react"
import type { UserRole } from "@/lib/auth"

interface PermissionGuardProps {
  children: React.ReactNode
  requiredRole?: UserRole
  fallback?: React.ReactNode
  showLoginPrompt?: boolean
}

export function PermissionGuard({
  children,
  requiredRole = "user",
  fallback,
  showLoginPrompt = true,
}: PermissionGuardProps) {
  const user = useUser()

  const getUserRole = (): UserRole => {
    if (!user) return "anonymous"
    const isAdmin = user.primaryEmail === "admin@example.com" || user.clientMetadata?.role === "admin"
    return isAdmin ? "admin" : "user"
  }

  const userRole = getUserRole()

  const hasPermission = () => {
    if (requiredRole === "anonymous") return true
    if (requiredRole === "user") return userRole === "user" || userRole === "admin"
    if (requiredRole === "admin") return userRole === "admin"
    return false
  }

  if (hasPermission()) {
    return <>{children}</>
  }

  if (fallback) {
    return <>{fallback}</>
  }

  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mb-6">
        <Shield className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">Access Restricted</h3>
      <p className="text-muted-foreground mb-6">
        {requiredRole === "admin"
          ? "You need admin privileges to view this content."
          : "You need to be logged in to view this content."}
      </p>
      {showLoginPrompt && !user && (
        <Button onClick={() => user?.signIn()}>
          <LogIn className="mr-2 h-4 w-4" />
          Sign In to Continue
        </Button>
      )}
    </div>
  )
}
