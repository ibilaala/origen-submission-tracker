-- Create submissions table with user_id for authentication
CREATE TABLE IF NOT EXISTS submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  company_name VARCHAR(255),
  position VARCHAR(255),
  accepts_marketing BOOLEAN NOT NULL DEFAULT false,
  page_path VARCHAR(50) NOT NULL,
  user_id VARCHAR(255), -- Stack Auth user ID, nullable for anonymous submissions
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_page_path ON submissions(page_path);
CREATE INDEX IF NOT EXISTS idx_submissions_user_id ON submissions(user_id);
