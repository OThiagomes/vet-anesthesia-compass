
import React, { useState } from 'react';
import DrugFilters from './pharmaceuticals/DrugFilters';
import DrugList from './pharmaceuticals/DrugList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, PencilRuler, Pill, Stethoscope } from 'lucide-react';

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
  references?: string[];
  clinicalPearls?: string[];
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
  const [currentView, setCurrentView] = useState<'list' | 'table' | 'cards'>('list');

  const drugClasses = Array.from(new Set(drugList.map(drug => drug.class)));
  
  const filteredDrugs = drugList.filter(drug => {
    const matchesSearch = drug.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         drug.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass ? drug.class === selectedClass : true;
    const matchesSpecies = selectedSpecies ? drug.dosages.some(d => d.species === selectedSpecies) : true;
    
    return matchesSearch && matchesClass && matchesSpecies;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedClass(null);
    setSelectedSpecies(null);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Farmacologia Aplicada</h2>
        <p className="text-gray-600">
          Explore o detalhamento farmacológico dos principais agentes utilizados em anestesiologia veterinária.
          Utilize os filtros para encontrar informações específicas por nome, classe farmacológica ou espécie animal.
        </p>
        
        <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-4">
          <h3 className="text-blue-800 font-medium flex items-center mb-2">
            <Stethoscope size={18} className="mr-2" />
            Importância Clínica
          </h3>
          <p className="text-sm text-blue-700">
            O conhecimento detalhado das propriedades farmacológicas dos agentes anestésicos e adjuvantes é 
            fundamental para a elaboração de protocolos seguros e eficazes. A seleção adequada de fármacos 
            com base no estado físico do paciente, espécie, procedimento e equipamentos disponíveis permite 
            reduzir complicações e otimizar a recuperação anestésica.
          </p>
        </div>
      </div>

      <Tabs defaultValue="lista" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="lista" className="flex items-center">
            <Pill size={16} className="mr-2" />
            Visualização Detalhada
          </TabsTrigger>
          <TabsTrigger value="tabela" className="flex items-center">
            <PencilRuler size={16} className="mr-2" />
            Tabela Comparativa
          </TabsTrigger>
          <TabsTrigger value="cards" className="flex items-center">
            <BookOpen size={16} className="mr-2" />
            Cards de Estudo
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="lista" className="mt-0">
          <DrugFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedClass={selectedClass}
            setSelectedClass={setSelectedClass}
            selectedSpecies={selectedSpecies}
            setSelectedSpecies={setSelectedSpecies}
            drugClasses={drugClasses}
          />

          <DrugList 
            drugs={filteredDrugs} 
            expandedDrugId={expandedDrugId}
            setExpandedDrugId={setExpandedDrugId}
            onResetFilters={resetFilters}
            color={color}
          />
        </TabsContent>
        
        <TabsContent value="tabela" className="mt-0">
          <div className="bg-white p-4 border rounded-lg">
            <p className="text-center text-gray-500 p-6">
              A visualização em tabela comparativa será implementada em uma atualização futura. 
              Esta funcionalidade permitirá comparar propriedades farmacológicas entre diferentes agentes 
              anestésicos em um formato tabular interativo.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="cards" className="mt-0">
          <div className="bg-white p-4 border rounded-lg">
            <p className="text-center text-gray-500 p-6">
              Os cards de estudo para memorização rápida serão disponibilizados em breve. 
              Esta ferramenta auxiliará no aprendizado das características principais dos fármacos 
              com sistema de repetição espaçada.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Pharmaceuticals;
