import { ThemeColors } from '../types';

// Light Mode Colors
export const lightColors: ThemeColors = {
  primary: '#2563eb', // blue
  background: '#ffffff', // white
  surface: '#f3f4f6', // light gray
  textPrimary: '#111827', // dark gray
  textSecondary: '#6b7280', // medium gray
  border: '#e5e7eb', // light gray
  error: '#dc2626', // red
  success: '#16a34a', // green
};

// Dark Mode Colors
export const darkColors: ThemeColors = {
  primary: '#3b82f6', // lighter blue
  background: '#111827', // dark
  surface: '#1f2937', // dark gray
  textPrimary: '#f9fafb', // off-white
  textSecondary: '#9ca3af', // light gray
  border: '#374151', // medium dark gray
  error: '#ef4444', // lighter red
  success: '#22c55e', // lighter green
};

// Platform-specific colors
export const platformColors = {
  youtube: '#FF0000',
  instagram: '#E1306C', // Instagram pink/purple
  facebook: '#1877F2',
};

// Tier badge colors
export const tierColors = {
  basic: '#6b7280', // gray
  premium: '#f59e0b', // gold/yellow
};
