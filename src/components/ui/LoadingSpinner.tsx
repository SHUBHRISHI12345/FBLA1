/**
 * LoadingSpinner Component
 * Loading indicator with multiple sizes
 */

import styles from './LoadingSpinner.module.css';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Loading spinner component
 */
export default function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  return (
    <div
      className={`${styles.spinner} ${styles[`spinner--${size}`]} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <div className={styles.spinnerCircle} />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

