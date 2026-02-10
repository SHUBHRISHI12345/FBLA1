/**
 * Card Component
 * Enhanced card component with glassmorphism effects
 */

import { HTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';
import styles from './Card.module.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * Card component with multiple variants
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    variant = 'default',
    hover = false,
    padding = 'md',
    className = '',
    children,
    ...props 
  }, ref) => {
    const cardClasses = [
      styles.card,
      styles[`card--${variant}`],
      styles[`card--padding-${padding}`],
      hover && styles['card--hover'],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const Component = hover ? motion.div : 'div';

    const motionProps = hover
      ? {
          whileHover: { y: -4, transition: { duration: 0.2 } },
          transition: { duration: 0.2 },
        }
      : {};

    return (
      <Component
        ref={ref}
        className={cardClasses}
        {...motionProps}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';

export default Card;

