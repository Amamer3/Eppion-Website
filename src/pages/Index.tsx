
import { useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Mission from '@/components/Mission';
import Values from '@/components/Values';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollIndicator from '@/components/ScrollIndicator';
import { EnhancedBackgroundScene } from '@/components/Scene3D';

const Index = () => {
  // Reference to main wrapper
  const mainRef = useRef<HTMLDivElement>(null);

  // Check if we should use smooth scrolling
  // It can cause issues on some devices, so we'll detect higher-end devices
  const shouldUseSmoothScroll = () => {
    // Check for desktop and high performance
    return window.innerWidth >= 1024 && !navigator.userAgent.includes('Mobile');
  };

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

  // Conditional rendering based on device capability
  const renderContent = () => {
    // The content of our site
    const content = (
      <>
        <Navbar />
        {/* Add the ScrollIndicator component */}
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
    
    // Use smooth scrolling for powerful devices, regular scrolling for others
    return shouldUseSmoothScroll() ? (
      <SmoothScroll>
        {content}
      </SmoothScroll>
    ) : content;
  };

  return renderContent();
};

export default Index;
