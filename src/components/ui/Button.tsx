/**
 * Button Component
 * Reusable button component with multiple variants and sizes
 */

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
}

/**
 * Button component with multiple variants
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    isLoading = false,
    fullWidth = false,
    className = '',
    children,
    disabled,
    ...props 
  }, ref) => {
    const buttonClasses = [
      styles.button,
      styles[`button--${variant}`],
      styles[`button--${size}`],
      fullWidth && styles['button--fullWidth'],
      isLoading && styles['button--loading'],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <motion.button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || isLoading}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {isLoading ? (
          <>
            <span className={styles.spinner} aria-hidden="true" />
            <span className="sr-only">Loading...</span>
          </>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

