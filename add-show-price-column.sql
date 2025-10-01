-- Add show_price column to cars table
-- Run this in your Supabase SQL Editor

-- Add the show_price column with default value false
ALTER TABLE cars
ADD COLUMN IF NOT EXISTS show_price BOOLEAN DEFAULT false;

-- Update existing cars to have show_price = false (if you want them hidden by default)
UPDATE cars
SET show_price = false
WHERE show_price IS NULL;

-- Verify the column was added
SELECT
  id,
  name,
  price,
  price_currency,
  show_price
FROM cars
LIMIT 5;