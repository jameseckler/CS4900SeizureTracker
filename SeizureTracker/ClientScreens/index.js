import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import 'firebase/firestore';
import {createBottomTabNavigator} from 'react-navigation';
import ClientHome from './screens/ClientHome';
import ClientPets from './screens/ClientPets';
import ClientSettings from './screens/ClientSettings';
import Icon from 'react-native-vector-icons/Ionicons';

export default createBottomTabNavigator({
  Home: { screen: ClientHome,
  // individual tab options
  navigationOptions: {
    tabBarLabel: 'Home',
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-home" size={24} />
    )
  }},
  Pets: { screen: ClientPets,
  // individual tab options
  navigationOptions: {
    tabBarLabel: 'Pets',
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-albums" size={24} />
    )
  }},
  Settings: { screen: ClientSettings,
  // individual tab options
  navigationOptions: {
    tabBarLabel: 'Settings',
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-settings" size={24} />
    )
  }}
}, {//routerconfig
  initialRouteName: 'Home',
  order: ['Home', 'Pets', 'Settings'],
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