/**
 * SortControls Component
 * Dropdown for sorting business listings
 */

import type { SortOption } from '../types';
import { SORT_OPTIONS } from '../utils/constants';
import styles from '../styles/App.module.css';

/**
 * SortControls component props
 */
interface SortControlsProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

/**
 * SortControls component
 * Displays sort dropdown
 */
export default function SortControls({ sortOption, onSortChange }: SortControlsProps) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label htmlFor="sort-select" className={styles.label}>
        Sort by:
      </label>
      <select
        id="sort-select"
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className={styles.select}
        aria-label="Sort businesses"
      >
        {SORT_OPTIONS.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

