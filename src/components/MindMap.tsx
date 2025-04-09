
import React, { useState } from 'react';
import { SubTopic } from '../data/anesthesiaTopics';
import InfoBalloon from './InfoBalloon';
import { ChevronDown, ChevronRight, Lightbulb, BookOpen, Share2, ZoomIn, ZoomOut, PanelLeft } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';

interface MindMapProps {
  title: string;
  color: string;
  subtopics: SubTopic[];
}

const MindMap: React.FC<MindMapProps> = ({ title, color, subtopics }) => {
  const [expandedNodes, setExpandedNodes] = useState<{[key: string]: boolean}>({});
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);

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
  
  const selectNode = (index: number) => {
    setSelectedNode(index === selectedNode ? null : index);
    setShowSidePanel(true);
  };

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 1.5));
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
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
      
      {/* Controles do mapa */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={zoomIn} className="h-8 w-8 p-0">
            <ZoomIn size={16} />
          </Button>
          <Button variant="outline" size="sm" onClick={zoomOut} className="h-8 w-8 p-0">
            <ZoomOut size={16} />
          </Button>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowSidePanel(!showSidePanel)}
          className={`h-8 ${showSidePanel ? 'bg-gray-100' : ''}`}
        >
          <PanelLeft size={16} className="mr-2" />
          {showSidePanel ? "Ocultar detalhes" : "Mostrar detalhes"}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Visualização principal do mapa mental */}
        <div 
          className={`relative mb-8 flex-grow transition-all ${showSidePanel ? 'md:w-2/3' : 'w-full'}`}
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
        >
          <div className="flex flex-col items-center">
            <div className={`w-24 h-24 rounded-full bg-${color} text-white flex items-center justify-center text-center p-2 mx-auto z-10 shadow-lg`}>
              <span className="text-sm font-medium">{title}</span>
            </div>
            
            {/* Linhas conectoras verticais */}
            <div className="w-px h-12 bg-gray-300 my-2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 w-full">
              {subtopics.map((subtopic, index) => {
                const nodeId = `subtopic-${index}`;
                const isExpanded = expandedNodes[nodeId] || false;
                const isSelected = selectedNode === index;
                
                return (
                  <div key={nodeId} className="flex flex-col">
                    <div className={`relative`}>
                      {/* Linha conectora */}
                      <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 w-px h-8 bg-gray-300"></div>
                      
                      <Collapsible 
                        open={isExpanded} 
                        onOpenChange={() => toggleNode(nodeId)}
                        className={`
                          bg-white border-2 rounded-lg shadow-md overflow-hidden transition-all duration-200
                          ${isSelected ? `border-${color} ring-2 ring-${color}/30` : `border-${color}/40`}
                        `}
                      >
                        <CollapsibleTrigger 
                          className={`w-full p-4 flex justify-between items-center bg-${color}/10 hover:bg-${color}/20`}
                          onClick={() => selectNode(index)}
                        >
                          <h3 className="font-semibold text-vet-dark">{subtopic.title}</h3>
                          <div className="flex items-center">
                            {isExpanded ? (
                              <ChevronDown className={`text-${color} h-5 w-5`} />
                            ) : (
                              <ChevronRight className={`text-${color} h-5 w-5`} />
                            )}
                          </div>
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent>
                          <div className="p-4">
                            <div className="mb-3 flex items-center">
                              <BookOpen size={16} className={`mr-2 text-${color}`} />
                              <span className="text-sm font-medium">Pontos Principais</span>
                            </div>
                            
                            <ul className="space-y-3">
                              {subtopic.content.slice(0, isExpanded ? undefined : 3).map((item, i) => (
                                <li key={i} className="flex items-start">
                                  <span className={`inline-block w-2 h-2 rounded-full bg-${color} mt-2 mr-2`}></span>
                                  <span className="text-sm">{item}</span>
                                </li>
                              ))}
                            </ul>
                            
                            {!isExpanded && subtopic.content.length > 3 && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="mt-2 text-xs"
                                onClick={() => toggleNode(nodeId)}
                              >
                                Ver mais {subtopic.content.length - 3} itens
                              </Button>
                            )}
                            
                            <div className="mt-3 flex justify-end">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-xs flex items-center"
                                onClick={() => selectNode(index)}
                              >
                                <Share2 size={14} className="mr-1" />
                                Expandir
                              </Button>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Painel lateral com detalhes */}
        {showSidePanel && (
          <div className="md:w-1/3 bg-gray-50 p-4 rounded-lg border animate-fade-in">
            {selectedNode !== null ? (
              <div>
                <h3 className={`text-lg font-bold mb-4 text-${color} border-b pb-2`}>
                  {subtopics[selectedNode].title}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm uppercase text-gray-500 mb-2">Conceitos principais</h4>
                    <ul className="space-y-2">
                      {subtopics[selectedNode].content.map((item, idx) => (
                        <li key={idx} className="flex items-start p-2 bg-white rounded border">
                          <span className={`inline-block w-2 h-2 rounded-full bg-${color} mt-2 mr-2`}></span>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm uppercase text-gray-500 mb-2">Dicas de estudo</h4>
                    <div className="bg-amber-50 border border-amber-100 rounded p-3">
                      <p className="text-sm text-amber-800">
                        Ao estudar {subtopics[selectedNode].title}, procure relacionar os conceitos com a anatomia e fisiologia subjacentes. 
                        Considere criar flashcards com os mecanismos de ação e aspectos clínicos importantes.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm uppercase text-gray-500 mb-2">Palavras-chave</h4>
                    <div className="flex flex-wrap gap-2">
                      {subtopics[selectedNode].content.slice(0, 5).map((item, idx) => {
                        // Extract keywords from content
                        const words = item.split(' ').filter(w => w.length > 4).slice(0, 2);
                        return words.map((word, widx) => (
                          <span 
                            key={`${idx}-${widx}`} 
                            className={`inline-block px-2 py-1 text-xs rounded-full bg-${color}/10 text-${color}`}
                          >
                            {word.replace(/[^a-zA-Zà-úÀ-Ú]/g, '')}
                          </span>
                        ));
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <BookOpen size={40} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">Detalhes do Tópico</h3>
                <p className="text-sm text-gray-500">
                  Clique em um subtópico no mapa mental para ver informações detalhadas.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Informações resumidas em balões */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {subtopics.map((subtopic, index) => (
          <InfoBalloon 
            key={index}
            title={subtopic.title}
            content={renderKeyInsights(subtopic.content)}
            color={getColorClass(color)}
            className="text-left"
            expandable={true}
            downloadable={true}
            shareable={true}
          />
        ))}
      </div>
    </div>
  );
};

export default MindMap;
