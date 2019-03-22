import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import 'firebase/firestore';
import {createBottomTabNavigator} from 'react-navigation';
import VetHome from './screens/VetHome';
import VetClients from './screens/VetClients';
import VetSettings from './screens/VetSettings';
import Icon from 'react-native-vector-icons/Ionicons';

export default createBottomTabNavigator({
  Home: { screen: VetHome,
  // individual tab options
  navigationOptions: {
    tabBarLabel: 'Home',
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-home" size={24} />
    )
  }},
  Clients: { screen: VetClients,
  // individual tab options
  navigationOptions: {
    tabBarLabel: 'Clients',
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-albums" size={24} />
    )
  }},
  Settings: { screen: VetSettings,
  // individual tab options
  navigationOptions: {
    tabBarLabel: 'Settings',
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-settings" size={24} />
    )
  }}
}, {//routerconfig
  initialRouteName: 'Home',
  order: ['Home', 'Clients', 'Settings'],
  //navigation options for complete tab navigator
  navigationOptions: {
    tabBarVisible: true
  },
  tabBarOptions:{
    style: {
      //backgroundColor: 'blue',
    }
  } 
}
);

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  }
});