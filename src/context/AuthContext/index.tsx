import React, {useEffect} from 'react';
import {useState} from 'react';

import storageService from 'services/storageService';

export const AuthContext = React.createContext({
  login: async (token: string, user: any) => {},
  logout: async () => {},
  isLogin: false,
  account: {},
});

export const AuthProvider = ({children}: any) => {
  const [isLogin, setIsLogin] = useState(
    storageService.getString('access_token') !== undefined,
  );
  const [account, setAccount] = useState({});

  const storeAccount = async (user: any) => {
    await storageService.storeObject('user', user);
    setAccount(user);
  };

  const login = async (token: string, user: any) => {
    await storeAccount(user);
    await storageService.storeString('access_token', token);
    setIsLogin(true);
  };

  const logout = async () => {
    await storageService.removeItem('access_token');
    await storageService.removeItem('user');
    setIsLogin(false);
    setAccount({});
  };

  useEffect(() => {
    console.log('AuthContext');
  }, [isLogin]);

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        account,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
