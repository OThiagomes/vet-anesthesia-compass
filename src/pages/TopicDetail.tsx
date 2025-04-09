
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, Activity, Heart, Droplet, Wind, Layers, 
  Syringe, Pill, ListChecks, Stethoscope, Bed,
  BookOpen, BookMarked, Lightbulb, AlertTriangle, CheckCircle,
  BookText, FileSpreadsheet, BrainCircuit, FlaskConical
} from 'lucide-react';
import { anesthesiaTopics } from '../data/anesthesiaTopics';
import Navbar from '../components/Navbar';
import MindMap from '../components/MindMap';
import InfoBalloon from '../components/InfoBalloon';
import AISchemaGenerator from '../components/AISchemaGenerator';
import CaseStudy from '../components/CaseStudy';
import QuizSection from '../components/QuizSection';
import Terminology from '../components/Terminology';
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
  
  // Exemplo de estudo de caso para demonstração
  const exampleCaseStudy = {
    title: "Anestesia em Paciente Canino com Insuficiência Cardíaca",
    species: "Canino",
    age: "12 anos",
    weight: "8.5 kg",
    mainComplaint: "Procedimento odontológico para tratamento de doença periodontal avançada",
    steps: [
      {
        title: "Histórico e Anamnese",
        content: "Paciente com histórico de insuficiência cardíaca valvar mitral diagnosticada há 2 anos. Em tratamento com enalapril (0,5 mg/kg BID) e furosemida (2 mg/kg SID). Último ecocardiograma realizado há 3 meses mostrou fração de ejeção de 45% e moderada regurgitação mitral.",
        type: "history"
      },
      {
        title: "Exame Físico Pré-anestésico",
        content: "Frequência cardíaca: 130 bpm\nFrequência respiratória: 28 mpm\nTPC: 2 segundos\nTemperatura: 38.2°C\nSopro cardíaco grau III/VI em foco mitral\nLeve aumento de sons pulmonares em região dorso-caudal\nMucosas levemente pálidas",
        type: "physical"
      },
      {
        title: "Exames Complementares",
        content: "Hemograma: Hematócrito 32% (referência: 37-55%), demais parâmetros normais\nBioquímico: Leve azotemia (creatinina 1.7 mg/dL, referência: 0.5-1.5 mg/dL)\nEletrocardiograma: Arritmia sinusal com frequentes complexos ventriculares prematuros\nRadiografia torácica: Cardiomegalia e leve edema pulmonar perihilar",
        type: "diagnostic"
      },
      {
        title: "Protocolo Anestésico Aplicado",
        content: "1. Medicação pré-anestésica: Metadona (0.2 mg/kg IM) + Midazolam (0.2 mg/kg IM)\n2. Indução: Etomidato (1 mg/kg IV) + Midazolam (0.25 mg/kg IV)\n3. Manutenção: Isoflurano em oxigênio 100%, concentração alveolar mínima ajustada para 0.7-0.9%\n4. Fluidoterapia: Ringer Lactato a 3 ml/kg/h\n5. Analgesia trans-operatória: Lidocaína 2% sem vasoconstritor para bloqueios regionais\n6. Monitoramento multiparamétrico contínuo",
        type: "treatment"
      },
      {
        title: "Recuperação e Acompanhamento",
        content: "Extubação realizada 10 minutos após término do procedimento\nRecuperação gradual sem excitação\nMonitoramento por 6h pós-anestésicas\nRetomada da medicação cardíaca após 4 horas\nA radiografia de controle 24h após procedimento não mostrou sinais de edema pulmonar\nRecomendação de reavaliação cardiológica em 15 dias",
        type: "followup"
      }
    ],
    learningPoints: [
      "Pacientes cardiopatas requerem protocolos anestésicos específicos com mínimo impacto na função cardiovascular",
      "O etomidato é uma excelente opção para indução em pacientes com comprometimento cardíaco devido à estabilidade hemodinâmica",
      "A fluidoterapia restritiva é fundamental para evitar sobrecarga de volume",
      "Bloqueios regionais reduzem a necessidade de anestésicos gerais",
      "O monitoramento contínuo e intervenção precoce são essenciais para o sucesso anestésico"
    ]
  };
  
  // Exemplo de perguntas para o componente de quiz
  const quizQuestions = [
    {
      question: "Qual das seguintes afirmações sobre o uso de opioides na anestesia veterinária é INCORRETA?",
      options: [
        "Opioides podem causar bradicardia dose-dependente",
        "Todos os opioides causam depressão respiratória na mesma intensidade",
        "A metadona possui menor efeito disfórico em felinos comparada à morfina",
        "O butorfanol tem efeito teto para analgesia"
      ],
      correctAnswer: 1,
      explanation: "Os opioides têm diferentes potenciais para causar depressão respiratória. Opioides agonistas totais como morfina e fentanil causam depressão respiratória mais intensa do que agonistas parciais ou agonistas-antagonistas como o butorfanol."
    },
    {
      question: "Em relação aos anestésicos inalatórios, qual característica é mais vantajosa para procedimentos de curta duração?",
      options: [
        "Alto coeficiente de solubilidade sangue-gás",
        "Baixo coeficiente de solubilidade sangue-gás",
        "Alta potência anestésica",
        "Metabolização hepática significativa"
      ],
      correctAnswer: 1,
      explanation: "Anestésicos com baixo coeficiente de solubilidade sangue-gás (como sevoflurano e desflurano) permitem indução e recuperação mais rápidas, sendo ideais para procedimentos curtos, pois entram e saem rapidamente do organismo."
    },
    {
      question: "Qual das seguintes drogas é mais adequada para indução anestésica em um paciente canino com cardiopatia descompensada?",
      options: [
        "Propofol",
        "Etomidato",
        "Tiopental",
        "Cetamina"
      ],
      correctAnswer: 1,
      explanation: "O etomidato é o agente de indução de escolha para pacientes com comprometimento cardiovascular devido à sua estabilidade hemodinâmica, causando mínimas alterações na contratilidade miocárdica, frequência cardíaca e pressão arterial."
    }
  ];
  
  // Exemplo de termos para o glossário
  const terminologyItems = [
    {
      id: "term1",
      term: "MAC (Concentração Alveolar Mínima)",
      definition: "Concentração alveolar mínima de um anestésico inalatório que impede movimento motor em resposta a um estímulo nociceptivo padronizado em 50% dos pacientes. É a medida padrão da potência dos anestésicos inalatórios.",
      category: "Conceitos Básicos",
      language: {
        en: "MAC (Minimum Alveolar Concentration)",
        es: "CAM (Concentración Alveolar Mínima)",
        fr: "CAM (Concentration Alvéolaire Minimale)"
      }
    },
    {
      id: "term2",
      term: "Analgesia Preemptiva",
      definition: "Administração de analgésicos antes do estímulo doloroso, visando prevenir sensibilização central e periférica, resultando em melhor controle da dor pós-operatória com doses menores de analgésicos.",
      category: "Manejo da Dor",
      language: {
        en: "Preemptive Analgesia",
        es: "Analgesia Preventiva",
        fr: "Analgésie Préemptive"
      }
    },
    {
      id: "term3",
      term: "Antagonismo Competitivo",
      definition: "Tipo de antagonismo farmacológico onde a droga antagonista compete com o agonista pelo mesmo receptor, sem ativá-lo. A naloxona antagonizando morfina é um exemplo clássico deste mecanismo.",
      category: "Farmacologia",
      language: {
        en: "Competitive Antagonism",
        es: "Antagonismo Competitivo",
        fr: "Antagonisme Compétitif"
      }
    },
    {
      id: "term4",
      term: "Indução em Sequência Rápida",
      definition: "Técnica de indução anestésica que minimiza o tempo entre perda de consciência e intubação, reduzindo o risco de aspiração pulmonar em pacientes com estômago cheio ou outras condições de risco.",
      category: "Técnicas Anestésicas",
      language: {
        en: "Rapid Sequence Induction",
        es: "Inducción de Secuencia Rápida",
        fr: "Induction en Séquence Rapide"
      }
    },
    {
      id: "term5",
      term: "Agonista Alfa-2 Adrenérgico",
      definition: "Classe de fármacos que atuam nos receptores alfa-2 adrenérgicos, produzindo sedação, analgesia e relaxamento muscular. Exemplos incluem dexmedetomidina e xilazina, amplamente utilizados na anestesiologia veterinária.",
      category: "Farmacologia",
      language: {
        en: "Alpha-2 Adrenergic Agonist",
        es: "Agonista Alfa-2 Adrenérgico",
        fr: "Agoniste Alpha-2 Adrénergique"
      }
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
              <TabsList className="mb-6 grid grid-cols-5 md:w-full overflow-x-auto">
                <TabsTrigger value="mindmap" className="flex items-center">
                  <BrainCircuit size={16} className="mr-2" />
                  Mapa Mental
                </TabsTrigger>
                <TabsTrigger value="content" className="flex items-center">
                  <BookText size={16} className="mr-2" />
                  Conteúdo Detalhado
                </TabsTrigger>
                <TabsTrigger value="terminology" className="flex items-center">
                  <BookOpen size={16} className="mr-2" />
                  Terminologia
                </TabsTrigger>
                <TabsTrigger value="clinical" className="flex items-center">
                  <FlaskConical size={16} className="mr-2" />
                  Casos Clínicos
                </TabsTrigger>
                <TabsTrigger value="schemas" className="flex items-center">
                  <FileSpreadsheet size={16} className="mr-2" />
                  Esquemas
                </TabsTrigger>
              </TabsList>
              
              {/* Aba de Mapa Mental */}
              <TabsContent value="mindmap" className="mt-4">
                <MindMap 
                  title={topic.title}
                  color={topic.color}
                  subtopics={topic.subtopics}
                />
              </TabsContent>
              
              {/* Aba de Conteúdo Detalhado */}
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
                                
                                {/* Seção de questões para fixação */}
                                <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-lg">
                                  <h4 className="font-medium text-amber-800 mb-3 flex items-center">
                                    <Lightbulb size={18} className="mr-2" />
                                    Questões para Fixação
                                  </h4>
                                  
                                  <ul className="space-y-4">
                                    <li className="bg-white p-3 rounded border border-amber-200">
                                      <p className="font-medium mb-1">{subtopic.title} está diretamente relacionado a qual sistema fisiológico?</p>
                                      <p className="text-sm text-gray-600">Reflita sobre os mecanismos de ação e seus alvos principais.</p>
                                    </li>
                                    <li className="bg-white p-3 rounded border border-amber-200">
                                      <p className="font-medium mb-1">Quais são as principais contraindicações ao uso dos agentes discutidos neste tópico?</p>
                                      <p className="text-sm text-gray-600">Considere diferentes espécies e condições clínicas específicas.</p>
                                    </li>
                                    <li className="bg-white p-3 rounded border border-amber-200">
                                      <p className="font-medium mb-1">Como você ajustaria as doses em pacientes com comprometimento renal?</p>
                                      <p className="text-sm text-gray-600">Analise a farmacocinética dos agentes e suas vias de eliminação.</p>
                                    </li>
                                  </ul>
                                </div>
                              </CardContent>
                            </CollapsibleContent>
                          </Card>
                        </Collapsible>
                      );
                    })}
                    
                    {/* Quiz para testar conhecimentos */}
                    <div className="mt-8">
                      <h3 className="text-xl font-bold mb-4 text-vet-dark flex items-center">
                        <Activity size={22} className="mr-2" />
                        Teste seus Conhecimentos
                      </h3>
                      
                      <QuizSection 
                        title={`Quiz sobre ${topic.title}`}
                        description="Responda às questões abaixo para testar seus conhecimentos sobre este tópico"
                        questions={quizQuestions}
                      />
                    </div>
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
                        <li>• Seymour, C.; Duke-Novakovski, T. BSAVA Manual of Canine and Feline Anaesthesia and Analgesia.</li>
                        <li>• West, E.; Heard, D.J.; Caulkett, N. Zoo Animal and Wildlife Immobilization and Anesthesia.</li>
                      </ul>
                    </div>
                    
                    {/* Recursos de aprendizado adicionais */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <h3 className="font-medium flex items-center mb-3 text-blue-800">
                        <BookMarked size={16} className="mr-2" />
                        Recursos Adicionais
                      </h3>
                      <ul className="text-sm space-y-3">
                        <li className="flex items-start">
                          <div className="bg-blue-100 p-1 rounded mr-2">
                            <Activity size={14} className="text-blue-600" />
                          </div>
                          <span>
                            <a href="#" className="text-blue-700 hover:underline font-medium">Tutorial em Vídeo</a>: 
                            <span className="text-blue-800"> Técnicas avançadas em anestesia de pequenos animais</span>
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-blue-100 p-1 rounded mr-2">
                            <BookOpen size={14} className="text-blue-600" />
                          </div>
                          <span>
                            <a href="#" className="text-blue-700 hover:underline font-medium">Artigo</a>: 
                            <span className="text-blue-800"> Atualidades em monitoração anestésica multiparamétrica</span>
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-blue-100 p-1 rounded mr-2">
                            <FileSpreadsheet size={14} className="text-blue-600" />
                          </div>
                          <span>
                            <a href="#" className="text-blue-700 hover:underline font-medium">Planilha Calculadora</a>: 
                            <span className="text-blue-800"> Dosagens para diferentes espécies e portes</span>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Aba de Terminologia */}
              <TabsContent value="terminology" className="mt-4">
                <Terminology 
                  terms={terminologyItems} 
                  color={topic.color}
                />
              </TabsContent>
              
              {/* Aba de Casos Clínicos */}
              <TabsContent value="clinical" className="mt-4">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-4 text-vet-dark flex items-center">
                    <FlaskConical size={24} className="mr-2" />
                    Casos Clínicos para Estudo
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Analise os seguintes casos clínicos relacionados a {topic.title}. Cada caso apresenta situações reais 
                    que demonstram a aplicação prática dos conceitos abordados neste tópico.
                  </p>
                  
                  <CaseStudy {...exampleCaseStudy} />
                  
                  {/* Botão para mais casos */}
                  <div className="text-center mt-8">
                    <Button variant="outline" className="mx-auto">
                      Ver mais casos clínicos
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              {/* Aba de Esquemas */}
              <TabsContent value="schemas" className="mt-4">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-vet-dark flex items-center">
                    <FileSpreadsheet size={24} className="mr-2" />
                    Gerador de Esquemas
                  </h2>
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
