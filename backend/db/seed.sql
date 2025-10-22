-- Subscription plans and seed data

-- Create plans table
CREATE TABLE IF NOT EXISTS subscription_plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price_monthly DECIMAL(10,2),
  features JSONB,
  max_websites INTEGER,
  max_events_per_month BIGINT,
  created_at TIMESTAMP DEFAULT now()
);

-- Insert subscription plans
INSERT INTO subscription_plans (id, name, price_monthly, max_websites, max_events_per_month, features) VALUES
('basic', 'Basic', 9.99, 1, 100000, '{"realtime": false, "exports": true, "api_access": true}'),
('pro', 'Professional', 29.99, 5, 1000000, '{"realtime": true, "exports": true, "api_access": true, "custom_events": true}'),
('enterprise', 'Enterprise', 99.99, -1, -1, '{"realtime": true, "exports": true, "api_access": true, "custom_events": true, "priority_support": true, "custom_integrations": true}')
ON CONFLICT (id) DO NOTHING;

-- Sample test user (password: 'password123')
-- Generated with bcrypt hash
INSERT INTO users (email, password_hash) VALUES 
('demo@example.com', '$2b$10$rKvVXqTqJb1q.zHYTpzWUeVWZPEWQ3xHRJZxVxZxBJYZQGKYZQGKY')
ON CONFLICT (email) DO NOTHING;

-- Add some sample events for demo purposes
DO $$
DECLARE
  demo_website_id INTEGER;
  demo_user_id INTEGER;
BEGIN
  -- Get demo user
  SELECT id INTO demo_user_id FROM users WHERE email = 'demo@example.com';
  
  IF demo_user_id IS NOT NULL THEN
    -- Create demo website if doesn't exist
    INSERT INTO websites (user_id, name, domain, api_key)
    VALUES (demo_user_id, 'Demo Website', 'demo.example.com', 'demo-api-key-12345')
    ON CONFLICT (api_key) DO NOTHING
    RETURNING id INTO demo_website_id;
    
    -- Get website id if already exists
    IF demo_website_id IS NULL THEN
      SELECT id INTO demo_website_id FROM websites WHERE api_key = 'demo-api-key-12345';
    END IF;
    
    -- Insert sample events
    INSERT INTO events (website_id, type, payload, session_id, created_at) VALUES
    (demo_website_id, 'pageview', '{"url": "/", "title": "Home"}', 'session1', NOW() - INTERVAL '5 hours'),
    (demo_website_id, 'pageview', '{"url": "/about", "title": "About"}', 'session1', NOW() - INTERVAL '4 hours'),
    (demo_website_id, 'pageview', '{"url": "/products", "title": "Products"}', 'session2', NOW() - INTERVAL '3 hours'),
    (demo_website_id, 'click', '{"href": "/signup", "text": "Sign Up"}', 'session2', NOW() - INTERVAL '3 hours'),
    (demo_website_id, 'pageview', '{"url": "/", "title": "Home"}', 'session3', NOW() - INTERVAL '2 hours'),
    (demo_website_id, 'pageview', '{"url": "/pricing", "title": "Pricing"}', 'session3', NOW() - INTERVAL '1 hour'),
    (demo_website_id, 'pageview', '{"url": "/", "title": "Home"}', 'session4', NOW() - INTERVAL '30 minutes'),
    (demo_website_id, 'pageview', '{"url": "/contact", "title": "Contact"}', 'session4', NOW() - INTERVAL '20 minutes')
    ON CONFLICT DO NOTHING;
  END IF;
END $$;
