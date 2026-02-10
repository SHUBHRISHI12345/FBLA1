/**
 * VerificationModal Component
 * Modal for bot verification using math problems
 */

import { useState, useEffect } from 'react';
import { verificationService } from '../utils/verification';
import type { VerificationQuestion } from '../utils/verification';
import { validateVerificationAnswer } from '../utils/validation';
import styles from '../styles/App.module.css';

/**
 * VerificationModal component props
 */
interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: () => void;
}

/**
 * VerificationModal component
 * Displays a math verification question to prevent bot submissions
 */
export default function VerificationModal({ isOpen, onClose, onVerify }: VerificationModalProps) {
  const [question, setQuestion] = useState<VerificationQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Generate new question when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuestion(verificationService.generateQuestion());
      setUserAnswer('');
      setError('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!question) return;

    // Validate input
    const validation = validateVerificationAnswer(userAnswer);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid answer');
      return;
    }

    const answerNum = parseInt(userAnswer, 10);

    // Verify answer
    if (verificationService.verifyAnswer(answerNum, question.answer)) {
      onVerify();
      onClose();
    } else {
      setError('Incorrect answer. Please try again.');
      // Generate new question
      setQuestion(verificationService.generateQuestion());
      setUserAnswer('');
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="verification-title"
    >
      <div 
        className={styles.card}
        style={{
          maxWidth: '400px',
          width: '90%',
          backgroundColor: 'white'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="verification-title" style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', color: '#111827' }}>
          Verification Required
        </h2>
        <p style={{ marginBottom: '1rem', color: '#6b7280' }}>
          Please solve this math problem to verify you're not a bot:
        </p>

        {question && (
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="verification-answer" className={styles.label}>
                {question.question}
              </label>
              <input
                id="verification-answer"
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className={styles.input}
                autoFocus
                aria-required="true"
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? 'verification-error' : undefined}
              />
              {error && (
                <div id="verification-error" className={styles.error} role="alert">
                  {error}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button type="submit" className={styles.button}>
                Verify
              </button>
              <button type="button" onClick={onClose} className={styles.buttonSecondary}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

