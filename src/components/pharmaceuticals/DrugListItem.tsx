
import React from 'react';
import { Pill, ChevronDown, ChevronUp, Info, FileText, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DrugInfo } from '../Pharmaceuticals';
import SafetyLevelBadge from './SafetyLevelBadge';
import DrugGeneralInfo from './DrugGeneralInfo';
import DrugDosageInfo from './DrugDosageInfo';
import DrugPrecautions from './DrugPrecautions';

interface DrugListItemProps {
  drug: DrugInfo;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const DrugListItem: React.FC<DrugListItemProps> = ({ drug, isExpanded, onToggleExpand }) => {
  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={onToggleExpand}
      className="border rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md"
    >
      <CollapsibleTrigger className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
        <div className="flex items-center space-x-3">
          <div className={`bg-blue-100 p-2 rounded-full ${isExpanded ? 'bg-blue-200' : ''}`}>
            <Pill size={20} className="text-blue-700" />
          </div>
          <div className="text-left">
            <h3 className="font-medium text-lg">{drug.name}</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              <Badge variant="secondary">{drug.class}</Badge>
              <SafetyLevelBadge level={drug.safetyLevel} />
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
            <TabsList className="mb-4 w-full justify-start bg-white border">
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
            </TabsList>
            
            <TabsContent value="info" className="bg-white p-4 rounded-md border animate-in fade-in-50">
              <DrugGeneralInfo 
                description={drug.description}
                indications={drug.indications}
                notes={drug.notes}
              />
            </TabsContent>
            
            <TabsContent value="dosage" className="bg-white p-4 rounded-md border animate-in fade-in-50">
              <DrugDosageInfo dosages={drug.dosages} />
            </TabsContent>
            
            <TabsContent value="precautions" className="bg-white p-4 rounded-md border animate-in fade-in-50">
              <DrugPrecautions
                contraindications={drug.contraindications}
                sideEffects={drug.sideEffects}
                interactions={drug.interactions}
              />
            </TabsContent>
          </Tabs>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default DrugListItem;
