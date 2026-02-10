/**
 * Application Constants
 * Centralized constants used throughout the application
 */

import type { BusinessCategory, SortOption } from '../types';

/**
 * Business categories available in the application
 */
export const CATEGORIES: BusinessCategory[] = ['food', 'retail', 'services'];

/**
 * Category display names for UI
 */
export const CATEGORY_NAMES: Record<BusinessCategory, string> = {
  food: 'Food & Dining',
  retail: 'Retail & Shopping',
  services: 'Services'
};

/**
 * Sort options available for business listing
 */
export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'rating-high', label: 'Rating: High to Low' },
  { value: 'rating-low', label: 'Rating: Low to High' },
  { value: 'reviews-high', label: 'Most Reviews' },
  { value: 'reviews-low', label: 'Fewest Reviews' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' }
];

/**
 * Maximum rating value (stars)
 */
export const MAX_RATING = 5;

/**
 * Minimum rating value (stars)
 */
export const MIN_RATING = 1;

/**
 * Maximum length for review comments
 */
export const MAX_COMMENT_LENGTH = 500;

/**
 * Minimum length for review comments
 */
export const MIN_COMMENT_LENGTH = 10;

/**
 * Maximum length for user names
 */
export const MAX_USER_NAME_LENGTH = 50;

