/**
 * BusinessCard Component
 * Displays a business card with key information
 */

import { Link } from 'react-router-dom';
import type { Business } from '../types';
import { CATEGORY_NAMES } from '../utils/constants';
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
    <div className="star-rating" aria-label={`Rating: ${rating.toFixed(1)} out of 5 stars`} style={{ display: 'inline-block' }}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={i} aria-hidden="true" style={{ color: '#fbbf24' }}>★</span>
      ))}
      {hasHalfStar && <span aria-hidden="true" style={{ color: '#d1d5db' }}>☆</span>}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <span key={i} aria-hidden="true" style={{ color: '#d1d5db' }}>☆</span>
      ))}
      <span className="sr-only">{rating.toFixed(1)} out of 5</span>
    </div>
  );
}

/**
 * BusinessCard component props
 */
interface BusinessCardProps {
  business: Business;
}

/**
 * BusinessCard component
 * Displays business information in a card format
 */
export default function BusinessCard({ business }: BusinessCardProps) {
  return (
    <Link 
      to={`/business/${business.id}`} 
      className={styles.card}
      aria-label={`View details for ${business.name}`}
    >
      <div style={{ marginBottom: '0.5rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', color: '#111827' }}>
          {business.name}
        </h3>
        <span 
          style={{ 
            display: 'inline-block', 
            padding: '0.25rem 0.75rem', 
            backgroundColor: '#e0e7ff', 
            color: '#3730a3',
            borderRadius: '4px',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}
        >
          {CATEGORY_NAMES[business.category]}
        </span>
      </div>
      
      <p style={{ margin: '0.75rem 0', color: '#6b7280', fontSize: '0.875rem' }}>
        {business.description.length > 100 
          ? `${business.description.substring(0, 100)}...` 
          : business.description}
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
        <div>
          <StarRating rating={business.averageRating} />
          <span style={{ marginLeft: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
            ({business.reviewCount} {business.reviewCount === 1 ? 'review' : 'reviews'})
          </span>
        </div>
        
        {business.deals.length > 0 && (
          <span 
            style={{ 
              padding: '0.25rem 0.5rem', 
              backgroundColor: '#fef3c7', 
              color: '#92400e',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: '600'
            }}
          >
            {business.deals.filter(d => d.active).length} Deal{business.deals.filter(d => d.active).length !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    </Link>
  );
}

