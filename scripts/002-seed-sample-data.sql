-- Insert sample data for testing
INSERT INTO submissions (name, email, phone, company_name, position, accepts_marketing, page_path, created_at) VALUES
('John Doe', 'john.doe@example.com', '+1-555-0123', 'Tech Corp', 'Software Engineer', true, '/for-companies', NOW() - INTERVAL '1 hour'),
('Jane Smith', 'jane.smith@example.com', '+1-555-0124', 'Design Studio', 'UI Designer', false, '/for-companies', NOW() - INTERVAL '2 hours'),
('Mike Johnson', 'mike.johnson@example.com', '+1-555-0125', NULL, NULL, true, '/for-clients', NOW() - INTERVAL '3 hours'),
('Sarah Wilson', 'sarah.wilson@example.com', '+1-555-0126', 'StartupXYZ', 'Product Manager', true, '/for-companies', NOW() - INTERVAL '4 hours'),
('Alex Brown', 'alex.brown@example.com', '+1-555-0127', NULL, NULL, false, '/for-clients', NOW() - INTERVAL '5 hours');
