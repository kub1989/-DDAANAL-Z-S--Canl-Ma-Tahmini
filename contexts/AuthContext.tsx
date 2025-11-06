import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithGoogle: () => void;
  logout: () => void;
  isGoogleLoginOpen: boolean;
  handleLogin: (email: string) => void;
  closeGoogleLoginModal: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const ADMIN_EMAIL = 'ktarikulu@gmail.com';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGoogleLoginOpen, setIsGoogleLoginOpen] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Kullanıcı verisi okunurken hata oluştu", error);
      localStorage.removeItem('user');
    }
    setLoading(false);
  }, []);

  const handleLogin = (email: string) => {
    setLoading(true);
    const role = email.toLowerCase() === ADMIN_EMAIL ? 'admin' : 'user';
    const newUser: User = { email, role };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    setIsGoogleLoginOpen(false); // Modalı kapat
    setLoading(false);
  };

  const loginWithGoogle = () => {
    // Gerçek bir Firebase entegrasyonunda, burada Google'ın popup'ı açılır.
    // Simülasyon için sadece modalı açıyoruz.
    setIsGoogleLoginOpen(true);
  };

  const closeGoogleLoginModal = () => {
    setIsGoogleLoginOpen(false);
  }

  const logout = () => {
    setLoading(true);
    localStorage.removeItem('user');
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout, isGoogleLoginOpen, handleLogin, closeGoogleLoginModal }}>
      {children}
    </AuthContext.Provider>
  );
};