
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export function useDrugFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load favorites from localStorage on component mount
    const savedFavorites = localStorage.getItem('favoriteDrugs');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error('Failed to parse favorites:', e);
        setFavorites([]);
      }
    }

    // Set up storage event listener for cross-tab synchronization
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'favoriteDrugs' && e.newValue) {
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
  }, []);

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
    toggleFavorite,
    isFavorite,
    getFavoriteCount,
    getFavoriteDrugIds,
    clearAllFavorites
  };
}
