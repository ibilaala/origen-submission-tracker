"use server"

import { sql, type Submission } from "@/lib/db"
import { submissionSchema, type SubmissionFormData } from "@/lib/validations"
import { getCurrentUser, canViewSubmissions, canViewAllSubmissions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

// In-memory storage fallback for when database is not available
const inMemorySubmissions: Submission[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1-555-0123",
    company_name: "Tech Corp",
    position: "Software Engineer",
    accepts_marketing: true,
    page_path: "/for-companies",
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    user_id: "user_1",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1-555-0124",
    company_name: "Design Studio",
    position: "UI Designer",
    accepts_marketing: false,
    page_path: "/for-companies",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    user_id: "user_2",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1-555-0125",
    company_name: null,
    position: null,
    accepts_marketing: true,
    page_path: "/for-clients",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    user_id: null, // Anonymous submission
  },
]

let nextId = 4

// Helper function to simulate database work with random timeout
async function simulateDbWork() {
  const delay = Math.random() * 500 + 250 // 250-750ms
  await new Promise((resolve) => setTimeout(resolve, delay))
}

// Check if database is available
async function isDatabaseAvailable(): Promise<boolean> {
  try {
    if (!sql) return false
    await sql`SELECT 1`
    return true
  } catch (error) {
    console.log("Database not available, using in-memory storage")
    return false
  }
}

export async function createSubmission(data: SubmissionFormData) {
  await simulateDbWork()

  try {
    const validatedData = submissionSchema.parse(data)
    const currentUser = await getCurrentUser()
    const userId = currentUser?.id || null // Allow anonymous submissions

    const dbAvailable = await isDatabaseAvailable()

    if (dbAvailable) {
      // Use database
      const result = await sql`
        INSERT INTO submissions (name, email, phone, company_name, position, accepts_marketing, page_path, user_id)
        VALUES (${validatedData.name}, ${validatedData.email}, ${validatedData.phone}, 
                ${validatedData.company_name || null}, ${validatedData.position || null}, 
                ${validatedData.accepts_marketing}, ${validatedData.page_path}, ${userId})
        RETURNING *
      `

      revalidatePath(validatedData.page_path)
      return { success: true, data: result[0] }
    } else {
      // Use in-memory storage
      const newSubmission: Submission = {
        id: nextId++,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        company_name: validatedData.company_name || null,
        position: validatedData.position || null,
        accepts_marketing: validatedData.accepts_marketing,
        page_path: validatedData.page_path,
        created_at: new Date().toISOString(),
        user_id: userId,
      }

      inMemorySubmissions.unshift(newSubmission) // Add to beginning for newest first
      revalidatePath(validatedData.page_path)
      return { success: true, data: newSubmission }
    }
  } catch (error) {
    console.error("Error creating submission:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create submission",
    }
  }
}

export async function getSubmissions(pagePath?: string): Promise<Submission[]> {
  await simulateDbWork()

  try {
    const currentUser = await getCurrentUser()
    const userRole = currentUser?.role || "anonymous"

    // Check permissions
    if (!canViewSubmissions(userRole)) {
      return [] // Anonymous users cannot see submissions
    }

    const dbAvailable = await isDatabaseAvailable()

    if (dbAvailable) {
      // Use database
      let query
      if (canViewAllSubmissions(userRole)) {
        // Admin can see all submissions
        query = pagePath
          ? sql`SELECT * FROM submissions WHERE page_path = ${pagePath} ORDER BY created_at DESC`
          : sql`SELECT * FROM submissions ORDER BY created_at DESC`
      } else {
        // Regular users can only see their own submissions
        query = pagePath
          ? sql`SELECT * FROM submissions WHERE page_path = ${pagePath} AND user_id = ${currentUser!.id} ORDER BY created_at DESC`
          : sql`SELECT * FROM submissions WHERE user_id = ${currentUser!.id} ORDER BY created_at DESC`
      }

      const result = await query
      return result as Submission[]
    } else {
      // Use in-memory storage
      let filtered = inMemorySubmissions

      // Filter by page path if specified
      if (pagePath) {
        filtered = filtered.filter((sub) => sub.page_path === pagePath)
      }

      // Apply user permissions
      if (!canViewAllSubmissions(userRole)) {
        // Regular users can only see their own submissions
        filtered = filtered.filter((sub) => sub.user_id === currentUser!.id)
      }

      // Sort by created_at DESC (newest first)
      return filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    }
  } catch (error) {
    console.error("Error fetching submissions:", error)
    return []
  }
}

export async function getSubmissionStats() {
  await simulateDbWork()

  try {
    const currentUser = await getCurrentUser()
    const userRole = currentUser?.role || "anonymous"

    // Anonymous users cannot see stats
    if (!canViewSubmissions(userRole)) {
      return { total: 0, clients: 0, companies: 0 }
    }

    const dbAvailable = await isDatabaseAvailable()

    if (dbAvailable) {
      // Use database
      if (canViewAllSubmissions(userRole)) {
        // Admin can see all stats
        const [totalResult, clientsResult, companiesResult] = await Promise.all([
          sql`SELECT COUNT(*) as count FROM submissions`,
          sql`SELECT COUNT(*) as count FROM submissions WHERE page_path = '/for-clients'`,
          sql`SELECT COUNT(*) as count FROM submissions WHERE page_path = '/for-companies'`,
        ])

        return {
          total: Number(totalResult[0].count),
          clients: Number(clientsResult[0].count),
          companies: Number(companiesResult[0].count),
        }
      } else {
        // Regular users can only see their own stats
        const [totalResult, clientsResult, companiesResult] = await Promise.all([
          sql`SELECT COUNT(*) as count FROM submissions WHERE user_id = ${currentUser!.id}`,
          sql`SELECT COUNT(*) as count FROM submissions WHERE page_path = '/for-clients' AND user_id = ${currentUser!.id}`,
          sql`SELECT COUNT(*) as count FROM submissions WHERE page_path = '/for-companies' AND user_id = ${currentUser!.id}`,
        ])

        return {
          total: Number(totalResult[0].count),
          clients: Number(clientsResult[0].count),
          companies: Number(companiesResult[0].count),
        }
      }
    } else {
      // Use in-memory storage
      let filtered = inMemorySubmissions

      // Apply user permissions
      if (!canViewAllSubmissions(userRole)) {
        filtered = filtered.filter((sub) => sub.user_id === currentUser!.id)
      }

      const total = filtered.length
      const clients = filtered.filter((sub) => sub.page_path === "/for-clients").length
      const companies = filtered.filter((sub) => sub.page_path === "/for-companies").length

      return { total, clients, companies }
    }
  } catch (error) {
    console.error("Error fetching stats:", error)
    return { total: 0, clients: 0, companies: 0 }
  }
}
