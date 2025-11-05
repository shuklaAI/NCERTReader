import { Timestamp } from 'firebase/firestore';

// User interface
export interface User {
  uid: string;
  email: string;
  displayName?: string;
}

// UserProfile interface (Firestore document)
export interface UserProfile {
  email: string;
  tier: 'basic' | 'premium';
  createdAt: Date | Timestamp;
  displayName?: string;
}

// Post interface (Firestore document)
export interface Post {
  id: string; // Document ID
  userId: string;
  caption: string;
  fileUrl: string;
  fileName: string;
  fileType: 'image' | 'video';
  fileSize: number; // in bytes
  platforms: Platform[];
  status: 'uploaded'; // Only one status in MVP
  uploadedAt: Date | Timestamp;
}

// Platform type
export type Platform = 'youtube' | 'instagram' | 'facebook';

// Theme type
export type ThemeMode = 'light' | 'dark';

// Theme colors interface
export interface ThemeColors {
  primary: string;
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
}

// File size limits constants
export const FILE_SIZE_LIMITS = {
  basic: {
    image: 10 * 1024 * 1024, // 10MB in bytes
    video: 100 * 1024 * 1024, // 100MB in bytes
  },
  premium: {
    image: Infinity,
    video: Infinity,
  },
};

// Supported file types
export const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
export const SUPPORTED_VIDEO_TYPES = ['video/mp4', 'video/quicktime'];

// Auth context interface
export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Theme context interface
export interface ThemeContextType {
  theme: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
}
