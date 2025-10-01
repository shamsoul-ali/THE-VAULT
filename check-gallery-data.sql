-- Check existing data for virtual tour gallery setup

-- 1. Check if cars exist
SELECT
  COUNT(*) as total_cars,
  COUNT(CASE WHEN status = 'available' THEN 1 END) as available_cars,
  COUNT(CASE WHEN status = 'coming_soon' THEN 1 END) as coming_soon_cars
FROM cars;

-- 2. Check if car_images exist
SELECT
  COUNT(*) as total_images,
  COUNT(DISTINCT car_id) as cars_with_images,
  image_type,
  COUNT(*) as count_by_type
FROM car_images
GROUP BY image_type
ORDER BY count_by_type DESC;

-- 3. Check if gallery_selected column exists
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'car_images'
AND column_name = 'gallery_selected';

-- 4. Show first few cars with their image counts
SELECT
  c.id,
  c.name,
  c.make,
  c.model,
  c.year,
  c.status,
  COUNT(ci.id) as image_count
FROM cars c
LEFT JOIN car_images ci ON c.id = ci.car_id
GROUP BY c.id, c.name, c.make, c.model, c.year, c.status
ORDER BY c.created_at DESC
LIMIT 5;

-- 5. If gallery_selected exists, check selected images
-- (This will error if column doesn't exist yet)
SELECT
  car_id,
  COUNT(*) as selected_images,
  string_agg(image_type, ', ') as selected_types
FROM car_images
WHERE gallery_selected = true
GROUP BY car_id;