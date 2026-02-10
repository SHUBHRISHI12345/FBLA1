/**
 * Supabase Business Service
 * Business operations using Supabase with localStorage fallback
 */

import { supabase } from '../lib/supabase';
import type { Business, BusinessCategory, SortOption } from '../types';
import { storageService } from './storageService';

/**
 * SupabaseBusinessService class
 * Provides Supabase-based business operations with localStorage fallback
 */
class SupabaseBusinessService {
  /**
   * Checks if Supabase is available
   */
  private isSupabaseAvailable(): boolean {
    return !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY;
  }

  /**
   * Gets all businesses from Supabase or localStorage
   */
  async getAllBusinesses(): Promise<Business[]> {
    if (this.isSupabaseAvailable()) {
      try {
        const { data, error } = await supabase
          .from('businesses')
          .select(`
            *,
            reviews:reviews(*),
            deals:deals(*)
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Transform Supabase data to Business format
        const businesses: Business[] = (data || []).map((b: any) => {
          const reviews = b.reviews || [];
          const deals = b.deals || [];
          
          // Calculate average rating
          const averageRating = reviews.length > 0
            ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length
            : 0;

          return {
            id: b.id,
            name: b.name,
            category: b.category as BusinessCategory,
            description: b.description || '',
            address: b.address,
            phone: b.phone || undefined,
            deals: deals.map((d: any) => ({
              id: d.id,
              businessId: d.business_id,
              title: d.title,
              description: d.description || '',
              discount: d.discount || undefined,
              code: d.code || undefined,
              expiryDate: d.expiry_date || undefined,
              active: d.active,
            })),
            reviews: reviews.map((r: any) => ({
              id: r.id,
              businessId: r.business_id,
              userName: r.user_id || 'Anonymous',
              rating: r.rating,
              comment: r.comment,
              date: r.created_at,
              verified: r.verified,
            })),
            averageRating,
            reviewCount: reviews.length,
            createdAt: b.created_at,
          };
        });

        // Cache in localStorage
        const cachedData = storageService.loadData();
        if (cachedData) {
          cachedData.businesses = businesses;
          storageService.saveData(cachedData);
        }

        return businesses;
      } catch (error) {
        console.error('Error fetching businesses from Supabase:', error);
        // Fallback to localStorage
      }
    }

    // Fallback to localStorage
    return storageService.loadData()?.businesses || [];
  }

  /**
   * Gets a business by ID
   */
  async getBusinessById(id: string): Promise<Business | undefined> {
    if (this.isSupabaseAvailable()) {
      try {
        const { data, error } = await supabase
          .from('businesses')
          .select(`
            *,
            reviews:reviews(*),
            deals:deals(*)
          `)
          .eq('id', id)
          .single();

        if (error) throw error;

        // Transform to Business format (same as getAllBusinesses)
        const reviews = data.reviews || [];
        const deals = data.deals || [];
        const averageRating = reviews.length > 0
          ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length
          : 0;

        return {
          id: data.id,
          name: data.name,
          category: data.category as BusinessCategory,
          description: data.description || '',
          address: data.address,
          phone: data.phone || undefined,
          deals: deals.map((d: any) => ({
            id: d.id,
            businessId: d.business_id,
            title: d.title,
            description: d.description || '',
            discount: d.discount || undefined,
            code: d.code || undefined,
            expiryDate: d.expiry_date || undefined,
            active: d.active,
          })),
          reviews: reviews.map((r: any) => ({
            id: r.id,
            businessId: r.business_id,
            userName: r.user_id || 'Anonymous',
            rating: r.rating,
            comment: r.comment,
            date: r.created_at,
            verified: r.verified,
          })),
          averageRating,
          reviewCount: reviews.length,
          createdAt: data.created_at,
        };
      } catch (error) {
        console.error('Error fetching business from Supabase:', error);
      }
    }

    // Fallback to localStorage
    const businesses = storageService.loadData()?.businesses || [];
    return businesses.find(b => b.id === id);
  }

  /**
   * Filters businesses by category
   */
  filterByCategory(businesses: Business[], category: BusinessCategory | null): Business[] {
    if (!category) {
      return businesses;
    }
    return businesses.filter(b => b.category === category);
  }

  /**
   * Sorts businesses by the specified option
   */
  sortBusinesses(businesses: Business[], sortOption: SortOption): Business[] {
    const sorted = [...businesses];

    switch (sortOption) {
      case 'rating-high':
        return sorted.sort((a, b) => b.averageRating - a.averageRating);
      case 'rating-low':
        return sorted.sort((a, b) => a.averageRating - b.averageRating);
      case 'reviews-high':
        return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
      case 'reviews-low':
        return sorted.sort((a, b) => a.reviewCount - b.reviewCount);
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sorted;
    }
  }

  /**
   * Gets favorite businesses for current user
   */
  async getFavoriteBusinesses(userId?: string): Promise<Business[]> {
    if (this.isSupabaseAvailable() && userId) {
      try {
        const { data, error } = await supabase
          .from('favorites')
          .select('business_id')
          .eq('user_id', userId);

        if (error) throw error;

        const favoriteIds = (data || []).map((f: any) => f.business_id);
        const allBusinesses = await this.getAllBusinesses();
        return allBusinesses.filter(b => favoriteIds.includes(b.id));
      } catch (error) {
        console.error('Error fetching favorites from Supabase:', error);
      }
    }

    // Fallback to localStorage
    const data = storageService.loadData();
    if (!data) return [];
    const favoriteIds = data.favorites.favoriteBusinessIds;
    const allBusinesses = await this.getAllBusinesses();
    return allBusinesses.filter(b => favoriteIds.includes(b.id));
  }
}

// Export singleton instance
export const supabaseBusinessService = new SupabaseBusinessService();

