/**
 * Storage Service
 * Handles all localStorage operations for the Business Boost application
 * Provides methods to save, load, and initialize application data
 */

import type { AppData, Business, Review, Deal, UserFavorites, SeedData } from '../types';

const STORAGE_KEY = 'businessBoostData';
const SEED_DATA_PATH = '/seed-data.json';

/**
 * StorageService class
 * Manages localStorage operations and data initialization
 */
class StorageService {
  /**
   * Loads application data from localStorage
   * @returns AppData if found, null otherwise
   */
  loadData(): AppData | null {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data) as AppData;
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
    return null;
  }

  /**
   * Saves application data to localStorage
   * @param data - The AppData object to save
   */
  saveData(data: AppData): void {
    try {
      const dataToSave = {
        ...data,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
      // Handle storage quota exceeded error
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        alert('Storage limit exceeded. Please clear some data.');
      }
    }
  }

  /**
   * Loads seed data from the JSON file
   * @returns Promise resolving to SeedData
   */
  async loadSeedData(): Promise<SeedData> {
    try {
      const response = await fetch(SEED_DATA_PATH);
      if (!response.ok) {
        throw new Error(`Failed to load seed data: ${response.statusText}`);
      }
      return await response.json() as SeedData;
    } catch (error) {
      console.error('Error loading seed data:', error);
      throw error;
    }
  }

  /**
   * Initializes application data
   * Loads seed data and sets up initial structure if localStorage is empty
   * @returns Promise resolving to AppData
   */
  async initializeData(): Promise<AppData> {
    // Check if data already exists in localStorage
    const existingData = this.loadData();
    if (existingData && existingData.businesses.length > 0) {
      return existingData;
    }

    // Load seed data
    const seedData = await this.loadSeedData();
    
    // Extract reviews and deals from businesses
    const allReviews: Review[] = [];
    const allDeals: Deal[] = [];
    
    seedData.businesses.forEach(business => {
      // Add business reviews to allReviews array
      business.reviews.forEach(review => {
        allReviews.push(review);
      });
      
      // Add business deals to allDeals array
      business.deals.forEach(deal => {
        allDeals.push(deal);
      });
    });

    // Create initial favorites structure
    const initialFavorites: UserFavorites = {
      userId: 'default-user',
      favoriteBusinessIds: []
    };

    // Create AppData structure
    const appData: AppData = {
      businesses: seedData.businesses,
      reviews: allReviews,
      deals: allDeals,
      favorites: initialFavorites,
      lastUpdated: new Date().toISOString()
    };

    // Save to localStorage
    this.saveData(appData);
    
    return appData;
  }

  /**
   * Clears all application data from localStorage
   * Useful for testing or resetting the application
   */
  clearData(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  /**
   * Updates a specific business in the data
   * @param businessId - ID of the business to update
   * @param updates - Partial business object with updates
   */
  updateBusiness(businessId: string, updates: Partial<Business>): void {
    const data = this.loadData();
    if (!data) return;

    const businessIndex = data.businesses.findIndex(b => b.id === businessId);
    if (businessIndex !== -1) {
      data.businesses[businessIndex] = {
        ...data.businesses[businessIndex],
        ...updates
      };
      this.saveData(data);
    }
  }

  /**
   * Adds a review to a business and updates the business's review data
   * @param businessId - ID of the business
   * @param review - The review to add
   */
  addReview(businessId: string, review: Review): void {
    const data = this.loadData();
    if (!data) return;

    // Add review to reviews array
    data.reviews.push(review);

    // Find business and update its reviews
    const business = data.businesses.find(b => b.id === businessId);
    if (business) {
      business.reviews.push(review);
      
      // Recalculate average rating
      const totalRating = business.reviews.reduce((sum, r) => sum + r.rating, 0);
      business.averageRating = totalRating / business.reviews.length;
      business.reviewCount = business.reviews.length;
    }

    this.saveData(data);
  }

  /**
   * Toggles favorite status for a business
   * @param businessId - ID of the business to favorite/unfavorite
   */
  toggleFavorite(businessId: string): void {
    const data = this.loadData();
    if (!data) return;

    const favoriteIndex = data.favorites.favoriteBusinessIds.indexOf(businessId);
    
    if (favoriteIndex === -1) {
      // Add to favorites
      data.favorites.favoriteBusinessIds.push(businessId);
    } else {
      // Remove from favorites
      data.favorites.favoriteBusinessIds.splice(favoriteIndex, 1);
    }

    this.saveData(data);
  }

  /**
   * Checks if a business is favorited
   * @param businessId - ID of the business to check
   * @returns true if favorited, false otherwise
   */
  isFavorite(businessId: string): boolean {
    const data = this.loadData();
    if (!data) return false;
    
    return data.favorites.favoriteBusinessIds.includes(businessId);
  }
}

// Export singleton instance
export const storageService = new StorageService();

