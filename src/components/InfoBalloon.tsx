
import React, { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, Download, Share2, Info, AlertCircle, BookOpen, Lightbulb, MessageCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InfoBalloonProps {
  content: ReactNode;
  color?: string;
  className?: string;
  title?: string;
  expandable?: boolean;
  downloadable?: boolean;
  shareable?: boolean;
  icon?: ReactNode;
  type?: 'info' | 'warning' | 'tip' | 'note' | 'important' | 'success';
  maxHeight?: number;
}

const InfoBalloon: React.FC<InfoBalloonProps> = ({ 
  content, 
  color = 'blue', 
  className,
  title,
  expandable = false,
  downloadable = false,
  shareable = false,
  icon,
  type = 'info',
  maxHeight = 20
}) => {
  const [expanded, setExpanded] = useState(false);

  const colorVariants = {
    blue: 'bg-vet-blue/10 text-vet-blue border-vet-blue/20',
    green: 'bg-vet-green/10 text-vet-green border-vet-green/20',
    red: 'bg-vet-red/10 text-vet-red border-vet-red/20',
    orange: 'bg-vet-orange/10 text-vet-orange border-vet-orange/20',
    purple: 'bg-vet-purple/10 text-vet-purple border-vet-purple/20',
    teal: 'bg-vet-teal/10 text-vet-teal border-vet-teal/20',
  };

  const getIcon = () => {
    if (icon) return icon;
    
    switch (type) {
      case 'warning':
        return <AlertCircle size={18} className="mr-2" />;
      case 'tip':
        return <Lightbulb size={18} className="mr-2" />;
      case 'note':
        return <MessageCircle size={18} className="mr-2" />;
      case 'important':
        return <BookOpen size={18} className="mr-2" />;
      case 'success':
        return <CheckCircle size={18} className="mr-2" />;
      default:
        return <Info size={18} className="mr-2" />;
    }
  };

  const colorClass = colorVariants[color as keyof typeof colorVariants] || colorVariants.blue;

  const handleDownload = () => {
    // Convert content to string if possible
    const contentText = typeof content === 'string' 
      ? content 
      : title 
        ? title 
        : 'Info content';
    
    const element = document.createElement('a');
    const file = new Blob([contentText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${contentText.substring(0, 20).replace(/[^a-z0-9]/gi, '-')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title || 'Shared content',
        text: typeof content === 'string' ? content : 'Check out this useful information',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div 
      className={cn(
        "p-4 rounded-lg border shadow-sm mb-4 transition-all", 
        colorClass,
        className
      )}
    >
      {title && (
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium flex items-center">
            {getIcon()}
            {title}
          </h4>
          <div className="flex space-x-2">
            {downloadable && (
              <Button variant="ghost" size="sm" onClick={handleDownload}>
                <Download size={16} />
              </Button>
            )}
            {shareable && (
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 size={16} />
              </Button>
            )}
            {expandable && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setExpanded(!expanded)}
                aria-label={expanded ? "Recolher" : "Expandir"}
              >
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
            )}
          </div>
        </div>
      )}
      
      <div className={cn(
        expandable && !expanded ? `max-h-${maxHeight} overflow-hidden` : "",
        "transition-all duration-300"
      )}>
        {content}
      </div>
      
      {expandable && !expanded && (
        <div className="text-center mt-2">
          <Button 
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(true)}
            className="text-xs"
          >
            Ver mais <ChevronDown size={12} className="ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default InfoBalloon;
