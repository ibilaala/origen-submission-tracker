'use client';

import { StackProvider, StackTheme } from "@stackframe/stack"
import { stackClientApp } from "@/lib/stack"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <StackProvider app={stackClientApp}>
      <StackTheme>{children}</StackTheme>
    </StackProvider>
  )
}

