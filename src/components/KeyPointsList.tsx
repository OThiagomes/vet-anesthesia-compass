
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface KeyPointsListProps {
  points: string[];
  color?: string;
  title?: string;
}

const KeyPointsList: React.FC<KeyPointsListProps> = ({ 
  points, 
  color = "vet-blue",
  title = "Pontos-Chave" 
}) => {
  if (!points || points.length === 0) return null;

  return (
    <div className={`mt-4 p-4 bg-${color}/5 border border-${color}/20 rounded-lg`}>
      <h4 className="font-medium text-lg mb-3 flex items-center">
        <CheckCircle size={18} className={`text-${color} mr-2`} />
        {title}
      </h4>
      
      <ul className="space-y-2">
        {points.map((point, index) => (
          <li key={index} className="flex items-start">
            <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-${color}/20 text-${color} flex items-center justify-center mr-2 mt-0.5`}>
              {index + 1}
            </div>
            <span className="text-gray-700">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeyPointsList;
