/**
 * HomePage Component
 * Main page displaying business listings with filtering and sorting
 */

import { useState, useEffect } from 'react';
import type { Business, BusinessCategory, SortOption } from '../types';
import { businessService } from '../services/businessService';
import BusinessCard from '../components/BusinessCard';
import CategoryFilter from '../components/CategoryFilter';
import SortControls from '../components/SortControls';
import { SORT_OPTIONS } from '../utils/constants';
import styles from '../styles/App.module.css';

/**
 * HomePage component
 * Displays all businesses with filtering and sorting capabilities
 */
export default function HomePage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>(SORT_OPTIONS[0].value);

  // Load businesses on component mount
  useEffect(() => {
    const allBusinesses = businessService.getAllBusinesses();
    setBusinesses(allBusinesses);
  }, []);

  // Apply filtering and sorting when category, sort option, or businesses change
  useEffect(() => {
    let filtered = businessService.filterByCategory(businesses, selectedCategory);
    filtered = businessService.sortBusinesses(filtered, sortOption);
    setFilteredBusinesses(filtered);
  }, [businesses, selectedCategory, sortOption]);

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem', fontSize: '2rem', color: '#111827' }}>
        Discover Local Businesses
      </h1>
      
      <CategoryFilter 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <SortControls 
        sortOption={sortOption}
        onSortChange={setSortOption}
      />

      {filteredBusinesses.length === 0 ? (
        <div className={styles.emptyState}>
          <h2 className={styles.emptyStateTitle}>No businesses found</h2>
          <p>Try selecting a different category or check back later.</p>
        </div>
      ) : (
        <div className={`${styles.grid} ${styles.gridCols3}`}>
          {filteredBusinesses.map(business => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      )}
    </div>
  );
}

