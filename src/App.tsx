import React, {Component, useState} from 'react';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
  useTheme,
} from 'react-native-paper';
import {ThemeProp} from 'react-native-paper/lib/typescript/types';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from 'screens/LoginScreen';
import SignupScreen from 'screens/SignupScreen';
import ForgetPasswordScreen from 'screens/ForgetPasswordScreen';
import MainScreen from 'screens/MainScreen/index';
import DummyScreen from 'screens/DummyScreen';
import HomeScreen from 'screens/HomeScreen';
import AccountVerifyScreen from 'screens/AccountVerifyScreen';
import StartingScreen from 'screens/StartingScreen';

const theme: ThemeProp = {
  ...DefaultTheme,
  colors: {
    primary: '#1677ff',
  },
};
export type AppTheme = typeof theme;
export const useAppTheme = () => useTheme<AppTheme>();

type RootStackParamList = {
  Start: undefined;
  Signup: undefined;
  Login: undefined;
  ForgetPass: undefined;
  Main: undefined;
  Dummy: undefined;
  Home: undefined;
  AccVerify: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  // const [language, setLanguage] = useState('en');

  // const changeLanguage = (lang: string) => {
  //   setLanguage(lang);
  // };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Start">
          <Stack.Screen name="Start" component={StartingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="AccVerify" component={AccountVerifyScreen} />
          <Stack.Screen name="ForgetPass" component={ForgetPasswordScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Dummy" component={DummyScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
