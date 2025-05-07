
import { useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Mission from '@/components/Mission';
import Values from '@/components/Values';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollIndicator from '@/components/ScrollIndicator';
import { EnhancedBackgroundScene } from '@/components/Scene3D';

const Index = () => {
  // Reference to main wrapper
  const mainRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // For debugging purposes
    console.log("Eppion Ventures website loaded");
    
    // Preload animations
    if (mainRef.current) {
      mainRef.current.classList.add('opacity-100');
    }
    
    // Add class to body for global styles
    document.body.classList.add('eppion-theme');
    
    return () => {
      document.body.classList.remove('eppion-theme');
    };
  }, []);
  return (
    <>
      <Navbar />
      {/* Always render ScrollIndicator regardless of device */}
      <ScrollIndicator />
      <main ref={mainRef} className="opacity-0 transition-opacity duration-700">
        {/* Enhanced 3D Background Scene */}
        <EnhancedBackgroundScene />
        
        {/* Page Sections */}
        <Hero />
        <About />
        <Services />
        <Mission />
        <Values />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Index;
