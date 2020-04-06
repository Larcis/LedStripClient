import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ModeScreen from '../screens/ModesScreen';
import PlayerScreen from '../screens/PlayerScreen';
import PitchScreen from '../screens/PitchScreen';
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
       <BottomTab.Screen
        name="Player"
        component={PlayerScreen}
        options={{
          title: 'Müzik Çal',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-musical-notes" />,
        }}
      />
      <BottomTab.Screen
        name="Pitcher"
        component={PitchScreen}
        options={{
          title: 'Etrafı Dinle',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-mic" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

