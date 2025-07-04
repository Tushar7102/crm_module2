'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('system');

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    console.log('Initializing theme...');
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    
    if (storedTheme) {
      console.log(`Found stored theme: ${storedTheme}`);
      setThemeState(storedTheme);
    } else {
      // Check system preference
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      console.log(`No stored theme found. System preference: ${systemTheme}`);
      setThemeState('system');
      applyTheme(systemTheme);
    }
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        const newTheme = mediaQuery.matches ? 'dark' : 'light';
        applyTheme(newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Apply theme changes
  useEffect(() => {
    console.log(`Theme changed to: ${theme}`);
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      console.log(`System theme detected: ${systemTheme}`);
      applyTheme(systemTheme);
    } else {
      applyTheme(theme);
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Apply the theme to the document
  const applyTheme = (theme: 'light' | 'dark') => {
    const root = document.documentElement;
    
    // First remove both classes
    root.classList.remove('light', 'dark');
    // Then add the appropriate one
    root.classList.add(theme);
    
    // For debugging
    console.log(`Theme applied: ${theme}`);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;