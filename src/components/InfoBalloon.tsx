
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

  // Map color string to Tailwind class
  const colorMap: Record<string, string> = {
    blue: "blue",
    green: "green",
    red: "red",
    orange: "orange",
    purple: "purple",
    teal: "teal",
    "vet-blue": "blue",
    "vet-green": "green",
    "vet-red": "red",
    "vet-orange": "orange",
    "vet-purple": "purple",
    "vet-teal": "teal"
  };
  
  // Get the actual color class or default to blue
  const colorClass = colorMap[color] || "blue";

  const colorVariants: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-800 border-blue-100',
    green: 'bg-green-50 text-green-800 border-green-100',
    red: 'bg-red-50 text-red-800 border-red-100',
    orange: 'bg-orange-50 text-orange-800 border-orange-100',
    purple: 'bg-purple-50 text-purple-800 border-purple-100',
    teal: 'bg-teal-50 text-teal-800 border-teal-100',
  };

  const typeColorMap: Record<string, string> = {
    warning: 'bg-orange-50 text-orange-800 border-orange-100',
    tip: 'bg-green-50 text-green-800 border-green-100',
    note: 'bg-blue-50 text-blue-800 border-blue-100',
    important: 'bg-red-50 text-red-800 border-red-100',
    success: 'bg-green-50 text-green-800 border-green-100',
    info: `bg-${colorClass}-50 text-${colorClass}-800 border-${colorClass}-100`,
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

  const colorClass2 = type === 'info' ? colorVariants[colorClass] || colorVariants.blue : typeColorMap[type];

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
        colorClass2,
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
