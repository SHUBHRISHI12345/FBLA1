/**
 * FavoritesButton Component
 * Button to add/remove a business from favorites
 */

import { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import styles from '../styles/App.module.css';

/**
 * FavoritesButton component props
 */
interface FavoritesButtonProps {
  businessId: string;
}

/**
 * FavoritesButton component
 * Toggles favorite status for a business
 */
export default function FavoritesButton({ businessId }: FavoritesButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Check favorite status on mount and when businessId changes
  useEffect(() => {
    setIsFavorite(storageService.isFavorite(businessId));
  }, [businessId]);

  const handleToggleFavorite = () => {
    storageService.toggleFavorite(businessId);
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={`${styles.button} ${isFavorite ? '' : styles.buttonSecondary}`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={isFavorite}
    >
      {isFavorite ? '★ Favorited' : '☆ Add to Favorites'}
    </button>
  );
}


