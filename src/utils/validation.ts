/**
 * Validation Utilities
 * Provides input validation functions for forms and user input
 */

import { MIN_RATING, MAX_RATING, MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH, MAX_USER_NAME_LENGTH } from './constants';

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates a rating value
 * @param rating - The rating to validate (1-5)
 * @returns ValidationResult indicating if rating is valid
 */
export function validateRating(rating: number): ValidationResult {
  if (isNaN(rating)) {
    return { isValid: false, error: 'Rating must be a number' };
  }
  
  if (rating < MIN_RATING || rating > MAX_RATING) {
    return { 
      isValid: false, 
      error: `Rating must be between ${MIN_RATING} and ${MAX_RATING}` 
    };
  }
  
  return { isValid: true };
}

/**
 * Validates a review comment
 * @param comment - The comment text to validate
 * @returns ValidationResult indicating if comment is valid
 */
export function validateComment(comment: string): ValidationResult {
  if (!comment || comment.trim().length === 0) {
    return { isValid: false, error: 'Comment is required' };
  }
  
  if (comment.trim().length < MIN_COMMENT_LENGTH) {
    return { 
      isValid: false, 
      error: `Comment must be at least ${MIN_COMMENT_LENGTH} characters` 
    };
  }
  
  if (comment.length > MAX_COMMENT_LENGTH) {
    return { 
      isValid: false, 
      error: `Comment must be no more than ${MAX_COMMENT_LENGTH} characters` 
    };
  }
  
  return { isValid: true };
}

/**
 * Validates a user name
 * @param userName - The user name to validate
 * @returns ValidationResult indicating if user name is valid
 */
export function validateUserName(userName: string): ValidationResult {
  if (!userName || userName.trim().length === 0) {
    return { isValid: false, error: 'Name is required' };
  }
  
  if (userName.trim().length > MAX_USER_NAME_LENGTH) {
    return { 
      isValid: false, 
      error: `Name must be no more than ${MAX_USER_NAME_LENGTH} characters` 
    };
  }
  
  // Check for potentially harmful characters (basic sanitization)
  const harmfulPattern = /[<>{}]/;
  if (harmfulPattern.test(userName)) {
    return { isValid: false, error: 'Name contains invalid characters' };
  }
  
  return { isValid: true };
}

/**
 * Validates a verification answer
 * @param answer - The answer provided by the user
 * @returns ValidationResult indicating if answer is valid
 */
export function validateVerificationAnswer(answer: number | string): ValidationResult {
  const numAnswer = typeof answer === 'string' ? parseInt(answer, 10) : answer;
  
  if (isNaN(numAnswer)) {
    return { isValid: false, error: 'Please enter a valid number' };
  }
  
  if (numAnswer < 0 || numAnswer > 20) {
    return { isValid: false, error: 'Answer must be a positive number' };
  }
  
  return { isValid: true };
}


