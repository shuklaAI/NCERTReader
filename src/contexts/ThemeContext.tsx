import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeMode, ThemeContextType, ThemeColors } from '../types';
import { lightColors, darkColors } from '../theme/colors';
import { STORAGE_KEYS } from '../utils/constants';

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme Provider component
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>('light');

  // Load theme preference from AsyncStorage on mount
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(STORAGE_KEYS.theme);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.error('Failed to load theme preference:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme: ThemeMode = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      await AsyncStorage.setItem(STORAGE_KEYS.theme, newTheme);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  const colors: ThemeColors = theme === 'light' ? lightColors : darkColors;

  const value: ThemeContextType = {
    theme,
    colors,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// Custom hook to use theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
