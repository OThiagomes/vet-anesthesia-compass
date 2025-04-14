
import { useState, useEffect } from 'react';

type UserSettings = {
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  showFavorites: boolean;
  defaultView: 'list' | 'table' | 'cards';
  lastVisited?: string;
}

const defaultSettings: UserSettings = {
  theme: 'system',
  fontSize: 'medium',
  showFavorites: false,
  defaultView: 'list'
};

export function useUserSettings() {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(prevSettings => ({ ...prevSettings, ...parsedSettings }));
      } catch (e) {
        console.error('Failed to parse user settings:', e);
      }
    }
    
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // Save settings to localStorage whenever they change
    // But only after initial load to prevent overwriting with defaults
    if (isLoaded) {
      localStorage.setItem('userSettings', JSON.stringify(settings));
    }
  }, [settings, isLoaded]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const updateLastVisited = (path: string) => {
    setSettings(prev => ({ ...prev, lastVisited: path }));
  };

  return {
    settings,
    updateSettings,
    resetSettings,
    updateLastVisited,
    isLoaded
  };
}
