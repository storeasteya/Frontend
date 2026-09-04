import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  picture?: string;
  provider: 'google' | 'email';
  token?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthModalOpen: boolean;
  isLoading: boolean;
  authError: string | null;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  clearAuthError: () => void;
  loginWithEmail: (email: string, password: string) => Promise<boolean>;
  registerWithEmail: (name: string, email: string, password: string) => Promise<boolean>;
  loginWithGoogleCredential: (credential: string) => Promise<void>;
  loginWithCustomUser: (userData: Partial<UserProfile>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'animeverse_user';
const API_BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3000/api';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const openAuthModal = () => {
    setAuthError(null);
    setIsAuthModalOpen(true);
  };
  
  const closeAuthModal = () => {
    setAuthError(null);
    setIsAuthModalOpen(false);
  };

  const clearAuthError = () => setAuthError(null);

  const loginWithEmail = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed. Please check your credentials.');
      }

      const loggedInUser: UserProfile = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        picture: data.user.picture,
        provider: 'email',
        token: data.token,
      };

      setUser(loggedInUser);
      setIsAuthModalOpen(false);
      return true;
    } catch (err: any) {
      setAuthError(err.message || 'An unexpected error occurred during sign in.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const registerWithEmail = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed. Please try again.');
      }

      const registeredUser: UserProfile = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        picture: data.user.picture,
        provider: 'email',
        token: data.token,
      };

      setUser(registeredUser);
      setIsAuthModalOpen(false);
      return true;
    } catch (err: any) {
      setAuthError(err.message || 'An unexpected error occurred during account creation.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogleCredential = async (credential: string) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      let decoded: any = {};
      try {
        decoded = jwtDecode(credential);
      } catch (e) {
        console.warn('JWT Decode warning:', e);
      }

      const email = decoded.email || 'googleuser@animeverse.com';
      const name = decoded.name || decoded.given_name || 'Anime Fan';
      const picture = decoded.picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`;

      try {
        const response = await fetch(`${API_BASE}/auth/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, picture, googleId: decoded.sub }),
        });
        const data = await response.json();
        if (response.ok && data.user) {
          setUser({
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            picture: data.user.picture,
            provider: 'google',
            token: data.token,
          });
          setIsAuthModalOpen(false);
          return;
        }
      } catch (err) {
        console.warn('Backend sync failed for Google auth, falling back to local session.');
      }

      // Local fallback
      setUser({
        id: decoded.sub || 'g-' + Date.now(),
        name,
        email,
        picture,
        provider: 'google',
      });
      setIsAuthModalOpen(false);
    } catch (err: any) {
      setAuthError('Google sign in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithCustomUser = (userData: Partial<UserProfile>) => {
    const newUser: UserProfile = {
      id: userData.id || 'u-' + Date.now(),
      name: userData.name || 'Anime Explorer',
      email: userData.email || 'user@animeverse.com',
      picture: userData.picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email || 'anime'}`,
      provider: userData.provider || 'google',
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthModalOpen,
        isLoading,
        authError,
        openAuthModal,
        closeAuthModal,
        clearAuthError,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogleCredential,
        loginWithCustomUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
