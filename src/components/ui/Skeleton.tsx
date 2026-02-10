/**
 * Skeleton Component
 * Loading skeleton placeholder
 */

import styles from './Skeleton.module.css';

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'circular' | 'rectangular';
  className?: string;
}

/**
 * Skeleton loading placeholder
 */
export default function Skeleton({
  width,
  height,
  variant = 'rectangular',
  className = '',
}: SkeletonProps) {
  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={`${styles.skeleton} ${styles[`skeleton--${variant}`]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

