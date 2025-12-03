import { useRef, useEffect } from "react";
import type React from "react";
import instagram from "../assets/instagram.svg";
import facebook from "../assets/facebook.svg";
import telegram from "../assets/telegram.svg";
import whatsapp from "../assets/whatsapp.svg";
import mail from "../assets/mail.svg";
import phone from "../assets/phone.svg";
import btnUp from "../assets/btnUp.svg";
import error from "../assets/404.svg";
import styles from "./ErrorPage.module.css";
import { Link } from "react-router";
import { useAppContext } from "../contexts/AppContext";
import data from "../data/index.json";

const ErrorPage: React.FC = () => {
  const upRef = useRef<HTMLDivElement>(null);
  const { language } = useAppContext();

  const currentData = (data as any)[language]?.errorPage;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getTitleStyles = () => {
    if (language === "ru") {
      return {
        fontFamily: "Deledda",
        fontWeight: 400,
        fontSize: "24px",
        lineHeight: "120%",
        letterSpacing: "0%",
      };
    } else {
      return {
        fontFamily: "Epilogue Semibold",
        fontWeight: 600,
        fontSize: "22px",
        lineHeight: "120%",
        letterSpacing: "0%",
      };
    }
  };

  const getTextStyles = () => {
    if (language === "ru") {
      return {
        fontFamily: "Roboto Regular",
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "130%",
        letterSpacing: "0%",
      };
    } else {
      return {
        fontFamily: "Roboto Regular",
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "130%",
        letterSpacing: "0%",
      };
    }
  };

  const getButtonStyles = () => {
    if (language === "ru") {
      return {
        fontFamily: "Roboto Regular",
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "40px",
        letterSpacing: "0%",
      };
    } else {
      return {
        fontFamily: "Roboto Regular",
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "40px",
        letterSpacing: "0%",
      };
    }
  };

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

  if (!currentData) {
    return null;
  }

  return (
    <>
      <div ref={upRef} className={styles.errorContainer}>
        <div className={styles.error}>
          <img src={error} alt="404" loading="lazy" />

          <div className={styles.redirect}>
            <h1 style={getTitleStyles()}>{currentData.title}</h1>
            <span style={getTextStyles()}>{currentData.description}</span>
            <Link to={"/"}>
              <button style={getButtonStyles()}>{currentData.button}</button>
            </Link>
          </div>
        </div>

        <div className={styles.contactInfoContainer}>
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

        <footer className={styles.footer}>
          <span className={styles.copyright}>© MERIDIAN EU Sp. z o.o. NIP 7743247115</span>

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

          <button className={styles.btnUp} onClick={scrollToUp}>
            <img src={btnUp} alt="Button Up" loading="lazy" />
          </button>
        </footer>
      </div>
    </>
  );
};

export default ErrorPage;