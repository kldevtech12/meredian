import React, { useState, useRef, useEffect } from "react";
import styles from "./ImageCarousel.module.css";

interface ImageCarouselProps {
  images: string[];
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  images, 
  onNext, 
  onPrev, 
  currentIndex 
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const scrollToActiveItem = () => {
    if (carouselRef.current && images.length > 0) {
      const container = carouselRef.current;
      const items = container.children;
      
      if (items[currentIndex]) {
        const item = items[currentIndex] as HTMLElement;
        const containerWidth = container.clientWidth;
        const itemWidth = item.offsetWidth;
        const scrollPosition = item.offsetLeft - (containerWidth - itemWidth) / 2;
        
        container.scrollTo({
          left: scrollPosition,
          behavior: "smooth"
        });
      }
    }
  };

  useEffect(() => {
    scrollToActiveItem();
  }, [currentIndex]);

  const handleItemClick = (index: number) => {
    if (!isAnimating && index !== currentIndex) {
      setIsAnimating(true);
      
      if (index > currentIndex) {
        onNext();
      } else {
        onPrev();
      }
      
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  if (images.length === 0) {
    return <div className={styles.carouselContainer}>No images available</div>;
  }

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselWrapper}>
        <div ref={carouselRef} className={styles.carousel}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`${styles.carouselItem} ${
                index === currentIndex ? styles.active : ''
              }`}
              onClick={() => handleItemClick(index)}
            >
              <img
                src={image}
                alt={`Object ${index + 1}`}
                className={styles.carouselImage}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;