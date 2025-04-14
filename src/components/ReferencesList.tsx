
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
  color = "blue",
  title = "Referências Bibliográficas",
  type = "mixed",
  showCitation = true
}) => {
  if (!references || references.length === 0) return null;

  // Map color string to Tailwind class
  const colorMap: Record<string, string> = {
    blue: "blue",
    green: "green",
    red: "red",
    orange: "orange",
    purple: "purple",
    teal: "teal",
    "vet-blue": "blue",
    "vet-green": "green",
    "vet-red": "red",
    "vet-orange": "orange",
    "vet-purple": "purple",
    "vet-teal": "teal"
  };
  
  // Get the actual color class or default to blue
  const colorClass = colorMap[color] || "blue";

  const getIcon = (index: number) => {
    if (type === 'mixed') {
      // Randomly assign icons for mixed type
      const iconIndex = index % 3;
      if (iconIndex === 0) return <BookMarked size={16} className={`text-${colorClass}-700 mt-1 mr-2 flex-shrink-0`} />;
      if (iconIndex === 1) return <FileText size={16} className={`text-${colorClass}-700 mt-1 mr-2 flex-shrink-0`} />;
      return <Link2 size={16} className={`text-${colorClass}-700 mt-1 mr-2 flex-shrink-0`} />;
    }
    
    if (type === 'article') return <FileText size={16} className={`text-${colorClass}-700 mt-1 mr-2 flex-shrink-0`} />;
    if (type === 'book') return <BookMarked size={16} className={`text-${colorClass}-700 mt-1 mr-2 flex-shrink-0`} />;
    if (type === 'website') return <Link2 size={16} className={`text-${colorClass}-700 mt-1 mr-2 flex-shrink-0`} />;
    
    return <ExternalLink size={16} className={`text-${colorClass}-700 mt-1 mr-2 flex-shrink-0`} />;
  };

  return (
    <div className="mt-8">
      <h4 className="font-medium text-lg mb-3 flex items-center">
        <BookOpen size={20} className={`text-${colorClass}-700 mr-2`} />
        {title}
      </h4>
      
      <div className={`p-5 border border-${colorClass}-200 rounded-lg bg-${colorClass}-50/50`}>
        <ul className="space-y-3">
          {references.map((reference, index) => (
            <li key={index} className="flex items-start">
              {getIcon(index)}
              <span className="text-sm text-gray-700 leading-relaxed">{reference}</span>
            </li>
          ))}
        </ul>
        
        {showCitation && references.length > 2 && (
          <div className={`mt-4 pt-4 border-t border-${colorClass}-200 text-xs text-gray-500 italic`}>
            As referências acima foram utilizadas na compilação desta informação. Para detalhamento adicional, consulte as fontes originais ou entre em contato com um especialista em farmacologia veterinária.
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferencesList;
