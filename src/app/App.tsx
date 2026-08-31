import { RouterProvider } from "react-router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { router } from "./routes";
import { CartProvider } from "../lib/cartContext";
import { AuthProvider } from "../lib/authContext";
import { AuthModal } from "./components/AuthModal";
import { GlowingCursor } from "./components/GlowingCursor";

const GOOGLE_CLIENT_ID = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID || "1057492847591-demo-animeverse-google-auth.apps.googleusercontent.com";

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <CartProvider>
          <GlowingCursor />
          <RouterProvider router={router} />
          <AuthModal />
        </CartProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
