
import { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { scrollToElement } from '@/lib/scrollUtils';
import { cn } from '@/lib/utils';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const ScrollIndicator = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const isMobile = useIsMobile();
  
  // Navigation sections 
  const sections = ['home', 'about', 'services', 'mission', 'values', 'contact'];
  
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress percentage
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
      
      // Determine active section
      const sectionElements = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      sectionElements.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleSectionClick = (section: string) => {
    scrollToElement(section, 800);
  };
  
  const handleNavigateSection = (direction: 'prev' | 'next') => {
    const currentIndex = sections.indexOf(activeSection);
    let targetIndex;
    
    if (direction === 'prev') {
      targetIndex = Math.max(0, currentIndex - 1);
    } else {
      targetIndex = Math.min(sections.length - 1, currentIndex + 1);
    }
    
    if (targetIndex !== currentIndex) {
      scrollToElement(sections[targetIndex], 800);
    }
  };

  // Skip rendering on mobile
  if (isMobile) return null;
  
  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 flex flex-col items-center">
      {/* Previous section button */}
      <button 
        onClick={() => handleNavigateSection('prev')}
        disabled={activeSection === sections[0]}
        className="mb-2 p-2 rounded-full bg-eppion-charcoal/70 hover:bg-eppion-purple/30 backdrop-blur-md border border-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all"
        aria-label="Previous section"
      >
        <ChevronUp className="h-5 w-5 text-white" />
      </button>
      
      {/* Section indicators */}
      <div className="bg-eppion-charcoal/70 backdrop-blur-md border border-white/10 rounded-full py-3 px-2 flex flex-col gap-2 items-center">
        <div className="relative h-32 w-1 bg-white/20 rounded">
          <div 
            className="absolute bottom-0 w-full bg-eppion-purple rounded transition-all duration-300"
            style={{ height: `${scrollProgress}%` }}
          />
        </div>
        
        <ScrollArea className="h-auto max-h-24 w-5 overflow-hidden">
          <div className="flex flex-col gap-2 py-1">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => handleSectionClick(section)}
                className="relative flex items-center justify-center"
                aria-label={`Go to ${section} section`}
              >
                <div 
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-300",
                    activeSection === section 
                      ? "bg-eppion-purple scale-125" 
                      : "bg-white/50 hover:bg-white/80"
                  )}
                />
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      {/* Next section button */}
      <button 
        onClick={() => handleNavigateSection('next')}
        disabled={activeSection === sections[sections.length - 1]}
        className="mt-2 p-2 rounded-full bg-eppion-charcoal/70 hover:bg-eppion-purple/30 backdrop-blur-md border border-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all"
        aria-label="Next section"
      >
        <ChevronDown className="h-5 w-5 text-white" />
      </button>
    </div>
  );
};

export default ScrollIndicator;
