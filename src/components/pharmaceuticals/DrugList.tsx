
import React from 'react';
import { DrugInfo } from '../Pharmaceuticals';
import DrugListItem from './DrugListItem';
import EmptyDrugList from './EmptyDrugList';

interface DrugListProps {
  drugs: DrugInfo[];
  expandedDrugId: string | null;
  setExpandedDrugId: (id: string | null) => void;
  onResetFilters?: () => void;
}

const DrugList: React.FC<DrugListProps> = ({ 
  drugs, 
  expandedDrugId, 
  setExpandedDrugId,
  onResetFilters
}) => {
  if (drugs.length === 0) {
    return <EmptyDrugList onReset={onResetFilters} />;
  }

  return (
    <div className="space-y-4">
      {drugs.map((drug) => (
        <DrugListItem
          key={drug.id}
          drug={drug}
          isExpanded={expandedDrugId === drug.id}
          onToggleExpand={() => setExpandedDrugId(expandedDrugId === drug.id ? null : drug.id)}
        />
      ))}
    </div>
  );
};

export default DrugList;
