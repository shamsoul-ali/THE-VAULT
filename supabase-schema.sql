-- Car Listing Database Schema
-- Run this in your Supabase SQL Editor

-- Enable Row Level Security
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types for enums
CREATE TYPE car_status AS ENUM ('available', 'sold', 'waiting_list', 'coming_soon', 'booked', 'reserved');
CREATE TYPE car_category AS ENUM ('hypercar', 'supercar', 'luxury', 'classic', 'electric', 'track', 'sports');
CREATE TYPE image_type AS ENUM ('primary', 'interior', 'exterior', 'engine', 'special', 'thumbnail');
CREATE TYPE user_role AS ENUM ('admin', 'user', 'public');

-- Cars table - main listings
CREATE TABLE cars (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

  -- Basic Information
  name VARCHAR(255) NOT NULL,
  make VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INTEGER NOT NULL CHECK (year >= 1900 AND year <= 2030),

  -- Pricing
  price DECIMAL(15,2) NOT NULL,
  price_currency VARCHAR(3) DEFAULT 'USD',

  -- Status and Category
  status car_status DEFAULT 'available',
  category car_category NOT NULL,

  -- Location and Mileage
  location VARCHAR(200),
  mileage VARCHAR(50),
  mileage_unit VARCHAR(10) DEFAULT 'miles',

  -- Engine Specifications
  engine VARCHAR(200),
  horsepower VARCHAR(100),
  torque VARCHAR(100),
  transmission VARCHAR(100),
  drivetrain VARCHAR(50),

  -- Performance
  acceleration VARCHAR(50), -- 0-60mph time
  top_speed VARCHAR(50),
  fuel_type VARCHAR(50),
  fuel_economy VARCHAR(100),

  -- Physical Specifications
  length VARCHAR(50),
  width VARCHAR(50),
  height VARCHAR(50),
  weight VARCHAR(50),
  wheelbase VARCHAR(50),

  -- Exterior
  exterior_color VARCHAR(100),
  interior_color VARCHAR(100),
  roof_type VARCHAR(50),

  -- Description and Features
  description TEXT,
  condition_report TEXT,
  service_history TEXT,

  -- Flags
  is_exclusive BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,

  -- Badge/Tags
  badge VARCHAR(50),
  tags TEXT[], -- Array of tags

  -- SEO and Meta
  slug VARCHAR(255) UNIQUE,
  meta_title VARCHAR(255),
  meta_description TEXT,

  -- Ownership and Provenance
  previous_owners INTEGER,
  ownership_history TEXT,
  registration_documents BOOLEAN DEFAULT false,

  -- Pricing History (for tracking price changes)
  original_price DECIMAL(15,2),
  price_history JSONB DEFAULT '[]'::jsonb,

  -- Additional JSON data for flexible schema
  additional_specs JSONB DEFAULT '{}'::jsonb,

  -- Admin fields
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),

  -- Search optimization
  search_vector tsvector GENERATED ALWAYS AS (
    to_tsvector('english', coalesce(name, '') || ' ' || coalesce(make, '') || ' ' ||
    coalesce(model, '') || ' ' || coalesce(description, '') || ' ' ||
    coalesce(location, '') || ' ' || coalesce(badge, ''))
  ) STORED
);

-- Car Images table
CREATE TABLE car_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

  car_id UUID REFERENCES cars(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  image_type image_type DEFAULT 'exterior',
  alt_text VARCHAR(255),
  caption TEXT,
  sort_order INTEGER DEFAULT 0,

  -- Image metadata
  file_size INTEGER, -- in bytes
  width INTEGER,
  height INTEGER,
  format VARCHAR(10), -- jpg, png, webp

  -- Storage path in Supabase
  storage_path TEXT,

  created_by UUID REFERENCES auth.users(id)
);

-- Car Features table (for structured features)
CREATE TABLE car_features (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

  car_id UUID REFERENCES cars(id) ON DELETE CASCADE NOT NULL,
  feature_name VARCHAR(200) NOT NULL,
  feature_value TEXT,
  feature_category VARCHAR(100), -- e.g., 'interior', 'performance', 'technology'
  sort_order INTEGER DEFAULT 0
);

-- User Favorites table
CREATE TABLE user_favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  car_id UUID REFERENCES cars(id) ON DELETE CASCADE NOT NULL,

  UNIQUE(user_id, car_id)
);

-- Virtual Tours table
CREATE TABLE virtual_tours (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

  car_id UUID REFERENCES cars(id) ON DELETE CASCADE NOT NULL,

  -- Video content
  video_url TEXT,
  video_thumbnail TEXT,
  video_duration INTEGER, -- in seconds

  -- 360° images
  interior_360_images TEXT[], -- Array of 360° interior image URLs
  exterior_360_images TEXT[], -- Array of 360° exterior image URLs

  -- VR/AR content
  ar_model_url TEXT, -- 3D model for AR viewing
  vr_tour_url TEXT,  -- VR tour link

  -- Tour metadata
  tour_title VARCHAR(255),
  tour_description TEXT,
  is_active BOOLEAN DEFAULT true,

  created_by UUID REFERENCES auth.users(id)
);

-- Inquiries table (for contact form submissions)
CREATE TABLE inquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

  car_id UUID REFERENCES cars(id) ON DELETE CASCADE,

  -- Contact information
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),

  -- Inquiry details
  inquiry_type VARCHAR(50) DEFAULT 'general', -- 'viewing', 'purchase', 'financing', 'trade'
  message TEXT NOT NULL,
  preferred_contact_method VARCHAR(20) DEFAULT 'email', -- 'email', 'phone', 'whatsapp'

  -- Status tracking
  status VARCHAR(20) DEFAULT 'new', -- 'new', 'contacted', 'scheduled', 'closed'
  response TEXT,
  responded_at TIMESTAMP WITH TIME ZONE,
  responded_by UUID REFERENCES auth.users(id),

  -- Additional data
  visitor_info JSONB DEFAULT '{}'::jsonb -- IP, user agent, etc.
);

-- User profiles table (extends auth.users)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

  -- Profile information
  full_name VARCHAR(255),
  avatar_url TEXT,
  role user_role DEFAULT 'user',

  -- Preferences
  preferred_currency VARCHAR(3) DEFAULT 'USD',
  email_notifications BOOLEAN DEFAULT true,

  -- Admin fields
  is_active BOOLEAN DEFAULT true,
  last_seen TIMESTAMP WITH TIME ZONE,

  -- Additional profile data
  profile_data JSONB DEFAULT '{}'::jsonb
);

-- Create indexes for performance
CREATE INDEX idx_cars_status ON cars(status);
CREATE INDEX idx_cars_category ON cars(category);
CREATE INDEX idx_cars_make_model ON cars(make, model);
CREATE INDEX idx_cars_year ON cars(year);
CREATE INDEX idx_cars_price ON cars(price);
CREATE INDEX idx_cars_created_at ON cars(created_at);
CREATE INDEX idx_cars_search_vector ON cars USING gin(search_vector);
CREATE INDEX idx_cars_slug ON cars(slug);

CREATE INDEX idx_car_images_car_id ON car_images(car_id);
CREATE INDEX idx_car_images_type ON car_images(image_type);
CREATE INDEX idx_car_images_sort ON car_images(car_id, sort_order);

CREATE INDEX idx_car_features_car_id ON car_features(car_id);
CREATE INDEX idx_car_features_category ON car_features(feature_category);

CREATE INDEX idx_user_favorites_user_id ON user_favorites(user_id);
CREATE INDEX idx_user_favorites_car_id ON user_favorites(car_id);

CREATE INDEX idx_virtual_tours_car_id ON virtual_tours(car_id);

CREATE INDEX idx_inquiries_car_id ON inquiries(car_id);
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_cars_updated_at BEFORE UPDATE ON cars
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security Policies

-- Enable RLS on all tables
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE car_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE car_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE virtual_tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Cars policies
-- Public can view available cars
CREATE POLICY "Public can view available cars" ON cars
  FOR SELECT USING (status = 'available' OR status = 'coming_soon');

-- Authenticated users can view all cars
CREATE POLICY "Authenticated users can view all cars" ON cars
  FOR SELECT TO authenticated USING (true);

-- Only admins can insert/update/delete cars
CREATE POLICY "Admins can manage cars" ON cars
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

-- Car images policies
-- Public can view images of available cars
CREATE POLICY "Public can view car images" ON car_images
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM cars
      WHERE cars.id = car_images.car_id
      AND (cars.status = 'available' OR cars.status = 'coming_soon')
    )
  );

-- Authenticated users can view all car images
CREATE POLICY "Authenticated users can view all car images" ON car_images
  FOR SELECT TO authenticated USING (true);

-- Only admins can manage car images
CREATE POLICY "Admins can manage car images" ON car_images
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

-- Similar policies for car_features and virtual_tours
CREATE POLICY "Public can view car features" ON car_features
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM cars
      WHERE cars.id = car_features.car_id
      AND (cars.status = 'available' OR cars.status = 'coming_soon')
    )
  );

CREATE POLICY "Authenticated users can view all car features" ON car_features
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage car features" ON car_features
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

-- Virtual tours policies
CREATE POLICY "Public can view virtual tours" ON virtual_tours
  FOR SELECT USING (
    is_active = true AND
    EXISTS (
      SELECT 1 FROM cars
      WHERE cars.id = virtual_tours.car_id
      AND (cars.status = 'available' OR cars.status = 'coming_soon')
    )
  );

CREATE POLICY "Authenticated users can view all virtual tours" ON virtual_tours
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage virtual tours" ON virtual_tours
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

-- User favorites policies
-- Users can only manage their own favorites
CREATE POLICY "Users can manage their own favorites" ON user_favorites
  FOR ALL TO authenticated
  USING (auth.uid() = user_id);

-- Inquiries policies
-- Anyone can create inquiries
CREATE POLICY "Anyone can create inquiries" ON inquiries
  FOR INSERT WITH CHECK (true);

-- Users can view their own inquiries
CREATE POLICY "Users can view their own inquiries" ON inquiries
  FOR SELECT TO authenticated
  USING (
    auth.jwt() ->> 'email' = email OR
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

-- Only admins can update inquiries
CREATE POLICY "Admins can manage inquiries" ON inquiries
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

-- User profiles policies
-- Users can view and update their own profile
CREATE POLICY "Users can manage their own profile" ON user_profiles
  FOR ALL TO authenticated
  USING (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON user_profiles
  FOR SELECT TO authenticated
  USING (
    auth.uid() = id OR
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.id = auth.uid()
      AND up.role = 'admin'
    )
  );

-- Function to automatically create user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, avatar_url)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', 'User'),
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create storage buckets (run this after the above)
-- Note: These need to be created through the Supabase dashboard or via the management API
-- INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
-- VALUES
--   ('car-images', 'car-images', true, 52428800, array['image/jpeg','image/png','image/webp','image/heic']),
--   ('car-videos', 'car-videos', true, 524288000, array['video/mp4','video/webm','video/quicktime']);

-- Sample admin user (you'll need to replace the UUID with your actual user ID)
-- First, sign up through your app, then run this to make yourself an admin:
-- UPDATE user_profiles SET role = 'admin' WHERE id = 'your-user-uuid-here';

-- Insert sample data (optional - for testing)
-- You can uncomment this section to add sample cars for testing

/*
INSERT INTO cars (
  name, make, model, year, price, status, category, location, mileage,
  engine, horsepower, acceleration, top_speed, description, is_exclusive, badge
) VALUES
(
  'Bugatti Chiron Super Sport', 'Bugatti', 'Chiron', 2023, 3900000.00, 'available', 'hypercar',
  'Monaco', '127 miles', '8.0L W16 Quad-Turbo', '1,577 HP', '2.4s 0-60mph', '273 mph',
  'The pinnacle of automotive engineering, featuring a quad-turbocharged W16 engine producing unprecedented power.',
  true, 'Fastest'
),
(
  'Ferrari 250 GTO', 'Ferrari', '250 GTO', 1962, 48400000.00, 'sold', 'classic',
  'Maranello', '15,847 miles', '3.0L V12', '300 HP', '6.1s 0-60mph', '174 mph',
  'One of only 36 ever made, this legendary racing car represents the holy grail of classic Ferrari collecting.',
  true, 'Rare'
),
(
  'McLaren P1', 'McLaren', 'P1', 2024, 1350000.00, 'available', 'hypercar',
  'London', '245 miles', '3.8L V8 Hybrid', '903 HP', '2.8s 0-60mph', '217 mph',
  'The ultimate expression of McLaren''s Formula 1 technology transferred to the road.',
  false, 'Hybrid'
);
*/