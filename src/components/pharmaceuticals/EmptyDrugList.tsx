
import React from 'react';
import { Pill, Search, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface EmptyDrugListProps {
  onReset?: () => void;
}

const EmptyDrugList: React.FC<EmptyDrugListProps> = ({ onReset }) => {
  const handleResetClick = () => {
    if (onReset) {
      onReset();
      toast({
        title: "Filtros resetados",
        description: "Lista de medicamentos atualizada.",
        duration: 3000,
      });
    }
  };

  return (
    <div className="text-center py-12 border rounded-lg bg-gray-50">
      <div className="flex justify-center mb-4">
        <div className="relative">
          <Pill size={48} className="text-gray-300" />
          <div className="absolute -bottom-2 -right-2 bg-amber-100 rounded-full p-1">
            <Search size={20} className="text-amber-500" />
          </div>
        </div>
      </div>
      <h3 className="font-medium text-lg text-gray-600 mb-2">Nenhum fármaco encontrado</h3>
      <p className="text-gray-500 max-w-md mx-auto mb-4">
        Não encontramos nenhum medicamento com os filtros selecionados. Tente ajustar os critérios ou clique abaixo para resetar os filtros.
      </p>
      {onReset && (
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleResetClick}
          className="mt-2 flex items-center mx-auto"
        >
          <RefreshCcw size={16} className="mr-2" />
          Resetar filtros
        </Button>
      )}
    </div>
  );
};

export default EmptyDrugList;
