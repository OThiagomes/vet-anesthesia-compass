
import React from 'react';
import { CheckCircle, List, ArrowRight, Check, AlertCircle } from 'lucide-react';

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
  color = "blue",
  title = "Pontos-Chave",
  numbered = true,
  description,
  importance = 'medium'
}) => {
  if (!points || points.length === 0) return null;

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

  // Visual styling based on importance
  const importanceStyles = {
    low: `bg-${colorClass}-50 border-${colorClass}-100`,
    medium: `bg-${colorClass}-100/30 border-${colorClass}-200`,
    high: `bg-${colorClass}-100/50 border-${colorClass}-300`
  };

  return (
    <div className={`mt-6 p-5 ${importanceStyles[importance]} rounded-lg shadow-sm border`}>
      <h4 className="font-medium text-lg mb-3 flex items-center">
        {numbered ? 
          <List size={20} className={`text-${colorClass}-700 mr-2`} /> : 
          <CheckCircle size={20} className={`text-${colorClass}-700 mr-2`} />
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
              <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-${colorClass}-100 text-${colorClass}-700 flex items-center justify-center mr-3 mt-0.5`}>
                {index + 1}
              </div>
            ) : (
              importance === 'high' ? (
                <AlertCircle size={18} className={`text-${colorClass}-600 mr-3 mt-0.5 flex-shrink-0`} />
              ) : (
                <Check size={18} className={`text-${colorClass}-600 mr-3 mt-0.5 flex-shrink-0`} />
              )
            )}
            <p className="text-gray-700 leading-relaxed">{point}</p>
          </li>
        ))}
      </ul>

      {importance === 'high' && (
        <div className={`mt-4 pt-3 border-t border-${colorClass}-200 text-xs text-${colorClass}-700 italic`}>
          Importante: Os pontos acima requerem atenção especial na aplicação clínica.
        </div>
      )}
    </div>
  );
};

export default KeyPointsList;
