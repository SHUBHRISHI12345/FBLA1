/**
 * Search Service
 * Handles search operations with full-text search
 */

import { supabase } from '../lib/supabase';
import type { Business } from '../types';

/**
 * SearchService class
 * Provides search functionality with Supabase full-text search
 */
class SearchService {
  /**
   * Searches businesses by query
   */
  async searchBusinesses(query: string): Promise<Business[]> {
    if (!query.trim()) {
      return [];
    }

    // Use Supabase full-text search if available
    if (import.meta.env.VITE_SUPABASE_URL) {
      try {
        const { data, error } = await supabase
          .from('businesses')
          .select(`
            *,
            reviews:reviews(*),
            deals:deals(*)
          `)
          .textSearch('name,description,address', query, {
            type: 'websearch',
            config: 'english',
          })
          .limit(50);

        if (error) throw error;

        // Transform to Business format (similar to supabaseBusinessService)
        return (data || []).map((b: any) => {
          const reviews = b.reviews || [];
          const deals = b.deals || [];
          const averageRating = reviews.length > 0
            ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length
            : 0;

          return {
            id: b.id,
            name: b.name,
            category: b.category as any,
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
      } catch (error) {
        console.error('Error searching businesses:', error);
      }
    }

    // Fallback to client-side search
    return this.clientSideSearch(query);
  }

  /**
   * Client-side search fallback
   */
  private async clientSideSearch(query: string): Promise<Business[]> {
    const { storageService } = await import('./storageService');
    const businesses = storageService.loadData()?.businesses || [];
    const lowerQuery = query.toLowerCase();

    return businesses.filter(business => {
      return (
        business.name.toLowerCase().includes(lowerQuery) ||
        business.description.toLowerCase().includes(lowerQuery) ||
        business.address.toLowerCase().includes(lowerQuery) ||
        business.category.toLowerCase().includes(lowerQuery)
      );
    });
  }
}

// Export singleton instance
export const searchService = new SearchService();

