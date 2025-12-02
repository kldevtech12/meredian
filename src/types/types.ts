export interface Service {
  title: string;
  text: string;
  link: string;
}

export interface ServicePageData {
  title: string;
  description: string;
  images: { name: string }[];
  sectionTitle: string;
  sectionDescription: string;
  sectionItems: {
    img: string;
    title: string;
    description: string;
  }[];
  whiteSectionTitle: string;
  whiteSectionDescription: string;
  workSectionDescription: string;
  workSectionItems: {
    id: string;
    text: string;
  }[];
  sponsors: { img: string }[];
}

export interface ConstructionPageData {
  title: string;
  description: string;
  images: { name: string }[];
  sectionTitle: string;
  sectionItems: {
    img: string;
    title: string;
    description: string;
  }[];
  objectTitle: string;
  objectImages: { name: string }[];
  whiteSectionTitle: string;
  whiteSectionDescription: string;
  workSectionDescription: string;
  workSectionItems: {
    id: string;
    text: string;
  }[];
  qualitiesImage: string;
  qualitiesItems: {
    id: string;
    title: string;
    text: string;
  }[];
  sponsors: { img: string }[];
}

export interface HeaderNavigationItem {
  title: string;
  services: string[];
}

export interface HeaderData {
  navigation: HeaderNavigationItem[];
}

export interface HeaderMobileData {
  title: string;
  navigation: HeaderNavigationItem[];
}

export interface HomeData {
  title: string;
  titleInfo: string;
  text: string;
  textCompany: string;
  contactInfoText: string;
  contactInfoBtn: string;
}

export interface HomeMobileData {
  title: string[];
  text: string;
  contactBtn: string;
}

export interface LeaveRequestsData {
  titleForm: string;
  labelName: string;
  labelPhone: string;
  checkboxTitle: string;
  checkboxItems: string[];
  sumbitBtn: string;
  titleFormSumbit: string;
  textFormSumbit: string;
  redirectBtn: string;
  errorText: string;
}

export interface LanguageData {
  header: HeaderData;
  headerMobile: HeaderMobileData;
  home: HomeData;
  homeMobile: HomeMobileData;
  leaveRequests: LeaveRequestsData;
  services: Service[];
  "realty-services": ServicePageData;
  "design-services": ServicePageData;
  "repair-services": ServicePageData;
  "construction-services": ConstructionPageData;
}

export interface AppContextType {
  language: "ru" | "pl";
  changeLanguage: (language: "ru" | "pl") => void;
}

export interface AppData {
  ru: LanguageData;
  pl: Partial<LanguageData>;
}

export type ServicePageType = keyof Omit<LanguageData, 'services' | 'header' | 'headerMobile' | 'home' | 'homeMobile' | 'leaveRequests'>;