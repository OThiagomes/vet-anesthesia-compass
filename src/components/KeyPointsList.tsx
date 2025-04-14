
import React from 'react';
import { CheckCircle, List } from 'lucide-react';

interface KeyPointsListProps {
  points: string[];
  color?: string;
  title?: string;
  numbered?: boolean;
}

const KeyPointsList: React.FC<KeyPointsListProps> = ({ 
  points, 
  color = "vet-blue",
  title = "Pontos-Chave",
  numbered = true
}) => {
  if (!points || points.length === 0) return null;

  return (
    <div className={`mt-6 p-5 bg-${color}/5 border border-${color}/20 rounded-lg shadow-sm`}>
      <h4 className="font-medium text-lg mb-4 flex items-center">
        {numbered ? 
          <List size={20} className={`text-${color} mr-2`} /> : 
          <CheckCircle size={20} className={`text-${color} mr-2`} />
        }
        {title}
      </h4>
      
      <ul className="space-y-3">
        {points.map((point, index) => (
          <li key={index} className="flex items-start">
            {numbered ? (
              <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-${color}/20 text-${color} flex items-center justify-center mr-3 mt-0.5`}>
                {index + 1}
              </div>
            ) : (
              <CheckCircle size={18} className={`text-${color} mr-3 mt-0.5 flex-shrink-0`} />
            )}
            <p className="text-gray-700 leading-relaxed">{point}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeyPointsList;
