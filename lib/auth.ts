import { StackServerApp } from "@stackframe/stack"

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
})

export type UserRole = "anonymous" | "user" | "admin"

export interface AuthUser {
  id: string
  email: string
  displayName: string | null
  role: UserRole
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const user = await stackServerApp.getUser()
    if (!user) return null

    // Check if user is admin (you can customize this logic)
    const isAdmin = user.primaryEmail === "admin@example.com" || user.clientMetadata?.role === "admin"

    return {
      id: user.id,
      email: user.primaryEmail || "",
      displayName: user.displayName,
      role: isAdmin ? "admin" : "user",
    }
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

export function canViewSubmissions(userRole: UserRole): boolean {
  return userRole === "user" || userRole === "admin"
}

export function canViewAllSubmissions(userRole: UserRole): boolean {
  return userRole === "admin"
}

export function canSubmit(userRole: UserRole): boolean {
  return true // All users (including anonymous) can submit
}
