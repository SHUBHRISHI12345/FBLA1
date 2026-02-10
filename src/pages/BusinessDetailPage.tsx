/**
 * BusinessDetailPage Component
 * Page displaying detailed business information, deals, and reviews
 */

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Business } from '../types';
import { businessService } from '../services/businessService';
import BusinessDetail from '../components/BusinessDetail';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import styles from '../styles/App.module.css';

/**
 * BusinessDetailPage component
 * Displays full business details with reviews and review form
 */
export default function BusinessDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [business, setBusiness] = useState<Business | undefined>(undefined);
  const [refreshKey, setRefreshKey] = useState(0);

  // Load business data
  useEffect(() => {
    if (id) {
      const businessData = businessService.getBusinessById(id);
      if (businessData) {
        setBusiness(businessData);
      } else {
        // Business not found, redirect to home
        navigate('/');
      }
    }
  }, [id, navigate, refreshKey]);

  // Refresh business data after review submission
  const handleReviewSubmitted = () => {
    if (id) {
      const updatedBusiness = businessService.getBusinessById(id);
      if (updatedBusiness) {
        setBusiness(updatedBusiness);
        setRefreshKey(prev => prev + 1);
      }
    }
  };

  if (!business) {
    return (
      <div className={styles.loading}>
        Loading business details...
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => navigate('/')}
        className={styles.buttonSecondary}
        style={{ marginBottom: '1.5rem' }}
      >
        ← Back to Businesses
      </button>

      <BusinessDetail business={business} />

      <div style={{ marginTop: '2rem' }}>
        <ReviewList reviews={business.reviews} />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', color: '#111827' }}>
          Write a Review
        </h2>
        <ReviewForm businessId={business.id} onReviewSubmitted={handleReviewSubmitted} />
      </div>
    </div>
  );
}

