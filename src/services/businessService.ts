/**
 * Business Service
 * Handles business-related data operations
 */

import type { Business, BusinessCategory, SortOption } from '../types';
import { storageService } from './storageService';

/**
 * BusinessService class
 * Provides methods for retrieving and manipulating business data
 */
class BusinessService {
  /**
   * Gets all businesses from storage
   * @returns Array of all businesses
   */
  getAllBusinesses(): Business[] {
    const data = storageService.loadData();
    return data?.businesses || [];
  }

  /**
   * Gets a business by ID
   * @param id - The business ID
   * @returns Business if found, undefined otherwise
   */
  getBusinessById(id: string): Business | undefined {
    const businesses = this.getAllBusinesses();
    return businesses.find(b => b.id === id);
  }

  /**
   * Filters businesses by category
   * @param businesses - Array of businesses to filter
   * @param category - Category to filter by (or null for all)
   * @returns Filtered array of businesses
   */
  filterByCategory(businesses: Business[], category: BusinessCategory | null): Business[] {
    if (!category) {
      return businesses;
    }
    return businesses.filter(b => b.category === category);
  }

  /**
   * Sorts businesses by the specified option
   * @param businesses - Array of businesses to sort
   * @param sortOption - Sort option to apply
   * @returns Sorted array of businesses
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
   * Gets businesses that are favorited
   * @returns Array of favorited businesses
   */
  getFavoriteBusinesses(): Business[] {
    const data = storageService.loadData();
    if (!data) return [];

    const favoriteIds = data.favorites.favoriteBusinessIds;
    return this.getAllBusinesses().filter(b => favoriteIds.includes(b.id));
  }
}

// Export singleton instance
export const businessService = new BusinessService();

