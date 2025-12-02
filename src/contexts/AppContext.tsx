import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { AppContextType } from "../types/types";

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const getInitialLanguage = (): "ru" | "pl" => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("app-language") as "ru" | "pl";
      return savedLanguage || "ru";
    }
    return "ru";
  };

  const [language, setLanguage] = useState<"ru" | "pl">(getInitialLanguage);

  const changeLanguage = (newLanguage: "ru" | "pl") => {
    setLanguage(newLanguage);
    localStorage.setItem("app-language", newLanguage);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("app-language") as "ru" | "pl";
    if (savedLanguage && savedLanguage !== language) {
      setLanguage(savedLanguage);
    }
  }, []);

  const value: AppContextType = {
    language,
    changeLanguage
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};