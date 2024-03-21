/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { getUserData } from '../api/user';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  
  const crrFrame =
    'https://res.cloudinary.com/dnqglmely/image/upload/fuel-frames/purchasable-frames/law8watuyahmnsfnw1ru.jpg';
  const crrImg =
    'https://res.cloudinary.com/dnqglmely/image/upload/fuel-avatars/purchasable-avatars/kaqnmqi6bdlocrrqhktt.jpg';
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));
  const updateUserData = async (userToken) => {
    if (!userToken) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      setToken();
      setUser();

      return;
    }
    const crrUser = await getUserData(userToken);

    setToken(userToken);
    setUser(crrUser);

    localStorage.setItem('token', JSON.stringify(userToken));
    // localStorage.setItem('user', JSON.stringify(crrUser));
  };
  useEffect(()=>{
    if(!user){
      if(localStorage.getItem("token")){
        const tk = JSON.parse(localStorage.getItem("token"))
        updateUserData(tk)
      }
    }
  },[])

  return (
    <AuthContext.Provider
      value={{ user, token, updateUserData, crrFrame, crrImg }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
