// App-wide constants
export const APP_NAME = 'AutoPostify';
export const APP_TAGLINE = 'One Click Content Uploader';

// File size limits by tier (in bytes)
export const FILE_SIZE_LIMITS = {
  basic: {
    image: 10 * 1024 * 1024, // 10MB
    video: 100 * 1024 * 1024, // 100MB
  },
  premium: {
    image: Infinity,
    video: Infinity,
  },
};

// Supported file types
export const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
export const SUPPORTED_VIDEO_TYPES = ['video/mp4', 'video/quicktime'];

// Caption max length
export const CAPTION_MAX_LENGTH = 500;

// Validation constants
export const PASSWORD_MIN_LENGTH = 8;
export const DISPLAY_NAME_MIN_LENGTH = 2;
export const DISPLAY_NAME_MAX_LENGTH = 50;

// Storage paths
export const STORAGE_PATHS = {
  posts: 'posts',
};

// AsyncStorage keys
export const STORAGE_KEYS = {
  theme: '@autopostify:theme',
};

// Platform names
export const PLATFORMS = {
  youtube: 'YouTube',
  instagram: 'Instagram',
  facebook: 'Facebook',
} as const;
