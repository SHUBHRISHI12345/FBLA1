/**
 * SearchBar Component
 * Global search component with real-time search
 */

import { useState, useEffect, useRef } from 'react';
import { Input } from './ui';
import styles from './SearchBar.module.css';

export interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

/**
 * SearchBar component with debounced search
 */
export default function SearchBar({ 
  onSearch, 
  placeholder = 'Search businesses...',
  debounceMs = 300 
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const debounceRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Clear previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set new timeout
    debounceRef.current = setTimeout(() => {
      onSearch(query);
    }, debounceMs);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, onSearch, debounceMs]);

  return (
    <div className={styles.searchBar}>
      <Input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        fullWidth
        leftIcon={
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 19L14.65 14.65"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      />
    </div>
  );
}

