"use server"

import { sql } from "@/lib/db"

export async function initializeDatabase() {
  try {
    if (!sql) {
      throw new Error("Database connection not available")
    }

    console.log("🔄 Initializing database...")

    // Create submissions table
    await sql`
      CREATE TABLE IF NOT EXISTS submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        company_name VARCHAR(255),
        position VARCHAR(255),
        accepts_marketing BOOLEAN NOT NULL DEFAULT false,
        page_path VARCHAR(50) NOT NULL,
        user_id VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    console.log("✅ Table created")

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at DESC)`
    await sql`CREATE INDEX IF NOT EXISTS idx_submissions_page_path ON submissions(page_path)`
    await sql`CREATE INDEX IF NOT EXISTS idx_submissions_user_id ON submissions(user_id)`

    console.log("✅ Indexes created")

    // Check if we need to seed data
    const count = await sql`SELECT COUNT(*) as count FROM submissions`
    const submissionCount = Number(count[0].count)

    if (submissionCount === 0) {
      console.log("🌱 Seeding sample data...")
      // Insert sample data
      await sql`
        INSERT INTO submissions (name, email, phone, company_name, position, accepts_marketing, page_path, user_id, created_at)
        VALUES 
        ('John Doe', 'john.doe@example.com', '+1-555-0123', 'Tech Corp', 'Software Engineer', true, '/for-companies', 'user_1', NOW() - INTERVAL '1 hour'),
        ('Jane Smith', 'jane.smith@example.com', '+1-555-0124', 'Design Studio', 'UI Designer', false, '/for-companies', 'user_2', NOW() - INTERVAL '2 hours'),
        ('Mike Johnson', 'mike.johnson@example.com', '+1-555-0125', NULL, NULL, true, '/for-clients', NULL, NOW() - INTERVAL '3 hours'),
        ('Sarah Wilson', 'sarah.wilson@example.com', '+1-555-0126', 'StartupXYZ', 'Product Manager', true, '/for-companies', 'user_1', NOW() - INTERVAL '4 hours'),
        ('Alex Brown', 'alex.brown@example.com', '+1-555-0127', NULL, NULL, false, '/for-clients', NULL, NOW() - INTERVAL '5 hours')
      `
      console.log("✅ Sample data inserted")
    } else {
      console.log(`✅ Database already has ${submissionCount} submissions`)
    }

    return { success: true, message: "Database initialized successfully! Ready to test." }
  } catch (error) {
    console.error("❌ Database initialization error:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function testDatabaseConnection() {
  try {
    if (!sql) {
      return { success: false, error: "No database connection configured" }
    }

    console.log("🔄 Testing database connection...")
    await sql`SELECT 1`
    console.log("✅ Database connection successful")
    return { success: true, message: "Database connection successful! Your Neon database is ready." }
  } catch (error) {
    console.error("❌ Database connection failed:", error)
    return { success: false, error: error instanceof Error ? error.message : "Connection failed" }
  }
}
