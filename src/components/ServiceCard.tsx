import type React from "react";
import styles from "./ServiceCard.module.css";
import { useAppContext } from "../contexts/AppContext";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useOptimizedImage } from "../hooks/useOptimizedImage";

interface ServiceCardProps {
  image: string;
  title: string;
  text: string;
  onContactClick?: () => void;
  index?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  image,
  title,
  text,
  onContactClick,
  index = 0
}) => {
  const { language } = useAppContext();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px"
  });

  const { optimizedSrc } = useOptimizedImage(image);

  const getImageUrl = (imageName: string) => {
    return new URL(`../assets/${imageName}`, import.meta.url).href;
  };

  const cardAnimation = {
    hidden: {
      opacity: 0,
      y: -10
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1
      }
    }
  };

  const imageAnimation = {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const,
        delay: index * 0.1 + 0.2
      }
    }
  };

  const titleAnimation = {
    hidden: {
      opacity: 0,
      y: -10
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1 + 0.3
      }
    }
  };

  const textAnimation = {
    hidden: {
      opacity: 0,
      y: -10
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1 + 0.4
      }
    }
  };

  const buttonAnimation = {
    hidden: {
      opacity: 0,
      y: -10
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.1 + 0.5
      }
    }
  };

  const markdownToHtml = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/__(.*?)__/g, '<strong>$1</strong>')
      .replace(/_(.*?)_/g, '<em>$1</em>');
  };

  const formatText = (text: string) => {
    const paragraphs = text.split('\n').filter(paragraph => paragraph.trim() !== '');
    
    return paragraphs.map((paragraph, pIndex) => {
      const htmlContent = markdownToHtml(paragraph);
      
      return (
        <div 
          key={pIndex} 
          className={styles.paragraph}
          style={{ 
            marginBottom: pIndex < paragraphs.length - 1 ? '1em' : '0' 
          }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      );
    });
  };

  const buttonText = language === 'ru' ? 'Связаться с нами' : 'Skontaktuj się z nami';

  return (
    <motion.div 
      ref={ref}
      className={styles.serviceCard}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardAnimation}
    >
      <motion.img
        src={optimizedSrc || getImageUrl(image)} 
        alt="house"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={imageAnimation}
        style={{ 
          transformOrigin: "center center"
        }}
        loading="lazy"
        onError={(e) => {
          console.error('Error loading optimized image, falling back to original:', image);
          e.currentTarget.src = getImageUrl(image);
        }}
      />
      
      <motion.h2 
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={titleAnimation}
      >
        {title}
      </motion.h2>
      
      <motion.div 
        className={styles.description}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={textAnimation}
      >
        <div className={styles.formattedText}>
          {formatText(text)}
        </div>
        <motion.button 
          className={styles.btnContact} 
          onClick={onContactClick}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={buttonAnimation}
          whileHover={{
            backgroundColor: "#b84300",
          }}
          whileTap={{
            scale: 0.98
          }}
        >
          {buttonText}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ServiceCard;