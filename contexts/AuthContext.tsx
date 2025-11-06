import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithGoogle: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const ADMIN_EMAIL = 'ktarikulu@gmail.com';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
  };

  const loginWithGoogle = () => {
    // Bu, gerçek Google ile Giriş akışını simüle eder.
    // Gerçek bir Firebase entegrasyonunda, burada Google'ın popup'ı açılır.
    const email = window.prompt("Simülasyon için Google e-postanızı girin:", "ktarikulu@gmail.com");
    if (email) {
      handleLogin(email);
    }
  };

  const logout = () => {
    setLoading(true);
    localStorage.removeItem('user');
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
