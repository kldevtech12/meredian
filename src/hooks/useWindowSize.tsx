import { useState, useEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

interface Breakpoints {
  isMobile: boolean;
  isDesktop: boolean;
}

export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export const useDeviceType = (): Breakpoints => {
  const { width } = useWindowSize();
  
  return {
    isMobile: width < 768,
    isDesktop: width >= 768,
  };
};