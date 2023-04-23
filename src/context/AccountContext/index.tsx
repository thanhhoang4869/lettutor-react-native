/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import specialtiesService from 'services/specialtiesService';

import storageService from 'services/storageService';

export const AccountContext = React.createContext({
  login: async (token: any, user: any) => {},
  logout: async () => {},
  checkToken: async (): Promise<any> => {},
  isLogin: false,
  account: {},
  specialties: [],
});

export const AccountProvider = ({children}: any) => {
  const [isLogin, setIsLogin] = useState(
    storageService.getString('access_token') !== undefined,
  );
  const [account, setAccount] = useState({});
  const [specialties, setSpecialties] = useState([]);

  const login = async (token: any, user: any) => {
    await storageService.storeObject('access_token', token);
    await storageService.storeObject('user', user);
    setIsLogin(true);
    setAccount(user);
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

  const getSpecialties = async () => {
    if (!isLogin) {
      return;
    }

    const learnTopicsRes = await specialtiesService.fetchLearnTopics();
    const testPrepsRes = await specialtiesService.fetchTestPreps();

    const learnTopics = learnTopicsRes.data;
    const testPreps = testPrepsRes.data;

    const specialtiesResult = learnTopics.concat(testPreps);

    setSpecialties(specialtiesResult);
  };

  useEffect(() => {
    getSpecialties();
  }, [isLogin]);

  return (
    <AccountContext.Provider
      value={{
        isLogin,
        account,
        specialties,
        login,
        logout,
        checkToken,
      }}>
      {children}
    </AccountContext.Provider>
  );
};
