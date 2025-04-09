import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookText, Search, Bookmark, VolumeX, Volume2 } from "lucide-react";

export interface Term {
  id: string;
  term: string;
  definition: string;
  category: string;
  language?: {
    en?: string;
    es?: string;
    fr?: string;
  };
}

interface TerminologyProps {
  terms: Term[];
  color?: string;
}

const Terminology: React.FC<TerminologyProps> = ({ terms, color = 'vet-blue' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState<string[]>([]);
  
  const categories = Array.from(new Set(terms.map(term => term.category)));

  const filteredTerms = terms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter ? term.category === filter : true;
    return matchesSearch && matchesFilter;
  });
  
  const toggleBookmark = (id: string) => {
    setBookmarked(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };
  
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <Card className="mb-6 shadow-md">
      <CardHeader className={`bg-${color}/10`}>
        <CardTitle className="flex items-center">
          <BookText className="mr-2" size={20} />
          Terminologia Especializada
        </CardTitle>
        <CardDescription>
          Glossário de termos técnicos relacionados à anestesiologia veterinária
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Pesquisar termos..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === null ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(null)}
              className={filter === null ? `bg-${color} hover:bg-${color}/90` : ""}
            >
              Todos
            </Button>
            
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(category)}
                className={filter === category ? `bg-${color} hover:bg-${color}/90` : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredTerms.length > 0 ? (
            filteredTerms.map((term) => (
              <div 
                key={term.id} 
                className={`p-4 border rounded-lg ${bookmarked.includes(term.id) ? `bg-${color}/5 border-${color}/20` : 'bg-white'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-lg">{term.term}</h4>
                    <Badge variant="outline" className="mt-1">{term.category}</Badge>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => speak(`${term.term}. ${term.definition}`)}
                    >
                      <Volume2 size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`h-8 w-8 p-0 ${bookmarked.includes(term.id) ? 'text-amber-500' : ''}`}
                      onClick={() => toggleBookmark(term.id)}
                    >
                      <Bookmark size={16} />
                    </Button>
                  </div>
                </div>
                
                <p className="text-gray-700">{term.definition}</p>
                
                {term.language && (
                  <div className="mt-3 pt-3 border-t border-dashed text-sm">
                    <h5 className="font-medium mb-1 text-gray-600">Traduções:</h5>
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      {term.language.en && (
                        <span><strong>EN:</strong> {term.language.en}</span>
                      )}
                      {term.language.es && (
                        <span><strong>ES:</strong> {term.language.es}</span>
                      )}
                      {term.language.fr && (
                        <span><strong>FR:</strong> {term.language.fr}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p>Nenhum termo encontrado para sua pesquisa.</p>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between text-xs text-slate-500">
        <span>{terms.length} termos no glossário</span>
        <span>{bookmarked.length} termos marcados</span>
      </CardFooter>
    </Card>
  );
};

export default Terminology;
