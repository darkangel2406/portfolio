import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, setAuthToken, getAuthToken } from '../services/api';

const AuthContext = createContext(null);

const GUEST_CREATOR = {
  id: 'guest-creator',
  name: 'Portfolio Creator',
  email: 'creator@folioview.local',
  isPremium: true
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(GUEST_CREATOR);
  const [isPremium, setIsPremium] = useState(true);
  const [loading, setLoading] = useState(false);

  const initAuth = async () => {
    const token = getAuthToken();
    if (!token) {
      setUser(GUEST_CREATOR);
      setIsPremium(true);
      setLoading(false);
      return;
    }

    try {
      const res = await api.getMe();
      setUser(res.user);
      setIsPremium(Boolean(res.user?.isPremium));
    } catch (err) {
      console.warn('Session expired or guest mode, using guest creator:', err.message);
      setAuthToken(null);
      setUser(GUEST_CREATOR);
      setIsPremium(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await api.login({ email, password });
    setAuthToken(res.token);
    setUser(res.user);
    setIsPremium(Boolean(res.user?.isPremium));
    return res.user;
  };

  const register = async (email, password, name) => {
    const res = await api.register({ email, password, name });
    setAuthToken(res.token);
    setUser(res.user);
    setIsPremium(Boolean(res.user?.isPremium));
    return res.user;
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    setIsPremium(false);
  };

  const refreshUser = async () => {
    try {
      const res = await api.getMe();
      setUser(res.user);
      setIsPremium(Boolean(res.user?.isPremium));
    } catch (err) {
      console.error('Error refreshing user:', err);
    }
  };

  const unlockPremium = () => {
    setIsPremium(true);
    if (user) {
      setUser({ ...user, isPremium: true });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isPremium,
        loading,
        login,
        register,
        logout,
        refreshUser,
        unlockPremium
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
