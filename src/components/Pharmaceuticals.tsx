
import React, { useState } from 'react';
import DrugFilters from './pharmaceuticals/DrugFilters';
import DrugList from './pharmaceuticals/DrugList';

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
      </div>

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
      />
    </div>
  );
};

export default Pharmaceuticals;
