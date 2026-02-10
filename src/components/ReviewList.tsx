/**
 * ReviewList Component
 * Displays a list of reviews for a business
 */

import type { Review } from '../types';
import styles from '../styles/App.module.css';

/**
 * Renders a star rating display
 * @param rating - The rating value (1-5)
 */
function StarRating({ rating }: { rating: number }) {
  return (
    <div aria-label={`Rating: ${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden="true">
          {i < rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
}

/**
 * ReviewList component props
 */
interface ReviewListProps {
  reviews: Review[];
}

/**
 * ReviewList component
 * Displays a list of reviews
 */
export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No reviews yet. Be the first to leave a review!</p>
      </div>
    );
  }

  // Sort reviews by date (newest first)
  const sortedReviews = [...reviews].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', color: '#111827' }}>
        Reviews ({reviews.length})
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {sortedReviews.map(review => (
          <div key={review.id} className={styles.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
              <div>
                <div style={{ fontWeight: '600', color: '#111827', marginBottom: '0.25rem' }}>
                  {review.userName}
                </div>
                <StarRating rating={review.rating} />
              </div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                {new Date(review.date).toLocaleDateString()}
              </div>
            </div>
            <p style={{ margin: '0.5rem 0 0 0', color: '#374151' }}>
              {review.comment}
            </p>
            {review.verified && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#10b981' }}>
                ✓ Verified
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

