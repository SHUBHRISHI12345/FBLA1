/**
 * Review Service
 * Handles review-related operations and business logic
 */

import type { Review } from '../types';
import { storageService } from './storageService';
import { businessService } from './businessService';

/**
 * ReviewService class
 * Provides methods for managing reviews and ratings
 */
class ReviewService {
  /**
   * Adds a review to a business
   * Updates the business's average rating and review count
   * @param businessId - ID of the business
   * @param review - The review to add
   */
  addReview(businessId: string, review: Review): void {
    // Use storageService to persist the review
    storageService.addReview(businessId, review);
  }

  /**
   * Gets all reviews for a specific business
   * @param businessId - ID of the business
   * @returns Array of reviews for the business
   */
  getReviewsForBusiness(businessId: string): Review[] {
    const business = businessService.getBusinessById(businessId);
    return business?.reviews || [];
  }

  /**
   * Calculates the average rating from an array of reviews
   * @param reviews - Array of reviews
   * @returns Average rating (0-5)
   */
  calculateAverageRating(reviews: Review[]): number {
    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  }

  /**
   * Gets the total number of reviews for a business
   * @param businessId - ID of the business
   * @returns Number of reviews
   */
  getReviewCount(businessId: string): number {
    const reviews = this.getReviewsForBusiness(businessId);
    return reviews.length;
  }

  /**
   * Gets the average rating for a business
   * @param businessId - ID of the business
   * @returns Average rating (0-5)
   */
  getAverageRating(businessId: string): number {
    const reviews = this.getReviewsForBusiness(businessId);
    return this.calculateAverageRating(reviews);
  }

  /**
   * Sorts reviews by date (newest first)
   * @param reviews - Array of reviews to sort
   * @returns Sorted array of reviews
   */
  sortReviewsByDate(reviews: Review[], newestFirst: boolean = true): Review[] {
    const sorted = [...reviews];
    sorted.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return newestFirst ? dateB - dateA : dateA - dateB;
    });
    return sorted;
  }

  /**
   * Sorts reviews by rating (highest first)
   * @param reviews - Array of reviews to sort
   * @returns Sorted array of reviews
   */
  sortReviewsByRating(reviews: Review[], highestFirst: boolean = true): Review[] {
    const sorted = [...reviews];
    sorted.sort((a, b) => {
      return highestFirst ? b.rating - a.rating : a.rating - b.rating;
    });
    return sorted;
  }
}

// Export singleton instance
export const reviewService = new ReviewService();

