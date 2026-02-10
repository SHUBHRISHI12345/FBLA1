/**
 * FavoritesPage Component
 * Displays all favorited businesses
 */

import { useState, useEffect } from 'react';
import type { Business } from '../types';
import { businessService } from '../services/businessService';
import BusinessCard from '../components/BusinessCard';
import styles from '../styles/App.module.css';

/**
 * FavoritesPage component
 * Displays list of favorited businesses
 */
export default function FavoritesPage() {
  const [favoriteBusinesses, setFavoriteBusinesses] = useState<Business[]>([]);

  // Load favorite businesses
  useEffect(() => {
    const favorites = businessService.getFavoriteBusinesses();
    setFavoriteBusinesses(favorites);
  }, []);

  // Refresh favorites when storage changes (handled by checking on focus)
  useEffect(() => {
    const handleFocus = () => {
      const favorites = businessService.getFavoriteBusinesses();
      setFavoriteBusinesses(favorites);
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem', fontSize: '2rem', color: '#111827' }}>
        My Favorite Businesses
      </h1>

      {favoriteBusinesses.length === 0 ? (
        <div className={styles.emptyState}>
          <h2 className={styles.emptyStateTitle}>No favorites yet</h2>
          <p>Start exploring businesses and add them to your favorites!</p>
        </div>
      ) : (
        <div className={`${styles.grid} ${styles.gridCols3}`}>
          {favoriteBusinesses.map(business => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      )}
    </div>
  );
}

