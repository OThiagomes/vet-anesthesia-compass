
import React, { useState } from 'react';
import { DrugInfo } from '../Pharmaceuticals';
import DrugListItem from './DrugListItem';
import EmptyDrugList from './EmptyDrugList';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, SortAsc, SortDesc } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = useState<'name' | 'class' | 'safetyLevel'>('name');
  const itemsPerPage = 5;

  if (drugs.length === 0) {
    return <EmptyDrugList onReset={onResetFilters} />;
  }

  // Sort drugs
  const sortedDrugs = [...drugs].sort((a, b) => {
    if (sortField === 'name') {
      return sortOrder === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else if (sortField === 'class') {
      return sortOrder === 'asc'
        ? a.class.localeCompare(b.class)
        : b.class.localeCompare(a.class);
    } else if (sortField === 'safetyLevel') {
      const safetyOrder: Record<string, number> = { low: 1, medium: 2, high: 3 };
      return sortOrder === 'asc'
        ? safetyOrder[a.safetyLevel] - safetyOrder[b.safetyLevel]
        : safetyOrder[b.safetyLevel] - safetyOrder[a.safetyLevel];
    }
    return 0;
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedDrugs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDrugs = sortedDrugs.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Close any expanded drugs when changing pages
    setExpandedDrugId(null);
  };

  const handleSort = (field: 'name' | 'class' | 'safetyLevel') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div>
      {/* Sorting controls */}
      <div className="mb-4 bg-gray-50 p-3 rounded-lg border flex flex-wrap gap-2 justify-between items-center">
        <div className="text-sm text-gray-500">
          Exibindo {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, drugs.length)} de {drugs.length} fármacos
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className={`text-xs ${sortField === 'name' ? 'bg-blue-50' : ''}`}
            onClick={() => handleSort('name')}
          >
            Nome {sortField === 'name' && (
              sortOrder === 'asc' ? <SortAsc size={14} className="ml-1" /> : <SortDesc size={14} className="ml-1" />
            )}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className={`text-xs ${sortField === 'class' ? 'bg-blue-50' : ''}`}
            onClick={() => handleSort('class')}
          >
            Classe {sortField === 'class' && (
              sortOrder === 'asc' ? <SortAsc size={14} className="ml-1" /> : <SortDesc size={14} className="ml-1" />
            )}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className={`text-xs ${sortField === 'safetyLevel' ? 'bg-blue-50' : ''}`}
            onClick={() => handleSort('safetyLevel')}
          >
            Segurança {sortField === 'safetyLevel' && (
              sortOrder === 'asc' ? <SortAsc size={14} className="ml-1" /> : <SortDesc size={14} className="ml-1" />
            )}
          </Button>
        </div>
      </div>

      {/* Drug list */}
      <div className="space-y-4">
        {currentDrugs.map((drug) => (
          <DrugListItem
            key={drug.id}
            drug={drug}
            isExpanded={expandedDrugId === drug.id}
            onToggleExpand={() => setExpandedDrugId(expandedDrugId === drug.id ? null : drug.id)}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => paginate(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {/* Page numbers */}
            <div className="flex items-center">
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                // Show only current page, first, last, and one page before and after current
                if (
                  pageNum === 1 || 
                  pageNum === totalPages || 
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <Button
                      key={i}
                      variant={pageNum === currentPage ? "default" : "outline"}
                      size="icon"
                      className="h-8 w-8 mx-0.5"
                      onClick={() => paginate(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                }
                // Show ellipsis
                else if (
                  (pageNum === currentPage - 2 && currentPage > 3) ||
                  (pageNum === currentPage + 2 && currentPage < totalPages - 2)
                ) {
                  return <span key={i} className="mx-1">...</span>;
                }
                return null;
              })}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => paginate(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrugList;
