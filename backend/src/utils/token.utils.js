import crypto from 'crypto';

/**
 * Generate a random verification token
 */
export const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

/**
 * Generate a random password reset token
 */
export const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

/**
 * Hash a token for storage in database
 */
export const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};


