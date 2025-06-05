// src/contexts/AuthContext.tsx
import { createContext, useContext, useState } from 'react';

interface AuthContextType {
  userId: string | null;
  email: string | null;
  setUser: (id: string, name: string) => void;
  clearUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = AuthContext.Provider;

export const createAuthValue = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const setUser = (id: string, name: string) => {
    setUserId(id);
    setEmail(name);
  };

  const clearUser = () => {
    setUserId(null);
    setEmail(null);
  };

  return { userId, email, setUser, clearUser };
};
