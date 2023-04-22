import React, {useEffect, useState} from 'react';

import storageService from 'services/storageService';

export const AuthContext = React.createContext({
  login: async (token: any, user: any) => {},
  logout: async () => {},
  checkToken: async (): Promise<any> => {},
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

  const login = async (token: any, user: any) => {
    await storeAccount(user);
    await storageService.storeObject('access_token', token);
    setIsLogin(true);
  };

  const logout = async () => {
    await storageService.removeItem('access_token');
    await storageService.removeItem('user');
    setIsLogin(false);
    setAccount({});
  };

  const checkToken = async (): Promise<boolean> => {
    const access_token = await storageService.getObject('access_token');
    if (access_token) {
      const expires = new Date(access_token.expires).getTime();
      const now = new Date().getTime();
      if (now < expires) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
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
        checkToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
