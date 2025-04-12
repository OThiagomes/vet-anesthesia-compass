
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

  // Define color classes based on color prop
  const getBgClass = () => `bg-${color}/5`;
  const getTextClass = () => `text-${color}`;
  const getBorderClass = () => `border-${color}/20`;

  return (
    <div className={`mt-6 p-5 ${getBgClass()} ${getBorderClass()} rounded-lg shadow-sm`}>
      <h4 className="font-medium text-lg mb-4 flex items-center">
        <CheckCircle size={20} className={`${getTextClass()} mr-2`} />
        {title}
      </h4>
      
      <ul className="space-y-3">
        {points.map((point, index) => (
          <li key={index} className="flex items-start">
            <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-${color}/20 ${getTextClass()} flex items-center justify-center mr-3 mt-0.5`}>
              {index + 1}
            </div>
            <p className="text-gray-700 leading-relaxed">{point}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeyPointsList;
