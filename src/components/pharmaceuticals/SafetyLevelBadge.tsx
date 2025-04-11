
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, AlertCircle, Check } from 'lucide-react';

interface SafetyLevelBadgeProps {
  level: 'low' | 'medium' | 'high';
}

const SafetyLevelBadge: React.FC<SafetyLevelBadgeProps> = ({ level }) => {
  const getSafetyLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'high': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSafetyLevelIcon = (level: string) => {
    switch (level) {
      case 'low': return <AlertTriangle size={16} className="text-red-500" />;
      case 'medium': return <AlertCircle size={16} className="text-amber-500" />;
      case 'high': return <Check size={16} className="text-green-500" />;
      default: return <AlertCircle size={16} />;
    }
  };

  return (
    <Badge className={getSafetyLevelColor(level)} variant="outline">
      <span className="flex items-center gap-1">
        {getSafetyLevelIcon(level)}
        {level === 'low' ? 'Baixa Segurança' : 
         level === 'medium' ? 'Segurança Moderada' : 'Alta Segurança'}
      </span>
    </Badge>
  );
};

export default SafetyLevelBadge;
