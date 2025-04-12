
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
  const getBgClass = (intensity: number) => `bg-${color}/${intensity}`;
  const getTextClass = () => `text-${color}`;
  const getBorderClass = (intensity: number) => `border-${color}/${intensity}`;

  return (
    <div className={`mt-6 p-5 ${getBgClass(5)} ${getBorderClass(20)} rounded-lg shadow-sm animate-in fade-in-50`}>
      <h4 className="font-medium text-lg mb-4 flex items-center">
        <CheckCircle size={20} className={`${getTextClass()} mr-2`} />
        {title}
      </h4>
      
      <ul className="space-y-4">
        {points.map((point, index) => (
          <li key={index} className="flex items-start">
            <div className={`flex-shrink-0 w-6 h-6 rounded-full ${getBgClass(20)} ${getTextClass()} flex items-center justify-center mr-3 mt-0.5`}>
              {index + 1}
            </div>
            <div className="text-gray-700 flex-1">
              <p className="leading-relaxed text-base">{point}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeyPointsList;
