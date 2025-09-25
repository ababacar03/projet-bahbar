import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  userId: string | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
};

type JwtPayload = {
    id: string,
    email: string,
    role: string
  };

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const isAuthenticated = !!token;

  const decodeAndSetUserId = (jwt: string) => {
    try {
      const decoded = jwtDecode<JwtPayload>(jwt);
      setUserId(decoded.id || null);
    } catch (error) {
      console.error('Erreur de décodage JWT:', error);
      setUserId(null);
    }
  };

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('userToken');
      if (storedToken) {
        setToken(storedToken);
        decodeAndSetUserId(storedToken);
      }
    };
    loadToken();
  }, []);

  const login = async (newToken: string) => {
    await AsyncStorage.setItem('userToken', newToken);
    setToken(newToken);
    decodeAndSetUserId(newToken);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    setToken(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};