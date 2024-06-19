/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { getUserData } from '../api/user';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));
  const [isLoading, setIsLoading] = useState(false)
  const updateUserData = async (userToken) => {
    if (!userToken) {
      localStorage.removeItem('token');
      setToken();
      setUser();
      setLoading(false);
      return;
    }
    const crrUser = await getUserData(userToken);
    if(!crrUser.success){
      localStorage.removeItem('token');
      setToken();
      setUser();
      setLoading(false);
      return;
    }
    setToken(userToken);
    setUser(crrUser.data);
    setLoading(false);

    localStorage.setItem('token', JSON.stringify(userToken));
  };
  useEffect(() => {
    if (!user) {
      if (localStorage.getItem('token')) {
        const tk = JSON.parse(localStorage.getItem('token'));
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
