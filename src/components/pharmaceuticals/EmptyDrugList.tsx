
import React from 'react';
import { Pill } from 'lucide-react';

const EmptyDrugList: React.FC = () => {
  return (
    <div className="text-center py-10 border rounded-lg">
      <div className="flex justify-center mb-4">
        <Pill size={40} className="text-gray-300" />
      </div>
      <h3 className="font-medium text-lg text-gray-500">Nenhum fármaco encontrado</h3>
      <p className="text-gray-400">Tente ajustar seus filtros ou termos de busca</p>
    </div>
  );
};

export default EmptyDrugList;
