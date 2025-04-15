
import { useMemo, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { Topic, SubTopic } from '../data/anesthesiaTopics';
import { DrugInfo } from '../components/Pharmaceuticals';

interface SearchResult {
  id: string;
  title: string;
  type: 'topic' | 'drug' | 'subtopic';
  description?: string;
  path: string;
  icon?: 'topic' | 'drug' | 'subtopic' | 'reference';
  parentId?: string;
}

export const useSearch = (topics: Topic[], drugs: DrugInfo[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const performSearch = useCallback((term: string) => {
    if (!term.trim()) {
      setResults([]);
      return;
    }

    const searchTermLower = term.toLowerCase();
    const newResults: SearchResult[] = [];

    // Search in topics
    topics.forEach(topic => {
      if (topic.title.toLowerCase().includes(searchTermLower) ||
          topic.description.toLowerCase().includes(searchTermLower)) {
        newResults.push({
          id: topic.id.toString(),
          title: topic.title,
          type: 'topic',
          description: topic.description,
          path: `/topic/${topic.id}`,
          icon: 'topic'
        });
      }

      // Search in subtopics
      topic.subtopics.forEach((subtopic, subtopicIndex) => {
        const subtopicContentString = subtopic.content.join(' ');
        if (subtopic.title.toLowerCase().includes(searchTermLower) ||
            subtopicContentString.toLowerCase().includes(searchTermLower)) {
          newResults.push({
            id: `${topic.id}-${subtopicIndex}`,
            title: subtopic.title,
            type: 'subtopic',
            description: topic.title + ' > ' + subtopic.title,
            path: `/topic/${topic.id}#${subtopicIndex}`,
            parentId: topic.id.toString(),
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

    setResults(newResults.slice(0, 10));
  }, [topics, drugs]);

  const debouncedSearch = useMemo(
    () => debounce(performSearch, 300),
    [performSearch]
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return { 
    searchTerm, 
    results, 
    handleSearchChange 
  };
};
