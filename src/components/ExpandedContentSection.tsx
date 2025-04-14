
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, ChevronDown, ChevronUp, BookOpen, FileText, Info, ListFilter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ExpandedContentProps {
  title: string;
  content: string;
  icon?: 'lightbulb' | 'book' | 'file' | 'info' | 'list' | 'none';
}

interface ExpandedContentSectionProps {
  items: ExpandedContentProps[];
  color?: string;
  title?: string;
  description?: string;
  showIcons?: boolean;
}

const ExpandedContentSection: React.FC<ExpandedContentSectionProps> = ({ 
  items, 
  color = "vet-blue",
  title = "Conteúdo Expandido",
  description,
  showIcons = true
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
      setExpandedItems({});
    } else {
      const allExpanded: Record<number, boolean> = {};
      items.forEach((_, index) => {
        allExpanded[index] = true;
      });
      setExpandedItems(allExpanded);
    }
    setShowAllItems(!showAllItems);
  };

  const getIcon = (iconName?: string) => {
    if (!showIcons) return null;

    switch(iconName) {
      case 'lightbulb':
        return <Lightbulb size={16} className="mr-2" />;
      case 'book':
        return <BookOpen size={16} className="mr-2" />;
      case 'file':
        return <FileText size={16} className="mr-2" />;
      case 'info':
        return <Info size={16} className="mr-2" />;
      case 'list':
        return <ListFilter size={16} className="mr-2" />;
      case 'none':
        return null;
      default:
        return <Lightbulb size={16} className="mr-2" />;
    }
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Lightbulb size={20} className={`text-${color} mr-2`} />
          {title}
        </h3>
        
        <Button 
          variant="outline"
          size="sm"
          onClick={toggleAllItems} 
          className="text-sm"
        >
          {showAllItems ? "Recolher todos" : "Expandir todos"}
          {showAllItems ? 
            <ChevronUp size={16} className="ml-2" /> : 
            <ChevronDown size={16} className="ml-2" />
          }
        </Button>
      </div>

      {description && (
        <p className="text-gray-600 mb-4 text-sm">{description}</p>
      )}
      
      <div className="space-y-3">
        {items.map((item, index) => {
          const isExpanded = expandedItems[index] || false;
          
          return (
            <Card key={index} className={cn(
              "border shadow-sm",
              isExpanded ? `border-${color}/30` : "border-gray-200"
            )}>
              <CardContent className="p-0">
                <button 
                  className={cn(
                    "p-3 w-full flex justify-between items-center cursor-pointer text-left",
                    isExpanded ? `bg-${color}/10` : "bg-gray-50"
                  )}
                  onClick={() => toggleItem(index)}
                >
                  <h4 className="font-medium text-gray-800 flex items-center">
                    {getIcon(item.icon)}
                    {item.title}
                  </h4>
                  {isExpanded ? 
                    <ChevronUp size={18} className="text-gray-600" /> : 
                    <ChevronDown size={18} className="text-gray-600" />
                  }
                </button>
                
                {isExpanded && (
                  <div className="p-4 border-t border-gray-100">
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
