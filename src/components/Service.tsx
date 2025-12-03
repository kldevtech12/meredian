import type React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import styles from "./Service.module.css";
import { useAppContext } from "../contexts/AppContext";
import { useOptimizedImage } from "../hooks/useOptimizedImage";

interface ServiceProps {
  title: string;
  text: string;
  link: string;
  imageName?: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const Service: React.FC<ServiceProps> = ({ title, text, link }) => {
  const { language } = useAppContext();

  const splitText = (text: string) => {
    const words = text.split(' ');
    const middle = Math.ceil(words.length / 2);
    
    const firstPart = words.slice(0, middle).join(' ');
    const secondPart = words.slice(middle).join(' ');
    
    return { firstPart, secondPart };
  };

  const { firstPart, secondPart } = splitText(text);

  const buttonText = language === 'ru' ? 'Перейти' : 'PRZEJDŹ DO';

  return (
    <motion.div 
      className={styles.service}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h1 
        variants={fadeInUp}
        transition={{ duration: 1 }}
      >
        {title}
      </motion.h1>
      <motion.p
        variants={fadeInUp}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <span className={styles.firstLine}>{firstPart}</span>
        {secondPart && (
          <>
            <br />
            <span className={styles.secondLine}>{secondPart}</span>
          </>
        )}
      </motion.p>
      <motion.div
        variants={fadeInUp}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <Link to={link}>
          <motion.button
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            {buttonText}
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

const ServiceMobile: React.FC<ServiceProps> = ({ title, text, link, imageName = "home3.png" }) => {
  const { language } = useAppContext();
  const { optimizedSrc, isLoading } = useOptimizedImage(imageName);

  const splitTitle = (title: string) => {
    if (language === 'ru') {
      return { firstLine: title, secondLine: '' };
    }
    
    const words = title.split(' ');
    if (words.length === 2) {
      return { firstLine: words[0], secondLine: words[1] };
    }
    return { firstLine: title, secondLine: '' };
  };

  const splitText = (text: string) => {
    if (language === 'ru') {
      return { firstPart: text, secondPart: '' };
    }
    
    const words = text.split(' ');
    const middle = Math.ceil(words.length / 2);
    
    const firstPart = words.slice(0, middle).join(' ');
    const secondPart = words.slice(middle).join(' ');
    
    return { firstPart, secondPart };
  };

  const { firstLine: titleFirstLine, secondLine: titleSecondLine } = splitTitle(title);
  const { firstPart, secondPart } = splitText(text);

  const buttonText = language === 'ru' ? 'Перейти' : 'PRZEJDŹ DO';

  return (
    <motion.div 
      className={styles.serviceMobile}
      initial={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ 
        scale: 1.03,
        transition: { duration: 0.3 }
      }}
    >
      <div className={styles.serviceContent}>
        <div className={styles.serviceImage}>
          {!isLoading ? (
            <motion.img 
              src={optimizedSrc} 
              alt={title}
              loading="lazy"
              initial={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              Loading...
            </div>
          )}
        </div>
        
        <h1>
          {titleFirstLine}
          {titleSecondLine && (
            <>
              <br />
              {titleSecondLine}
            </>
          )}
        </h1>
        
        <p>
          <span className={styles.firstLineMobile}>{firstPart}</span>
          {secondPart && (
            <>
              <br />
              <span className={styles.secondLineMobile}>{secondPart}</span>
            </>
          )}
        </p>
        
        <motion.div>
          <Link to={link}>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "#B84500",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{buttonText}</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export { ServiceMobile };
export default Service;