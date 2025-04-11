
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

interface DrugFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedClass: string | null;
  setSelectedClass: (cls: string | null) => void;
  selectedSpecies: string | null;
  setSelectedSpecies: (species: string | null) => void;
  drugClasses: string[];
}

const DrugFilters: React.FC<DrugFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedClass,
  setSelectedClass,
  selectedSpecies,
  setSelectedSpecies,
  drugClasses,
}) => {
  return (
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
  );
};

export default DrugFilters;
