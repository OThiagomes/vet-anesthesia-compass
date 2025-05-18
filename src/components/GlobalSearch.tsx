import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, FileText, Pill, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Topic } from '../data/anesthesiaTopics';
import { DrugInfo } from './Pharmaceuticals';
import { useSearch } from '@/hooks/useSearch';

interface SearchResult {
  id: string;
  title: string;
  type: 'topic' | 'drug' | 'subtopic';
  description?: string;
  path: string; 
  icon?: 'topic' | 'drug' | 'subtopic' | 'reference';
  parentId?: string; 
}

interface GlobalSearchProps {
  topics: Topic[];
  drugs: DrugInfo[];
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ topics, drugs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const { searchTerm, results, handleSearchChange } = useSearch(topics, drugs);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < results.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev > 0 ? prev - 1 : prev
      );
    } else if (e.key === 'Enter' && selectedIndex >= 0 && results[selectedIndex]) {
      e.preventDefault();
      handleResultClick(results[selectedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    navigate(result.path);
    setIsOpen(false);
    handleSearchChange(''); 
    setSelectedIndex(-1); // Reset selected index on click
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case 'topic':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'drug':
        return <Pill className="h-4 w-4 text-green-600" />;
      case 'subtopic':
        return <FileText className="h-4 w-4 text-purple-600" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const highlightMatch = (text: string, term: string) => {
    if (!term.trim()) {
      return text;
    }
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? <strong key={index} className="font-bold text-vet-blue dark:text-vet-teal-light">{part}</strong> : part
    );
  };

  const activeDescendantId = selectedIndex >= 0 && results[selectedIndex] ? `search-result-item-${selectedIndex}` : undefined;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) {
        handleSearchChange(''); 
        setSelectedIndex(-1);
      }
    }}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="w-[240px] justify-between text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span>Pesquisar...</span>
          </div>
          <kbd className="pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 hidden sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] p-0">
        <div className="flex flex-col divide-y">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Input
              ref={inputRef}
              className="flex h-12 w-full rounded-md border-0 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Pesquisar tópicos, fármacos..."
              value={searchTerm}
              onChange={(e) => {
                handleSearchChange(e.target.value);
                setSelectedIndex(-1);
              }}
              onKeyDown={handleKeyDown}
              aria-controls="search-results-listbox"
              aria-activedescendant={activeDescendantId}
              aria-autocomplete="list"
              aria-expanded={isOpen && results.length > 0}
              role="combobox"
            />
            {searchTerm && (
              <X
                className="h-4 w-4 shrink-0 opacity-50 cursor-pointer"
                onClick={() => {
                  handleSearchChange('');
                  setSelectedIndex(-1);
                  if (inputRef.current) inputRef.current.focus();
                }}
              />
            )}
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {results.length > 0 ? (
              <ul
                id="search-results-listbox"
                role="listbox"
                aria-label="Resultados da pesquisa"
              >
                {results.map((result, index) => (
                  <li
                    key={result.id}
                    id={`search-result-item-${index}`}
                    role="option"
                    aria-selected={selectedIndex === index}
                    onClick={() => handleResultClick(result)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      "flex cursor-pointer items-center px-4 py-2 hover:bg-accent",
                      selectedIndex === index ? "bg-accent" : ""
                    )}
                  >
                    <div className="mr-3 shrink-0">{renderIcon(result.type)}</div>
                    <div className="flex-grow overflow-hidden">
                      <p className="font-medium truncate">
                        {highlightMatch(result.title, searchTerm)}
                      </p>
                      {result.description && (
                        <p className="text-sm text-muted-foreground truncate">
                          {highlightMatch(result.description, searchTerm)}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : searchTerm ? (
              <div className="p-6 text-center text-sm text-muted-foreground">
                <Search className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                <p className="font-medium">Nenhum resultado encontrado para "{searchTerm}".</p>
                <p className="text-xs mt-1">Tente palavras-chave diferentes ou verifique a ortografia.</p>
              </div>
            ) : (
              <div className="p-6 text-center text-sm text-muted-foreground">
                <Info className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                <p className="font-medium">Busque por tópicos ou fármacos</p>
                <p className="text-xs mt-1">Use o campo acima para encontrar informações rapidamente.</p>
              </div>
            )}
          </div>
          {results.length > 0 && (
            <div className="flex items-center justify-between p-2 text-xs text-muted-foreground bg-muted/50 border-t">
              <div>
                <span>Pressione </span>
                <kbd className="rounded border bg-background px-1.5 py-0.5 text-xs">↑</kbd>
                <span> e </span>
                <kbd className="rounded border bg-background px-1.5 py-0.5 text-xs">↓</kbd>
                <span> para navegar</span>
              </div>
              <div>
                <kbd className="rounded border bg-background px-1.5 py-0.5 text-xs">Enter</kbd>
                <span> para selecionar</span>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GlobalSearch;
