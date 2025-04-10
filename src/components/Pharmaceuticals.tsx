import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Pill, Rabbit, Dog, Cat, Horse as HorseIcon, Beef as CowIcon, Bird, AlertTriangle, Check, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export interface DrugInfo {
  id: string;
  name: string;
  class: string;
  description: string;
  indications: string[];
  contraindications: string[];
  dosages: DrugDosage[];
  sideEffects: string[];
  interactions: string[];
  notes: string;
  safetyLevel: 'low' | 'medium' | 'high';
}

export interface DrugDosage {
  species: 'canine' | 'feline' | 'equine' | 'bovine' | 'avian' | 'exotic';
  route: string;
  dosage: string;
  frequency: string;
  notes?: string;
}

interface PharmaceuticalsProps {
  drugList: DrugInfo[];
  color: string;
}

const Pharmaceuticals: React.FC<PharmaceuticalsProps> = ({ drugList, color }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);
  const [expandedDrugId, setExpandedDrugId] = useState<string | null>(null);

  const drugClasses = Array.from(new Set(drugList.map(drug => drug.class)));
  
  const filteredDrugs = drugList.filter(drug => {
    const matchesSearch = drug.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         drug.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass ? drug.class === selectedClass : true;
    const matchesSpecies = selectedSpecies ? drug.dosages.some(d => d.species === selectedSpecies) : true;
    
    return matchesSearch && matchesClass && matchesSpecies;
  });

  const getSpeciesIcon = (species: string) => {
    switch (species) {
      case 'canine': return <Dog size={16} />;
      case 'feline': return <Cat size={16} />;
      case 'equine': return <HorseIcon size={16} />;
      case 'bovine': return <CowIcon size={16} />;
      case 'avian': return <Bird size={16} />;
      case 'exotic': return <Rabbit size={16} />;
      default: return <Dog size={16} />;
    }
  };

  const getSafetyLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'high': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSafetyLevelIcon = (level: string) => {
    switch (level) {
      case 'low': return <AlertTriangle size={16} className="text-red-500" />;
      case 'medium': return <AlertCircle size={16} className="text-amber-500" />;
      case 'high': return <Check size={16} className="text-green-500" />;
      default: return <AlertCircle size={16} />;
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Buscar fármacos por nome ou descrição..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select 
            className="px-3 py-2 border rounded-md text-sm"
            value={selectedClass || ''}
            onChange={(e) => setSelectedClass(e.target.value || null)}
          >
            <option value="">Todas as Classes</option>
            {drugClasses.map((cls) => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 border rounded-md text-sm"
            value={selectedSpecies || ''}
            onChange={(e) => setSelectedSpecies(e.target.value || null)}
          >
            <option value="">Todas as Espécies</option>
            <option value="canine">Caninos</option>
            <option value="feline">Felinos</option>
            <option value="equine">Equinos</option>
            <option value="bovine">Bovinos</option>
            <option value="avian">Aves</option>
            <option value="exotic">Exóticos</option>
          </select>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => {
              setSearchTerm('');
              setSelectedClass(null);
              setSelectedSpecies(null);
            }}
            title="Limpar filtros"
          >
            <Filter size={18} />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredDrugs.length > 0 ? (
          filteredDrugs.map((drug) => (
            <Collapsible
              key={drug.id}
              open={expandedDrugId === drug.id}
              onOpenChange={() => setExpandedDrugId(expandedDrugId === drug.id ? null : drug.id)}
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
                      <Badge className={getSafetyLevelColor(drug.safetyLevel)} variant="outline">
                        <span className="flex items-center gap-1">
                          {getSafetyLevelIcon(drug.safetyLevel)}
                          {drug.safetyLevel === 'low' ? 'Baixa Segurança' : 
                           drug.safetyLevel === 'medium' ? 'Segurança Moderada' : 'Alta Segurança'}
                        </span>
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  {drug.dosages.slice(0, 3).map((dosage, idx) => (
                    <div 
                      key={idx} 
                      className="ml-1"
                      title={`Indicado para ${dosage.species}`}
                    >
                      {getSpeciesIcon(dosage.species)}
                    </div>
                  ))}
                  {drug.dosages.length > 3 && (
                    <span className="ml-1 text-xs text-gray-500">+{drug.dosages.length - 3}</span>
                  )}
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
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-sm text-gray-500 mb-1">Descrição</h4>
                          <p>{drug.description}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-sm text-gray-500 mb-1">Indicações</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {drug.indications.map((indication, idx) => (
                              <li key={idx}>{indication}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-sm text-gray-500 mb-1">Notas Adicionais</h4>
                          <p>{drug.notes}</p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="dosage">
                      <div className="space-y-4">
                        {drug.dosages.map((dosage, idx) => (
                          <div key={idx} className="border rounded-md p-3">
                            <div className="flex items-center mb-2">
                              {getSpeciesIcon(dosage.species)}
                              <span className="ml-2 font-medium capitalize">
                                {dosage.species === 'canine' ? 'Caninos' :
                                 dosage.species === 'feline' ? 'Felinos' :
                                 dosage.species === 'equine' ? 'Equinos' :
                                 dosage.species === 'bovine' ? 'Bovinos' :
                                 dosage.species === 'avian' ? 'Aves' : 'Exóticos'}
                              </span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-sm">
                              <div>
                                <span className="text-gray-500 block">Via</span>
                                {dosage.route}
                              </div>
                              <div>
                                <span className="text-gray-500 block">Dosagem</span>
                                {dosage.dosage}
                              </div>
                              <div>
                                <span className="text-gray-500 block">Frequência</span>
                                {dosage.frequency}
                              </div>
                            </div>
                            {dosage.notes && (
                              <div className="mt-2 text-sm">
                                <span className="text-gray-500 block">Observações</span>
                                {dosage.notes}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="precautions">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-sm text-gray-500 mb-1">Contraindicações</h4>
                          <ul className="list-disc pl-5 space-y-1 text-red-700">
                            {drug.contraindications.map((contraindication, idx) => (
                              <li key={idx}>{contraindication}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-sm text-gray-500 mb-1">Efeitos Colaterais</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {drug.sideEffects.map((effect, idx) => (
                              <li key={idx}>{effect}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-sm text-gray-500 mb-1">Interações Medicamentosas</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {drug.interactions.map((interaction, idx) => (
                              <li key={idx}>{interaction}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))
        ) : (
          <div className="text-center py-10 border rounded-lg">
            <div className="flex justify-center mb-4">
              <Pill size={40} className="text-gray-300" />
            </div>
            <h3 className="font-medium text-lg text-gray-500">Nenhum fármaco encontrado</h3>
            <p className="text-gray-400">Tente ajustar seus filtros ou termos de busca</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pharmaceuticals;
