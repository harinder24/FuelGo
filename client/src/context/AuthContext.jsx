/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { getUserData } from '../api/user';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
 const getStoredToken = () => {
  try {
    return JSON.parse(localStorage.getItem('token'));
  } catch {
    // Token was stored as raw string (not JSON.stringified), read it directly
    return localStorage.getItem('token') || null;
  }
};

const [token, setToken] = useState(getStoredToken);
  const [isLoading, setIsLoading] = useState(false)
 const updateUserData = async (userToken) => {
  if (!userToken) {
    localStorage.removeItem('token');
    setToken(null);   // ✅ explicit null, not undefined
    setUser(null);
    setLoading(false);
    return;
  }
  const crrUser = await getUserData(userToken);
  if (!crrUser.success) {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setLoading(false);
    return; // ✅ consider showing a "session expired" toast here
  }
  setToken(userToken);
  setUser(crrUser.data);
  setLoading(false);
  localStorage.setItem('token', JSON.stringify(userToken));
};
  useEffect(() => {
    if (!user) {
      if (localStorage.getItem('token')) {
        const raw = localStorage.getItem('token');
const tk = raw ? (raw.startsWith('"') ? JSON.parse(raw) : raw) : null;
        updateUserData(tk);
      } else {
        setLoading(false);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, updateUserData, loading ,isLoading,setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
