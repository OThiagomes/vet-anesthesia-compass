
import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useUserSettings } from '@/hooks/useUserSettings';

interface BackToTopProps {
  threshold?: number;
  className?: string;
  smoothScroll?: boolean;
  showLabel?: boolean;
  color?: string;
}

const BackToTop: React.FC<BackToTopProps> = ({
  threshold = 300,
  className,
  smoothScroll = true,
  showLabel = false,
  color = 'blue',
}) => {
  const [showButton, setShowButton] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const { settings } = useUserSettings();

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  const scrollToTop = () => {
    setIsScrolling(true);
    if (smoothScroll) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Reset scrolling state after animation completes
      setTimeout(() => {
        setIsScrolling(false);
      }, 500);
    } else {
      window.scrollTo(0, 0);
      setIsScrolling(false);
    }
  };

  // Map color string to Tailwind class
  const colorMap: Record<string, string> = {
    blue: "vet-blue",
    green: "vet-green",
    red: "vet-red",
    orange: "vet-orange",
    purple: "vet-purple",
    teal: "vet-teal",
  };
  
  // Get the actual color class or default to blue
  const colorClass = colorMap[color] || "vet-blue";
  
  // Apply dark mode styles conditionally
  const isDarkMode = settings.theme === 'dark' || 
    (settings.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <Button
      variant="outline"
      size={showLabel ? "default" : "icon"}
      className={cn(
        "fixed bottom-6 right-6 z-50 rounded-full shadow-md backdrop-blur transition-all duration-300",
        isDarkMode ? "bg-gray-800/80 text-gray-100" : "bg-white/80 text-gray-800",
        showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none",
        isScrolling ? `border-${colorClass} text-${colorClass}` : "",
        className
      )}
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
    >
      <ArrowUp size={18} className={cn(
        "transition-transform",
        isScrolling ? "animate-pulse" : ""
      )} />
      {showLabel && <span className="ml-1">Voltar ao topo</span>}
    </Button>
  );
};

export default BackToTop;
