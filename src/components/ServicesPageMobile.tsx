import { useEffect, useRef, useState } from "react";
import type React from "react";
import type { ServicePageType } from "../types/types";
import data from "../data/index.json";
import icon01 from "../assets/01M.svg";
import icon02 from "../assets/02M.svg";
import icon03 from "../assets/03M.svg";
import icon04 from "../assets/04M.svg";
import arrowLeft from "../assets/arrow-left.svg";
import arrowRight from "../assets/arrow-right.svg";
import instagram from "../assets/instagram.svg";
import facebook from "../assets/facebook.svg";
import telegram from "../assets/telegram.svg";
import whatsapp from "../assets/whatsapp.svg";
import mail from "../assets/mail.svg";
import phone from "../assets/phone.svg";
import btnUp from "../assets/btnUp.svg";
import styles from "./ServicesPageMobile.module.css";
import HeaderMobile from "./HeaderMobile";
import ServiceCardMobile from "./ServiceCardMobile";
import LeaveRequest from "./LeaveRequest";
import { useAppContext } from "../contexts/AppContext";
import { useOptimizedImage } from "../hooks/useOptimizedImage";
import { motion, useInView } from "framer-motion";

interface ItemCardProps {
  img: string;
  title: string;
  description: string;
}

interface ServicePageProps {
  typePage: ServicePageType;
}

interface qualitiesItem {
  id: string;
  title: string;
  text: string;
}

const ServicesPageMobile: React.FC<ServicePageProps> = ({ typePage }) => {
  const { language } = useAppContext();
  const typedData = (data as any)[language] as Record<ServicePageType, any>;
  const upRef = useRef<HTMLDivElement>(null);
  const downRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [objectImages, setObjectImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentWhiteImageIndex, setCurrentWhiteImageIndex] = useState(0);
  const [isWhiteAnimating, setIsWhiteAnimating] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [shouldHideAll, setShouldHideAll] = useState(false);
  const [carouselImages, setCarouselImages] = useState<string[]>([]);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [isCarouselAnimating, setIsCarouselAnimating] = useState(false);
  const tasksContainerRef = useRef<HTMLDivElement>(null);
  const [isTasksInView, setIsTasksInView] = useState(false);
  const qualitiesRef = useRef<HTMLDivElement>(null);
  const isQualitiesInView = useInView(qualitiesRef, {
    once: true,
    margin: "-50px",
  });
  const [whiteContainerImages, setWhiteContainerImages] = useState<string[]>(
    []
  );
  const whiteTitleRef = useRef(null);
  const isWhiteTitleInView = useInView(whiteTitleRef, {
    once: true,
    margin: "-50px",
  });

  const letterAnimation = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    }),
  };

  const secondLineAnimation = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        delay: 0.3,
      },
    },
  };

  const titleContainerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const photoSlideIn = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const renderAnimatedText = (
    text: string,
    lineIndex: number = 0,
    baseDelay: number = 0
  ) => {
    return (
      <motion.span style={{ display: "inline" }}>
        {text.split("").map((char, index) => (
          <motion.span
            key={`${lineIndex}-${index}`}
            custom={baseDelay + index}
            initial="hidden"
            animate="visible"
            variants={letterAnimation}
            style={{
              display: "inline",
              whiteSpace: "normal",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    );
  };

  const { optimizedSrc: qualitiesImageSrc } = useOptimizedImage(
    "constructionQualities.png"
  );

  const getImageUrl = (imageName: string) => {
    return new URL(`../assets/${imageName}`, import.meta.url).href;
  };

  const getOriginalWebPUrl = (imageName: string) => {
    const baseName = imageName.split(".")[0];
    return new URL(
      `../assets/optimized/${baseName}-original.webp`,
      import.meta.url
    ).href;
  };

  const mainImageSrc = typedData?.[typePage]?.images?.[0]?.name
    ? getOriginalWebPUrl(typedData[typePage].images[0].name)
    : "";

  const getTitleStyles = () => {
    if (language === "ru") {
      return {
        fontFamily: "Deledda",
        fontWeight: 400,
        fontSize: "28px",
        lineHeight: "110%",
        letterSpacing: "0%",
      };
    } else {
      return {
        fontFamily: "Epilogue Semibold",
        fontWeight: 600,
        fontSize: "24px",
        lineHeight: "120%",
        letterSpacing: "0%",
      };
    }
  };

  const getSectionTitleStyles = () => {
    if (language === "ru") {
      return {
        fontFamily: "Deledda",
        fontWeight: 400,
        fontSize: "32px",
        lineHeight: "100%",
        letterSpacing: "0%",
      };
    } else {
      return {
        fontFamily: "Epilogue Semibold",
        fontWeight: 600,
        fontSize: "26px",
        lineHeight: "100%",
        letterSpacing: "0%",
      };
    }
  };

  const getWorkTitleStyles = () => {
    if (language === "ru") {
      return {
        fontFamily: "Deledda",
        fontWeight: 400,
        fontSize: "24px",
        lineHeight: "100%",
        letterSpacing: "0%",
      };
    } else {
      return {
        fontFamily: "Epilogue Bold",
        fontWeight: 700,
        fontSize: "22px",
        lineHeight: "120%",
        letterSpacing: "0%",
      };
    }
  };

  const getQualitiesTitleStyles = () => {
    if (language === "ru") {
      return {
        fontFamily: "Deledda",
        fontWeight: 400,
        fontSize: "28px",
        lineHeight: "100%",
        letterSpacing: "0%",
      };
    } else {
      return {
        fontFamily: "Epilogue Semibold",
        fontWeight: 600,
        fontSize: "26px",
        lineHeight: "100%",
        letterSpacing: "0%",
      };
    }
  };

  const getInPersonsTitleStyles = () => {
    if (language === "ru") {
      return {
        fontFamily: "Deledda",
        fontWeight: 400,
        fontSize: "24px",
        lineHeight: "100%",
        letterSpacing: "0%",
      };
    } else {
      return {
        fontFamily: "Epilogue Semibold",
        fontWeight: 600,
        fontSize: "22px",
        lineHeight: "100%",
        letterSpacing: "0%",
      };
    }
  };

  const getQualitiesItemTitleStyles = () => {
    if (language === "ru") {
      return {
        fontFamily: "Roboto Regular",
        fontWeight: 400,
        fontSize: "18px",
        lineHeight: "120%",
        letterSpacing: "0%",
        verticalAlign: "middle",
      };
    } else {
      return {
        fontFamily: "Roboto Regular",
        fontWeight: 400,
        fontSize: "18px",
        lineHeight: "120%",
        letterSpacing: "0%",
        verticalAlign: "middle",
      };
    }
  };

  useEffect(() => {
    if (
      typePage === "construction-services" &&
      typedData?.[typePage]?.objectImages
    ) {
      const images = typedData[typePage].objectImages.map((img: any) =>
        getImageUrl(img.name)
      );
      setObjectImages(images);
      if (images.length > 0) {
        setCurrentImageIndex(0);
      }
    }
  }, [typePage, typedData]);

  useEffect(() => {
    if (typedData?.[typePage]?.carouselImages) {
      const images = typedData[typePage].carouselImages.map((imageName: string) =>
        getImageUrl(imageName)
      );
      setCarouselImages(images);
    }
  }, [typePage, typedData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (typedData?.[typePage]?.whiteSectionImages) {
      const images = typedData[typePage].whiteSectionImages.map(
        (imageName: string) => getImageUrl(imageName)
      );
      setWhiteContainerImages(images);
    }
  }, [typePage, typedData]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextWhiteImage();
    }, 4000);

    return () => clearInterval(timer);
  }, [currentWhiteImageIndex]);

  useEffect(() => {
    if (carouselImages.length > 1) {
      const timer = setInterval(() => {
        nextCarouselImage();
      }, 4000);

      return () => clearInterval(timer);
    }
  }, [carouselImages.length, currentCarouselIndex]);

  useEffect(() => {
    if (whiteContainerImages.length === 0) return;

    const timer = setInterval(() => {
      nextWhiteImage();
    }, 5000);

    return () => clearInterval(timer);
  }, [whiteContainerImages.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTasksInView(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "-50px 0px",
      }
    );

    if (tasksContainerRef.current) {
      observer.observe(tasksContainerRef.current);
    }

    return () => {
      if (tasksContainerRef.current) {
        observer.unobserve(tasksContainerRef.current);
      }
    };
  }, []);

  const nextImage = () => {
    if (objectImages.length > 0 && !isAnimating) {
      setShouldHideAll(true);
      setIsAnimating(true);
      setCurrentImageIndex((prev) =>
        prev === objectImages.length - 1 ? 0 : prev + 1
      );
      setTimeout(() => setIsAnimating(false), 300);
      setTimeout(() => setShouldHideAll(false), 16);
    }
  };

  const prevImage = () => {
    if (objectImages.length > 0 && !isAnimating) {
      setShouldHideAll(true);
      setIsAnimating(true);
      setCurrentImageIndex((prev) =>
        prev === 0 ? objectImages.length - 1 : prev - 1
      );
      setTimeout(() => setIsAnimating(false), 300);
      setTimeout(() => setShouldHideAll(false), 16);
    }
  };

  const nextCarouselImage = () => {
    if (carouselImages.length > 0 && !isCarouselAnimating) {
      setIsCarouselAnimating(true);
      setCurrentCarouselIndex((prev) =>
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
      setTimeout(() => setIsCarouselAnimating(false), 500);
    }
  };

  const prevCarouselImage = () => {
    if (carouselImages.length > 0 && !isCarouselAnimating) {
      setIsCarouselAnimating(true);
      setCurrentCarouselIndex((prev) =>
        prev === 0 ? carouselImages.length - 1 : prev - 1
      );
      setTimeout(() => setIsCarouselAnimating(false), 500);
    }
  };

  const goToCarouselSlide = (index: number) => {
    if (!isCarouselAnimating && index !== currentCarouselIndex) {
      setIsCarouselAnimating(true);
      setCurrentCarouselIndex(index);
      setTimeout(() => setIsCarouselAnimating(false), 500);
    }
  };

  const nextWhiteImage = () => {
    if (whiteContainerImages.length > 0 && !isWhiteAnimating) {
      setIsWhiteAnimating(true);
      setCurrentWhiteImageIndex((prev) =>
        prev === whiteContainerImages.length - 1 ? 0 : prev + 1
      );
      setTimeout(() => setIsWhiteAnimating(false), 500);
    }
  };

  const prevWhiteImage = () => {
    if (whiteContainerImages.length > 0 && !isWhiteAnimating) {
      setIsWhiteAnimating(true);
      setCurrentWhiteImageIndex((prev) =>
        prev === 0 ? whiteContainerImages.length - 1 : prev - 1
      );
      setTimeout(() => setIsWhiteAnimating(false), 500);
    }
  };

  const goToWhiteSlide = (index: number) => {
    if (!isWhiteAnimating && index !== currentWhiteImageIndex) {
      setIsWhiteAnimating(true);
      setCurrentWhiteImageIndex(index);
      setTimeout(() => setIsWhiteAnimating(false), 500);
    }
  };

  const scrollToUp = () => {
    upRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToDown = () => {
    downRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setCurrentTranslate(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!startX) return;

    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    if (Math.abs(diff) > 10) {
      setCurrentTranslate(diff);
    }
  };

  const handleTouchEnd = () => {
    if (Math.abs(currentTranslate) > 50) {
      if (currentTranslate > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
    setStartX(0);
    setCurrentTranslate(0);
  };

  const splitTitle = (title: string) => {
    const words = title.split(" ");
    if (words.length < 4 || title.length < 25) {
      return { firstLine: title, secondLine: "" };
    }
    const middle = Math.floor(words.length / 2.25);
    let firstLine = words.slice(0, middle).join(" ");
    let secondLine = words.slice(middle).join(" ");
    const lastWord = words[middle - 1];
    if (lastWord.endsWith("—")) {
      firstLine = firstLine.slice(0, -1).trim();
      secondLine = "— " + secondLine;
    }
    return { firstLine, secondLine };
  };

  const mainTitle = splitTitle(typedData?.[typePage]?.title || "");

  const handleContactClick = () => {
    setShowModal(true);
  };

  if (!typedData?.[typePage]) {
    return null;
  }

  const handleEmailClick = () => {
    window.location.href = "mailto:biuro@meridian-group.info";
  };

  const handleAddressClick = () => {
    window.open(
      "https://maps.google.com/?q=ul.Synagogalna4,lok.6,09-402,Płock,Polska",
      "_blank"
    );
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+48531050050";
  };

  const handleInstagramClick = () => {
    window.open("https://www.instagram.com/meridian_group_pl?igsh=OXdyazhoMWs0Znli", "_blank");
  };

  const handleFacebookClick = () => {
    window.open("https://www.facebook.com/profile.php?id=61576014290920", "_blank");
  };

  const handleTelegramClick = () => {
    window.open("https://t.me/account", "_blank");
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/48531050050", "_blank");
  };

  return (
    <>
      {showModal && <LeaveRequest setShowModal={setShowModal} />}

      <div ref={upRef} className={styles.servicesPage}>
        <div className={styles.firstSection}>
          <HeaderMobile scrollFunction={scrollToDown} />

          <motion.div
            className={styles.headDescription}
            initial="hidden"
            animate="visible"
            variants={titleContainerAnimation}
          >
            <motion.div className={styles.titleH1}>
              <motion.h1 style={getTitleStyles()}>
                {renderAnimatedText(mainTitle.firstLine, 0, 0)}
                {mainTitle.secondLine && (
                  <motion.span
                    initial="hidden"
                    animate="visible"
                    variants={secondLineAnimation}
                    style={{ display: "inline" }}
                  >
                    <br />
                    {renderAnimatedText(
                      mainTitle.secondLine,
                      1,
                      mainTitle.firstLine.length * 0.03 + 0.3
                    )}
                  </motion.span>
                )}
              </motion.h1>
            </motion.div>

            <span className={styles.titleDescription}>
              {typedData[typePage].description}
            </span>
          </motion.div>

          <motion.div
            className={styles.imagesContainer}
            initial="hidden"
            animate="visible"
            variants={photoSlideIn}
          >
            <div className={styles.imageContainer1}>
              {carouselImages.length > 1 ? (
                <div className={styles.carouselWrapper}>
                  <div className={styles.carousel}>
                    {carouselImages.map((image, index) => (
                      <div
                        key={index}
                        className={`${styles.carouselSlide} ${
                          index === currentCarouselIndex ? styles.active : ""
                        }`}
                      >
                        <img
                          src={image}
                          alt={`design ${index + 1}`}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>

                  <div className={styles.carouselControls}>
                    <button
                      className={styles.carouselBtn}
                      onClick={prevCarouselImage}
                      disabled={isCarouselAnimating || carouselImages.length === 0}
                    >
                      <img src={arrowLeft} alt="previous" loading="lazy" />
                    </button>
                    <button
                      className={styles.carouselBtn}
                      onClick={nextCarouselImage}
                      disabled={isCarouselAnimating || carouselImages.length === 0}
                    >
                      <img src={arrowRight} alt="next" loading="lazy" />
                    </button>
                  </div>

                  <div className={styles.carouselDots}>
                    {carouselImages.map((_, index) => (
                      <button
                        key={index}
                        className={`${styles.carouselDot} ${
                          index === currentCarouselIndex ? styles.active : ""
                        }`}
                        onClick={() => goToCarouselSlide(index)}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <img src={mainImageSrc} alt="house" loading="lazy" />
              )}
            </div>
          </motion.div>

          <div className={styles.selectServiceContainer}>
            <h1 style={getSectionTitleStyles()}>
              {typedData[typePage].sectionTitle}
            </h1>
            {typedData[typePage].sectionDescription && (
              <span>{typedData[typePage].sectionDescription}</span>
            )}
          </div>

          <div className={styles.servicesContainer}>
            {typedData[typePage].sectionItems.map(
              (item: ItemCardProps, index: number) => (
                <ServiceCardMobile
                  key={index}
                  image={item.img}
                  title={item.title}
                  text={item.description}
                  firstEl={index === 0}
                  onContactClick={handleContactClick}
                  index={index}
                />
              )
            )}
          </div>

          {typePage === "construction-services" && objectImages.length > 0 && (
            <div className={styles.objectsContainer}>
              <div className={styles.objectsHead}>
                <h1 style={getSectionTitleStyles()}>
                  {typedData[typePage].objectTitle}
                </h1>
              </div>
              <div
                className={styles.objectsImages}
                ref={carouselRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {objectImages.length > 0 ? (
                  <div className={styles.carouselWrapper}>
                    <div
                      className={styles.carouselTrack}
                      style={{
                        visibility: shouldHideAll ? "hidden" : "visible",
                        opacity: shouldHideAll ? 0 : 1,
                        transition: "none",
                      }}
                    >
                      {objectImages.map((image, index) => {
                        const total = objectImages.length;
                        const diff = index - currentImageIndex;

                        let normalizedDiff = diff;
                        if (diff > total / 2) normalizedDiff = diff - total;
                        if (diff < -total / 2) normalizedDiff = diff + total;

                        const position = normalizedDiff;

                        let translateX = position * 120;
                        let scale = 1 - Math.abs(position) * 0.1;
                        let opacity = 1 - Math.abs(position) * 0.2;
                        let zIndex = total - Math.abs(position);

                        scale = Math.max(0.7, scale);
                        opacity = Math.max(0.3, opacity);
                        zIndex = Math.max(1, zIndex);

                        const isFar = Math.abs(position) > 2;

                        return (
                          <div
                            key={index}
                            className={`${styles.carouselCard} ${
                              position === 0 ? styles.active : ""
                            }`}
                            style={{
                              transform: `translateX(${translateX}%) scale(${scale})`,
                              opacity: isFar && !isAnimating ? 0 : opacity,
                              zIndex,
                              margin: "0 1.5em",
                              visibility:
                                isFar && !isAnimating ? "hidden" : "visible",
                              transition: isAnimating
                                ? "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease"
                                : "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease",
                            }}
                            onClick={() => setCurrentImageIndex(index)}
                          >
                            <img
                              src={image}
                              alt={`object ${index + 1}`}
                              loading="lazy"
                              onError={(e) => {
                                console.error("Failed to load image:", image);
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <div className={styles.carouselDots}>
                      {objectImages.map((_, index) => (
                        <button
                          key={index}
                          className={`${styles.carouselDot} ${
                            index === currentImageIndex ? styles.active : ""
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className={styles.noImagesMessage}>
                    {language === "ru"
                      ? "Изображения объектов временно недоступны"
                      : "Zdjęcia obiektów tymczasowo niedostępne"}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className={styles.whiteContainer}>
          <div className={styles.head}>
            <motion.div
              ref={whiteTitleRef}
              className={styles.title}
              initial="hidden"
              animate={isWhiteTitleInView ? "visible" : "hidden"}
              variants={titleContainerAnimation}
            >
              <motion.h1 style={getSectionTitleStyles()}>
                {typedData[typePage].whiteSectionTitle
                  .split("")
                  .map((char: string, index: number) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={
                        isWhiteTitleInView ? { opacity: 1 } : { opacity: 0 }
                      }
                      transition={{
                        duration: 0.6,
                        delay: index * 0.03,
                        ease: "easeOut",
                      }}
                      style={{
                        display: "inline",
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
              </motion.h1>
            </motion.div>
          </div>

          <div className={styles.imageContainer}>
            {whiteContainerImages.length > 1 ? (
              <div className={styles.whiteCarouselContainer}>
                <div className={styles.whiteCarousel}>
                  {whiteContainerImages.map((image, index) => (
                    <div
                      key={index}
                      className={`${styles.whiteCarouselSlide} ${
                        index === currentWhiteImageIndex ? styles.active : ""
                      }`}
                    >
                      <img
                        src={image}
                        alt={`project ${index + 1}`}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>

                <div className={styles.whiteCarouselControls}>
                  <button
                    className={styles.whiteCarouselBtn}
                    onClick={prevWhiteImage}
                    disabled={
                      isWhiteAnimating || whiteContainerImages.length === 0
                    }
                  >
                    <img src={arrowLeft} alt="previous" loading="lazy" />
                  </button>
                  <button
                    className={styles.whiteCarouselBtn}
                    onClick={nextWhiteImage}
                    disabled={
                      isWhiteAnimating || whiteContainerImages.length === 0
                    }
                  >
                    <img src={arrowRight} alt="next" loading="lazy" />
                  </button>
                </div>

                <div className={styles.whiteCarouselDots}>
                  {whiteContainerImages.map((_, index) => (
                    <button
                      key={index}
                      className={`${styles.whiteCarouselDot} ${
                        index === currentWhiteImageIndex ? styles.active : ""
                      }`}
                      onClick={() => goToWhiteSlide(index)}
                    />
                  ))}
                </div>
              </div>
            ) : whiteContainerImages.length === 1 ? (
              <img
                src={whiteContainerImages[0]}
                alt="project"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : null}
          </div>

          <div className={styles.contactInfo}>
            <div className={styles.contactTitle}>
              <span>{typedData[typePage].whiteSectionDescription}</span>
            </div>
            <div className={styles.contactLinks}>
              <button className={styles.blackBtn} onClick={scrollToDown}>
                {language === "ru" ? "Позвонить сейчас" : "Zadzwoń teraz"}
              </button>
              <button className={styles.blackBtn} onClick={handleContactClick}>
                {language === "ru" ? "Оставить заявку" : "ZŁÓŻ ZAPYTANIE"}
              </button>
            </div>
          </div>
        </div>

        <div className={styles.secondSection}>
          <div className={styles.headDescription}>
            <div className={styles.titleH1}>
              <h1 style={getWorkTitleStyles()}>
                {language === "ru" ? "Как мы работаем" : "Jak pracujemy"}
              </h1>
            </div>
          </div>

          <div
            ref={tasksContainerRef}
            className={`${styles.tasksContainer} ${
              isTasksInView ? styles.animate : ""
            }`}
          >
            {typedData[typePage].workSectionItems.map(
              (item: any, index: number) => (
                <div key={index} className={styles.taskItem}>
                  <img
                    src={
                      index === 0
                        ? icon01
                        : index === 1
                        ? icon02
                        : index === 2
                        ? icon03
                        : icon04
                    }
                    alt={`0${index + 1}`}
                    loading="lazy"
                  />
                  <div className={styles.blackSection}>
                    <div className={styles.overlayBg}></div>
                    <span>{item.text}</span>
                  </div>
                </div>
              )
            )}
          </div>

          {typePage === "construction-services" && (
            <div ref={qualitiesRef} className={styles.qualitiesContainer}>
              <motion.h1
                style={getQualitiesTitleStyles()}
                initial={{ opacity: 0, y: 20 }}
                animate={isQualitiesInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {language === "ru"
                  ? "Почему выбирают нас"
                  : "Dlaczego wybierają nas"}
              </motion.h1>
              <div className={styles.areaQualities}>
                <motion.img
                  src={qualitiesImageSrc}
                  alt="room"
                  loading="lazy"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isQualitiesInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                />
                <motion.div
                  className={styles.qualitiesList}
                  initial="hidden"
                  animate={isQualitiesInView ? "visible" : "hidden"}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.2,
                      },
                    },
                  }}
                >
                  {typedData[typePage].qualitiesItems.map(
                    (item: qualitiesItem, index: number) => (
                      <motion.div
                        key={index}
                        className={styles.qualitiesItem}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                              duration: 0.6,
                              ease: [0.25, 0.46, 0.45, 0.94],
                            },
                          },
                        }}
                      >
                        <motion.div
                          className={styles.qualitiesItemId}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={
                            isQualitiesInView ? { opacity: 1, scale: 1 } : {}
                          }
                          transition={{
                            duration: 0.4,
                            type: "spring",
                            stiffness: 120,
                          }}
                        >
                          <span>{item.id}</span>
                        </motion.div>
                        <div className={styles.qualitiesItemInfo}>
                          <motion.h2
                            style={getQualitiesItemTitleStyles()}
                            initial={{ opacity: 0, x: -10 }}
                            animate={
                              isQualitiesInView ? { opacity: 1, x: 0 } : {}
                            }
                            transition={{
                              duration: 0.5,
                              delay: 0.1,
                            }}
                          >
                            {item.title}
                          </motion.h2>
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={isQualitiesInView ? { opacity: 1 } : {}}
                            transition={{
                              duration: 0.6,
                              delay: 0.2,
                            }}
                          >
                            {item.text}
                          </motion.span>
                        </div>
                      </motion.div>
                    )
                  )}
                </motion.div>
              </div>
            </div>
          )}

          <div className={styles.inPersonsContainer}>
            <div className={styles.inPersonsHead}>
              <h1 style={getInPersonsTitleStyles()}>Meridian</h1>
              <span>{language === "ru" ? "В лицах" : "zespół"}</span>
            </div>
            <div className={styles.inPersonsImages}>
              <div className={`${styles.inPersonsRow} ${styles.row1}`}>
                {typedData[typePage].inPersonImages?.map(
                  (imageName: string, index: number) => (
                    <img
                      key={index}
                      src={getImageUrl(imageName)}
                      alt={`Person ${index + 1}`}
                      loading="lazy"
                    />
                  )
                )}
                {typedData[typePage].inPersonImages?.map(
                  (imageName: string, index: number) => (
                    <img
                      key={`duplicate-${index}`}
                      src={getImageUrl(imageName)}
                      alt={`Person ${index + 1}`}
                      loading="lazy"
                    />
                  )
                )}
              </div>
              <div className={`${styles.inPersonsRow} ${styles.row2}`}>
                {typedData[typePage].inPersonImages?.map(
                  (imageName: string, index: number) => (
                    <img
                      key={index}
                      src={getImageUrl(imageName)}
                      alt={`Person ${index + 1}`}
                      loading="lazy"
                    />
                  )
                )}
                {typedData[typePage].inPersonImages?.map(
                  (imageName: string, index: number) => (
                    <img
                      key={`duplicate-${index}`}
                      src={getImageUrl(imageName)}
                      alt={`Person ${index + 1}`}
                      loading="lazy"
                    />
                  )
                )}
              </div>
              <div className={`${styles.inPersonsRow} ${styles.row3}`}>
                {typedData[typePage].inPersonImages?.map(
                  (imageName: string, index: number) => (
                    <img
                      key={index}
                      src={getImageUrl(imageName)}
                      alt={`Person ${index + 1}`}
                      loading="lazy"
                    />
                  )
                )}
                {typedData[typePage].inPersonImages?.map(
                  (imageName: string, index: number) => (
                    <img
                      key={`duplicate-${index}`}
                      src={getImageUrl(imageName)}
                      alt={`Person ${index + 1}`}
                      loading="lazy"
                    />
                  )
                )}
              </div>
            </div>
          </div>

          <div className={styles.sponsorsContainer}>
            <div className={styles.sectionSponsors1}>
              {typedData[typePage].sponsors.map(
                (item: any, index: number) =>
                  index < 7 && (
                    <div key={index} className={styles.sponsorItem}>
                      <img
                        src={getImageUrl(item.img)}
                        alt="sponsor"
                        loading="lazy"
                      />
                    </div>
                  )
              )}
            </div>
            <div className={styles.sectionSponsors2}>
              {typedData[typePage].sponsors.map(
                (item: any, index: number) =>
                  index > 7 && (
                    <div key={index} className={styles.sponsorItem}>
                      <img
                        src={getImageUrl(item.img)}
                        alt="sponsor"
                        loading="lazy"
                      />
                    </div>
                  )
              )}
            </div>
          </div>

          <div ref={downRef} className={styles.contactInfo}>
            <div className={styles.contacts}>
              <span onClick={handlePhoneClick} style={{ cursor: "pointer" }}>
                +48 531 050 050
              </span>
              <span onClick={handleEmailClick} style={{ cursor: "pointer" }}>
                biuro@meridian-group.info
              </span>
            </div>

            <span
              className={styles.addres}
              onClick={handleAddressClick}
              style={{ cursor: "pointer" }}
            >
              ul. Synagogalna4, lok. 6 09-402 Płock, Polska
            </span>
          </div>
        </div>

        <footer className={styles.footer}>
          <span className={styles.footerText}>
            © MERIDIAN EU Sp. z o.o. NIP 7743247115
          </span>

          <div className={styles.social}>
            <img
              src={instagram}
              alt="instagram"
              onClick={handleInstagramClick}
              style={{ cursor: "pointer" }}
              loading="lazy"
            />
            <img
              src={facebook}
              alt="facebook"
              onClick={handleFacebookClick}
              style={{ cursor: "pointer" }}
              loading="lazy"
            />
            <img
              src={telegram}
              alt="telegram"
              onClick={handleTelegramClick}
              style={{ cursor: "pointer" }}
              loading="lazy"
            />
            <img
              src={whatsapp}
              alt="whatsapp"
              onClick={handleWhatsAppClick}
              style={{ cursor: "pointer" }}
              loading="lazy"
            />
            <img
              src={mail}
              alt="mail"
              onClick={handleEmailClick}
              style={{ cursor: "pointer" }}
              loading="lazy"
            />
            <img
              src={phone}
              alt="phone number"
              onClick={handlePhoneClick}
              style={{ cursor: "pointer" }}
              loading="lazy"
            />
          </div>

          <button
            className={`${styles.btnUp} ${
              showScrollTop ? styles.show : styles.hide
            }`}
            onClick={scrollToUp}
          >
            <img src={btnUp} alt="Button Up" loading="lazy" />
          </button>
        </footer>
      </div>
    </>
  );
};

export default ServicesPageMobile;
