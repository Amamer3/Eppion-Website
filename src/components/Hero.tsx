
import { useEffect, useRef, useState } from 'react';
import { NetworkGlobe } from './Scene3D';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => {
      setIsLoaded(true);
    }, 200);
    
    const handleScroll = () => {
      if (!heroRef.current) return;
      
      // Parallax effect
      const scrollY = window.scrollY;
      const opacity = Math.max(0, 1 - scrollY * 0.002);
      const translateY = scrollY * 0.3;
      
      heroRef.current.style.opacity = opacity.toString();
      heroRef.current.style.transform = `translateY(${translateY}px)`;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
      ref={heroRef}
    >
      {/* 3D Globe Component */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="w-full h-full">
          <NetworkGlobe />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 
          className={cn(
            "h1 mb-6 opacity-0 transform translate-y-10 transition-all duration-1000 ease-out",
            isLoaded && "opacity-100 translate-y-0"
          )}
        >
          <span className="text-gradient block mb-2">Digital Network Globe</span>
          <span className="block">Empowering Innovation in Technology and Marketing</span>
        </h1>
        
        <p 
          className={cn(
            "text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 opacity-0 transform translate-y-10 transition-all duration-1000 delay-300 ease-out",
            isLoaded && "opacity-100 translate-y-0"
          )}
        >
          Eppion Ventures specializes in Go-To-Market strategies and investments that propel AdTech and MarTech companies to new heights.
        </p>
        
        <div 
          className={cn(
            "flex flex-col sm:flex-row justify-center gap-4 opacity-0 transform translate-y-10 transition-all duration-1000 delay-500 ease-out",
            isLoaded && "opacity-100 translate-y-0"
          )}
        >
          <Button 
            className="bg-eppion-purple hover:bg-eppion-purple-light text-white px-8 py-6 font-medium"
            onClick={handleScrollDown}
          >
            Get Started Today!
          </Button>
          
          <Button 
            variant="outline" 
            className="border-eppion-purple text-eppion-purple hover:bg-eppion-purple/10 px-8 py-6 font-medium"
            onClick={handleScrollDown}
          >
            Learn More
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
        onClick={handleScrollDown}
      >
        <ChevronDown className="w-10 h-10 text-eppion-purple" />
      </div>
    </section>
  );
};

export default Hero;
