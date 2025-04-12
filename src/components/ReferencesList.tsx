
import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';

interface ReferencesListProps {
  references: string[];
  color?: string;
  title?: string;
}

const ReferencesList: React.FC<ReferencesListProps> = ({ 
  references, 
  color = "vet-blue",
  title = "Referências Bibliográficas" 
}) => {
  if (!references || references.length === 0) return null;

  return (
    <div className="mt-6">
      <h4 className="font-medium text-lg mb-3 flex items-center">
        <BookOpen size={18} className={`text-${color} mr-2`} />
        {title}
      </h4>
      
      <div className={`p-4 border border-${color}/20 rounded-lg bg-${color}/5`}>
        <ul className="space-y-2">
          {references.map((reference, index) => (
            <li key={index} className="flex items-start text-sm text-gray-700">
              <ExternalLink size={14} className={`text-${color} mt-1 mr-2 flex-shrink-0`} />
              <span>{reference}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReferencesList;
