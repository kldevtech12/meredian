import { useEffect, useRef, useState } from "react";
import type React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Service from "../components/Service";
import LeaveRequest from "../components/LeaveRequest";
import data from "../data/index.json";
import instagram from "../assets/instagram.svg";
import telegram from "../assets/telegram.svg";
import whatsapp from "../assets/whatsapp.svg";
import mail from "../assets/mail.svg";
import phone from "../assets/phone.svg";
import ellipse from "../assets/ellipse.svg";
import btnUp from "../assets/btnUp.svg";
import styles from "./Home.module.css";
import { useAppContext } from "../contexts/AppContext";
import { useOptimizedImage } from "../hooks/useOptimizedImage";

const Home: React.FC = () => {
  const upRef = useRef<HTMLDivElement>(null);
  const downRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { language } = useAppContext();
  const currentData = (data as any)[language];

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 }
  };

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };


  const defaultTransition = {
    duration: 0.8,
    ease: [0.6, -0.05, 0.01, 0.99] as [number, number, number, number]
  };

  const { optimizedSrc: home1Src } = useOptimizedImage("image.png");
  const { optimizedSrc: home3Src } = useOptimizedImage("image copy.png");

  const getImageUrl = (imageName: string) => {
    return new URL(`../assets/${imageName}`, import.meta.url).href;
  };

  const carouselImages =
    currentData?.home?.carouselImages?.map((imageName: string) =>
      getImageUrl(imageName)
    ) || [];

  const getTitleStyles = () => {
    if (language === "ru") {
      return {
        fontFamily: "Deledda",
        fontWeight: 400,
        fontSize: "80px",
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

  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [isHovered]);

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

  const nextSlide = () => {
    if (!isAnimating && carouselImages.length > 0) {
      setIsAnimating(true);
      setCurrentSlide((prev) =>
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isAnimating && carouselImages.length > 0) {
      setIsAnimating(true);
      setCurrentSlide((prev) =>
        prev === 0 ? carouselImages.length - 1 : prev - 1
      );
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const goToSlide = (index: number) => {
    if (!isAnimating && index !== currentSlide && carouselImages.length > 0) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    if (clickX < width / 3) {
      prevSlide();
    } else if (clickX > (width * 2) / 3) {
      nextSlide();
    }
  };

  const handleContactClick = () => {
    setShowModal(true);
  };

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

  const handleTelegramClick = () => {
    window.open("https://t.me/account", "_blank");
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/48531050050", "_blank");
  };

  if (!currentData?.home) {
    return null;
  }

  return (
    <>
      {showModal && <LeaveRequest setShowModal={setShowModal} />}

      <div ref={upRef} className={styles.home}>
        <div className={styles.backgroundHome}>
          <Header scrollFunction={scrollToDown} />

          <section className={styles.section1}>
            <div className={styles.imgContainer1}>
              <img
                src={home1Src}
                alt="home"
                loading="lazy"
              />
            </div>

            <div className={styles.infoContainer}>
              <span>
                {currentData.home.title}
              </span>
            </div>

            <div className={styles.textInfo}>
              <h1
                style={getTitleStyles()}
              >
                {currentData.home.titleInfo}
              </h1>
              <div
                className={styles.descriptonInfo}
              >
                <p>{currentData.home.text}</p>
                <div className={styles.company}>
                  <img src={ellipse} alt="ellipse" loading="lazy" />
                  <span>{currentData.home.textCompany}</span>
                </div>
              </div>
            </div>

            <div className={styles.imgContainer2}>
              <div
                className={styles.imgHome}
                onClick={handleImageClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className={styles.carouselContainer}>
                  <div className={styles.carousel}>
                    {carouselImages.map((image: string, index: number) => (
                      <div
                        key={index}
                        className={`${styles.carouselSlide} ${
                          index === currentSlide ? styles.active : ""
                        }`}
                      >
                        <img
                          src={image}
                          alt={`home ${index + 1}`}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>

                  <div
                    className={`${styles.carouselOverlay} ${
                      isHovered ? styles.visible : ""
                    }`}
                  >
                    <button
                      className={`${styles.carouselBtn} ${styles.carouselBtnPrev}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        prevSlide();
                      }}
                      disabled={isAnimating || carouselImages.length === 0}
                    >
                      ‹
                    </button>

                    <button
                      className={`${styles.carouselBtn} ${styles.carouselBtnNext}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        nextSlide();
                      }}
                      disabled={isAnimating || carouselImages.length === 0}
                    >
                      ›
                    </button>
                  </div>

                  <div className={styles.carouselDots}>
                    {carouselImages.map((_: string, index: number) => (
                      <button
                        key={index}
                        className={`${styles.dot} ${
                          index === currentSlide ? styles.activeDot : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          goToSlide(index);
                        }}
                        disabled={isAnimating}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.contactInfoContainer}>
                <motion.span
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ ...defaultTransition, delay: 0.7 }}
                >
                  {currentData.home.contactInfoText}
                </motion.span>
                <motion.button
                  className={styles.contactBtn}
                  onClick={handleContactClick}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ ...defaultTransition, delay: 0.8 }}
                >
                  {currentData.home.contactInfoBtn}
                </motion.button>
              </div>
            </div>

            <div className={styles.line}></div>
          </section>
        </div>

        <section className={styles.section2}>
          <div className={styles.imgContainer}>
            <motion.img 
              src={home3Src} 
              alt="house" 
              loading="lazy"
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={defaultTransition}
            />
          </div>

          <div className={styles.services}>
            {currentData.services?.map((service: any, index: number) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ ...defaultTransition, delay: index * 0.1 }}
                className={styles.serviceWrapper}
              >
                <Service
                  title={service.title}
                  text={service.text}
                  link={service.link}
                />
              </motion.div>
            ))}
          </div>
        </section>

        <div className={styles.backgroundContactInfo}>
          <div ref={downRef} className={styles.contactInfoContainer}>
            <motion.div 
              className={styles.contacts}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={defaultTransition}
            >
              <span onClick={handlePhoneClick} style={{ cursor: "pointer" }}>
                +48 796 440 622
              </span>
              <span onClick={handleEmailClick} style={{ cursor: "pointer" }}>
                meridian.eu.office@gmail.com
              </span>
            </motion.div>

            <motion.span
              className={styles.addres}
              onClick={handleAddressClick}
              style={{ cursor: "pointer" }}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ ...defaultTransition, delay: 0.2 }}
            >
              ul. Synagogalna4, lok. 6 09-402 Płock, Polska
            </motion.span>
          </div>
        </div>

        <footer className={styles.footer}>
          <motion.span 
            className={styles.copyright}
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={defaultTransition}
          >
            © MERIDIAN EU Sp. z o.o. NIP 7743247115
          </motion.span>

          <div className={styles.social}>
            <motion.img
              src={instagram}
              alt="instagram"
              onClick={handleInstagramClick}
              style={{ cursor: "pointer" }}
              loading="lazy"
              variants={fadeInScale}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ ...defaultTransition, delay: 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            />
            <motion.img
              src={telegram}
              alt="telegram"
              onClick={handleTelegramClick}
              style={{ cursor: "pointer" }}
              loading="lazy"
              variants={fadeInScale}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ ...defaultTransition, delay: 0.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            />
            <motion.img
              src={whatsapp}
              alt="whatsapp"
              onClick={handleWhatsAppClick}
              style={{ cursor: "pointer" }}
              loading="lazy"
              variants={fadeInScale}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ ...defaultTransition, delay: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            />
            <motion.img
              src={mail}
              alt="mail"
              onClick={handleEmailClick}
              style={{ cursor: "pointer" }}
              loading="lazy"
              variants={fadeInScale}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ ...defaultTransition, delay: 0.4 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            />
            <motion.img
              src={phone}
              alt="phone number"
              onClick={handlePhoneClick}
              style={{ cursor: "pointer" }}
              loading="lazy"
              variants={fadeInScale}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ ...defaultTransition, delay: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            />
          </div>

          <motion.button 
            className={styles.btnUp} 
            onClick={scrollToUp}
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={defaultTransition}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={btnUp} alt="Button Up" loading="lazy" />
          </motion.button>
        </footer>
      </div>
    </>
  );
};

export default Home;
