import { createBrowserRouter, Navigate } from "react-router";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Cart from "./pages/Cart";
import TrackOrder from "./pages/TrackOrder";
import { RootLayout } from "./components/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "cart", Component: Cart },
      { path: "track", Component: TrackOrder },
      { path: "shop", element: <Navigate to="/" replace /> },
      { path: "about", element: <Navigate to="/" replace /> },
      { path: "admin-login", Component: AdminLogin },
      { path: "admin", Component: Admin },
    ],
  },
]);
