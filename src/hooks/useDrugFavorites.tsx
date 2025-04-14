
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

  const isFavorite = (drugId: string): boolean => {
    return favorites.includes(drugId);
  };

  const getFavoriteCount = (): number => {
    return favorites.length;
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    getFavoriteCount
  };
}
