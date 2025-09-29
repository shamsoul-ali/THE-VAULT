# Revura Car Listing System - Setup Instructions

## 🚀 Quick Start Guide

### 1. Supabase Setup

#### Create a New Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Choose a project name, database password, and region
3. Wait for the project to be created (this takes a few minutes)

#### Run Database Schema
1. Go to your Supabase project dashboard
2. Navigate to the **SQL Editor** tab
3. Copy and paste the entire content from `supabase-schema.sql`
4. Click **Run** to execute the schema
5. Verify tables are created in the **Table Editor**

#### Create Storage Buckets
1. Go to **Storage** in your Supabase dashboard
2. Create a new bucket called `car-images`
3. Set it to **Public** bucket
4. Configure the following policies:
   - Allow public read access
   - Allow authenticated users to upload
   - Allow authenticated users to delete their own files

#### Get Your API Keys
1. Go to **Settings > API** in your Supabase dashboard
2. Copy your `Project URL` and `anon public` key
3. Copy your `service_role` key (keep this secret!)

### 2. Environment Variables

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Fill in your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_WHATSAPP_NUMBER=60124134002
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create Your First Admin User

1. Start the development server:
```bash
npm run dev
```

2. Go to `http://localhost:3004/signup`
3. Create your account with your email and password
4. Go back to Supabase dashboard > **Table Editor** > **user_profiles**
5. Find your user and change the `role` from `user` to `admin`
6. Refresh the page and you should see the admin menu in the navigation

### 5. Test the System

1. **Access Admin Dashboard**: Go to `/admin` - you should see the dashboard
2. **Add a Car**: Click "Add New Car" and fill in the form
3. **Upload Images**: After creating a car, click "Manage Images" to upload photos
4. **View Marketplace**: Check `/marketplace` to see your car listed
5. **Test Authentication**: Try logging out and back in

## 📁 Project Structure

```
src/
├── app/
│   ├── admin/           # Admin dashboard and car management
│   │   ├── cars/        # Car CRUD operations
│   │   └── layout.tsx   # Admin-only layout with sidebar
│   ├── login/           # Authentication pages
│   ├── signup/
│   └── marketplace/     # Public car listings
├── components/ui/       # Reusable UI components
│   ├── image-upload.tsx # Image upload component
│   └── navigation.tsx   # Main navigation with auth
├── lib/
│   ├── supabase/        # Database client and types
│   └── hooks/           # Authentication hooks
└── middleware.ts        # Route protection
```

## 🔧 Key Features Implemented

### ✅ Admin Dashboard
- **Car Management**: Full CRUD operations for car listings
- **Image Upload**: Drag & drop image upload with Supabase Storage
- **User Management**: Role-based access control
- **Statistics**: Real-time dashboard with car/user stats

### ✅ Authentication System
- **User Registration**: Sign up with email verification
- **Role-based Access**: Admin, User, and Public roles
- **Protected Routes**: Middleware protects admin areas
- **Session Management**: Persistent login with Supabase Auth

### ✅ Car Listing Features
- **Comprehensive Fields**: 50+ car specification fields
- **Status Management**: Available, Sold, Coming Soon, etc.
- **Image Galleries**: Multiple images with primary image selection
- **Search & Filter**: Advanced filtering and search
- **Responsive Design**: Mobile-optimized interface

## 🎯 What's Working Now

1. **Complete Admin System**: Add, edit, delete cars with full form validation
2. **Image Management**: Upload, organize, and manage car photos
3. **Authentication**: Secure login/signup with role-based access
4. **Database**: Fully configured with relationships and policies
5. **Responsive UI**: Works perfectly on desktop and mobile

## 🔄 Next Steps (Not Yet Implemented)

1. **Marketplace Integration**: Connect existing marketplace UI to Supabase data
2. **User Favorites**: Allow users to save favorite cars
3. **WhatsApp Integration**: Pre-filled WhatsApp messages
4. **Email Notifications**: Inquiry and user management emails
5. **SEO Optimization**: Meta tags and sitemaps

## 🚨 Important Notes

### Security
- Never commit your `.env.local` file
- The service role key should only be used server-side
- RLS (Row Level Security) is enabled on all tables

### Image Storage
- Images are stored in Supabase Storage
- Maximum 10MB per image
- Supports JPG, PNG, WebP formats
- Automatic URL generation for public access

### Database
- All car data is in the `cars` table
- Images are in the `car_images` table with relationships
- User profiles extend the built-in auth.users table
- Full-text search is enabled on car names and descriptions

## 🐛 Troubleshooting

### Common Issues

1. **"Policy not found" errors**: Make sure you ran the complete schema including RLS policies
2. **Image upload fails**: Check your storage bucket is public and has correct policies
3. **Admin access denied**: Verify your user role is set to 'admin' in user_profiles table
4. **Build errors**: Make sure all environment variables are set correctly

### Support
- Check the browser console for detailed error messages
- Verify Supabase project is active and accessible
- Ensure all environment variables are correctly set

## 📋 Deployment Checklist

When ready to deploy to Netlify:

1. ✅ Set up production Supabase project
2. ✅ Configure environment variables in Netlify
3. ✅ Set up custom domain (if needed)
4. ✅ Test authentication flow
5. ✅ Test image uploads
6. ✅ Verify admin access

Your luxury car listing system is now ready! 🚗✨