import { useState } from "react";
import { Link } from "react-router";
import LeaveRequest from "./LeaveRequest";
import data from "../data/index.json";
import styles from "./HeaderMobile.module.css";
import { useAppContext } from "../contexts/AppContext";

interface HeaderProps {
  scrollFunction: () => void;
}

const HeaderMobile: React.FC<HeaderProps> = ({ scrollFunction }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState<boolean>(false);
  const [isServicesOpen, setIsServicesOpen] = useState<boolean>(false);
  
  const { language, changeLanguage } = useAppContext();

  const currentData = (data as any)[language]?.headerMobile;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsLanguageOpen(false);
    setIsServicesOpen(false);
  };

  const toggleLanguage = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  const handleLanguageSelect = (selectedLanguage: "ru" | "pl") => {
    changeLanguage(selectedLanguage);
    setIsLanguageOpen(false);
  };

  const handleContactClick = () => {
    scrollFunction();
    closeMenu();
  };

  const handleLeaveRequest = () => {
    setShowModal(true);
    closeMenu();
  };

  if (!currentData) {
    return null;
  }

  return (
    <>
      {showModal && <LeaveRequest setShowModal={setShowModal} />}
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link to={"/"}><h1>MERIDIAN</h1></Link>
        </div>

        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label="Открыть меню"
        >
          <div className={styles.hamburger}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <div
          className={`${styles.mobileMenu} ${isMenuOpen ? styles.active : ""}`}
        >
          <div className={styles.menuHeader}>
            <h2 className={styles.menuTitle}>
              <div className={styles.hamburgerIcon}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              {currentData.title}
            </h2>
            <button
              className={styles.closeButton}
              onClick={closeMenu}
              aria-label="Закрыть меню"
            >
              ×
            </button>
          </div>

          <div className={styles.menuContent}>
            <nav className={styles.navigation}>
              <div className={styles.servicesDropdown}>
                <button
                  className={styles.servicesButton}
                  onClick={toggleServices}
                >
                  {currentData.navigation[0].title}
                  <span
                    className={`${styles.arrow} ${
                      isServicesOpen ? styles.arrowUp : ""
                    }`}
                  >
                    ˅
                  </span>
                </button>
                {isServicesOpen && (
                  <div className={styles.servicesList}>
                    <Link
                      to="/realty-services"
                      onClick={closeMenu}
                      className={styles.serviceLink}
                    >
                      {currentData.navigation[0].services[0]}
                    </Link>
                    <Link
                      to="/design-services"
                      onClick={closeMenu}
                      className={styles.serviceLink}
                    >
                      {currentData.navigation[0].services[1]}
                    </Link>
                    <Link
                      to="/repair-services"
                      onClick={closeMenu}
                      className={styles.serviceLink}
                    >
                      {currentData.navigation[0].services[2]}
                    </Link>
                    <Link
                      to="/construction-services"
                      onClick={closeMenu}
                      className={styles.serviceLink}
                    >
                      {currentData.navigation[0].services[3]}
                    </Link>
                  </div>
                )}
              </div>

              <button onClick={handleContactClick} className={styles.navLink}>
                {currentData.navigation[1].title}
              </button>

              <button onClick={handleLeaveRequest} className={styles.navLink}>
                {currentData.navigation[2].title}
              </button>

              <button onClick={handleContactClick} className={styles.navLink}>
                {currentData.navigation[3].title}
              </button>

              <Link to="/" onClick={closeMenu} className={styles.navLink}>
                {currentData.navigation[4].title}
              </Link>
            </nav>

            <div className={styles.languageSelector} onClick={toggleLanguage}>
              <div className={styles.languageDropdown}>
                <div className={styles.languageButton}>
                  {language.toUpperCase()}
                  <span
                    className={`${styles.arrow} ${
                      isLanguageOpen ? styles.arrowUp : ""
                    }`}
                  >
                    ˅
                  </span>
                </div>
                {isLanguageOpen && (
                  <div className={styles.languageList}>
                    <div
                      className={styles.languageOption}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLanguageSelect("ru");
                      }}
                    >
                      RU
                    </div>
                    <div className={styles.languageLine}></div>
                    <div
                      className={styles.languageOption}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLanguageSelect("pl");
                      }}
                    >
                      PL
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {isMenuOpen && <div className={styles.overlay} onClick={closeMenu} />}
      </header>
    </>
  );
};

export default HeaderMobile;