
import React, { useState } from 'react';
import { SubTopic } from '../data/anesthesiaTopics';
import InfoBalloon from './InfoBalloon';
import { ChevronDown, ChevronRight, Lightbulb, BookOpen } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface MindMapProps {
  title: string;
  color: string;
  subtopics: SubTopic[];
}

const MindMap: React.FC<MindMapProps> = ({ title, color, subtopics }) => {
  const [expandedNodes, setExpandedNodes] = useState<{[key: string]: boolean}>({});

  const getColorClass = (colorName: string) => {
    switch (colorName) {
      case 'vet-blue': return 'blue';
      case 'vet-green': return 'green';
      case 'vet-red': return 'red';
      case 'vet-orange': return 'orange';
      case 'vet-purple': return 'purple';
      case 'vet-teal': return 'teal';
      default: return 'blue';
    }
  };

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  const renderKeyInsights = (content: string[]) => {
    return content.slice(0, Math.min(3, content.length)).map((item, idx) => (
      <div key={idx} className="flex items-start mt-1">
        <Lightbulb size={16} className="mr-2 mt-0.5 flex-shrink-0 text-amber-500" />
        <p className="text-sm">{item}</p>
      </div>
    ));
  };

  return (
    <div className="w-full my-8">
      <div className={`p-5 bg-${color}/10 rounded-lg mb-6 text-center border border-${color}/20`}>
        <h2 className={`text-xl font-bold text-${color}`}>{title}</h2>
        <p className="mt-2 text-gray-600">Explore o mapa mental interativo abaixo para compreender melhor este tópico</p>
      </div>

      {/* Visualização principal do mapa mental */}
      <div className="relative mb-8">
        <div className={`w-24 h-24 rounded-full bg-${color} text-white flex items-center justify-center text-center p-2 mx-auto z-10 shadow-lg`}>
          <span className="text-sm font-medium">{title}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {subtopics.map((subtopic, index) => {
            const nodeId = `subtopic-${index}`;
            const isExpanded = expandedNodes[nodeId] || false;
            
            return (
              <div key={nodeId} className="flex flex-col">
                <div className={`relative`}>
                  {/* Linha conectora */}
                  <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 w-px h-8 bg-gray-300"></div>
                  
                  <Collapsible open={isExpanded} onOpenChange={() => toggleNode(nodeId)}
                    className={`bg-white border-2 border-${color}/40 rounded-lg shadow-md overflow-hidden transition-all duration-200`}>
                    <CollapsibleTrigger className={`w-full p-4 flex justify-between items-center bg-${color}/10 hover:bg-${color}/20`}>
                      <h3 className="font-semibold text-vet-dark">{subtopic.title}</h3>
                      {isExpanded ? (
                        <ChevronDown className={`text-${color} h-5 w-5`} />
                      ) : (
                        <ChevronRight className={`text-${color} h-5 w-5`} />
                      )}
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <div className="p-4">
                        <div className="mb-3 flex items-center">
                          <BookOpen size={16} className={`mr-2 text-${color}`} />
                          <span className="text-sm font-medium">Pontos Principais</span>
                        </div>
                        
                        <ul className="space-y-3">
                          {subtopic.content.map((item, i) => (
                            <li key={i} className="flex items-start">
                              <span className={`inline-block w-2 h-2 rounded-full bg-${color} mt-2 mr-2`}></span>
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Informações resumidas em balões */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {subtopics.map((subtopic, index) => (
          <InfoBalloon 
            key={index}
            content={
              <div>
                <h4 className="font-medium mb-2">{subtopic.title}</h4>
                {renderKeyInsights(subtopic.content)}
              </div>
            }
            color={getColorClass(color)}
            className="text-left"
          />
        ))}
      </div>
    </div>
  );
};

export default MindMap;
