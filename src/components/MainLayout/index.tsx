/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {Icon} from 'react-native-elements';

import CourseScreen from 'screens/CourseScreen';
import HomeScreen from 'screens/HomeScreen';
import TutorScreen from 'screens/TutorScreen';
import UpcomingScreen from 'screens/ScheduleScreen';
import MessageScreen from 'screens/MessageScreen';
import {useTranslation} from 'react-i18next';

const Tab = createBottomTabNavigator();

export default function MainLayout() {
  const {t} = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let iconType;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              iconType = focused ? 'ionicons' : 'material-community';
              break;

            case 'Tutor':
              iconName = focused ? 'account-tie' : 'account-tie-outline';
              iconType = 'material-community';

              break;
            case 'Course':
              iconName = focused ? 'graduation-cap' : 'graduation';
              iconType = focused ? 'entypo' : 'simple-line-icon';

              break;
            case 'Schedule':
              iconName = focused
                ? 'clock-time-eight'
                : 'clock-time-eight-outline';
              iconType = 'material-community';

              break;
            case 'Message':
              iconName = focused
                ? 'message-processing'
                : 'message-processing-outline';
              iconType = 'material-community';

              break;
            default:
              iconName = 'home';
              iconType = 'ionicons';
          }

          return (
            <Icon
              name={iconName || 'home'}
              size={size}
              color={color}
              type={iconType || 'ionicons'}
            />
          );
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: t('navigator.home')!,
        }}
      />
      <Tab.Screen
        options={{
          title: t('navigator.tutor')!,
        }}
        name="Tutor"
        component={TutorScreen}
      />
      <Tab.Screen
        options={{
          title: t('navigator.schedule')!,
        }}
        name="Schedule"
        component={UpcomingScreen}
      />
      <Tab.Screen
        options={{
          title: t('navigator.message')!,
        }}
        name="Message"
        component={MessageScreen}
      />
      <Tab.Screen
        options={{
          title: t('navigator.course')!,
        }}
        name="Course"
        component={CourseScreen}
      />
    </Tab.Navigator>
  );
}
