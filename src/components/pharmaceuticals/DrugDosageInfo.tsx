
import React from 'react';
import { DrugDosage } from '../Pharmaceuticals';

interface DrugDosageInfoProps {
  dosages: DrugDosage[];
}

const DrugDosageInfo: React.FC<DrugDosageInfoProps> = ({ dosages }) => {
  const getSpeciesName = (species: string): string => {
    switch (species) {
      case 'canine': return 'Caninos';
      case 'feline': return 'Felinos';
      case 'equine': return 'Equinos';
      case 'bovine': return 'Bovinos';
      case 'avian': return 'Aves';
      case 'exotic': return 'Exóticos';
      default: return species;
    }
  };

  return (
    <div className="space-y-4">
      {dosages.map((dosage, idx) => (
        <div key={idx} className="border rounded-md p-3">
          <div className="flex items-center mb-2">
            <span className="ml-2 font-medium capitalize">
              {getSpeciesName(dosage.species)}
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
  );
};

export default DrugDosageInfo;
