import {
  PASSWORD_MIN_LENGTH,
  DISPLAY_NAME_MIN_LENGTH,
  DISPLAY_NAME_MAX_LENGTH,
  CAPTION_MAX_LENGTH,
  SUPPORTED_IMAGE_TYPES,
  SUPPORTED_VIDEO_TYPES,
  FILE_SIZE_LIMITS,
} from './constants';

// Email validation
export const validateEmail = (email: string): string | null => {
  if (!email) {
    return 'Email is required';
  }

  // Basic email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }

  return null;
};

// Password validation for signup
export const validatePassword = (password: string): string | null => {
  if (!password) {
    return 'Password is required';
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
  }

  // Check for at least one number
  if (!/\d/.test(password)) {
    return 'Password must contain at least one number';
  }

  return null;
};

// Display name validation (optional field)
export const validateDisplayName = (displayName: string): string | null => {
  if (!displayName) {
    return null; // Optional field
  }

  if (displayName.length < DISPLAY_NAME_MIN_LENGTH) {
    return `Display name must be at least ${DISPLAY_NAME_MIN_LENGTH} characters`;
  }

  if (displayName.length > DISPLAY_NAME_MAX_LENGTH) {
    return `Display name must be less than ${DISPLAY_NAME_MAX_LENGTH} characters`;
  }

  return null;
};

// Caption validation
export const validateCaption = (caption: string): string | null => {
  if (caption.length > CAPTION_MAX_LENGTH) {
    return `Caption must be less than ${CAPTION_MAX_LENGTH} characters`;
  }

  return null;
};

// File type validation
export const validateFileType = (fileType: string): boolean => {
  return [...SUPPORTED_IMAGE_TYPES, ...SUPPORTED_VIDEO_TYPES].includes(fileType);
};

// File size validation based on user tier
export const validateFileSize = (
  fileSize: number,
  fileType: string,
  userTier: 'basic' | 'premium'
): { isValid: boolean; error?: string } => {
  const isImage = SUPPORTED_IMAGE_TYPES.includes(fileType);
  const isVideo = SUPPORTED_VIDEO_TYPES.includes(fileType);

  if (!isImage && !isVideo) {
    return { isValid: false, error: 'Invalid file type' };
  }

  const limits = FILE_SIZE_LIMITS[userTier];
  const maxSize = isImage ? limits.image : limits.video;

  if (fileSize > maxSize) {
    const maxSizeMB = maxSize / (1024 * 1024);
    return {
      isValid: false,
      error: `File size exceeds ${maxSizeMB}MB limit for ${userTier} users`,
    };
  }

  return { isValid: true };
};
