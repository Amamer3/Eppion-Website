
/**
 * Custom scroll utility functions
 */

interface ScrollProps {
  targetPosition: number;
  duration: number;
  onUpdate?: (position: number) => void;
  onComplete?: () => void;
}

/**
 * Animates scrolling to a specific position
 */
export const smoothScrollTo = ({
  targetPosition,
  duration = 1000,
  onUpdate,
  onComplete,
}: ScrollProps): void => {
  const startPosition = window.scrollY;
  const startTime = performance.now();
  const distance = targetPosition - startPosition;

  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const animateScroll = (currentTime: number) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const easedProgress = easeInOutCubic(progress);
    
    const currentPosition = startPosition + distance * easedProgress;
    
    window.scrollTo(0, currentPosition);
    
    if (onUpdate) {
      onUpdate(currentPosition);
    }
    
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    } else if (onComplete) {
      onComplete();
    }
  };

  requestAnimationFrame(animateScroll);
};

/**
 * Get the current section based on scroll position
 */
export const getCurrentSection = (): string => {
  const sections = document.querySelectorAll('section');
  const scrollPosition = window.scrollY + window.innerHeight / 2;

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      return section.id;
    }
  }

  return '';
};

/**
 * Check if an element is in viewport
 */
export const isInViewport = (element: HTMLElement, offset = 100): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight + offset) &&
    rect.bottom >= -offset
  );
};

/**
 * Scroll to a specific element by ID with smooth scrolling
 */
export const scrollToElement = (elementId: string, duration = 800): void => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.warn(`Element with ID "${elementId}" not found`);
    return;
  }
  
  const targetPosition = element.offsetTop;
  console.log(`Scrolling to ${elementId} at position ${targetPosition}`);
  
  smoothScrollTo({
    targetPosition,
    duration,
    onComplete: () => {
      // Update URL hash after scrolling completes
      window.history.pushState(null, '', `#${elementId}`);
      console.log(`Completed scroll to ${elementId}`);
    }
  });
};
