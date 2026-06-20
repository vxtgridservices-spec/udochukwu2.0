import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

const SettingsContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
  isWhatsAppEnabled: boolean;
  toggleWhatsApp: () => void;
} | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [isWhatsAppEnabled, setIsWhatsAppEnabled] = useState(true);

  useEffect(() => {
    // Apply theme to document element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleWhatsApp = () => {
    setIsWhatsAppEnabled((prev) => !prev);
  }

  return (
    <SettingsContext.Provider value={{ theme, toggleTheme, isWhatsAppEnabled, toggleWhatsApp }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within a SettingsProvider');
  return context;
};
