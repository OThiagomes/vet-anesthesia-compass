
import React from 'react';

interface DrugPrecautionsProps {
  contraindications: string[];
  sideEffects: string[];
  interactions: string[];
}

const DrugPrecautions: React.FC<DrugPrecautionsProps> = ({ 
  contraindications, 
  sideEffects, 
  interactions 
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium text-sm text-gray-500 mb-1">Contraindicações</h4>
        <ul className="list-disc pl-5 space-y-1 text-red-700">
          {contraindications.map((contraindication, idx) => (
            <li key={idx}>{contraindication}</li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="font-medium text-sm text-gray-500 mb-1">Efeitos Colaterais</h4>
        <ul className="list-disc pl-5 space-y-1">
          {sideEffects.map((effect, idx) => (
            <li key={idx}>{effect}</li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="font-medium text-sm text-gray-500 mb-1">Interações Medicamentosas</h4>
        <ul className="list-disc pl-5 space-y-1">
          {interactions.map((interaction, idx) => (
            <li key={idx}>{interaction}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DrugPrecautions;
