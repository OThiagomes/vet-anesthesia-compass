
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from 'lucide-react';

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
  if (!items || items.length === 0) return null;

  return (
    <div className="mt-6 space-y-4">
      <h4 className="text-lg font-semibold flex items-center">
        <Lightbulb size={18} className={`text-${color} mr-2`} />
        Conteúdo Expandido
      </h4>
      
      <div className="space-y-3">
        {items.map((item, index) => (
          <Card key={index} className={`border-${color}/20 hover:border-${color}/50 transition-colors`}>
            <CardContent className="p-0">
              <div className={`p-3 bg-${color}/10 border-b border-${color}/20`}>
                <h5 className="font-medium text-gray-800">{item.title}</h5>
              </div>
              <div className="p-4">
                <p className="text-gray-700 whitespace-pre-line">{item.content}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExpandedContentSection;
