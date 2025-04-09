
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InfoBalloonProps {
  content: ReactNode;
  color?: string;
  className?: string;
}

const InfoBalloon: React.FC<InfoBalloonProps> = ({ content, color = 'blue', className }) => {
  const colorVariants = {
    blue: 'bg-vet-blue/10 text-vet-blue border-vet-blue/20',
    green: 'bg-vet-green/10 text-vet-green border-vet-green/20',
    red: 'bg-vet-red/10 text-vet-red border-vet-red/20',
    orange: 'bg-vet-orange/10 text-vet-orange border-vet-orange/20',
    purple: 'bg-vet-purple/10 text-vet-purple border-vet-purple/20',
    teal: 'bg-vet-teal/10 text-vet-teal border-vet-teal/20',
  };

  const colorClass = colorVariants[color as keyof typeof colorVariants] || colorVariants.blue;

  return (
    <div 
      className={cn(
        "p-4 rounded-lg border animate-float shadow-sm mb-4", 
        colorClass,
        className
      )}
    >
      {content}
    </div>
  );
};

export default InfoBalloon;
