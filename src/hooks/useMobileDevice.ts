import { useState, useEffect } from 'react';

interface UseMobileDeviceOptions {
  breakpoint?: number;
}

export const useIsMobile = ({ breakpoint = 768 }: UseMobileDeviceOptions = {}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Check on mount
    checkIsMobile();

    // Add event listener
    window.addEventListener('resize', checkIsMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [breakpoint]);

  return { isMobile };
};
