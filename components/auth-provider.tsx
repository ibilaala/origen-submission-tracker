"use client"

import type React from "react"

import { StackProvider, StackTheme } from "@stackframe/stack"

const stackApp = {
  projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID!,
  publishableClientKey: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY!,
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <StackProvider app={stackApp}>
      <StackTheme>{children}</StackTheme>
    </StackProvider>
  )
}
