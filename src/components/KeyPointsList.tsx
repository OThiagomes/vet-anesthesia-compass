
import React from 'react';
import { CheckCircle, List, ArrowRight, Check } from 'lucide-react';

interface KeyPointsListProps {
  points: string[];
  color?: string;
  title?: string;
  numbered?: boolean;
  description?: string;
  importance?: 'low' | 'medium' | 'high';
}

const KeyPointsList: React.FC<KeyPointsListProps> = ({ 
  points, 
  color = "vet-blue",
  title = "Pontos-Chave",
  numbered = true,
  description,
  importance = 'medium'
}) => {
  if (!points || points.length === 0) return null;

  // Visual styling based on importance
  const importanceStyles = {
    low: `bg-${color}/5 border-${color}/20`,
    medium: `bg-${color}/10 border-${color}/30`,
    high: `bg-${color}/15 border-${color}/40`
  };

  return (
    <div className={`mt-6 p-5 ${importanceStyles[importance]} rounded-lg shadow-sm border`}>
      <h4 className="font-medium text-lg mb-3 flex items-center">
        {numbered ? 
          <List size={20} className={`text-${color} mr-2`} /> : 
          <CheckCircle size={20} className={`text-${color} mr-2`} />
        }
        {title}
      </h4>
      
      {description && (
        <p className="text-gray-700 mb-4 text-sm">{description}</p>
      )}
      
      <ul className="space-y-3">
        {points.map((point, index) => (
          <li key={index} className="flex items-start">
            {numbered ? (
              <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-${color}/20 text-${color} flex items-center justify-center mr-3 mt-0.5`}>
                {index + 1}
              </div>
            ) : (
              numbered === false ? (
                <CheckCircle size={18} className={`text-${color} mr-3 mt-0.5 flex-shrink-0`} />
              ) : (
                <ArrowRight size={18} className={`text-${color} mr-3 mt-0.5 flex-shrink-0`} />
              )
            )}
            <p className="text-gray-700 leading-relaxed">{point}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeyPointsList;
