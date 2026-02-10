/**
 * TypeScript interfaces for the Business Boost application
 * Defines the data structures used throughout the application
 */

/**
 * Business category types
 */
export type BusinessCategory = 'food' | 'retail' | 'services';

/**
 * Sort option types for business listing
 */
export type SortOption = 'rating-high' | 'rating-low' | 'reviews-high' | 'reviews-low' | 'name-asc' | 'name-desc';

/**
 * Deal/Coupon interface
 * Represents special offers and discounts for businesses
 */
export interface Deal {
  id: string;
  businessId: string;
  title: string;
  description: string;
  discount?: string;
  code?: string;
  expiryDate?: string;
  active: boolean;
}

/**
 * Review interface
 * Represents user reviews and ratings for businesses
 */
export interface Review {
  id: string;
  businessId: string;
  userName: string;
  rating: number; // 1-5 stars
  comment: string;
  date: string; // ISO date string
  verified: boolean; // Bot verification status
}

/**
 * Business interface
 * Represents a local business in the application
 */
export interface Business {
  id: string;
  name: string;
  category: BusinessCategory;
  description: string;
  address: string;
  phone?: string;
  deals: Deal[];
  reviews: Review[];
  averageRating: number; // Calculated average of all ratings
  reviewCount: number; // Total number of reviews
  createdAt: string; // ISO date string
}

/**
 * User favorites interface
 * Tracks which businesses a user has favorited
 */
export interface UserFavorites {
  userId: string; // Session-based user ID
  favoriteBusinessIds: string[]; // Array of business IDs
}

/**
 * Application data structure
 * Complete data structure stored in localStorage
 */
export interface AppData {
  businesses: Business[];
  reviews: Review[];
  deals: Deal[];
  favorites: UserFavorites;
  lastUpdated: string; // ISO date string
}

/**
 * Seed data structure
 * Structure of the initial seed data JSON file
 */
export interface SeedData {
  businesses: Business[];
}


