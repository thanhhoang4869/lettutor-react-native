/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';

import HomeScreen from 'screens/HomeScreen';
import SettingScreen from 'screens/SettingSccreen';
import MessageScreen from 'screens/MessageScreen';
import UpcomingScreen from 'screens/UpcomingScreen';
import TutorScreen from 'screens/TutorScreen';

const Tab = createBottomTabNavigator();

export default function MainLayout() {
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
            case 'Message':
              iconName = focused
                ? 'message-processing'
                : 'message-processing-outline';
              iconType = 'material-community';

              break;
            case 'Upcoming':
              iconName = focused
                ? 'clock-time-eight'
                : 'clock-time-eight-outline';
              iconType = 'material-community';

              break;
            case 'Tutor':
              iconName = focused ? 'account-tie' : 'account-tie-outline';
              iconType = 'material-community';

              break;
            case 'Settings':
              iconName = 'settings';
              iconType = 'material-icons';

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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Message" component={MessageScreen} />
      <Tab.Screen name="Upcoming" component={UpcomingScreen} />
      <Tab.Screen name="Tutor" component={TutorScreen} />
      <Tab.Screen name="Settings" component={SettingScreen} />
    </Tab.Navigator>
  );
}
