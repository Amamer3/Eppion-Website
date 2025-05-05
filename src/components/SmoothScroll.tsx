import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';

interface SmoothScrollProps {
  children: React.ReactNode;
}

interface SmoothScrollRef {
  scrollTo: (targetY: number, duration: number) => void;
}

const SmoothScroll = forwardRef<SmoothScrollRef, SmoothScrollProps>(({ children }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollingContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [targetY, setTargetY] = useState<number | null>(null);
  const [height, setHeight] = useState(0);
  const requestRef = useRef<number>();
  const previousScrollRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const animationDurationRef = useRef(0);
  const easeFactor = 0.1;

  // Expose scrollTo method for Navbar
  useImperativeHandle(ref, () => ({
    scrollTo: (targetY: number, duration: number) => {
      setTargetY(targetY);
      startTimeRef.current = performance.now();
      animationDurationRef.current = duration;
      if (!requestRef.current) {
        requestRef.current = requestAnimationFrame(animateScroll);
      }
    },
  }));

  // Set container height
  useEffect(() => {
    const updateHeight = () => {
      if (scrollingContainerRef.current && containerRef.current) {
        const scrollingContainerHeight = scrollingContainerRef.current.getBoundingClientRect().height;
        setHeight(scrollingContainerHeight);
        containerRef.current.style.height = `${scrollingContainerHeight}px`;
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    if (scrollingContainerRef.current) {
      resizeObserver.observe(scrollingContainerRef.current);
    }

    window.addEventListener('resize', updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  // Animate scroll
  const animateScroll = (currentTime: number) => {
    if (!scrollingContainerRef.current) return;

    let currentScroll = previousScrollRef.current;

    if (targetY !== null && startTimeRef.current !== null) {
      // Programmatic scrolling (e.g., from Navbar)
      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / animationDurationRef.current, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic
      currentScroll = previousScrollRef.current + (targetY - previousScrollRef.current) * easedProgress;

      if (progress >= 1) {
        setTargetY(null);
        startTimeRef.current = null;
      }
    } else if (isScrolling) {
      // User scrolling
      const scrollY = window.scrollY;
      const delta = (scrollY - previousScrollRef.current) * easeFactor;
      currentScroll = previousScrollRef.current + delta;
    }

    previousScrollRef.current = currentScroll;
    scrollingContainerRef.current.style.transform = `translate3d(0, ${-currentScroll}px, 0)`;

    // Continue animation only if scrolling or animating
    if (isScrolling || targetY !== null) {
      requestRef.current = requestAnimationFrame(animateScroll);
    } else {
      cancelAnimationFrame(requestRef.current);
      cancelAnimationFrame(requestRef.current);
      requestRef.current = undefined;
    }
  };

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (!isScrolling) {
        setIsScrolling(true);
        if (!requestRef.current) {
          requestRef.current = requestAnimationFrame(animateScroll);
        }
      }
    };

    const handleScrollEnd = () => {
      setIsScrolling(false);
    };

    let timeout: NodeJS.Timeout;
    const debouncedScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleScrollEnd, 100);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scrollend', debouncedScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scrollend', debouncedScroll);
      clearTimeout(timeout);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
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
});

export default SmoothScroll;