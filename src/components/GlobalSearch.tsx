
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, FileText, Pill } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Topic, SubTopic } from '../data/anesthesiaTopics';
import { DrugInfo } from './Pharmaceuticals';

interface SearchResult {
  id: string;
  title: string;
  type: 'topic' | 'drug' | 'subtopic';
  description?: string;
  path: string; // URL to navigate to
  icon?: 'topic' | 'drug' | 'subtopic' | 'reference';
  parentId?: string; // For subtopics
}

interface GlobalSearchProps {
  topics: Topic[];
  drugs: DrugInfo[];
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ topics, drugs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    const newResults: SearchResult[] = [];

    // Search in topics
    topics.forEach(topic => {
      if (topic.title.toLowerCase().includes(searchTermLower) ||
          topic.description.toLowerCase().includes(searchTermLower)) {
        newResults.push({
          id: topic.id,
          title: topic.title,
          type: 'topic',
          description: topic.description,
          path: `/topic/${topic.id}`,
          icon: 'topic'
        });
      }

      // Search in subtopics
      topic.subtopics.forEach(subtopic => {
        if (subtopic.title.toLowerCase().includes(searchTermLower) ||
            subtopic.content.toLowerCase().includes(searchTermLower)) {
          newResults.push({
            id: `${topic.id}-${subtopic.id}`,
            title: subtopic.title,
            type: 'subtopic',
            description: topic.title + ' > ' + subtopic.title,
            path: `/topic/${topic.id}#${subtopic.id}`,
            parentId: topic.id,
            icon: 'subtopic'
          });
        }
      });
    });

    // Search in drugs
    drugs.forEach(drug => {
      if (drug.name.toLowerCase().includes(searchTermLower) ||
          drug.description.toLowerCase().includes(searchTermLower) ||
          drug.class.toLowerCase().includes(searchTermLower)) {
        newResults.push({
          id: drug.id,
          title: drug.name,
          type: 'drug',
          description: drug.class + ' - ' + drug.description.substring(0, 60) + '...',
          path: `/#pharmaceuticals-${drug.id}`,
          icon: 'drug'
        });
      }
    });

    setResults(newResults.slice(0, 10)); // Limit to 10 results
  }, [searchTerm, topics, drugs]);

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
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleResultClick(results[selectedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    navigate(result.path);
    setIsOpen(false);
    setSearchTerm('');
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="w-[240px] justify-between text-muted-foreground"
          onClick={() => setIsOpen(true)}
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
                setSearchTerm(e.target.value);
                setSelectedIndex(-1);
              }}
              onKeyDown={handleKeyDown}
            />
            {searchTerm && (
              <X
                className="h-4 w-4 shrink-0 opacity-50 cursor-pointer"
                onClick={() => setSearchTerm('')}
              />
            )}
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {results.length > 0 ? (
              <ul>
                {results.map((result, index) => (
                  <li
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className={cn(
                      "flex cursor-pointer items-center px-4 py-2 hover:bg-accent",
                      selectedIndex === index ? "bg-accent" : ""
                    )}
                  >
                    <div className="mr-3">{renderIcon(result.type)}</div>
                    <div>
                      <p className="font-medium">{result.title}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {result.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : searchTerm ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                Nenhum resultado encontrado.
              </div>
            ) : (
              <div className="p-4 text-center text-sm text-muted-foreground">
                Digite para pesquisar tópicos e fármacos.
              </div>
            )}
          </div>
          <div className="flex items-center justify-between p-2 text-xs text-muted-foreground bg-muted/50">
            <div>
              <span>Pressione </span>
              <kbd className="rounded border bg-muted px-1 text-xs">↑</kbd>
              <span> e </span>
              <kbd className="rounded border bg-muted px-1 text-xs">↓</kbd>
              <span> para navegar</span>
            </div>
            <div>
              <kbd className="rounded border bg-muted px-1 text-xs">Enter</kbd>
              <span> para selecionar</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GlobalSearch;
