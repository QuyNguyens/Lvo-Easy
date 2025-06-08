// src/contexts/AuthContext.tsx
import { createContext, useContext, useState } from 'react';
import { UserProfile } from '../types/user';

interface AuthContextType {
  user: UserProfile;
  setUser: (user: UserProfile) => void;
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
    const [user, setUserState] = useState<UserProfile | null>(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          return JSON.parse(storedUser) as UserProfile;
        } catch {
          return null;
        }
      }
      return null;
    });

  const setUser = (user: UserProfile) => {
    setUserState(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const clearUser = () => {
    setUserState(null);
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
  };


  return { user, setUser, clearUser };
};
