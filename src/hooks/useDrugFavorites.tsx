
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useUserSettings } from '@/hooks/useUserSettings';

export function useDrugFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();
  const { settings } = useUserSettings();

  useEffect(() => {
    // Load favorites from localStorage on component mount
    const savedFavorites = localStorage.getItem('favoriteDrugs');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error('Failed to parse favorites:', e);
        setFavorites([]);
        localStorage.removeItem('favoriteDrugs');
        toast({
          title: "Erro ao carregar favoritos",
          description: "Não foi possível recuperar seus medicamentos favoritos.",
          variant: "destructive"
        });
      }
    }
    
    setIsLoaded(true);

    // Set up storage event listener for cross-tab synchronization
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'favoriteDrugs' && e.newValue !== null) {
        try {
          const updatedFavorites = JSON.parse(e.newValue);
          setFavorites(updatedFavorites);
        } catch (err) {
          console.error('Failed to parse updated favorites:', err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [toast]);

  // Display favorites based on user settings
  const visibleFavorites = settings.showFavorites ? favorites : [];

  const toggleFavorite = (drugId: string, drugName: string) => {
    setFavorites(prev => {
      let newFavorites;
      if (prev.includes(drugId)) {
        newFavorites = prev.filter(id => id !== drugId);
        toast({
          title: "Removido dos favoritos",
          description: `${drugName} foi removido dos seus favoritos`,
          variant: "default"
        });
      } else {
        newFavorites = [...prev, drugId];
        toast({
          title: "Adicionado aos favoritos",
          description: `${drugName} foi adicionado aos seus favoritos`,
          variant: "default"
        });
      }
      
      // Save to localStorage
      localStorage.setItem('favoriteDrugs', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('favoriteDrugs');
    toast({
      title: "Favoritos limpos",
      description: "Todos os fármacos foram removidos dos favoritos",
      variant: "default"
    });
  };

  const isFavorite = (drugId: string): boolean => {
    return favorites.includes(drugId);
  };

  const getFavoriteCount = (): number => {
    return favorites.length;
  };

  const getFavoriteDrugIds = (): string[] => {
    return [...favorites];
  };

  return {
    favorites,
    visibleFavorites,
    toggleFavorite,
    isFavorite,
    getFavoriteCount,
    getFavoriteDrugIds,
    clearAllFavorites,
    isLoaded
  };
}
