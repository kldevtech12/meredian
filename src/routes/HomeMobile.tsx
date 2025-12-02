import { useEffect, useRef, useState } from "react";
import type React from "react";
import { motion } from "framer-motion";
import HeaderMobile from "../components/HeaderMobile";
import { ServiceMobile } from "../components/Service";
import data from "../data/index.json";
import instagram from "../assets/instagram.svg";
import telegram from "../assets/telegram.svg";
import whatsapp from "../assets/whatsapp.svg";
import mail from "../assets/mail.svg";
import phone from "../assets/phone.svg";
import btnUp from "../assets/btnUp.svg";
import styles from "./HomeMobile.module.css";
import LeaveRequest from "../components/LeaveRequest";
import { useAppContext } from "../contexts/AppContext";

const HomeMobile: React.FC = () => {
  const upRef = useRef<HTMLDivElement>(null);
  const downRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { language } = useAppContext();
  const currentData = (data as any)[language];

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };


  const defaultTransition = {
    duration: 0.6,
    ease: [0.6, -0.05, 0.01, 0.99] as [number, number, number, number]
  };

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
        fontSize: "28px",
        lineHeight: "110.00000000000001%",
        letterSpacing: "0%",
      };
    } else {
      return {
        fontFamily: "Epilogue Semibold",
        fontStyle: "SemiBold",
        fontWeight: 600,
        fontSize: "26px",
        lineHeight: "120%",
        letterSpacing: "0%",
      };
    }
  };

  useEffect(() => {
    document.body.classList.add("background");

    return () => {
      document.body.classList.remove("background");
    };
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
    window.location.href = "tel:+48531050050";
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

  if (!currentData?.homeMobile || !currentData?.services) {
    return null;
  }

  return (
    <>
      {showModal && <LeaveRequest setShowModal={setShowModal} />}

      <div ref={upRef} className={styles.home}>
        <div className={styles.backgroundHome}>
          <HeaderMobile scrollFunction={scrollToDown} />

          <section className={styles.section1}>
            <div className={styles.textInfo}>
              <motion.h1 
                style={getTitleStyles()}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={defaultTransition}
              >
                {currentData.homeMobile.title[0]}{" "}
                <span
                  style={{
                    color: "rgba(211, 84, 0, 1)",
                  }}
                >
                  {currentData.homeMobile.title[1]}
                </span>{" "}
                {currentData.homeMobile.title[2]}
              </motion.h1>
            </div>

            <div className={styles.imgContainer2}>
              <div
                className={styles.imgHome}
                onClick={handleImageClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <motion.div 
                  className={styles.carouselContainer}
                  variants={fadeInScale}
                  initial="hidden"
                  animate="visible"
                  transition={{ ...defaultTransition, delay: 0.2 }}
                >
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
                </motion.div>
              </div>

              <div className={styles.contactInfoContainer}>
                <motion.p
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ ...defaultTransition, delay: 0.3 }}
                >
                  {currentData.homeMobile.text}
                </motion.p>
                <motion.button
                  className={styles.contactBtn}
                  onClick={handleContactClick}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ ...defaultTransition, delay: 0.4 }}
                >
                  {currentData.homeMobile.contactBtn}
                </motion.button>
              </div>
            </div>
          </section>
        </div>

        <section className={styles.section2}>
          <div className={styles.servicesHorizontalScroll}>
            {currentData.services.map((service: any, index: number) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ ...defaultTransition, delay: index * 0.1 }}
              >
                <ServiceMobile
                  title={service.title}
                  text={service.text}
                  link={service.link}
                />
              </motion.div>
            ))}
          </div>
        </section>

        <div className={styles.backgroundContactInfo}>
          <div ref={downRef} className={styles.contactInfo}>
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
            className={styles.footerText}
            variants={fadeInUp}
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
            className={`${styles.btnUp} ${
              showScrollTop ? styles.show : styles.hide
            }`}
            onClick={scrollToUp}
            variants={fadeInUp}
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

export default HomeMobile;
