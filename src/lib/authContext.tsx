import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  picture?: string;
  provider: 'google' | 'email';
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  loginWithGoogleCredential: (credential: string) => void;
  loginWithCustomUser: (userData: Partial<UserProfile>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'animeverse_user';

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

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const loginWithGoogleCredential = (credential: string) => {
    try {
      const decoded: any = jwtDecode(credential);
      const googleUser: UserProfile = {
        id: decoded.sub || 'g-' + Date.now(),
        name: decoded.name || decoded.given_name || 'Anime Fan',
        email: decoded.email,
        picture: decoded.picture,
        provider: 'google',
      };
      setUser(googleUser);
      setIsAuthModalOpen(false);
    } catch (err) {
      console.error('Failed to decode Google Credential', err);
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
        openAuthModal,
        closeAuthModal,
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
