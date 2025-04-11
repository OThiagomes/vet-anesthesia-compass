
import React from 'react';

interface DrugGeneralInfoProps {
  description: string;
  indications: string[];
  notes: string;
}

const DrugGeneralInfo: React.FC<DrugGeneralInfoProps> = ({ description, indications, notes }) => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium text-sm text-gray-500 mb-1">Descrição</h4>
        <p>{description}</p>
      </div>
      
      <div>
        <h4 className="font-medium text-sm text-gray-500 mb-1">Indicações</h4>
        <ul className="list-disc pl-5 space-y-1">
          {indications.map((indication, idx) => (
            <li key={idx}>{indication}</li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="font-medium text-sm text-gray-500 mb-1">Notas Adicionais</h4>
        <p>{notes}</p>
      </div>
    </div>
  );
};

export default DrugGeneralInfo;
