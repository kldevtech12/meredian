import { useState, useEffect } from 'react';

export const useOptimizedImage = (imageName: string) => {
  const [optimizedSrc, setOptimizedSrc] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOptimizedImage = () => {
      if (!imageName) return;

      setIsLoading(true);

      const width = window.innerWidth;
      let size = 'mobile';
      
      if (width >= 1200) size = 'desktop';
      else if (width >= 768) size = 'tablet';

      const nameWithoutExt = imageName.replace(/\.(png|jpg|jpeg)$/i, '');
      const optimizedName = `${nameWithoutExt}-${size}.webp`;
      
      try {
        const optimizedUrl = new URL(
          `../assets/optimized/${optimizedName}`, 
          import.meta.url
        ).href;
        
        setOptimizedSrc(optimizedUrl);
      } catch (error) {
        console.error('Error loading optimized image:', error);
        setOptimizedSrc(new URL(`../assets/${imageName}`, import.meta.url).href);
      } finally {
        setIsLoading(false);
      }
    };

    loadOptimizedImage();

    const handleResize = () => {
      loadOptimizedImage();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [imageName]);

  return { optimizedSrc, isLoading };
};