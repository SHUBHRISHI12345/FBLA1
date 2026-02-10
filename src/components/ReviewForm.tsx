/**
 * ReviewForm Component
 * Form for submitting reviews with rating and comment
 */

import { useState } from 'react';
import type { Review } from '../types';
import { reviewService } from '../services/reviewService';
import { validateRating, validateComment, validateUserName } from '../utils/validation';
import { MIN_RATING, MAX_RATING } from '../utils/constants';
import VerificationModal from './VerificationModal';
import styles from '../styles/App.module.css';

/**
 * ReviewForm component props
 */
interface ReviewFormProps {
  businessId: string;
  onReviewSubmitted: () => void;
}

/**
 * ReviewForm component
 * Allows users to submit reviews with verification
 */
export default function ReviewForm({ businessId, onReviewSubmitted }: ReviewFormProps) {
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showVerification, setShowVerification] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate all fields
    const userNameValidation = validateUserName(userName);
    const ratingValidation = validateRating(rating);
    const commentValidation = validateComment(comment);

    if (!userNameValidation.isValid) {
      setErrors(prev => ({ ...prev, userName: userNameValidation.error || 'Invalid name' }));
    }
    if (!ratingValidation.isValid) {
      setErrors(prev => ({ ...prev, rating: ratingValidation.error || 'Invalid rating' }));
    }
    if (!commentValidation.isValid) {
      setErrors(prev => ({ ...prev, comment: commentValidation.error || 'Invalid comment' }));
    }

    // If validation fails, don't proceed
    if (!userNameValidation.isValid || !ratingValidation.isValid || !commentValidation.isValid) {
      return;
    }

    // Show verification modal
    setShowVerification(true);
  };

  const handleVerificationSuccess = () => {
    setIsSubmitting(true);

    // Create review object
    const review: Review = {
      id: `rev-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      businessId,
      userName: userName.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toISOString(),
      verified: true
    };

    // Save review using reviewService
    reviewService.addReview(businessId, review);

    // Reset form
    setUserName('');
    setRating(5);
    setComment('');
    setErrors({});
    setIsSubmitting(false);

    // Notify parent component
    onReviewSubmitted();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="review-user-name" className={styles.label}>
            Your Name *
          </label>
          <input
            id="review-user-name"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className={styles.input}
            required
            aria-required="true"
            aria-invalid={errors.userName ? 'true' : 'false'}
            aria-describedby={errors.userName ? 'user-name-error' : undefined}
          />
          {errors.userName && (
            <div id="user-name-error" className={styles.error} role="alert">
              {errors.userName}
            </div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Rating *
          </label>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {Array.from({ length: MAX_RATING }).map((_, i) => {
              const starValue = i + 1;
              return (
                <button
                  key={starValue}
                  type="button"
                  onClick={() => setRating(starValue)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '2rem',
                    cursor: 'pointer',
                    color: starValue <= rating ? '#fbbf24' : '#d1d5db',
                    padding: 0,
                    lineHeight: 1
                  }}
                  aria-label={`Rate ${starValue} out of ${MAX_RATING} stars`}
                  aria-pressed={starValue === rating}
                >
                  ★
                </button>
              );
            })}
            <span style={{ marginLeft: '0.5rem', color: '#6b7280' }}>
              {rating} {rating === 1 ? 'star' : 'stars'}
            </span>
          </div>
          {errors.rating && (
            <div className={styles.error} role="alert">
              {errors.rating}
            </div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="review-comment" className={styles.label}>
            Your Review *
          </label>
          <textarea
            id="review-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className={styles.textarea}
            required
            minLength={MIN_RATING}
            maxLength={500}
            aria-required="true"
            aria-invalid={errors.comment ? 'true' : 'false'}
            aria-describedby={errors.comment ? 'comment-error' : undefined}
          />
          <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
            {comment.length} / 500 characters
          </div>
          {errors.comment && (
            <div id="comment-error" className={styles.error} role="alert">
              {errors.comment}
            </div>
          )}
        </div>

        <button 
          type="submit" 
          className={styles.button}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>

      <VerificationModal
        isOpen={showVerification}
        onClose={() => setShowVerification(false)}
        onVerify={handleVerificationSuccess}
      />
    </>
  );
}

