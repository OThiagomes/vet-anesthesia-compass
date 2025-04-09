
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, Activity, Heart, Droplet, Wind, Layers, 
  Syringe, Pill, ListChecks, Stethoscope, Bed,
  BookOpen, BookMarked, Lightbulb, AlertTriangle, CheckCircle
} from 'lucide-react';
import { anesthesiaTopics } from '../data/anesthesiaTopics';
import Navbar from '../components/Navbar';
import MindMap from '../components/MindMap';
import InfoBalloon from '../components/InfoBalloon';
import AISchemaGenerator from '../components/AISchemaGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';

const TopicDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const topicId = parseInt(id || '1');
  const topic = anesthesiaTopics.find(t => t.id === topicId);
  const [expandedSubtopics, setExpandedSubtopics] = useState<{[key: string]: boolean}>({});

  const toggleSubtopic = (subtopicId: string) => {
    setExpandedSubtopics(prev => ({
      ...prev,
      [subtopicId]: !prev[subtopicId]
    }));
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'heart': return <Heart size={28} />;
      case 'droplet': return <Droplet size={28} />;
      case 'wind': return <Wind size={28} />;
      case 'layers': return <Layers size={28} />;
      case 'syringe': return <Syringe size={28} />;
      case 'pill': return <Pill size={28} />;
      case 'list-checks': return <ListChecks size={28} />;
      case 'activity': return <Activity size={28} />;
      case 'lungs': return <Activity size={28} />; // Replace with Activity icon
      case 'bed': return <Bed size={28} />;
      case 'stethoscope': return <Stethoscope size={28} />;
      default: return <Activity size={28} />;
    }
  };

  if (!topic) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Tópico não encontrado</h2>
          <Link to="/" className="text-vet-blue hover:underline">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    );
  }

  // Considerações clínicas relacionadas ao tópico
  const clinicalConsiderations = [
    {
      id: 1,
      title: "Considerações Especiais para Pacientes Geriátricos",
      content: "Pacientes geriátricos podem apresentar alterações fisiológicas que afetam a farmacocinética e farmacodinâmica dos anestésicos. É comum observar redução na função hepática e renal, alterando o metabolismo e excreção de fármacos.",
      type: "warning"
    },
    {
      id: 2,
      title: "Aplicação em Pacientes Pediátricos",
      content: "Em neonatos e filhotes, os sistemas enzimáticos hepáticos ainda não estão completamente desenvolvidos, e a composição corporal apresenta maior percentual de água. Estas características exigem ajustes de dosagem e monitoramento especial.",
      type: "info"
    },
    {
      id: 3,
      title: "Boas Práticas de Segurança",
      content: "A preparação de um kit de emergência e a verificação dos equipamentos antes de cada procedimento são essenciais para garantir a segurança do paciente durante a anestesia.",
      type: "success"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-vet-blue hover:underline"
          >
            <ChevronLeft size={20} />
            <span>Voltar para todos os tópicos</span>
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className={`bg-${topic.color} p-8 text-white`}>
            <div className="flex items-center mb-4">
              <div className="bg-white/20 p-3 rounded-full">
                {getIcon(topic.icon)}
              </div>
              <h1 className="text-3xl font-bold ml-4">
                {topic.id}. {topic.title}
              </h1>
            </div>
            <p className="text-xl opacity-90">{topic.description}</p>
          </div>
          
          <div className="p-6">
            <Tabs defaultValue="mindmap" className="mb-8">
              <TabsList className="mb-6 grid grid-cols-3 md:w-[400px]">
                <TabsTrigger value="mindmap">Mapa Mental</TabsTrigger>
                <TabsTrigger value="content">Conteúdo Detalhado</TabsTrigger>
                <TabsTrigger value="schemas">Esquemas</TabsTrigger>
              </TabsList>
              
              <TabsContent value="mindmap" className="mt-4">
                <MindMap 
                  title={topic.title}
                  color={topic.color}
                  subtopics={topic.subtopics}
                />
              </TabsContent>
              
              <TabsContent value="content" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="col-span-1 md:col-span-2">
                    <h2 className="text-2xl font-bold mb-6 text-vet-dark">Conteúdo Detalhado</h2>
                    
                    {topic.subtopics.map((subtopic, index) => {
                      const subtopicId = `subtopic-${index}`;
                      const isExpanded = expandedSubtopics[subtopicId] !== false; // default expanded
                      
                      return (
                        <Collapsible 
                          key={index} 
                          open={isExpanded}
                          onOpenChange={() => toggleSubtopic(subtopicId)}
                          className="mb-6"
                        >
                          <Card>
                            <CollapsibleTrigger asChild>
                              <Button
                                variant="ghost" 
                                className={`w-full flex justify-between items-center p-4 bg-${topic.color}/10 hover:bg-${topic.color}/20 rounded-t-lg border-b`}
                              >
                                <div className="flex items-center">
                                  <BookMarked className={`text-${topic.color} mr-2`} size={20} />
                                  <h3 className="text-xl font-semibold text-vet-dark text-left">
                                    {subtopic.title}
                                  </h3>
                                </div>
                                <div>
                                  {isExpanded ? (
                                    <ChevronLeft className="rotate-90" size={20} />
                                  ) : (
                                    <ChevronLeft className="-rotate-90" size={20} />
                                  )}
                                </div>
                              </Button>
                            </CollapsibleTrigger>
                            
                            <CollapsibleContent>
                              <CardContent className="pt-4">
                                <ul className="space-y-6">
                                  {subtopic.content.map((item, i) => (
                                    <li key={i} className="bg-gray-50 p-4 rounded-lg border">
                                      <div className="flex items-start">
                                        <div className={`w-6 h-6 rounded-full bg-${topic.color} text-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0`}>
                                          {i + 1}
                                        </div>
                                        <div>
                                          <p className="mb-2">{item}</p>
                                          
                                          {/* Conteúdo detalhado para cada item (simulado) */}
                                          <div className="mt-3 pl-1 text-sm text-gray-700">
                                            <p className="mb-2">
                                              Este ponto é fundamental para a compreensão completa do tópico. 
                                              Para dominar este conceito, é importante relacionar com conhecimentos 
                                              de anatomia e fisiologia, observando como os mecanismos de ação dos 
                                              fármacos interagem com os sistemas corporais.
                                            </p>
                                            
                                            {/* Dica clínica */}
                                            <div className="bg-blue-50 border border-blue-100 rounded-md p-3 mt-3 flex">
                                              <Lightbulb size={18} className="text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                                              <p>
                                                <span className="font-medium text-blue-800">Dica clínica:</span>{" "}
                                                Ao aplicar este conhecimento na prática, sempre considere 
                                                o estado fisiológico do paciente, especialmente em casos de 
                                                comprometimento hepático ou renal, onde ajustes de dosagem 
                                                podem ser necessários.
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </CardContent>
                            </CollapsibleContent>
                          </Card>
                        </Collapsible>
                      );
                    })}
                  </div>
                  
                  {/* Coluna lateral com considerações clínicas */}
                  <div className="col-span-1">
                    <h3 className="text-lg font-semibold mb-4 text-vet-dark pb-2 border-b">
                      Considerações Clínicas
                    </h3>
                    
                    <div className="space-y-4">
                      {clinicalConsiderations.map((item) => {
                        let icon, bgColor;
                        switch (item.type) {
                          case 'warning':
                            icon = <AlertTriangle size={18} className="text-amber-500" />;
                            bgColor = "bg-amber-50 border-amber-100";
                            break;
                          case 'success':
                            icon = <CheckCircle size={18} className="text-green-500" />;
                            bgColor = "bg-green-50 border-green-100";
                            break;
                          default:
                            icon = <Lightbulb size={18} className="text-blue-500" />;
                            bgColor = "bg-blue-50 border-blue-100";
                        }
                        
                        return (
                          <div 
                            key={item.id} 
                            className={`p-3 rounded-md border ${bgColor}`}
                          >
                            <div className="flex items-start">
                              <div className="mt-0.5 mr-2 flex-shrink-0">
                                {icon}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 text-sm">
                                  {item.title}
                                </h4>
                                <p className="text-sm mt-1 text-gray-700">
                                  {item.content}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                      <h3 className="font-medium flex items-center mb-2">
                        <BookOpen size={16} className="mr-2" />
                        Referências Recomendadas
                      </h3>
                      <ul className="text-sm space-y-2">
                        <li>• Tranquilli, W.J.; Thurmon, J.C.; Grimm, K.A. Lumb & Jones' Veterinary Anesthesia and Analgesia, 4th Ed.</li>
                        <li>• Grimm, K.A.; Lamont, L.A.; Tranquilli, W.J.; Greene, S.A.; Robertson, S.A. Veterinary Anesthesia and Analgesia: The Fifth Edition of Lumb and Jones.</li>
                        <li>• McKelvey, D.; Hollingshead, K.W. Small Animal Anesthesia & Analgesia.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="schemas" className="mt-4">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-vet-dark">Gerador de Esquemas</h2>
                  <p className="mb-6 text-gray-600">
                    Utilize nossa ferramenta de inteligência artificial para criar esquemas personalizados sobre os conceitos deste tópico.
                    O esquema gerado será baseado nos principais pontos de {topic.title} e adaptado às suas necessidades de estudo.
                  </p>
                  
                  <AISchemaGenerator topicTitle={topic.title} />
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4 text-vet-dark">Esquemas Específicos por Subtópico</h3>
                  <p className="mb-6 text-gray-600">
                    Selecione um subtópico específico para gerar um esquema mais focalizado:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {topic.subtopics.map((subtopic, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className={`p-4 bg-${topic.color}/10 border-b border-${topic.color}/20`}>
                          <h4 className="font-medium">{subtopic.title}</h4>
                        </div>
                        <CardContent className="p-4">
                          <p className="text-sm text-gray-600 mb-4">
                            Gere um esquema detalhado sobre este subtópico específico
                          </p>
                          <Button 
                            variant="outline" 
                            className={`w-full border-${topic.color} text-${topic.color} hover:bg-${topic.color}/10`}
                          >
                            Gerar Esquema
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;
