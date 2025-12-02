import type React from "react";
import { useRef } from "react";
import { useAppContext } from "../contexts/AppContext";
import data from "../data/index.json";
import styles from "./TermsOfServicesMobile.module.css";
import HeaderMobile from "../components/HeaderMobile";

const TermsOfServicesMobile: React.FC = () => {
  const downRef = useRef<HTMLDivElement>(null);
  const { language } = useAppContext();
  const currentData = (data as any)[language]?.termsOfServices;

  const scrollToDown = () => {
    downRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const formatText = (text: string) => {
    if (!text) return null;

    const lines = text.split('\n');
    
    return lines.map((line, lineIndex) => {
      if (!line.trim()) {
        return <br key={lineIndex} />;
      }

      const isCheckboxLine = line.trim().startsWith('•');
      
      if (isCheckboxLine) {
        const content = line.trim().substring(1).trim();
        
        return (
          <div key={lineIndex} className={styles.checkboxLine}>
            <span className={styles.checkboxDot}>•</span>
            <span className={styles.checkboxText}>
              {formatInlineText(content)}
            </span>
          </div>
        );
      }

      return (
        <div key={lineIndex} className={styles.textLine}>
          {formatInlineText(line)}
        </div>
      );
    });
  };

  const formatInlineText = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    
    return parts.map((part, partIndex) => {
      if (partIndex % 2 === 1) {
        return (
          <strong key={partIndex} className={styles.boldText}>
            {part}
          </strong>
        );
      }
      return part;
    });
  };

  if (!currentData) {
    return null;
  }

  return (
    <>
      <div ref={downRef} className={styles.termsOfServicesContainer}>
        <HeaderMobile scrollFunction={scrollToDown} />
        
        <h1 className={styles.title}>{currentData.title}</h1>

        <div className={styles.content}>
          {currentData.sections.map((section: any, index: number) => (
            <div key={index} className={styles.section}>
              <h2 className={styles.sectionTitle}>{section.title}</h2>
              <div className={styles.sectionContent}>
                {formatText(section.content)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TermsOfServicesMobile;