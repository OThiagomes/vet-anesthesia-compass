
import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BackToTopProps {
  threshold?: number;
  className?: string;
  smoothScroll?: boolean;
}

const BackToTop: React.FC<BackToTopProps> = ({
  threshold = 300,
  className,
  smoothScroll = true,
}) => {
  const [showButton, setShowButton] = useState(false);

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
    if (smoothScroll) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "fixed bottom-6 right-6 z-50 rounded-full shadow-md bg-white/80 backdrop-blur transition-opacity duration-200",
        showButton ? "opacity-100" : "opacity-0 pointer-events-none",
        className
      )}
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
    >
      <ArrowUp size={18} />
    </Button>
  );
};

export default BackToTop;
