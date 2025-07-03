const fs = require("fs")
const path = require("path")

console.log("🚀 Setting up Submission Tracker locally...\n")

// Create .env.local if it doesn't exist
const envPath = path.join(process.cwd(), ".env.local")
if (!fs.existsSync(envPath)) {
  const envContent = `# Submission Tracker Environment Variables

# Database (optional - app works without it)
# DATABASE_URL=postgresql://username:password@host/database

# Authentication (optional - for user management)
# NEXT_PUBLIC_STACK_PROJECT_ID=your_project_id
# NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your_key

# Development
NEXT_PUBLIC_APP_URL=http://localhost:3000
`

  fs.writeFileSync(envPath, envContent)
  console.log("✅ Created .env.local file")
} else {
  console.log("✅ .env.local already exists")
}

console.log("\n🎉 Setup complete!")
console.log("\n📋 Next steps:")
console.log("1. Run: npm run dev")
console.log("2. Visit: http://localhost:3000")
console.log("3. Go to /setup page for database configuration")
console.log("4. Test the app without any database setup!")
console.log("\n💡 The app works immediately with in-memory storage")
console.log("💡 Add a free database later for persistence")
