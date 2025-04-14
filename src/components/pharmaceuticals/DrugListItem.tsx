
import React from 'react';
import { Pill, ChevronDown, ChevronUp, Info, FileText, AlertTriangle, Book, ListChecks, Stethoscope, BookOpen, Flask, Syringe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DrugInfo } from '../Pharmaceuticals';
import SafetyLevelBadge from './SafetyLevelBadge';
import DrugGeneralInfo from './DrugGeneralInfo';
import DrugDosageInfo from './DrugDosageInfo';
import DrugPrecautions from './DrugPrecautions';
import ReferencesList from '../ReferencesList';
import KeyPointsList from '../KeyPointsList';
import InfoBalloon from '../InfoBalloon';

interface DrugListItemProps {
  drug: DrugInfo;
  isExpanded: boolean;
  onToggleExpand: () => void;
  color?: string;
}

const DrugListItem: React.FC<DrugListItemProps> = ({ drug, isExpanded, onToggleExpand, color = "blue" }) => {
  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={onToggleExpand}
      className="border rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md mb-4"
    >
      <CollapsibleTrigger className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
        <div className="flex items-center space-x-3">
          <div className={`bg-${color}-100 p-2 rounded-full ${isExpanded ? `bg-${color}-200` : ''}`}>
            <Pill size={20} className={`text-${color}-700`} />
          </div>
          <div className="text-left">
            <h3 className="font-medium text-lg">{drug.name}</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Book size={12} />
                {drug.class}
              </Badge>
              <SafetyLevelBadge level={drug.safetyLevel} />
              {drug.dosages && drug.dosages.length > 0 && (
                <Badge variant="outline" className="text-xs">
                  {drug.dosages.length} dosagens
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center text-gray-500">
          {isExpanded ? (
            <ChevronUp size={20} className="transition-transform" />
          ) : (
            <ChevronDown size={20} className="transition-transform" />
          )}
        </div>
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        <div className="p-4 border-t bg-gray-50">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="mb-4 w-full justify-start bg-white border overflow-x-auto">
              <TabsTrigger value="info" className="flex items-center">
                <Info size={16} className="mr-2" />
                Informações Gerais
              </TabsTrigger>
              <TabsTrigger value="dosage" className="flex items-center">
                <FileText size={16} className="mr-2" />
                Dosagens
              </TabsTrigger>
              <TabsTrigger value="precautions" className="flex items-center">
                <AlertTriangle size={16} className="mr-2" />
                Precauções
              </TabsTrigger>
              <TabsTrigger value="clinical" className="flex items-center">
                <Stethoscope size={16} className="mr-2" />
                Notas Clínicas
              </TabsTrigger>
              {drug.references && drug.references.length > 0 && (
                <TabsTrigger value="references" className="flex items-center">
                  <BookOpen size={16} className="mr-2" />
                  Referências
                </TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="info" className="bg-white p-4 rounded-md border animate-in fade-in-50">
              <DrugGeneralInfo 
                description={drug.description}
                indications={drug.indications}
                notes={drug.notes}
              />
              
              {drug.mechanism && (
                <InfoBalloon
                  title="Mecanismo de Ação"
                  content={<p className="text-sm leading-relaxed">{drug.mechanism}</p>}
                  color={color}
                  expandable={drug.mechanism.length > 200}
                  icon={<Flask size={18} className="mr-2" />}
                />
              )}

              {drug.pharmacokinetics && (
                <InfoBalloon
                  title="Farmacocinética"
                  content={<p className="text-sm leading-relaxed">{drug.pharmacokinetics}</p>}
                  color={color}
                  expandable={true}
                  icon={<FileText size={18} className="mr-2" />}
                  type="info"
                />
              )}
              
              {drug.pharmacodynamics && (
                <InfoBalloon
                  title="Farmacodinâmica"
                  content={<p className="text-sm leading-relaxed">{drug.pharmacodynamics}</p>}
                  color={color}
                  expandable={true}
                  icon={<FileText size={18} className="mr-2" />}
                  type="info"
                />
              )}
            </TabsContent>
            
            <TabsContent value="dosage" className="bg-white p-4 rounded-md border animate-in fade-in-50">
              <DrugDosageInfo dosages={drug.dosages || []} />
              
              {drug.administration && (
                <InfoBalloon
                  title="Administração"
                  content={<p className="text-sm leading-relaxed">{drug.administration}</p>}
                  color={color}
                  icon={<Syringe size={18} className="mr-2" />}
                  type="tip"
                />
              )}
            </TabsContent>
            
            <TabsContent value="precautions" className="bg-white p-4 rounded-md border animate-in fade-in-50">
              <DrugPrecautions
                contraindications={drug.contraindications || []}
                sideEffects={drug.sideEffects || []}
                interactions={drug.interactions || []}
              />
            </TabsContent>
            
            <TabsContent value="clinical" className="bg-white p-4 rounded-md border animate-in fade-in-50">
              <div>
                <h3 className="font-medium mb-3 flex items-center">
                  <ListChecks size={16} className="mr-2" />
                  Considerações Clínicas
                </h3>
                
                <InfoBalloon
                  title="Monitoramento Recomendado"
                  content={
                    <p className="text-sm leading-relaxed">
                      {drug.notes || "Observe o estado clínico do paciente antes da administração. Monitore os parâmetros cardiovasculares e respiratórios durante o uso. Ajuste as doses conforme necessário baseado na resposta individual do paciente."}
                    </p>
                  }
                  color={color}
                  type="important"
                />
                
                {drug.clinicalPearls && drug.clinicalPearls.length > 0 && (
                  <KeyPointsList 
                    points={drug.clinicalPearls} 
                    title="Pontos de Atenção Clínica" 
                    color={color}
                    importance="high"
                    description="Observações importantes para aplicação clínica segura e eficaz:"
                  />
                )}
              </div>
            </TabsContent>
            
            {drug.references && drug.references.length > 0 && (
              <TabsContent value="references" className="bg-white p-4 rounded-md border animate-in fade-in-50">
                <ReferencesList 
                  references={drug.references} 
                  color={color} 
                  type="mixed"
                />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default DrugListItem;
