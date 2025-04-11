
import React from 'react';
import { Pill } from 'lucide-react';
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
      className="border rounded-lg overflow-hidden"
    >
      <CollapsibleTrigger className="w-full p-4 flex justify-between items-center hover:bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-full">
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
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        <div className="p-4 border-t">
          <Tabs defaultValue="info">
            <TabsList className="mb-4">
              <TabsTrigger value="info">Informações Gerais</TabsTrigger>
              <TabsTrigger value="dosage">Dosagens</TabsTrigger>
              <TabsTrigger value="precautions">Precauções</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info">
              <DrugGeneralInfo 
                description={drug.description}
                indications={drug.indications}
                notes={drug.notes}
              />
            </TabsContent>
            
            <TabsContent value="dosage">
              <DrugDosageInfo dosages={drug.dosages} />
            </TabsContent>
            
            <TabsContent value="precautions">
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
