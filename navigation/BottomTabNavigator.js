import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ModeScreen from '../screens/ModesScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Renk Seç',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-color-palette" />,
        }}
      />
      <BottomTab.Screen
        name="Mode"
        component={ModeScreen}
        options={{
          title: 'Mod Seç',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-aperture" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

