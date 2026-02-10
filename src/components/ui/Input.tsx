/**
 * Input Component
 * Enhanced input component with icons and validation states
 */

import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './Input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

/**
 * Input component with enhanced features
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    fullWidth = false,
    className = '',
    id,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;

    return (
      <div className={`${styles.inputWrapper} ${fullWidth ? styles['inputWrapper--fullWidth'] : ''}`}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {props.required && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={styles.inputContainer}>
          {leftIcon && <span className={styles.leftIcon} aria-hidden="true">{leftIcon}</span>}
          <input
            ref={ref}
            id={inputId}
            className={`
              ${styles.input}
              ${hasError ? styles['input--error'] : ''}
              ${leftIcon ? styles['input--withLeftIcon'] : ''}
              ${rightIcon ? styles['input--withRightIcon'] : ''}
              ${className}
            `}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />
          {rightIcon && <span className={styles.rightIcon} aria-hidden="true">{rightIcon}</span>}
        </div>
        {error && (
          <div id={`${inputId}-error`} className={styles.error} role="alert">
            {error}
          </div>
        )}
        {helperText && !error && (
          <div id={`${inputId}-helper`} className={styles.helperText}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

