import { neon } from "@neondatabase/serverless"

// Your Neon database connection
const databaseUrl = process.env.DATABASE_URL

export const sql = databaseUrl ? neon(databaseUrl) : null

export interface Submission {
  id: number
  name: string
  email: string
  phone: string
  company_name: string | null
  position: string | null
  accepts_marketing: boolean
  page_path: string
  created_at: string
  user_id: string | null // Add user_id for ownership tracking
}
