import { useRef, useState, useEffect } from "react";
import type React from "react";
import instagram from "../assets/instagram.svg";
import telegram from "../assets/telegram.svg";
import whatsapp from "../assets/whatsapp.svg";
import mail from "../assets/mail.svg";
import phone from "../assets/phone.svg";
import btnUp from "../assets/btnUp.svg";
import error from "../assets/404.svg";
import styles from "./ErrorPageMobile.module.css";
import { Link } from "react-router";

const ErrorPageMobile: React.FC = () => {
  const upRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToUp = () => {
    upRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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

  return (
    <>
      <div ref={upRef} className={styles.errorContainer}>
        <div className={styles.error}>
          <img src={error} alt="404" loading="lazy" />

          <div className={styles.redirect}>
            <h1>Этой страницы не существует</h1>
            <span>Похоже, вы зашли не туда. Вернёмся на главную?</span>
            <Link to={"/"}>
              <button>Вернитесь на главную</button>
            </Link>
          </div>
        </div>

        <div className={styles.contactInfo}>
          <div className={styles.contacts}>
            <span onClick={handlePhoneClick} style={{ cursor: "pointer" }}>
              +48 796 440 622
            </span>
            <span onClick={handleEmailClick} style={{ cursor: "pointer" }}>
              meridian.eu.office@gmail.com
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

export default ErrorPageMobile;