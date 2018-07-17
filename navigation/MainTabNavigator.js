import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PrayerScreen from '../screens/PrayerScreen';
import DuaDetailScreen from  '../screens/DuaDetailScreen';
import CollectionScreen from  '../screens/CollectionScreen';
import WebviewScreen from '../screens/WebviewScreen';
import EventsScreen from '../screens/EventsScreen';
import SermonsScreen from '../screens/SermonsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
  Pray: PrayerScreen,
  Collection: CollectionScreen,
  Detail: DuaDetailScreen,
  Webview: WebviewScreen,
  Events: EventsScreen,
  Sermons: SermonsScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Browse',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

const PrayStack = createStackNavigator({
  Pray: PrayerScreen,
});

PrayStack.navigationOptions = {
  tabBarLabel: 'Prayer',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'md-timer'}
    />
   ),
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  PrayStack,
  SettingsStack,
});
