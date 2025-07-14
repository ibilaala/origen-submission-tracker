"use client"

import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"

export function AuthButton() {
  return (
    <Button variant="outline">
      <LogIn className="mr-2 h-4 w-4" />
      Sign In
    </Button>
  )
}


