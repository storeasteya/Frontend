import { createBrowserRouter, Navigate } from "react-router";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import { RootLayout } from "./components/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "shop", element: <Navigate to="/" replace /> },
      { path: "about", element: <Navigate to="/" replace /> },
      { path: "admin/login", Component: AdminLogin },
      { path: "admin", Component: Admin },
    ],
  },
]);
