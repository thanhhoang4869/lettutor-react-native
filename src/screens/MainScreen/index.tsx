/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from 'screens/HomeScreen';
import DummyScreen from 'screens/DummyScreen';
import {Icon} from 'react-native-elements';

const Tab = createBottomTabNavigator();

export default function MainScreen() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Dummy') {
            iconName = focused ? 'account' : 'account-outline';
          }

          return (
            <Icon
              name={iconName || 'home'}
              size={size}
              color={color}
              type="material-community"
            />
          );
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Dummy" component={DummyScreen} />
    </Tab.Navigator>
  );
}
