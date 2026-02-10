/**
 * Analytics Service
 * Handles analytics data fetching
 */

import { supabase } from '../lib/supabase';

/**
 * AnalyticsService class
 * Provides analytics and statistics
 */
class AnalyticsService {
  /**
   * Gets business statistics
   */
  async getBusinessStats(businessId: string) {
    if (!import.meta.env.VITE_SUPABASE_URL) {
      return null;
    }

    try {
      // Get review count and average rating
      const { data: reviews } = await supabase
        .from('reviews')
        .select('rating')
        .eq('business_id', businessId);

      const reviewCount = reviews?.length || 0;
      const averageRating =
        reviews && reviews.length > 0
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          : 0;

      // Get favorite count
      const { count: favoriteCount } = await supabase
        .from('favorites')
        .select('*', { count: 'exact', head: true })
        .eq('business_id', businessId);

      // Get deal count
      const { count: dealCount } = await supabase
        .from('deals')
        .select('*', { count: 'exact', head: true })
        .eq('business_id', businessId)
        .eq('active', true);

      return {
        reviewCount,
        averageRating,
        favoriteCount: favoriteCount || 0,
        dealCount: dealCount || 0,
      };
    } catch (error) {
      console.error('Error fetching business stats:', error);
      return null;
    }
  }

  /**
   * Gets popular businesses
   */
  async getPopularBusinesses(limit: number = 10) {
    if (!import.meta.env.VITE_SUPABASE_URL) {
      return [];
    }

    try {
      // This would require a more complex query with aggregations
      // For now, return empty array
      return [];
    } catch (error) {
      console.error('Error fetching popular businesses:', error);
      return [];
    }
  }
}

// Export singleton instance
export const analyticsService = new AnalyticsService();

