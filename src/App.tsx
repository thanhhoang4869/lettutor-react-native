import React, {useEffect, useState} from 'react';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
  useTheme,
} from 'react-native-paper';
import {ThemeProp} from 'react-native-paper/lib/typescript/src/types';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from 'screens/LoginScreen';
import SignupScreen from 'screens/SignupScreen';
import ForgetPasswordScreen from 'screens/ForgetPasswordScreen';
import MainLayout from 'components/MainLayout';
import SettingScreen from 'screens/SettingSccreen';
import HomeScreen from 'screens/HomeScreen';
import AccountVerifyScreen from 'screens/AccountVerifyScreen';
import TutorScreen from 'screens/TutorScreen';
import CourseScreen from 'screens/CourseScreen';
import AdvancedScreen from 'screens/AdvancedScreen';
import AccountScreen from 'screens/AccountScreen';
import BecomeTutorScreen from 'screens/BecomeTutorScreen';
import TutorProfileScreen from 'screens/TutorProfileScreen';
import BookingPickerScreen from 'screens/BookingPickerScreen';
import BookingHistoryScreen from 'screens/BookingHistoryScreen';
import CourseDetailScreen from 'screens/CourseDetailScreen';
import MessageScreen from 'screens/MessageScreen';
import TopicDetailScreen from 'screens/TopicDetailScreen';
import {ApplicationProvider} from 'context/ApplicationContext';
import {color} from 'style';

const theme: ThemeProp = {
  ...DefaultTheme,
  colors: {
    primary: color.primaryColor,
  },
};

export type AppTheme = typeof theme;
export const useAppTheme = () => useTheme<AppTheme>();

type RootStackParamList = {
  Signup: undefined;
  Login: undefined;
  ForgetPass: undefined;
  Main: undefined;
  Dummy: undefined;
  Home: undefined;
  AccVerify: undefined;
  Settings: undefined;
  Schedule: undefined;
  Tutor: undefined;
  Course: undefined;
  Advance: undefined;
  Account: undefined;
  BecomeTutor: undefined;
  TutorProfile: undefined;
  BookingPicker: undefined;
  BookingHistory: undefined;
  CourseDetail: undefined;
  TopicDetail: undefined;
  Message: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  const [language, setLanguage] = useState('en');
  const changeLanguage = (lang: string) => {
    setLanguage(lang);
  };
  return (
    <PaperProvider theme={theme}>
      <ApplicationProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="AccVerify" component={AccountVerifyScreen} />
            <Stack.Screen name="ForgetPass" component={ForgetPasswordScreen} />
            <Stack.Screen name="Main" component={MainLayout} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Tutor" component={TutorScreen} />
            <Stack.Screen name="Settings" component={SettingScreen} />
            <Stack.Screen name="Course" component={CourseScreen} />
            <Stack.Screen name="Advance" component={AdvancedScreen} />
            <Stack.Screen name="Account" component={AccountScreen} />
            <Stack.Screen name="BecomeTutor" component={BecomeTutorScreen} />
            <Stack.Screen name="TutorProfile" component={TutorProfileScreen} />
            <Stack.Screen
              name="BookingPicker"
              component={BookingPickerScreen}
            />
            <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
            <Stack.Screen
              name="BookingHistory"
              component={BookingHistoryScreen}
            />
            <Stack.Screen name="TopicDetail" component={TopicDetailScreen} />
            <Stack.Screen name="Message" component={MessageScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </PaperProvider>
  );
}
