/**
 * BusinessDetail Component
 * Displays detailed information about a business
 */

import type { Business } from '../types';
import { CATEGORY_NAMES } from '../utils/constants';
import DealCard from './DealCard';
import FavoritesButton from './FavoritesButton';
import styles from '../styles/App.module.css';

/**
 * Renders a star rating display
 * @param rating - The rating value (1-5)
 */
function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div aria-label={`Rating: ${rating} out of 5 stars`} style={{ fontSize: '1.5rem' }}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={i} aria-hidden="true">★</span>
      ))}
      {hasHalfStar && <span aria-hidden="true">☆</span>}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <span key={i} aria-hidden="true">☆</span>
      ))}
      <span style={{ marginLeft: '0.5rem', fontSize: '1rem', verticalAlign: 'middle' }}>
        {rating.toFixed(1)} ({rating} {rating === 1 ? 'star' : 'stars'})
      </span>
    </div>
  );
}

/**
 * BusinessDetail component props
 */
interface BusinessDetailProps {
  business: Business;
}

/**
 * BusinessDetail component
 * Displays full business information
 */
export default function BusinessDetail({ business }: BusinessDetailProps) {
  const activeDeals = business.deals.filter(deal => deal.active);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem', color: '#111827' }}>
            {business.name}
          </h1>
          <span 
            style={{ 
              display: 'inline-block', 
              padding: '0.5rem 1rem', 
              backgroundColor: '#e0e7ff', 
              color: '#3730a3',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: '500',
              marginBottom: '1rem'
            }}
          >
            {CATEGORY_NAMES[business.category]}
          </span>
        </div>
        <FavoritesButton businessId={business.id} />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <StarRating rating={business.averageRating} />
        <p style={{ marginTop: '0.5rem', color: '#6b7280' }}>
          {business.reviewCount} {business.reviewCount === 1 ? 'review' : 'reviews'}
        </p>
      </div>

      <div className={styles.card} style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', color: '#111827' }}>
          About
        </h2>
        <p style={{ margin: '0 0 1rem 0', color: '#374151', lineHeight: '1.6' }}>
          {business.description}
        </p>
        
        <div style={{ marginTop: '1rem' }}>
          <p style={{ margin: '0.5rem 0', color: '#374151' }}>
            <strong>Address:</strong> {business.address}
          </p>
          {business.phone && (
            <p style={{ margin: '0.5rem 0', color: '#374151' }}>
              <strong>Phone:</strong> {business.phone}
            </p>
          )}
        </div>
      </div>

      {activeDeals.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', color: '#111827' }}>
            Special Deals & Coupons
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {activeDeals.map(deal => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

