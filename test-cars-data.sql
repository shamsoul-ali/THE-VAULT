-- Test if there's data in cars table
SELECT
  COUNT(*) as total_cars,
  COUNT(CASE WHEN status = 'available' THEN 1 END) as available_cars
FROM public.cars;

-- Show first 5 cars
SELECT
  id,
  name,
  make,
  model,
  year,
  status,
  price
FROM public.cars
LIMIT 5;