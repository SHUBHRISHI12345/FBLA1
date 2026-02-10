/**
 * Supabase Client Configuration
 * Creates and exports the Supabase client instance
 */

import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not set. Some features may not work.');
}

/**
 * Supabase client instance
 * Used for all database operations, authentication, and storage
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Database types (will be generated from Supabase)
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
      };
      businesses: {
        Row: {
          id: string;
          name: string;
          category: string;
          description: string | null;
          address: string;
          phone: string | null;
          latitude: number | null;
          longitude: number | null;
          owner_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          description?: string | null;
          address: string;
          phone?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          owner_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string;
          description?: string | null;
          address?: string;
          phone?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          owner_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          business_id: string;
          user_id: string | null;
          rating: number;
          comment: string;
          verified: boolean;
          helpful_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          user_id?: string | null;
          rating: number;
          comment: string;
          verified?: boolean;
          helpful_count?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          business_id?: string;
          user_id?: string | null;
          rating?: number;
          comment?: string;
          verified?: boolean;
          helpful_count?: number;
          created_at?: string;
        };
      };
      deals: {
        Row: {
          id: string;
          business_id: string;
          title: string;
          description: string | null;
          discount: string | null;
          code: string | null;
          expiry_date: string | null;
          active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          title: string;
          description?: string | null;
          discount?: string | null;
          code?: string | null;
          expiry_date?: string | null;
          active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          business_id?: string;
          title?: string;
          description?: string | null;
          discount?: string | null;
          code?: string | null;
          expiry_date?: string | null;
          active?: boolean;
          created_at?: string;
        };
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          business_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          business_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          business_id?: string;
          created_at?: string;
        };
      };
      business_images: {
        Row: {
          id: string;
          business_id: string;
          image_url: string;
          is_primary: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          image_url: string;
          is_primary?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          business_id?: string;
          image_url?: string;
          is_primary?: boolean;
          created_at?: string;
        };
      };
      review_images: {
        Row: {
          id: string;
          review_id: string;
          image_url: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          review_id: string;
          image_url: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          review_id?: string;
          image_url?: string;
          created_at?: string;
        };
      };
    };
  };
};

