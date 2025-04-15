
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(prevSettings => ({ ...prevSettings, ...parsedSettings }));
      } catch (e) {
        console.error('Failed to parse user settings:', e);
        toast({
          title: "Erro nas configurações",
          description: "Não foi possível carregar suas configurações. Usando configurações padrão.",
          variant: "destructive"
        });
      }
    }
    
    setIsLoaded(true);
  }, [toast]);

  useEffect(() => {
    // Save settings to localStorage whenever they change
    // But only after initial load to prevent overwriting with defaults
    if (isLoaded) {
      localStorage.setItem('userSettings', JSON.stringify(settings));
    }
  }, [settings, isLoaded]);

  // Apply theme from settings
  useEffect(() => {
    if (!isLoaded) return;
    
    const applyTheme = () => {
      const { theme } = settings;
      const root = window.document.documentElement;
      
      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
        root.classList.remove('light', 'dark');
        root.classList.add(systemTheme);
      } else {
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
      }
    };
    
    applyTheme();
    
    // Listen for system theme changes if using system theme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (settings.theme === 'system') {
        applyTheme();
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [settings.theme, isLoaded]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      return updated;
    });
    
    toast({
      title: "Configurações atualizadas",
      description: "Suas preferências foram salvas com sucesso.",
      variant: "default"
    });
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    toast({
      title: "Configurações redefinidas",
      description: "Suas configurações foram restauradas para o padrão.",
      variant: "default"
    });
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
