import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Support from "./pages/Support";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Cart from "./pages/Cart";
import TrackOrder from "./pages/TrackOrder";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import RefundShippingPolicy from "./pages/RefundShippingPolicy";
import NotFound from "./pages/NotFound";
import { RootLayout } from "./components/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "shop", Component: Shop },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "support", Component: Support },
      { path: "cart", Component: Cart },
      { path: "track", Component: TrackOrder },
      { path: "privacy", Component: PrivacyPolicy },
      { path: "terms", Component: TermsOfService },
      { path: "shipping-policy", Component: RefundShippingPolicy },
      { path: "admin-login", Component: AdminLogin },
      { path: "admin/login", Component: AdminLogin },
      { path: "admin", Component: Admin },
      { path: "*", Component: NotFound },
    ],
  },
]);
