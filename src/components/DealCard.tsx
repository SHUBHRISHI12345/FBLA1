/**
 * DealCard Component
 * Displays a deal or coupon for a business
 */

import type { Deal } from '../types';
import styles from '../styles/App.module.css';

/**
 * DealCard component props
 */
interface DealCardProps {
  deal: Deal;
}

/**
 * DealCard component
 * Displays deal information in a card format
 */
export default function DealCard({ deal }: DealCardProps) {
  if (!deal.active) {
    return null;
  }

  return (
    <div className={styles.card} style={{ backgroundColor: '#fef3c7', border: '2px solid #f59e0b' }}>
      <h4 style={{ margin: '0 0 0.5rem 0', color: '#92400e', fontSize: '1.125rem' }}>
        {deal.title}
      </h4>
      <p style={{ margin: '0.5rem 0', color: '#78350f' }}>
        {deal.description}
      </p>
      {deal.discount && (
        <div style={{ marginTop: '0.5rem', fontWeight: '600', color: '#92400e' }}>
          {deal.discount}
        </div>
      )}
      {deal.code && (
        <div style={{ marginTop: '0.5rem', padding: '0.5rem', backgroundColor: '#fbbf24', borderRadius: '4px', fontFamily: 'monospace', fontWeight: '600', color: '#78350f' }}>
          Code: {deal.code}
        </div>
      )}
      {deal.expiryDate && (
        <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#78350f' }}>
          Expires: {new Date(deal.expiryDate).toLocaleDateString()}
        </div>
      )}
    </div>
  );
}

