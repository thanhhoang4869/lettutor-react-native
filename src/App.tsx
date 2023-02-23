import React from 'react';
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
import MainLayout from 'components/MainLayout';
import SettingScreen from 'screens/SettingSccreen';
import HomeScreen from 'screens/HomeScreen';
import AccountVerifyScreen from 'screens/AccountVerifyScreen';
import StartingScreen from 'screens/StartingScreen';
import UpcomingScreen from 'screens/UpcomingScreen';
import MessageScreen from 'screens/MessageScreen';
import TutorScreen from 'screens/TutorScreen';
import CourseScreen from 'screens/CourseScreen';

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
  Settings: undefined;
  Message: undefined;
  Upcoming: undefined;
  Tutor: undefined;
  Course: undefined;
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
          initialRouteName="Main">
          <Stack.Screen name="Start" component={StartingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="AccVerify" component={AccountVerifyScreen} />
          <Stack.Screen name="ForgetPass" component={ForgetPasswordScreen} />
          <Stack.Screen name="Main" component={MainLayout} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Message" component={MessageScreen} />
          <Stack.Screen name="Upcoming" component={UpcomingScreen} />
          <Stack.Screen name="Tutor" component={TutorScreen} />
          <Stack.Screen name="Settings" component={SettingScreen} />
          <Stack.Screen name="Course" component={CourseScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
