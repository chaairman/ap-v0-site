// hooks/use-breakpoint.ts
import { useState, useEffect } from 'react';

// Define your Tailwind breakpoints here (adjust if you customized them)
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/**
 * Custom hook to check if the viewport width is greater than or equal to a specified Tailwind breakpoint.
 * @param breakpoint - The Tailwind breakpoint key (e.g., 'sm', 'md', 'lg').
 * @returns `true` if the viewport width is >= the breakpoint width, `false` otherwise.
 *          Returns `false` during server-side rendering or initial client mount before hydration.
 */
export function useBreakpoint(breakpoint: keyof typeof breakpoints): boolean {
  const [isMatch, setIsMatch] = useState(false);

  // Effect runs only on the client side
  useEffect(() => {
    // Check if window is defined (ensures client-side execution)
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(`(min-width: ${breakpoints[breakpoint]}px)`);

    const handleResize = () => {
      setIsMatch(mediaQuery.matches);
    };

    // Set the initial state
    handleResize();

    // Add listener for resize events
    mediaQuery.addEventListener('change', handleResize);

    // Cleanup listener on component unmount
    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, [breakpoint]); // Re-run effect if breakpoint changes

  return isMatch;
}