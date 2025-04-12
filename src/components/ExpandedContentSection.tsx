
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, ChevronDown, ChevronUp, PlusCircle } from 'lucide-react';

interface ExpandedContentProps {
  title: string;
  content: string;
}

interface ExpandedContentSectionProps {
  items: ExpandedContentProps[];
  color?: string;
  title?: string;
}

const ExpandedContentSection: React.FC<ExpandedContentSectionProps> = ({ 
  items, 
  color = "vet-blue",
  title = "Conteúdo Expandido"
}) => {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [showAllItems, setShowAllItems] = useState(false);

  if (!items || items.length === 0) return null;

  const toggleItem = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleAllItems = () => {
    if (showAllItems) {
      // Collapse all items
      setExpandedItems({});
    } else {
      // Expand all items
      const allExpanded: Record<number, boolean> = {};
      items.forEach((_, index) => {
        allExpanded[index] = true;
      });
      setExpandedItems(allExpanded);
    }
    setShowAllItems(!showAllItems);
  };

  // Define color classes based on color prop
  const getBgClass = (intensity: number) => `bg-${color}/${intensity}`;
  const getTextClass = () => `text-${color}`;
  const getBorderClass = (intensity: number) => `border-${color}/${intensity}`;
  const getHoverBorderClass = (intensity: number) => `hover:border-${color}/${intensity}`;

  return (
    <div className="mt-8 space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold flex items-center">
          <Lightbulb size={20} className={`${getTextClass()} mr-2`} />
          {title}
        </h4>
        
        <button 
          onClick={toggleAllItems} 
          className={`text-sm font-medium flex items-center ${getTextClass()} hover:underline`}
        >
          <PlusCircle size={16} className="mr-1" />
          {showAllItems ? "Recolher todos" : "Expandir todos"}
        </button>
      </div>
      
      <div className="space-y-3">
        {items.map((item, index) => {
          const isExpanded = expandedItems[index] || false;
          
          return (
            <Card 
              key={index} 
              className={`${getBorderClass(20)} ${getHoverBorderClass(50)} transition-colors shadow-sm`}
            >
              <CardContent className="p-0">
                <div 
                  className={`p-4 ${getBgClass(10)} ${getBorderClass(20)} border-b flex justify-between items-center cursor-pointer`}
                  onClick={() => toggleItem(index)}
                >
                  <h5 className="font-medium text-gray-800">{item.title}</h5>
                  {isExpanded ? 
                    <ChevronUp size={18} className="text-gray-600" /> : 
                    <ChevronDown size={18} className="text-gray-600" />
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
