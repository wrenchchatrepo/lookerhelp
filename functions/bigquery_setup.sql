-- Create users table
CREATE TABLE IF NOT EXISTS `miguelai.lookerhelp.users` (
  email STRING,
  name STRING,
  picture STRING,
  created_at TIMESTAMP,
  last_login TIMESTAMP
);

-- Create stripe_subscriptions table (populated by Stripe -> Cloud Storage -> BigQuery)
CREATE TABLE IF NOT EXISTS `miguelai.lookerhelp.stripe_subscriptions` (
  customer_email STRING,
  subscription_id STRING,
  plan_id STRING,          -- Maps to Stripe product/price IDs
  status STRING,           -- 'active', 'cancelled', 'past_due'
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  payment_link_id STRING,  -- Stripe payment link used
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Create indices for better query performance
CREATE INDEX IF NOT EXISTS user_email_idx
  ON `miguelai.lookerhelp.users`(email);

CREATE INDEX IF NOT EXISTS stripe_customer_email_idx
  ON `miguelai.lookerhelp.stripe_subscriptions`(customer_email);

CREATE INDEX IF NOT EXISTS stripe_subscription_status_idx
  ON `miguelai.lookerhelp.stripe_subscriptions`(status);

-- Sample test data insertion
INSERT INTO `miguelai.lookerhelp.users`
(email, name, picture, created_at, last_login)
VALUES
('test@example.com', 'Test User', 'https://example.com/pic.jpg', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());

-- Sample stripe subscription data
INSERT INTO `miguelai.lookerhelp.stripe_subscriptions`
(customer_email, subscription_id, plan_id, status, current_period_start, current_period_end, payment_link_id, created_at, updated_at)
VALUES
('test@example.com', 'sub_123', 'price_app_access', 'active', 
 CURRENT_TIMESTAMP(), TIMESTAMP_ADD(CURRENT_TIMESTAMP(), INTERVAL 30 DAY),
 'plink_3cs7tX4Nrcqg2ic9AE', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());
