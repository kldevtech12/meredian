import type React from "react";
import data from "../data/index.json";
import close from "../assets/close.svg";
import checkbox from "../assets/checkbox.svg";
import styles from "./LeaveRequest.module.css";
import { useState, useEffect } from "react";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

interface LeaveRequestProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeaveRequest: React.FC<LeaveRequestProps> = ({ setShowModal }) => {
  const [errors, setErrors] = useState<{ services?: string; privacy?: string }>(
    {}
  );
  const [request, setRequest] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const { language } = useAppContext();
  const navigate = useNavigate();

  const currentData = (data as any)[language]?.leaveRequests;

  useEffect(() => {
    const savedPrivacyAccepted = getCookie("privacyAccepted");
    if (savedPrivacyAccepted === "true") {
      setPrivacyAccepted(true);
    }
  }, []);

  const setCookie = (name: string, value: string, days: number = 365) => {
    const expires = new Date(
      Date.now() + days * 24 * 60 * 60 * 1000
    ).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
  };

  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  };

  const getTitleStyles = () => {
    if (language === "ru") {
      return {
        fontFamily: "Deledda",
        fontWeight: 600,
        fontSize: "20px",
        lineHeight: "120%",
        letterSpacing: "0px",
      };
    } else {
      return {
        fontFamily: "Epilogue Bold",
        fontWeight: 600,
        fontSize: "26px",
        lineHeight: "120%",
        letterSpacing: "0px",
      };
    }
  };

  const getLabelStyles = () => {
    if (language === "ru") {
      return {
        fontFamily: "Roboto Regular",
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "16px",
        letterSpacing: "0%",
      };
    } else {
      return {
        fontFamily: "Roboto Regular",
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "16px",
        letterSpacing: "0%",
      };
    }
  };

  const getTextStyles = () => {
    if (language === "ru") {
      return {
        fontFamily: "Roboto Regular",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "20px",
        letterSpacing: "0%",
      };
    } else {
      return {
        fontFamily: "Roboto Regular",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "20px",
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

  const getSuccessTextStyles = () => {
    if (language === "ru") {
      return {
        fontFamily: "Roboto Regular",
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "120%",
        letterSpacing: "0%",
      };
    } else {
      return {
        fontFamily: "Roboto Regular",
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "120%",
        letterSpacing: "0%",
      };
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleRedirect = () => {
    setShowModal(false);
    navigate("/");
  };

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setPrivacyAccepted(isChecked);
    setCookie("privacyAccepted", isChecked.toString());
  };

  const handlePrivacyClick = () => {
    setShowModal(false);
    navigate("/terms-of-services");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const services = formData.getAll("services");

    const newErrors: { services?: string; privacy?: string } = {};

    if (services.length === 0) {
      newErrors.services =
        currentData?.errorText || "Пожалуйста, выберите хотя бы одну услугу";
    }

    if (!privacyAccepted) {
      newErrors.privacy =
        currentData?.privacyError ||
        "Необходимо принять политику конфиденциальности";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/meridian.group.server@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            services: formData.getAll("services"),
            privacyAccepted: privacyAccepted,
            _subject: "Новая заявка с сайта",
            _captcha: "false",
          }),
        }
      );

      if (response.ok) {
        setRequest(true);
      } else {
        console.error("Ошибка отправки формы");
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  if (!currentData) {
    return null;
  }

  return (
    <>
      {request ? (
        <div className={styles.modalWindow}>
          <div className={styles.window}>
            <div className={styles.formHeading}>
              <img src={checkbox} alt="" />
              <h1
                style={{
                  paddingLeft: "16px",
                  ...getTitleStyles(),
                }}
              >
                {currentData.titleFormSumbit}
              </h1>
              <img
                src={close}
                alt="close"
                className={styles.closeBtn}
                onClick={handleClose}
              />
            </div>
            <div className={styles.successMessage}>
              <p style={getSuccessTextStyles()}>{currentData.textFormSumbit}</p>
              <button onClick={handleRedirect} style={getButtonStyles()}>
                {currentData.redirectBtn}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.modalWindow}>
            <div className={styles.window}>
              <div className={styles.formHeading}>
                <h1 style={getTitleStyles()}>{currentData.titleForm}</h1>
                <img
                  src={close}
                  alt="close"
                  className={styles.closeBtn}
                  onClick={handleClose}
                />
              </div>

              <form onSubmit={handleSubmit}>
                <input type="hidden" name="_captcha" value="false" />
                <input
                  type="hidden"
                  name="_subject"
                  value="Новая заявка с сайта"
                />

                <div className={styles.inputLabel}>
                  <label htmlFor="name" style={getLabelStyles()}>
                    {currentData.labelName}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder={currentData.labelName}
                    required
                    style={getTextStyles()}
                  />
                </div>

                <div className={styles.inputLabel}>
                  <label htmlFor="email" style={getLabelStyles()}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    style={getTextStyles()}
                  />
                </div>

                <div className={styles.inputLabel}>
                  <label htmlFor="phone" style={getLabelStyles()}>
                    {currentData.labelPhone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+48___-__-__"
                    required
                    style={getTextStyles()}
                  />
                </div>

                <fieldset
                  className={`${styles.typeServices} ${
                    errors.services ? styles.error : ""
                  }`}
                  aria-required="true"
                  aria-describedby={
                    errors.services ? "services-error" : undefined
                  }
                >
                  <legend style={getLabelStyles()}>
                    {currentData.checkboxTitle}
                  </legend>

                  {errors.services && (
                    <span
                      id="services-error"
                      className={styles.errorText}
                      style={getTextStyles()}
                    >
                      {errors.services}
                    </span>
                  )}

                  <div className={styles.checkboxItem}>
                    <label
                      htmlFor="realty-services"
                      className={styles.checkboxLabel}
                      style={getTextStyles()}
                    >
                      <input
                        type="checkbox"
                        id="realty-services"
                        name="services"
                        value="realty"
                        className={styles.checkboxInput}
                      />
                      <span className={styles.checkmark}></span>
                      {currentData.checkboxItems[0]}
                    </label>
                  </div>

                  <div className={styles.checkboxItem}>
                    <label
                      htmlFor="design-services"
                      className={styles.checkboxLabel}
                      style={getTextStyles()}
                    >
                      <input
                        type="checkbox"
                        id="design-services"
                        name="services"
                        value="design"
                        className={styles.checkboxInput}
                      />
                      <span className={styles.checkmark}></span>
                      {currentData.checkboxItems[1]}
                    </label>
                  </div>

                  <div className={styles.checkboxItem}>
                    <label
                      htmlFor="repair-services"
                      className={styles.checkboxLabel}
                      style={getTextStyles()}
                    >
                      <input
                        type="checkbox"
                        id="repair-services"
                        name="services"
                        value="repair"
                        className={styles.checkboxInput}
                      />
                      <span className={styles.checkmark}></span>
                      {currentData.checkboxItems[2]}
                    </label>
                  </div>

                  <div className={styles.checkboxItem}>
                    <label
                      htmlFor="construction-services"
                      className={styles.checkboxLabel}
                      style={getTextStyles()}
                    >
                      <input
                        type="checkbox"
                        id="construction-services"
                        name="services"
                        value="construction"
                        className={styles.checkboxInput}
                      />
                      <span className={styles.checkmark}></span>
                      {currentData.checkboxItems[3]}
                    </label>
                  </div>
                </fieldset>

                <div
                  className={`${styles.privacyCheckbox} ${
                    errors.privacy ? styles.error : ""
                  }`}
                >
                  <label
                    className={styles.checkboxLabel}
                    style={getTextStyles()}
                  >
                    <input
                      type="checkbox"
                      checked={privacyAccepted}
                      onChange={handlePrivacyChange}
                      className={styles.checkboxInput}
                    />
                    <span className={styles.checkmark}></span>
                    <span className={styles.privacyText}>
                      {language === "ru"
                        ? "Подтверждаю, что ознакомилась/ся с "
                        : "Oświadczam, że zapoznałam/em się z "}
                      <span
                        className={styles.privacyLink}
                        onClick={handlePrivacyClick}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            handlePrivacyClick();
                          }
                        }}
                      >
                        {language === "ru"
                          ? "политикой обработки личных данных"
                          : "informacjami dotyczącymi przetwarzania danych osobowych"}
                      </span>
                    </span>
                  </label>
                  {errors.privacy && (
                    <span className={styles.errorText} style={getTextStyles()}>
                      {errors.privacy}
                    </span>
                  )}
                </div>

                <button type="submit" style={getButtonStyles()}>
                  {currentData.sumbitBtn}
                </button>
              </form>
            </div>
          </div>
        </>
      )}

      <div className={styles.background}></div>
    </>
  );
};

export default LeaveRequest;
