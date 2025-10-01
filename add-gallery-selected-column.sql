-- Add gallery_selected column to car_images table
-- This enables image gallery selection functionality for virtual tours

-- Add the gallery_selected column
ALTER TABLE car_images ADD COLUMN gallery_selected BOOLEAN DEFAULT false;

-- Create index for better performance when querying gallery images
CREATE INDEX idx_car_images_gallery_selected ON car_images(car_id, gallery_selected) WHERE gallery_selected = true;

-- Add comment to document the column purpose
COMMENT ON COLUMN car_images.gallery_selected IS 'Indicates if this image is selected for the virtual tour gallery display (max 10 per car)';

-- Verify the column was added
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'car_images'
AND column_name = 'gallery_selected';