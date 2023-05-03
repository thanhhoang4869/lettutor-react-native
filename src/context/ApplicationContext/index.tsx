/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import specialtiesService from 'services/specialtiesService';

import storageService from 'services/storageService';

export const ApplicationContext = React.createContext({
  login: async (token: any, user: any) => {},
  logout: async () => {},
  checkToken: async (): Promise<any> => {},
  setAccount: (account: any) => {},
  isLogin: false,
  account: {} as any,
  specialties: [],
  specialtiesNoMajor: [],
  learnTopics: [],
  testPreps: [],
});

export const ApplicationProvider = ({children}: any) => {
  const [isLogin, setIsLogin] = useState(
    storageService.getString('access_token') !== undefined,
  );
  const [account, setAccount] = useState<any>({});
  const [specialties, setSpecialties] = useState([]);
  const [specialtiesNoMajor, setSpecialtiesNoMajor] = useState([]); // [LearnTopic, TestPrep
  const [learnTopics, setLearnTopics] = useState([]);
  const [testPreps, setTestPreps] = useState([]);

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
    const majorRes = await specialtiesService.fetchMajors();

    setLearnTopics(learnTopicsRes.data);
    setTestPreps(testPrepsRes.data);

    const newlearnTopics = learnTopicsRes.data;
    const newtestPreps = testPrepsRes.data;
    const majors = majorRes.data;

    const specialtiesNoMajorResult = newlearnTopics.concat(newtestPreps);

    setSpecialtiesNoMajor(specialtiesNoMajorResult);

    const specialtiesResult = newlearnTopics
      .concat(newtestPreps)
      .concat(majors);

    setSpecialties(specialtiesResult);
  };

  const getAccount = async () => {
    const user = await storageService.getObject('user');
    setAccount(user);
    getSpecialties();
  };

  useEffect(() => {
    getAccount();
  }, [isLogin]);

  return (
    <ApplicationContext.Provider
      value={{
        isLogin,
        account,
        specialties,
        learnTopics,
        testPreps,
        specialtiesNoMajor,
        login,
        logout,
        checkToken,
        setAccount,
      }}>
      {children}
    </ApplicationContext.Provider>
  );
};
