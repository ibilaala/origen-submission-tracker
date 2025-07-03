# Submission Tracker - Ready to Test!

A Next.js application for collecting and managing client and company submissions with your Neon database pre-configured.

## 🚀 Quick Start (Database Already Configured!)

Your Neon database is already set up in the `.env.local` file. Just run:

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit: http://localhost:3000
\`\`\`

## 🆓 Free Database Options

### Option 1: Neon PostgreSQL (Recommended)
- **Free Tier**: 512MB storage, no credit card required
- **Setup**: 2 minutes
- **URL**: https://neon.tech

1. Sign up for free account
2. Create new project
3. Copy connection string
4. Add to `.env.local`:
   \`\`\`env
   DATABASE_URL=postgresql://username:password@host/database
   \`\`\`

### Option 2: Supabase PostgreSQL
- **Free Tier**: 500MB storage, real-time features
- **Setup**: 2 minutes  
- **URL**: https://supabase.com

1. Sign up for free account
2. Create new project
3. Go to Settings > Database
4. Copy connection string
5. Add to `.env.local`:
   \`\`\`env
   DATABASE_URL=postgresql://username:password@host/database
   \`\`\`

### Option 3: Railway PostgreSQL
- **Free Tier**: 512MB storage
- **Setup**: 1 minute
- **URL**: https://railway.app

1. Sign up with GitHub
2. Create new project
3. Add PostgreSQL service
4. Copy connection string

## 🔧 Environment Variables

Create `.env.local` file:

\`\`\`env
# Database (choose one)
DATABASE_URL=postgresql://username:password@host/database

# Authentication (optional)
NEXT_PUBLIC_STACK_PROJECT_ID=your_project_id
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your_key
\`\`\`

## 🧪 Testing Steps

### 1. Initialize Database
- Visit: `http://localhost:3000/setup`
- Click "Test Connection" ✅
- Click "Initialize Database" ✅

### 2. Test Form Submissions
- Go to: `http://localhost:3000/for-clients`
- Click "Add New Submission"
- Fill out and submit form
- Data saves to your Neon database!

### 3. Test Company Forms
- Go to: `http://localhost:3000/for-companies`
- Submit company form (requires company name + position)

### 4. Verify Data
- Check your Neon dashboard SQL editor
- Run: `SELECT * FROM submissions ORDER BY created_at DESC;`

## 📱 Permission Levels

1. **Anonymous Users**
   - Can submit forms
   - Cannot view submissions
   - Cannot view statistics

2. **Logged-in Users**  
   - Can submit forms
   - Can view own submissions
   - Can view own statistics

3. **Super Admin**
   - Can submit forms
   - Can view ALL submissions
   - Can view ALL statistics

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy automatically

### Netlify
1. Build command: `npm run build`
2. Publish directory: `.next`
3. Add environment variables

### Railway
1. Connect GitHub repo
2. Add DATABASE_URL
3. Deploy with one click

## 🛠️ Development

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

## 📊 Features You Can Test

### ✅ Working Now:
- Form submissions (anonymous)
- Beautiful responsive UI
- Dark/light theme toggle
- Form validation
- Data persistence in Neon
- Statistics page
- Setup page

### 🔒 Requires Authentication:
- Viewing submissions
- User-specific data
- Admin features

## 🛠️ Troubleshooting

### If npm install fails:
\`\`\`bash
npm install --legacy-peer-deps
\`\`\`

### If port 3000 is busy:
\`\`\`bash
npm run dev -- --port 3001
\`\`\`

### If database connection fails:
- Restart dev server: `Ctrl+C` then `npm run dev`
- Check `.env.local` file exists

## 🎯 Expected Results

After running `npm run dev`:
- ✅ App loads on `localhost:3000`
- ✅ Forms save data to Neon database
- ✅ Beautiful UI with animations
- ✅ Real-time form validation

Ready to test! 🚀
