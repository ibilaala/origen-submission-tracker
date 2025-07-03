"use client"

import { useUser } from "@stackframe/stack"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { LogIn, LogOut, User, Shield } from "lucide-react"

export function AuthButton() {
  const user = useUser()

  const getUserRole = () => {
    if (!user) return "anonymous"
    const isAdmin = user.primaryEmail === "admin@example.com" || user.clientMetadata?.role === "admin"
    return isAdmin ? "admin" : "user"
  }

  const userRole = getUserRole()

  if (!user) {
    return (
      <Button variant="outline" onClick={() => user?.signIn()}>
        <LogIn className="mr-2 h-4 w-4" />
        Sign In
      </Button>
    )
  }

  const initials =
    user.displayName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) ||
    user.primaryEmail?.slice(0, 2).toUpperCase() ||
    "U"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.profileImageUrl || ""} alt={user.displayName || ""} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium leading-none">{user.displayName || "User"}</p>
              <Badge variant={userRole === "admin" ? "default" : "secondary"} className="text-xs">
                {userRole === "admin" ? (
                  <>
                    <Shield className="mr-1 h-3 w-3" />
                    Admin
                  </>
                ) : (
                  <>
                    <User className="mr-1 h-3 w-3" />
                    User
                  </>
                )}
              </Badge>
            </div>
            <p className="text-xs leading-none text-muted-foreground">{user.primaryEmail}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => user.signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
