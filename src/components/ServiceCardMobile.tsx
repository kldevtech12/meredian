import type React from "react";
import styles from "./ServiceCardMobile.module.css";
import { useAppContext } from "../contexts/AppContext";
import { motion } from "framer-motion";
import { useOptimizedImage } from "../hooks/useOptimizedImage";

interface ServiceCardMobileProps {
  image: string;
  title: string;
  text: string;
  firstEl?: boolean;
  onContactClick?: () => void;
  index?: number;
}

const ServiceCardMobile: React.FC<ServiceCardMobileProps> = ({
  image,
  title,
  text,
  firstEl = false,
  onContactClick,
  index = 0
}) => {
  const { language } = useAppContext();

  // Используем хук для получения оптимизированного изображения
  const { optimizedSrc } = useOptimizedImage(image);

  const getImageUrl = (imageName: string) => {
    return new URL(`../assets/${imageName}`, import.meta.url).href;
  };

  const cardAnimation = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut" as const
      }
    }
  };

  const imageAnimation = {
    hidden: {
      opacity: 0,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1 + 0.2,
        ease: "easeOut" as const
      }
    }
  };

  const contentAnimation = {
    hidden: {
      opacity: 0,
      y: 15
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1 + 0.3,
        ease: "easeOut" as const
      }
    }
  };

  const buttonAnimation = {
    hidden: {
      opacity: 0,
      y: 10
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.1 + 0.4,
        ease: "easeOut" as const
      }
    }
  };

  const formatText = (text: string) => {
    return text.split("\n").map((paragraph, pIndex) => (
      <div key={pIndex} className={styles.paragraph}>
        {paragraph.split(/(\*\*.*?\*\*)/).map((part, index) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={index}>{part.slice(2, -2)}</strong>;
          }
          return <span key={index}>{part}</span>;
        })}
      </div>
    ));
  };

  const buttonText = language === 'ru' ? 'Связаться с нами' : 'Skontaktuj się z nami';

  return (
    <motion.div 
      className={styles.serviceCardMobile}
      style={{
        borderLeft: !firstEl ? "1px solid #FFF" : "none",
      }}
      initial="hidden"
      animate="visible"
      variants={cardAnimation}
    >
      <motion.img 
        src={optimizedSrc || getImageUrl(image)} 
        alt="house"
        initial="hidden"
        animate="visible"
        variants={imageAnimation}
        style={{ transformOrigin: "center center" }}
        loading="lazy"
        onError={(e) => {
          console.error('Error loading optimized image, falling back to original:', image);
          e.currentTarget.src = getImageUrl(image);
        }}
      />
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={contentAnimation}
      >
        <h2>{title}</h2>
        <div className={styles.description}>
          <div className={styles.formattedText}>{formatText(text)}</div>
        </div>
      </motion.div>

      <motion.button 
        className={styles.btnContact} 
        onClick={onContactClick}
        initial="hidden"
        animate="visible"
        variants={buttonAnimation}
        whileTap={{ scale: 0.95 }}
      >
        {buttonText}
      </motion.button>
    </motion.div>
  );
};

export default ServiceCardMobile;