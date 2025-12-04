import { useEffect, useRef, useState } from "react";
import type React from "react";
import type { ServicePageType } from "../types/types";
import Header from "./Header";
import ImageCarousel from "./ImageCarousel";
import ServiceCard from "./ServiceCard";
import data from "../data/index.json";
import arrowLeft from "../assets/arrow-left.svg";
import arrowRight from "../assets/arrow-right.svg";
import instagram from "../assets/instagram.svg";
import facebook from "../assets/facebook.svg";
import telegram from "../assets/telegram.svg";
import whatsapp from "../assets/whatsapp.svg";
import mail from "../assets/mail.svg";
import phone from "../assets/phone.svg";
import btnUp from "../assets/btnUp.svg";
import ellipse from "../assets/ellipse.svg";
import styles from "./ServicesPage.module.css";
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

const ServicesPage: React.FC<ServicePageProps> = ({ typePage }) => {
  const { language } = useAppContext();
  const typedData = (data as any)[language] as Record<ServicePageType, any>;
  const inPersonsImagesRef = useRef<HTMLDivElement>(null);
  const upRef = useRef<HTMLDivElement>(null);
  const downRef = useRef<HTMLDivElement>(null);

  const [objectImages, setObjectImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(2);
  const [imagesCount, setImagesCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [whiteContainerImages, setWhiteContainerImages] = useState<string[]>(
    []
  );
  const [currentWhiteImageIndex, setCurrentWhiteImageIndex] = useState(0);
  const [isWhiteAnimating, setIsWhiteAnimating] = useState(false);
  const [isWhiteHovered, setIsWhiteHovered] = useState(false);
  const [currentCarouselSlide, setCurrentCarouselSlide] = useState(0);
  const [isCarouselAnimating, setIsCarouselAnimating] = useState(false);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const whiteTitleRef = useRef(null);
  const isWhiteTitleInView = useInView(whiteTitleRef, {
    once: true,
    margin: "-100px",
  });
  const [activeBtn, setActiveBtn] = useState<"left" | "right">("right");
  const task1Ref = useRef<HTMLDivElement>(null);
  const task2Ref = useRef<HTMLDivElement>(null);
  const task3Ref = useRef<HTMLDivElement>(null);
  const task4Ref = useRef<HTMLDivElement>(null);

  const isTask1InView = useInView(task1Ref, { once: true, margin: "-50px" });
  const isTask2InView = useInView(task2Ref, { once: true, margin: "-50px" });
  const isTask3InView = useInView(task3Ref, { once: true, margin: "-50px" });
  const isTask4InView = useInView(task4Ref, { once: true, margin: "-50px" });

  const getImageUrl = (imageName: string) => {
    return new URL(`../assets/${imageName}`, import.meta.url).href;
  };

  const { optimizedSrc: image1Src } = useOptimizedImage(
    typedData?.[typePage]?.images?.[0]?.name || ""
  );
  const { optimizedSrc: image2Src } = useOptimizedImage(
    typedData?.[typePage]?.images?.[1]?.name || ""
  );
  const { optimizedSrc: qualitiesImageSrc } = useOptimizedImage(
    "constructionQualities.png"
  );

  const carouselImages =
    typedData?.[typePage]?.carouselImages?.map((imageName: string) =>
      getImageUrl(imageName)
    ) || [];

  const getTitleStyles = () => {
    if (language === "ru") {
      return {
        fontFamily: "Deledda",
        fontWeight: 400,
        fontSize: "80px",
        lineHeight: "100%",
        letterSpacing: "0%",
      };
    } else {
      return {
        fontFamily: "Epilogue Semibold",
        fontWeight: 600,
        fontSize: "72px",
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
        fontSize: "70px",
        lineHeight: "100%",
        letterSpacing: "0%",
      };
    } else {
      return {
        fontFamily: "Epilogue Semibold",
        fontWeight: 600,
        fontSize: "64px",
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
        fontSize: "70px",
        lineHeight: "100%",
        letterSpacing: "0%",
      };
    } else {
      return {
        fontFamily: "Epilogue Bold",
        fontWeight: 700,
        fontSize: "64px",
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
        fontSize: "70px",
        lineHeight: "100%",
        letterSpacing: "0%",
      };
    } else {
      return {
        fontFamily: "Epilogue Semibold",
        fontWeight: 600,
        fontSize: "64px",
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
        fontSize: "70px",
        lineHeight: "100%",
        letterSpacing: "0%",
      };
    } else {
      return {
        fontFamily: "Epilogue Semibold",
        fontWeight: 600,
        fontSize: "64px",
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
        fontSize: "28px",
        letterSpacing: "0%",
        verticalAlign: "middle",
      };
    } else {
      return {
        fontFamily: "Roboto Regular",
        fontWeight: 400,
        fontSize: "36px",
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
    }
  }, [typePage, typedData]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const updateImagesCount = () => {
      setImagesCount(calculateImagesCount());
    };

    updateImagesCount();

    window.addEventListener("resize", updateImagesCount);

    const resizeObserver = new ResizeObserver(updateImagesCount);
    if (inPersonsImagesRef.current) {
      resizeObserver.observe(inPersonsImagesRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateImagesCount);
      resizeObserver.disconnect();
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
    if (isWhiteHovered) return;

    const timer = setInterval(() => {
      nextWhiteImage();
    }, 4000);

    return () => clearInterval(timer);
  }, [isWhiteHovered, currentWhiteImageIndex]);

  useEffect(() => {
    if (isCarouselHovered || carouselImages.length === 0) return;

    const timer = setInterval(() => {
      nextCarouselSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [isCarouselHovered, currentCarouselSlide, carouselImages]);

  const nextImage = () => {
    if (objectImages.length > 0 && !isAnimating) {
      setIsAnimating(true);
      setActiveBtn("right");
      setCurrentImageIndex((prev) =>
        prev === objectImages.length - 1 ? 0 : prev + 1
      );
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const prevImage = () => {
    if (objectImages.length > 0 && !isAnimating) {
      setIsAnimating(true);
      setActiveBtn("left");
      setCurrentImageIndex((prev) =>
        prev === 0 ? objectImages.length - 1 : prev - 1
      );
      setTimeout(() => setIsAnimating(false), 300);
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

  const nextCarouselSlide = () => {
    if (!isCarouselAnimating && carouselImages.length > 0) {
      setIsCarouselAnimating(true);
      setCurrentCarouselSlide((prev) =>
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
      setTimeout(() => setIsCarouselAnimating(false), 500);
    }
  };

  const prevCarouselSlide = () => {
    if (!isCarouselAnimating && carouselImages.length > 0) {
      setIsCarouselAnimating(true);
      setCurrentCarouselSlide((prev) =>
        prev === 0 ? carouselImages.length - 1 : prev - 1
      );
      setTimeout(() => setIsCarouselAnimating(false), 500);
    }
  };

  const goToCarouselSlide = (index: number) => {
    if (!isCarouselAnimating && index !== currentCarouselSlide && carouselImages.length > 0) {
      setIsCarouselAnimating(true);
      setCurrentCarouselSlide(index);
      setTimeout(() => setIsCarouselAnimating(false), 500);
    }
  };

  const handleCarouselClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    if (clickX < width / 3) {
      prevCarouselSlide();
    } else if (clickX > (width * 2) / 3) {
      nextCarouselSlide();
    }
  };

  const letterAnimation = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.8,
        ease: [0.1, 0.8, 0.2, 1] as const,
      },
    }),
  };

  const secondLineAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.1, 0.8, 0.2, 1] as const,
        delay: 0.3,
      },
    },
  };

  const fadeIn = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.42, 1, 0.66, 1] as const,
        delay: 0.8,
      },
    },
  };

  const titleContainerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.1, 0.8, 0.2, 1] as const,
        delay: 0.1,
      },
    },
  };

  const photoSlideInLeft = {
    hidden: {
      opacity: 0,
      x: "-100%",
      clipPath: "inset(0 0 0 100%)",
    },
    visible: {
      opacity: 1,
      x: 0,
      clipPath: "inset(0 0 0 0)",
      transition: {
        duration: 1.2,
        ease: [0.1, 0.8, 0.2, 1] as const,
        delay: 0.3,
      },
    },
  };

  const photoSlideInRight = {
    hidden: {
      opacity: 0,
      x: "100%",
      clipPath: "inset(0 100% 0 0)",
    },
    visible: {
      opacity: 1,
      x: 0,
      clipPath: "inset(0 0 0 0)",
      transition: {
        duration: 1.2,
        ease: [0.1, 0.8, 0.2, 1] as const,
        delay: 0.5,
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

  const handleWhiteImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    if (clickX < width / 3) {
      prevWhiteImage();
    } else if (clickX > (width * 2) / 3) {
      nextWhiteImage();
    }
  };

  const calculateImagesCount = () => {
    const container = inPersonsImagesRef.current;
    if (!container) return 0;

    const containerWidth = container.clientWidth;
    const imageWidth = 300;
    const gap = 16;

    const count = Math.ceil(containerWidth / (imageWidth + gap)) + 2;

    const rowElement = container.querySelector(
      `.${styles.inPersonsRow}`
    ) as HTMLElement;
    if (rowElement) {
      rowElement.style.setProperty("--images-count", count.toString());
    }

    return count;
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

  const renderInPersonImages = (startIndex = 0) => {
    if (imagesCount === 0) return null;

    return Array.from({ length: imagesCount }).map((_, index) => {
      const actualIndex = startIndex + index;
      const imageIndex = actualIndex % 2;
      const imageName = imageIndex === 0 ? 'image copy 10.png' : 'image copy 12.png';
      const imageSrc = new URL(
        `../assets/${imageName}`,
        import.meta.url
      ).href;
      
      return (
        <img
          key={actualIndex}
          src={imageSrc}
          alt={`Person ${actualIndex + 1}`}
          className={styles.inPersonImage}
          loading="lazy"
        />
      );
    });
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
    window.open("https://wa.me/48531050050", "_blank");
  };

  const handleInstagramClick = () => {
    window.open("https://www.instagram.com/meridian_company/", "_blank");
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
        <div className={`${styles.firstSection} ${typePage === "construction-services" ? styles.constructionSection1 : ""}`}>
          <Header scrollFunction={scrollToDown} />

          <div className={styles.headDescription}>
            <motion.div
              className={styles.titleH1}
              initial="hidden"
              animate="visible"
              variants={titleContainerAnimation}
            >
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
                      mainTitle.firstLine.length * 0.05 + 0.5
                    )}
                  </motion.span>
                )}
              </motion.h1>
            </motion.div>

            <div className={styles.descriptionTitle}>
              <motion.span initial="hidden" animate="visible" variants={fadeIn}>
                {typedData[typePage].description}
              </motion.span>
            </div>
          </div>

          <div className={styles.imagesContainer}>
            <div className={styles.imageContainer1}>
              {carouselImages.length > 1 ? (
                <div
                  className={styles.carouselWrapper}
                  onClick={handleCarouselClick}
                  onMouseEnter={() => setIsCarouselHovered(true)}
                  onMouseLeave={() => setIsCarouselHovered(false)}
                >
                  <div className={styles.carouselContainer}>
                    <div className={styles.carousel}>
                      {carouselImages.map((image: string, index: number) => (
                        <div
                          key={index}
                          className={`${styles.carouselSlide} ${
                            index === currentCarouselSlide ? styles.active : ""
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

                    <div
                      className={`${styles.carouselOverlay} ${
                        isCarouselHovered ? styles.visible : ""
                      }`}
                    >
                      <button
                        className={`${styles.carouselBtn} ${styles.carouselBtnPrev}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          prevCarouselSlide();
                        }}
                        disabled={isCarouselAnimating || carouselImages.length === 0}
                      >
                        ‹
                      </button>

                      <button
                        className={`${styles.carouselBtn} ${styles.carouselBtnNext}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          nextCarouselSlide();
                        }}
                        disabled={isCarouselAnimating || carouselImages.length === 0}
                      >
                        ›
                      </button>
                    </div>

                    <div className={styles.carouselDots}>
                      {carouselImages.map((_: string, index: number) => (
                        <button
                          key={index}
                          className={`${styles.dot} ${
                            index === currentCarouselSlide ? styles.activeDot : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            goToCarouselSlide(index);
                          }}
                          disabled={isCarouselAnimating}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : carouselImages.length === 1 ? (
                <img
                  src={carouselImages[0]}
                  alt="service"
                  loading="lazy"
                  className={styles.singleImage}
                />
              ) : (
                image1Src && (
                  <motion.img
                    src={image1Src}
                    alt="house"
                    loading="lazy"
                    initial="hidden"
                    animate="visible"
                    variants={photoSlideInLeft}
                  />
                )
              )}
            </div>

            <div className={styles.mixContainer2}>
              <div className={styles.imageContainer2}>
                {image2Src && (
                  <motion.img
                    src={image2Src}
                    alt="house"
                    loading="lazy"
                    initial="hidden"
                    animate="visible"
                    variants={photoSlideInRight}
                  />
                )}
              </div>
              <div className={styles.infoContainer}>
                <img src={ellipse} alt="Как мы работаем" />
                <span>{typedData[typePage].companyInfo}</span>
              </div>
            </div>
          </div>

          <div className={styles.selectServiceContainer}>
            <h1
              style={{
                marginBottom: !typedData[typePage].sectionDescription
                  ? "40px"
                  : "",
                ...getSectionTitleStyles(),
              }}
            >
              {typedData[typePage].sectionTitle}
            </h1>
            {typedData[typePage].sectionDescription && (
              <span>{typedData[typePage].sectionDescription}</span>
            )}
          </div>

          <div className={styles.servicesContainer}>
            {typedData[typePage].sectionItems.map(
              (item: ItemCardProps, index: number) => (
                <ServiceCard
                  key={index}
                  image={item.img}
                  title={item.title}
                  text={item.description}
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
                <div className={styles.btnsScrollImages}>
                  <button
                    className={styles.btnLeft}
                    onClick={prevImage}
                    disabled={isAnimating}
                    style={{
                      backgroundColor:
                        activeBtn === "left"
                          ? "rgba(211, 84, 0, 1)"
                          : "transparent",
                      border: activeBtn === "left" ? "none" : "",
                    }}
                  >
                    <img src={arrowLeft} alt="left" />
                  </button>
                  <button
                    className={styles.btnRight}
                    onClick={nextImage}
                    disabled={isAnimating}
                    style={{
                      backgroundColor:
                        activeBtn === "right"
                          ? "rgba(211, 84, 0, 1)"
                          : "transparent",
                      border: activeBtn === "right" ? "none" : "",
                    }}
                  >
                    <img src={arrowRight} alt="right" />
                  </button>
                </div>
              </div>
              <div className={styles.objectsImages}>
                <ImageCarousel
                  images={objectImages}
                  onNext={nextImage}
                  onPrev={prevImage}
                  currentIndex={currentImageIndex}
                />
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
                        duration: 0.8,
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
            <div className={styles.contactInfo}>
              <div className={styles.contactTitle}>
                <span>{typedData[typePage].whiteSectionDescription}</span>
              </div>

              <div className={styles.contactLinks}>
                <div className={styles.btnContainer}>
                  <button className={styles.blackBtn} onClick={scrollToDown}>
                    {language === "ru" ? "Позвонить сейчас" : "Zadzwoń teraz"}
                  </button>
                </div>
                <div className={styles.btnContainer}>
                  <button
                    className={styles.blackBtn}
                    onClick={handleContactClick}
                  >
                    {language === "ru" ? "Оставить заявку" : "ZŁÓŻ ZAPYTANIE"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.imageContainer}>
            {whiteContainerImages.length > 1 ? (
              <div
                className={styles.whiteCarouselContainer}
                onClick={handleWhiteImageClick}
                onMouseEnter={() => setIsWhiteHovered(true)}
                onMouseLeave={() => setIsWhiteHovered(false)}
              >
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

                <div
                  className={`${styles.whiteCarouselOverlay} ${
                    isWhiteHovered ? styles.visible : ""
                  }`}
                >
                  <button
                    className={`${styles.whiteCarouselBtn} ${styles.whiteCarouselBtnPrev}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      prevWhiteImage();
                    }}
                    disabled={isWhiteAnimating}
                  >
                    ‹
                  </button>

                  <button
                    className={`${styles.whiteCarouselBtn} ${styles.whiteCarouselBtnNext}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      nextWhiteImage();
                    }}
                    disabled={isWhiteAnimating}
                  >
                    ›
                  </button>
                </div>

                <div className={styles.whiteCarouselDots}>
                  {whiteContainerImages.map((_, index) => (
                    <button
                      key={index}
                      className={`${styles.whiteDot} ${
                        index === currentWhiteImageIndex
                          ? styles.activeWhiteDot
                          : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        goToWhiteSlide(index);
                      }}
                      disabled={isWhiteAnimating}
                    />
                  ))}
                </div>
              </div>
            ) : (
              whiteContainerImages.length === 1 && (
                <img
                  src={whiteContainerImages[0]}
                  alt="project"
                  loading="lazy"
                  className={styles.singleImage}
                />
              )
            )}
          </div>
        </div>

        <div className={`${styles.secondSection} ${typePage === "construction-services" ? styles.constructionSection2 : ""}`}>
          <div className={styles.headDescription}>
            <div className={styles.titleH1}>
              <h1 style={getWorkTitleStyles()}>
                {language === "ru" ? "Как мы работаем" : "Jak pracujemy"}
              </h1>
            </div>
            <span>{typedData[typePage].workSectionDescription}</span>
          </div>

          <div className={styles.tasksContainer}>
            <div className={styles.firstTasks}>
              <div ref={task1Ref} className={styles.firstTask}>
                <div className={styles.blackSection}>
                  <motion.div
                    className={styles.overlayBg}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isTask1InView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.2,
                      ease: "easeOut",
                    }}
                  ></motion.div>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={isTask1InView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.7,
                      delay: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    {typedData[typePage].workSectionItems[0].text}
                  </motion.span>
                </div>
                <motion.p
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={
                    isTask1InView ? { opacity: 1, scale: 1, rotate: 0 } : {}
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.1,
                    type: "spring",
                    stiffness: 120,
                  }}
                >
                  01
                </motion.p>
              </div>

              <div
                ref={task3Ref}
                className={`${styles.secondTask} ${styles.task}`}
              >
                <motion.p
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={
                    isTask3InView ? { opacity: 1, scale: 1, rotate: 0 } : {}
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.1,
                    type: "spring",
                    stiffness: 120,
                  }}
                >
                  03
                </motion.p>
                <div className={styles.blackSection}>
                  <motion.div
                    className={styles.overlayBg}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isTask3InView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.2,
                      ease: "easeOut",
                    }}
                  ></motion.div>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={isTask3InView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.7,
                      delay: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    {typedData[typePage].workSectionItems[1].text}
                  </motion.span>
                </div>
              </div>
            </div>

            <div className={styles.secondTasks}>
              <div ref={task2Ref} className={styles.firstTask}>
                <div className={styles.blackSection}>
                  <motion.div
                    className={styles.overlayBg}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isTask2InView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.2,
                      ease: "easeOut",
                    }}
                  ></motion.div>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={isTask2InView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.7,
                      delay: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    {typedData[typePage].workSectionItems[2].text}
                  </motion.span>
                </div>
                <motion.p
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={
                    isTask2InView ? { opacity: 1, scale: 1, rotate: 0 } : {}
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.1,
                    type: "spring",
                    stiffness: 120,
                  }}
                >
                  02
                </motion.p>
              </div>

              <div ref={task4Ref} className={styles.secondTask}>
                <motion.p
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={
                    isTask4InView ? { opacity: 1, scale: 1, rotate: 0 } : {}
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.1,
                    type: "spring",
                    stiffness: 120,
                  }}
                >
                  04
                </motion.p>
                <div className={styles.blackSection}>
                  <motion.div
                    className={styles.overlayBg}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isTask4InView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.2,
                      ease: "easeOut",
                    }}
                  ></motion.div>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={isTask4InView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.7,
                      delay: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    {typedData[typePage].workSectionItems[3].text}
                  </motion.span>
                </div>
              </div>
            </div>
          </div>

          {typePage === "construction-services" && (
            <>
              <div className={styles.qualitiesContainer}>
                <h1 style={getQualitiesTitleStyles()}>
                  {language === "ru"
                    ? "Почему выбирают нас"
                    : "Dlaczego wybierają nas"}
                </h1>
                <div className={styles.areaQualities}>
                  <motion.img
                    src={qualitiesImageSrc}
                    alt="room"
                    loading="lazy"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 1.2,
                      ease: [0.1, 0.8, 0.2, 1],
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                  />

                  <motion.div
                    className={styles.qualitiesList}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.3,
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
                                ease: [0.1, 0.8, 0.2, 1],
                              },
                            },
                          }}
                        >
                          <motion.div
                            className={styles.qualitiesItemId}
                            variants={{
                              hidden: { opacity: 0, scale: 0 },
                              visible: {
                                opacity: 1,
                                scale: 1,
                                transition: {
                                  duration: 0.5,
                                  type: "spring",
                                  stiffness: 100,
                                },
                              },
                            }}
                          >
                            <span>{item.id}</span>
                          </motion.div>
                          <div className={styles.qualitiesItemInfo}>
                            <motion.h2
                              style={getQualitiesItemTitleStyles()}
                              variants={{
                                hidden: { opacity: 0, x: -20 },
                                visible: {
                                  opacity: 1,
                                  x: 0,
                                  transition: {
                                    duration: 0.6,
                                    delay: 0.1,
                                    ease: [0.1, 0.8, 0.2, 1],
                                  },
                                },
                              }}
                            >
                              {item.title}
                            </motion.h2>
                            <motion.div
                              variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                  opacity: 1,
                                  transition: {
                                    duration: 0.8,
                                    delay: 0.2,
                                    ease: [0.1, 0.8, 0.2, 1],
                                  },
                                },
                              }}
                            >
                              <span>{item.text}</span>
                            </motion.div>
                          </div>
                        </motion.div>
                      )
                    )}
                  </motion.div>
                </div>
              </div>
            </>
          )}

          <div className={styles.inPersonsContainer}>
            <div className={styles.inPersonsHead}>
              <h1 style={getInPersonsTitleStyles()}>Meridian</h1>
              <span>{language === "ru" ? "В лицах" : "zespół"}</span>
            </div>

            <div ref={inPersonsImagesRef} className={styles.inPersonsImages}>
              <div className={styles.inPersonsRow}>
                {renderInPersonImages(0)}
                {renderInPersonImages(imagesCount)}
              </div>
            </div>
          </div>

          <div className={styles.sponsorsContainer}>
            {typedData[typePage].sponsors.map((item: any, index: number) => (
              <img
                key={index}
                src={getImageUrl(item.img)}
                alt="sponsor"
                loading="lazy"
              />
            ))}
          </div>

          <div ref={downRef} className={styles.contactInfoContainer}>
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

        <footer>
          <span>© MERIDIAN EU Sp. z o.o. NIP 7743247115</span>

          <div className={styles.social}>
            <img
              src={instagram}
              alt="instagram"
              onClick={handleInstagramClick}
              style={{ cursor: "pointer" }}
            />
            <img
              src={facebook}
              alt="facebook"
              onClick={handleFacebookClick}
              style={{ cursor: "pointer" }}
            />
            <img
              src={telegram}
              alt="telegram"
              onClick={handleTelegramClick}
              style={{ cursor: "pointer" }}
            />
            <img
              src={whatsapp}
              alt="whatsapp"
              onClick={handleWhatsAppClick}
              style={{ cursor: "pointer" }}
            />
            <img
              src={mail}
              alt="mail"
              onClick={handleEmailClick}
              style={{ cursor: "pointer" }}
            />
            <img
              src={phone}
              alt="phone number"
              onClick={handlePhoneClick}
              style={{ cursor: "pointer" }}
            />
          </div>

          <button className={styles.btnUp} onClick={scrollToUp}>
            <img src={btnUp} alt="Button Up" />
          </button>
        </footer>
      </div>
    </>
  );
};

export default ServicesPage;
