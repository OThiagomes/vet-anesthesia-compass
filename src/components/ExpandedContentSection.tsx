
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

interface ExpandedContentProps {
  title: string;
  content: string;
}

interface ExpandedContentSectionProps {
  items: ExpandedContentProps[];
  color?: string;
}

const ExpandedContentSection: React.FC<ExpandedContentSectionProps> = ({ 
  items, 
  color = "vet-blue" 
}) => {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});

  if (!items || items.length === 0) return null;

  const toggleItem = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Define color classes based on color prop
  const getBgClass = (intensity: number) => `bg-${color}/${intensity}`;
  const getTextClass = () => `text-${color}`;
  const getBorderClass = (intensity: number) => `border-${color}/${intensity}`;
  const getHoverBorderClass = (intensity: number) => `hover:border-${color}/${intensity}`;

  return (
    <div className="mt-6 space-y-4">
      <h4 className="text-lg font-semibold flex items-center">
        <Lightbulb size={18} className={`${getTextClass()} mr-2`} />
        Conteúdo Expandido
      </h4>
      
      <div className="space-y-3">
        {items.map((item, index) => {
          const isExpanded = expandedItems[index] || false;
          
          return (
            <Card 
              key={index} 
              className={`${getBorderClass(20)} ${getHoverBorderClass(50)} transition-colors`}
            >
              <CardContent className="p-0">
                <div 
                  className={`p-3 ${getBgClass(10)} ${getBorderClass(20)} border-b flex justify-between items-center cursor-pointer`}
                  onClick={() => toggleItem(index)}
                >
                  <h5 className="font-medium text-gray-800">{item.title}</h5>
                  {isExpanded ? 
                    <ChevronUp size={16} className="text-gray-600" /> : 
                    <ChevronDown size={16} className="text-gray-600" />
                  }
                </div>
                
                {isExpanded && (
                  <div className="p-4">
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">{item.content}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ExpandedContentSection;
