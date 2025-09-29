export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cars: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          make: string
          model: string
          year: number
          price: number
          price_currency: string | null
          status: 'available' | 'sold' | 'waiting_list' | 'coming_soon' | 'booked' | 'reserved'
          category: 'hypercar' | 'supercar' | 'luxury' | 'classic' | 'electric' | 'track' | 'sports'
          location: string | null
          mileage: string | null
          mileage_unit: string | null
          engine: string | null
          horsepower: string | null
          torque: string | null
          transmission: string | null
          drivetrain: string | null
          acceleration: string | null
          top_speed: string | null
          fuel_type: string | null
          fuel_economy: string | null
          length: string | null
          width: string | null
          height: string | null
          weight: string | null
          wheelbase: string | null
          exterior_color: string | null
          interior_color: string | null
          roof_type: string | null
          description: string | null
          condition_report: string | null
          service_history: string | null
          is_exclusive: boolean | null
          is_featured: boolean | null
          is_verified: boolean | null
          badge: string | null
          tags: string[] | null
          slug: string | null
          meta_title: string | null
          meta_description: string | null
          previous_owners: number | null
          ownership_history: string | null
          registration_documents: boolean | null
          original_price: number | null
          price_history: Json | null
          additional_specs: Json | null
          created_by: string | null
          updated_by: string | null
          search_vector: unknown | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          make: string
          model: string
          year: number
          price: number
          price_currency?: string | null
          status?: 'available' | 'sold' | 'waiting_list' | 'coming_soon' | 'booked' | 'reserved'
          category: 'hypercar' | 'supercar' | 'luxury' | 'classic' | 'electric' | 'track' | 'sports'
          location?: string | null
          mileage?: string | null
          mileage_unit?: string | null
          engine?: string | null
          horsepower?: string | null
          torque?: string | null
          transmission?: string | null
          drivetrain?: string | null
          acceleration?: string | null
          top_speed?: string | null
          fuel_type?: string | null
          fuel_economy?: string | null
          length?: string | null
          width?: string | null
          height?: string | null
          weight?: string | null
          wheelbase?: string | null
          exterior_color?: string | null
          interior_color?: string | null
          roof_type?: string | null
          description?: string | null
          condition_report?: string | null
          service_history?: string | null
          is_exclusive?: boolean | null
          is_featured?: boolean | null
          is_verified?: boolean | null
          badge?: string | null
          tags?: string[] | null
          slug?: string | null
          meta_title?: string | null
          meta_description?: string | null
          previous_owners?: number | null
          ownership_history?: string | null
          registration_documents?: boolean | null
          original_price?: number | null
          price_history?: Json | null
          additional_specs?: Json | null
          created_by?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          make?: string
          model?: string
          year?: number
          price?: number
          price_currency?: string | null
          status?: 'available' | 'sold' | 'waiting_list' | 'coming_soon' | 'booked' | 'reserved'
          category?: 'hypercar' | 'supercar' | 'luxury' | 'classic' | 'electric' | 'track' | 'sports'
          location?: string | null
          mileage?: string | null
          mileage_unit?: string | null
          engine?: string | null
          horsepower?: string | null
          torque?: string | null
          transmission?: string | null
          drivetrain?: string | null
          acceleration?: string | null
          top_speed?: string | null
          fuel_type?: string | null
          fuel_economy?: string | null
          length?: string | null
          width?: string | null
          height?: string | null
          weight?: string | null
          wheelbase?: string | null
          exterior_color?: string | null
          interior_color?: string | null
          roof_type?: string | null
          description?: string | null
          condition_report?: string | null
          service_history?: string | null
          is_exclusive?: boolean | null
          is_featured?: boolean | null
          is_verified?: boolean | null
          badge?: string | null
          tags?: string[] | null
          slug?: string | null
          meta_title?: string | null
          meta_description?: string | null
          previous_owners?: number | null
          ownership_history?: string | null
          registration_documents?: boolean | null
          original_price?: number | null
          price_history?: Json | null
          additional_specs?: Json | null
          created_by?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cars_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cars_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      car_images: {
        Row: {
          id: string
          created_at: string
          car_id: string
          image_url: string
          image_type: 'primary' | 'interior' | 'exterior' | 'engine' | 'special' | 'thumbnail'
          alt_text: string | null
          caption: string | null
          sort_order: number | null
          file_size: number | null
          width: number | null
          height: number | null
          format: string | null
          storage_path: string | null
          created_by: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          car_id: string
          image_url: string
          image_type?: 'primary' | 'interior' | 'exterior' | 'engine' | 'special' | 'thumbnail'
          alt_text?: string | null
          caption?: string | null
          sort_order?: number | null
          file_size?: number | null
          width?: number | null
          height?: number | null
          format?: string | null
          storage_path?: string | null
          created_by?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          car_id?: string
          image_url?: string
          image_type?: 'primary' | 'interior' | 'exterior' | 'engine' | 'special' | 'thumbnail'
          alt_text?: string | null
          caption?: string | null
          sort_order?: number | null
          file_size?: number | null
          width?: number | null
          height?: number | null
          format?: string | null
          storage_path?: string | null
          created_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "car_images_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "car_images_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      car_features: {
        Row: {
          id: string
          created_at: string
          car_id: string
          feature_name: string
          feature_value: string | null
          feature_category: string | null
          sort_order: number | null
        }
        Insert: {
          id?: string
          created_at?: string
          car_id: string
          feature_name: string
          feature_value?: string | null
          feature_category?: string | null
          sort_order?: number | null
        }
        Update: {
          id?: string
          created_at?: string
          car_id?: string
          feature_name?: string
          feature_value?: string | null
          feature_category?: string | null
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "car_features_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          }
        ]
      }
      user_favorites: {
        Row: {
          id: string
          created_at: string
          user_id: string
          car_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          car_id: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          car_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_favorites_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          }
        ]
      }
      virtual_tours: {
        Row: {
          id: string
          created_at: string
          car_id: string
          video_url: string | null
          video_thumbnail: string | null
          video_duration: number | null
          interior_360_images: string[] | null
          exterior_360_images: string[] | null
          ar_model_url: string | null
          vr_tour_url: string | null
          tour_title: string | null
          tour_description: string | null
          is_active: boolean | null
          created_by: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          car_id: string
          video_url?: string | null
          video_thumbnail?: string | null
          video_duration?: number | null
          interior_360_images?: string[] | null
          exterior_360_images?: string[] | null
          ar_model_url?: string | null
          vr_tour_url?: string | null
          tour_title?: string | null
          tour_description?: string | null
          is_active?: boolean | null
          created_by?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          car_id?: string
          video_url?: string | null
          video_thumbnail?: string | null
          video_duration?: number | null
          interior_360_images?: string[] | null
          exterior_360_images?: string[] | null
          ar_model_url?: string | null
          vr_tour_url?: string | null
          tour_title?: string | null
          tour_description?: string | null
          is_active?: boolean | null
          created_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "virtual_tours_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "virtual_tours_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          full_name: string | null
          avatar_url: string | null
          role: 'admin' | 'user' | 'public'
          preferred_currency: string | null
          email_notifications: boolean | null
          is_active: boolean | null
          last_seen: string | null
          profile_data: Json | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'user' | 'public'
          preferred_currency?: string | null
          email_notifications?: boolean | null
          is_active?: boolean | null
          last_seen?: string | null
          profile_data?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'user' | 'public'
          preferred_currency?: string | null
          email_notifications?: boolean | null
          is_active?: boolean | null
          last_seen?: string | null
          profile_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      car_category: 'hypercar' | 'supercar' | 'luxury' | 'classic' | 'electric' | 'track' | 'sports'
      car_status: 'available' | 'sold' | 'waiting_list' | 'coming_soon' | 'booked' | 'reserved'
      image_type: 'primary' | 'interior' | 'exterior' | 'engine' | 'special' | 'thumbnail'
      user_role: 'admin' | 'user' | 'public'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types for easier usage
export type Car = Database['public']['Tables']['cars']['Row']
export type CarInsert = Database['public']['Tables']['cars']['Insert']
export type CarUpdate = Database['public']['Tables']['cars']['Update']

export type CarImage = Database['public']['Tables']['car_images']['Row']
export type CarImageInsert = Database['public']['Tables']['car_images']['Insert']

export type CarFeature = Database['public']['Tables']['car_features']['Row']
export type CarFeatureInsert = Database['public']['Tables']['car_features']['Insert']

export type UserFavorite = Database['public']['Tables']['user_favorites']['Row']
export type UserFavoriteInsert = Database['public']['Tables']['user_favorites']['Insert']

export type VirtualTour = Database['public']['Tables']['virtual_tours']['Row']
export type VirtualTourInsert = Database['public']['Tables']['virtual_tours']['Insert']

export type UserProfile = Database['public']['Tables']['user_profiles']['Row']
export type UserProfileInsert = Database['public']['Tables']['user_profiles']['Insert']

export type CarStatus = Database['public']['Enums']['car_status']
export type CarCategory = Database['public']['Enums']['car_category']
export type ImageType = Database['public']['Enums']['image_type']
export type UserRole = Database['public']['Enums']['user_role']