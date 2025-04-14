
import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
    blue: "blue",
    green: "green",
    red: "red",
    orange: "orange",
    purple: "purple",
    teal: "teal",
  };
  
  // Get the actual color class or default to blue
  const colorClass = colorMap[color] || "blue";

  return (
    <Button
      variant="outline"
      size={showLabel ? "default" : "icon"}
      className={cn(
        "fixed bottom-6 right-6 z-50 rounded-full shadow-md bg-white/80 backdrop-blur transition-all duration-300",
        showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none",
        isScrolling ? `border-${colorClass}-500 text-${colorClass}-600` : "",
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
