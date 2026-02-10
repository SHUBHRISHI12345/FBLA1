/**
 * CategoryFilter Component
 * Filter buttons for business categories
 */

import type { BusinessCategory } from '../types';
import { CATEGORIES, CATEGORY_NAMES } from '../utils/constants';
import styles from '../styles/App.module.css';

/**
 * CategoryFilter component props
 */
interface CategoryFilterProps {
  selectedCategory: BusinessCategory | null;
  onCategoryChange: (category: BusinessCategory | null) => void;
}

/**
 * CategoryFilter component
 * Displays category filter buttons
 */
export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div role="group" aria-label="Filter businesses by category">
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <button
          onClick={() => onCategoryChange(null)}
          className={`${styles.button} ${selectedCategory === null ? '' : styles.buttonSecondary}`}
          aria-pressed={selectedCategory === null}
        >
          All
        </button>
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`${styles.button} ${selectedCategory === category ? '' : styles.buttonSecondary}`}
            aria-pressed={selectedCategory === category}
          >
            {CATEGORY_NAMES[category]}
          </button>
        ))}
      </div>
    </div>
  );
}

