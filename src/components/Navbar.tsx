import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { scrollToElement } from '@/lib/scrollUtils';
import { useIsMobile } from '@/hooks/use-mobile';
import throttle from 'lodash.throttle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const navSections: string[] = ['home', 'about', 'services', 'mission', 'values', 'contact'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 50);
    }, 100);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));
    window.addEventListener('scroll', handleScroll);

    // Handle initial hash
    const hash = window.location.hash.replace('#', '');
    if (hash && sections.length) {
      const element = document.getElementById(hash);
      if (element) {
        scrollToElement(hash, 800);
        setActiveSection(hash);
      }
    }

    return () => {
      sections.forEach(section => observer.unobserve(section));
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMenuOpen(false);
    setActiveSection(targetId);
    window.history.pushState(null, '', `#${targetId}`);
    scrollToElement(targetId, 800);
  };

  const toggleMobileMenu = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 px-6 md:px-12',
        isScrolled ? 'py-3 glass-morphism backdrop-blur-lg' : 'py-6'
      )}
    >
      <nav role="navigation" className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center">
          <a
            href="#home"
            className="text-xl md:text-2xl font-bold text-gradient"
            onClick={(e) => handleNavClick(e, 'home')}
          >
            Eppion Ventures
          </a>
        </div>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <div className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        <ul className="hidden md:flex space-x-8">
          {navSections.map(section => (
            <li key={section}>
              <a
                href={`#${section}`}
                onClick={(e) => handleNavClick(e, section)}
                className={cn(
                  'text-sm uppercase tracking-wider transition-all duration-300 hover:text-eppion-purple relative cursor-pointer',
                  activeSection === section ? 'text-eppion-purple font-medium' : 'text-gray-300'
                )}
                aria-current={activeSection === section ? 'page' : undefined}
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

      <div
        className={cn(
          'fixed top-[62px] left-0 w-full bg-eppion-charcoal/95 backdrop-blur-md z-40 transform transition-all duration-300 ease-in-out',
          menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        )}
        aria-hidden={!menuOpen}
      >
        <div className="py-6 text-center">
          <ul className="flex flex-col items-center py-2 space-y-1">
            {navSections.map(section => (
              <li key={section} className="w-full text-center">
                <a
                  href={`#${section}`}
                  onClick={(e) => handleNavClick(e, section)}
                  className={cn(
                    'block py-2 text-base uppercase tracking-wider',
                    activeSection === section ? 'text-eppion-purple font-medium' : 'text-gray-300'
                  )}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;