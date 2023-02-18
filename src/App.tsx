import React, {Component} from 'react';
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

const theme: ThemeProp = {
  ...DefaultTheme,
  colors: {
    primary: '#1677ff',
  },
};
export type AppTheme = typeof theme;
export const useAppTheme = () => useTheme<AppTheme>();

type RootStackParamList = {
  Signup: undefined;
  Login: undefined;
  ForgetPass: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="ForgetPass" component={ForgetPasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
