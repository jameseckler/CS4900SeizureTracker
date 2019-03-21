import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import 'firebase/firestore';
import {createBottomTabNavigator} from 'react-navigation';
import ClientHome from './screens/ClientHome';
import ClientLogs from './screens/ClientLogs';
import ClientSettings from './screens/ClientSettings';
import Icon from 'react-native-vector-icons/Ionicons';


export default createBottomTabNavigator({
  Home: { screen: ClientHome,
  navigationOptions: {
    tabBarLabel: 'Home',
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-home" size={24} />
    )
  }},
  Logs: { screen: ClientLogs,
  navigationOptions: {
    tabBarLabel: 'Logs',
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-albums" size={24} />
    )
  }},
  Settings: { screen: ClientSettings,
  navigationOptions: {
    tabBarLabel: 'Settings',
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-settings" size={24} />
    )
  }}
});