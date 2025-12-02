import App from "./App";
import { withResponsive } from "../utils/responsiveComponent";

import Home from "./Home";
import RealtyServices from "./RealtyServices";
import DesignServices from "./DesignServices";
import RepairServices from "./RepairServices";
import ConstructionServices from "./ConstructionServices";
import TermsOfServices from "./TermsOfServices";

import HomeMobile from "./HomeMobile";
import RealtyServicesMobile from "./RealtyServicesMobile";
import DesignServicesMobile from "./DesignServicesMobile";
import RepairServicesMobile from "./RepairServicesMobile";
import ConstructionServicesMobile from "./ConstructionServicesMobile";
import TermsOfServicesMobile from "./TermsOfServicesMobile";

import ErrorPage from "./ErrorPage";
import ErrorPageMobile from "./ErrorPageMobile";

const ResponsiveHome = withResponsive(Home, HomeMobile);
const ResponsiveErrorPage = withResponsive(ErrorPage, ErrorPageMobile);
const ResponsiveRealtyServices = withResponsive(RealtyServices, RealtyServicesMobile);
const ResponsiveDesignServices = withResponsive(DesignServices, DesignServicesMobile);
const ResponsiveRepairServices = withResponsive(RepairServices, RepairServicesMobile);
const ResponsiveConstructionServices = withResponsive(ConstructionServices, ConstructionServicesMobile);
const ResponsiveTermsOfServices = withResponsive(TermsOfServices, TermsOfServicesMobile);

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ResponsiveErrorPage />,
    children: [
      {
        path: "/",
        element: <ResponsiveHome />
      },
      {
        path: "/realty-services",
        element: <ResponsiveRealtyServices />
      },
      {
        path: "/design-services",
        element: <ResponsiveDesignServices />
      },
      {
        path: "/repair-services",
        element: <ResponsiveRepairServices />
      },
      {
        path: "/construction-services",
        element: <ResponsiveConstructionServices />
      },
      {
        path: "/terms-of-services",
        element: <ResponsiveTermsOfServices />
      }
    ]
  }
]

export default routes;