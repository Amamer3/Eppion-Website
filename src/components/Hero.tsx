
import { useEffect, useRef, useState } from 'react';
import { NetworkGlobe } from '@/components/Scene3D';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const useTypewriter = (text: string, delay: number = 100) => {
  const [displayText, setDisplayText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    let isErasing = false;
    let typingTimeout: NodeJS.Timeout;
    const startTime = Date.now();
    const animationDuration = Math.floor(Math.random() * (10 - 5 + 1) + 5) * 60 * 1000; // Random duration between 5-10 minutes
    
    const typeNextCharacter = () => {
      if (!shouldAnimate || Date.now() - startTime >= animationDuration) {
        setShouldAnimate(false);
        setIsTypingComplete(true);
        setDisplayText(text); // Set full text when animation ends
        return;
      }

      if (!isErasing && currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
        typingTimeout = setTimeout(typeNextCharacter, delay);
      } else if (!isErasing && currentIndex >= text.length) {
        isErasing = true;
        typingTimeout = setTimeout(typeNextCharacter, delay * 10);
      } else if (isErasing && currentIndex > 0) {
        currentIndex--;
        setDisplayText(text.slice(0, currentIndex));
        typingTimeout = setTimeout(typeNextCharacter, delay / 2);
      } else if (isErasing && currentIndex === 0) {
        isErasing = false;
        typingTimeout = setTimeout(typeNextCharacter, delay * 5);
      }
    };

    typeNextCharacter();

    return () => {
      clearTimeout(typingTimeout);
      if (Date.now() - startTime >= animationDuration) {
        setDisplayText(text); // Keep full text if duration expired
      } else {
        setDisplayText('');
      }
      setIsTypingComplete(false);
    };
  }, [text, delay]);

  return { displayText, isTypingComplete };
};

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { displayText: title1, isTypingComplete: title1Complete } = useTypewriter('Digital Network Globe', 100);
  const { displayText: title2, isTypingComplete: title2Complete } = useTypewriter('Empowering Innovation in Technology and Marketing', 50);
  
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
          <span className="text-gradient block mb-2">{title1}</span>
          <span className="block">{title2}</span>
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
