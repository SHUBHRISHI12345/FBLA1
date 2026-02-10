/**
 * Verification Service
 * Handles bot prevention through math verification
 * Generates random math problems and validates user answers
 */

/**
 * Verification question and answer pair
 */
export interface VerificationQuestion {
  question: string;
  answer: number;
}

/**
 * VerificationService class
 * Generates math problems for bot verification
 */
class VerificationService {
  /**
   * Generates a random math verification question
   * Creates a simple addition problem with numbers between 1 and 10
   * @returns VerificationQuestion with question string and correct answer
   */
  generateQuestion(): VerificationQuestion {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const answer = num1 + num2;
    
    return {
      question: `What is ${num1} + ${num2}?`,
      answer: answer
    };
  }

  /**
   * Validates user's answer against the correct answer
   * @param userAnswer - The answer provided by the user
   * @param correctAnswer - The correct answer to the question
   * @returns true if answer is correct, false otherwise
   */
  verifyAnswer(userAnswer: number, correctAnswer: number): boolean {
    return userAnswer === correctAnswer;
  }
}

// Export singleton instance
export const verificationService = new VerificationService();


