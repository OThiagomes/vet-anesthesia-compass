
import React from 'react';
import { BookOpen, ExternalLink, FileText, BookMarked, Link2 } from 'lucide-react';

interface ReferencesListProps {
  references: string[];
  color?: string;
  title?: string;
  type?: 'article' | 'book' | 'website' | 'mixed';
  showCitation?: boolean;
}

const ReferencesList: React.FC<ReferencesListProps> = ({ 
  references, 
  color = "vet-blue",
  title = "Referências Bibliográficas",
  type = "mixed",
  showCitation = true
}) => {
  if (!references || references.length === 0) return null;

  const getIcon = (index: number) => {
    if (type === 'mixed') {
      // Randomly assign icons for mixed type
      const iconIndex = index % 3;
      if (iconIndex === 0) return <BookMarked size={16} className={`text-${color} mt-1 mr-2 flex-shrink-0`} />;
      if (iconIndex === 1) return <FileText size={16} className={`text-${color} mt-1 mr-2 flex-shrink-0`} />;
      return <Link2 size={16} className={`text-${color} mt-1 mr-2 flex-shrink-0`} />;
    }
    
    if (type === 'article') return <FileText size={16} className={`text-${color} mt-1 mr-2 flex-shrink-0`} />;
    if (type === 'book') return <BookMarked size={16} className={`text-${color} mt-1 mr-2 flex-shrink-0`} />;
    if (type === 'website') return <Link2 size={16} className={`text-${color} mt-1 mr-2 flex-shrink-0`} />;
    
    return <ExternalLink size={16} className={`text-${color} mt-1 mr-2 flex-shrink-0`} />;
  };

  return (
    <div className="mt-8">
      <h4 className="font-medium text-lg mb-3 flex items-center">
        <BookOpen size={20} className={`text-${color} mr-2`} />
        {title}
      </h4>
      
      <div className={`p-5 border border-${color}/20 rounded-lg bg-${color}/5`}>
        <ul className="space-y-3">
          {references.map((reference, index) => (
            <li key={index} className="flex items-start">
              {getIcon(index)}
              <span className="text-sm text-gray-700 leading-relaxed">{reference}</span>
            </li>
          ))}
        </ul>
        
        {showCitation && (
          <div className={`mt-4 pt-4 border-t border-${color}/20 text-xs text-gray-500 italic`}>
            Para mais informações, consulte as referências acima ou entre em contato com um especialista.
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferencesList;
