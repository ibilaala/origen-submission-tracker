"use client"

import type React from "react"

interface PermissionGuardProps {
  children: React.ReactNode
}

export function PermissionGuard({ children }: PermissionGuardProps) {
  return <>{children}</>
}

