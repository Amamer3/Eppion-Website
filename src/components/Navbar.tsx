
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { smoothScrollTo } from '@/lib/scrollUtils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Determine active section
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initialize active section based on URL hash or scroll position
    handleScroll();
    
    // Check for hash in URL on initial load and scroll to that section
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          smoothScrollTo({
            targetPosition: element.offsetTop,
            duration: 800,
            onComplete: () => {
              setActiveSection(hash);
            }
          });
        }
      }, 100); // Small delay to ensure DOM is fully loaded
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMenuOpen(false);
    
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const targetPosition = targetElement.offsetTop;
      
      // Update URL first to ensure we track navigation properly
      window.history.pushState(null, '', `#${targetId}`);
      
      // Then scroll to the section
      smoothScrollTo({
        targetPosition,
        duration: 800,
        onComplete: () => {
          // Update active section after scroll completes
          setActiveSection(targetId);
          console.log(`Scrolled to section: ${targetId}`); // Debug logging
        }
      });
    }
  };
  
  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 px-6 md:px-12",
        isScrolled ? "py-3 glass-morphism backdrop-blur-lg" : "py-6"
      )}
    >
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center">
          <a 
            href="#home" 
            className="text-xl md:text-2xl font-bold text-gradient"
            onClick={(e) => handleNavClick(e, 'home')}
          >
            Eppion Ventures
          </a>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
          <div className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>
        
        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-8">
          {['home', 'about', 'services', 'mission', 'values', 'contact'].map(section => (
            <li key={section}>
              <a
                href={`#${section}`}
                onClick={(e) => handleNavClick(e, section)}
                className={cn(
                  "text-sm uppercase tracking-wider transition-all duration-300 hover:text-eppion-purple relative",
                  activeSection === section ? "text-eppion-purple font-medium" : "text-gray-300"
                )}
                aria-current={activeSection === section ? "page" : undefined}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
                {activeSection === section && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-eppion-purple" />
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "fixed top-[62px] left-0 w-full bg-eppion-charcoal z-40 transform transition-all duration-300 ease-in-out",
          menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        )}
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col items-center py-6 space-y-4">
          {['home', 'about', 'services', 'mission', 'values', 'contact'].map(section => (
            <li key={section}>
              <a
                href={`#${section}`}
                onClick={(e) => handleNavClick(e, section)}
                className={cn(
                  "text-base uppercase tracking-wider transition-all duration-300 hover:text-eppion-purple",
                  activeSection === section ? "text-eppion-purple font-medium" : "text-gray-300"
                )}
                aria-current={activeSection === section ? "page" : undefined}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
