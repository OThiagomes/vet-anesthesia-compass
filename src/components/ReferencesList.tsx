
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

  // Define color classes based on color prop
  const getBgClass = (intensity: number) => `bg-${color}/${intensity}`;
  const getTextClass = () => `text-${color}`;
  const getBorderClass = (intensity: number) => `border-${color}/${intensity}`;

  return (
    <div className="mt-6">
      <h4 className="font-medium text-lg mb-3 flex items-center">
        <BookOpen size={18} className={`${getTextClass()} mr-2`} />
        {title}
      </h4>
      
      <div className={`p-4 ${getBorderClass(20)} rounded-lg ${getBgClass(5)}`}>
        <ul className="space-y-3">
          {references.map((reference, index) => (
            <li key={index} className="flex items-start text-sm text-gray-700">
              <ExternalLink size={14} className={`${getTextClass()} mt-1 mr-2 flex-shrink-0`} />
              <span className="leading-relaxed">{reference}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReferencesList;
