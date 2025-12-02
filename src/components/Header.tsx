import { useState } from "react";
import { Link } from "react-router";
import LeaveRequest from "./LeaveRequest";
import data from "../data/index.json";
import arrow from "../assets/arrow-down.svg";
import styles from "./Header.module.css";
import { useAppContext } from "../contexts/AppContext";
import type { AppData } from "../types/types";

interface HeaderProps {
  scrollFunction: () => void;
}

const Header: React.FC<HeaderProps> = ({ scrollFunction }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showLanguageMenu, setShowLanguageMenu] = useState<boolean>(false);
  
  const { language, changeLanguage } = useAppContext();

  const appData = data as AppData;
  const currentData = appData[language];
  const displayLanguage = language.toUpperCase();

  const handleDropdownEnter = (dropdownName: string) => {
    setActiveDropdown(dropdownName);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const handleLinkClick = () => {
    setActiveDropdown(null);
  };

  const handleLanguageSelect = (selectedLanguage: "ru" | "pl") => {
    changeLanguage(selectedLanguage);
    setShowLanguageMenu(false);
  };

  const toggleLanguageMenu = () => {
    setShowLanguageMenu(!showLanguageMenu);
  };

  const handlePhoneClick = () => {
    window.open("https://wa.me/48796440622", "_blank");
  };

  if (!currentData?.header?.navigation) {
    return null;
  }

  return (
    <>
      {showModal && <LeaveRequest setShowModal={setShowModal} />}
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link to={"/"}><h1>Meridian</h1></Link>
        </div>

        <nav className={styles.navigation}>
          <div
            className={styles.navItem}
            onMouseEnter={() => handleDropdownEnter("services")}
            onMouseLeave={handleDropdownLeave}
          >
            <Link to={"#"} className={styles.navLink}>
              {currentData.header.navigation[0].title}
              <img
                src={arrow}
                alt="arrow"
                className={`${styles.arrow} ${
                  activeDropdown === "services" ? styles.rotated : ""
                }`}
              />
            </Link>
            {activeDropdown === "services" && (
              <div className={styles.dropdownMenu}>
                <Link to={"/realty-services"} onClick={handleLinkClick}>
                  {currentData.header.navigation[0].services[0]}
                </Link>
                <Link to={"/design-services"} onClick={handleLinkClick}>
                  {currentData.header.navigation[0].services[1]}
                </Link>
                <Link to={"/repair-services"} onClick={handleLinkClick}>
                  {currentData.header.navigation[0].services[2]}
                </Link>
                <Link to={"/construction-services"} onClick={handleLinkClick}>
                  {currentData.header.navigation[0].services[3]}
                </Link>
              </div>
            )}
          </div>

          <Link to={"#"} onClick={scrollFunction}>
            {currentData.header.navigation[1].title}
          </Link>

          <Link
            to={"#"}
            onClick={() => {
              setShowModal(true);
            }}
          >
            {currentData.header.navigation[2].title}
          </Link>

          <Link to={"#"} onClick={scrollFunction}>
            {currentData.header.navigation[3].title}
          </Link>

          <Link to={"/"}>{currentData.header.navigation[4].title}</Link>
        </nav>

        <div className={styles.contact}>
          <span 
            onClick={handlePhoneClick} 
            style={{ cursor: "pointer" }}
          >
            +48-796-440-622
          </span>
          <div className={styles.languageContainer}>
            <span 
              className={styles.languageMenu}
              onClick={toggleLanguageMenu}
            >
              {displayLanguage}
              <img 
                src={arrow} 
                alt="arrow" 
                className={`${styles.arrow} ${
                  showLanguageMenu ? styles.rotated : ""
                }`}
              />
            </span>
            {showLanguageMenu && (
              <div className={styles.languageDropdown}>
                <button
                  className={`${styles.languageOption} ${
                    language === "ru" ? styles.active : ""
                  }`}
                  onClick={() => handleLanguageSelect("ru")}
                >
                  RU
                </button>
                <button
                  className={`${styles.languageOption} ${
                    language === "pl" ? styles.active : ""
                  }`}
                  onClick={() => handleLanguageSelect("pl")}
                >
                  PL
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;