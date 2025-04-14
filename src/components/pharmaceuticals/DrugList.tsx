
import React, { useState, useEffect } from 'react';
import { DrugInfo } from '../Pharmaceuticals';
import DrugListItem from './DrugListItem';
import EmptyDrugList from './EmptyDrugList';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, SortAsc, SortDesc, Filter, FileText, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDrugFavorites } from '@/hooks/useDrugFavorites';

interface DrugListProps {
  drugs: DrugInfo[];
  expandedDrugId: string | null;
  setExpandedDrugId: (id: string | null) => void;
  onResetFilters?: () => void;
  color?: string;
}

const DrugList: React.FC<DrugListProps> = ({ 
  drugs, 
  expandedDrugId, 
  setExpandedDrugId,
  onResetFilters,
  color = "blue"
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = useState<'name' | 'class' | 'safetyLevel'>('name');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const itemsPerPage = 5;
  
  // Use the favorites hook
  const { favorites, getFavoriteCount } = useDrugFavorites();
  
  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [showOnlyFavorites]);

  if (drugs.length === 0) {
    return <EmptyDrugList onReset={onResetFilters} />;
  }
  
  // Filter for favorites if needed
  let filteredDrugs = [...drugs];
  if (showOnlyFavorites) {
    filteredDrugs = drugs.filter(drug => favorites.includes(drug.id));
  }

  // Sort drugs
  const sortedDrugs = [...filteredDrugs].sort((a, b) => {
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
      {/* Header summary */}
      <div className="mb-6 bg-blue-50 p-5 rounded-lg border border-blue-100 shadow-sm">
        <h3 className="text-lg font-medium text-blue-800 flex items-center mb-2">
          <FileText size={20} className="mr-2" /> Farmacologia Anestésica
        </h3>
        <p className="text-sm text-blue-700 mb-3 leading-relaxed">
          Esta seção apresenta informações detalhadas sobre os fármacos utilizados em anestesiologia veterinária,
          incluindo mecanismos de ação, dosagens recomendadas, efeitos adversos e considerações clínicas.
          Utilize esta referência para auxílio na escolha de protocolos anestésicos adaptados para cada paciente.
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            {drugs.length} fármacos disponíveis
          </Badge>
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            {Array.from(new Set(drugs.map(drug => drug.class))).length} classes farmacológicas
          </Badge>
          <Badge variant="outline" className="bg-red-100 text-red-800 flex items-center gap-1">
            <Heart size={12} fill="currentColor" />
            {getFavoriteCount()} favoritos
          </Badge>
        </div>
      </div>
      
      {/* Sorting controls */}
      <div className="mb-4 bg-gray-50 p-4 rounded-lg border flex flex-wrap gap-3 justify-between items-center">
        <div className="text-sm text-gray-500 flex items-center">
          <Filter size={16} className="mr-2" />
          Exibindo {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedDrugs.length)} de {sortedDrugs.length} fármacos
        </div>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={showOnlyFavorites ? "default" : "outline"} 
            size="sm" 
            className="text-xs flex items-center gap-1"
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
          >
            <Heart size={14} fill={showOnlyFavorites ? "white" : "none"} />
            {showOnlyFavorites ? "Todos" : "Favoritos"}
          </Button>
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

      {/* Empty state for filtered results */}
      {showOnlyFavorites && sortedDrugs.length === 0 && (
        <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center">
          <Heart size={40} className="mx-auto mb-3 text-gray-400" />
          <h3 className="text-lg font-medium mb-2">Nenhum fármaco favorito</h3>
          <p className="text-gray-600 mb-4">Você ainda não adicionou nenhum fármaco aos favoritos.</p>
          <Button onClick={() => setShowOnlyFavorites(false)}>Ver todos os fármacos</Button>
        </div>
      )}

      {/* Drug list */}
      {sortedDrugs.length > 0 && (
        <div className="space-y-5">
          {currentDrugs.map((drug) => (
            <DrugListItem
              key={drug.id}
              drug={drug}
              isExpanded={expandedDrugId === drug.id}
              onToggleExpand={() => setExpandedDrugId(expandedDrugId === drug.id ? null : drug.id)}
              color={color}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
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
