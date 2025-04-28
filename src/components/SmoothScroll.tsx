
import React, { useEffect, useRef, useState } from 'react';

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollingContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTarget, setScrollTarget] = useState(0);
  const [height, setHeight] = useState(0);
  const requestRef = useRef<number>();
  const previousScrollRef = useRef(0);
  const easeFactor = 0.1;

  // Set the height of the scrolling container
  useEffect(() => {
    const setContainerHeight = () => {
      if (scrollingContainerRef.current) {
        const scrollingContainerHeight = scrollingContainerRef.current.getBoundingClientRect().height;
        setHeight(scrollingContainerHeight);
        if (containerRef.current) {
          containerRef.current.style.height = `${scrollingContainerHeight}px`;
        }
      }
    };

    setContainerHeight();
    
    window.addEventListener('resize', setContainerHeight);
    
    return () => {
      window.removeEventListener('resize', setContainerHeight);
    };
  }, []);

  // Animate scroll
  const animateScroll = () => {
    if (scrollingContainerRef.current) {
      // LERP equation for smooth scrolling
      const currentScroll = window.scrollY;
      const delta = (currentScroll - previousScrollRef.current) * easeFactor;
      previousScrollRef.current = previousScrollRef.current + delta;

      // Apply transform to create smooth scrolling effect
      scrollingContainerRef.current.style.transform = `translate3d(0, ${-previousScrollRef.current}px, 0)`;

      // Continue animation
      requestRef.current = requestAnimationFrame(animateScroll);
    }
  };

  // Set up scroll animation
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateScroll);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  // Handle manual scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (!isScrolling) {
        setIsScrolling(true);
        
        // Debounce to detect when scrolling stops
        const timer = setTimeout(() => {
          setIsScrolling(false);
        }, 100);
        
        return () => clearTimeout(timer);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolling]);

  return (
    <div ref={containerRef} style={{ position: 'relative', overflow: 'hidden' }}>
      <div 
        ref={scrollingContainerRef}
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default SmoothScroll;
