
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
    <div className="mt-8">
      <h4 className="font-medium text-lg mb-3 flex items-center">
        <BookOpen size={20} className={`text-${color} mr-2`} />
        {title}
      </h4>
      
      <div className={`p-5 border border-${color}/20 rounded-lg bg-${color}/5`}>
        <ul className="space-y-3">
          {references.map((reference, index) => (
            <li key={index} className="flex items-start">
              <ExternalLink size={16} className={`text-${color} mt-1 mr-2 flex-shrink-0`} />
              <span className="text-sm text-gray-700 leading-relaxed">{reference}</span>
            </li>
          ))}
        </ul>
        
        <div className={`mt-4 pt-4 border-t border-${color}/20 text-xs text-gray-500 italic`}>
          Para mais informações, consulte as referências acima ou entre em contato com um especialista.
        </div>
      </div>
    </div>
  );
};

export default ReferencesList;
