import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import 'firebase/firestore';
import {createBottomTabNavigator} from 'react-navigation';
import ClientHome from './screens/ClientHome';
import ClientPets from './screens/ClientPets';
import Icon from 'react-native-vector-icons/Ionicons';
import Settings from './screens/ClientSettings/screens';


export default createBottomTabNavigator({
  Home: { screen: ClientHome,
  // individual tab options
  navigationOptions: {
    tabBarLabel: 'Home',
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-home" color = {tintColor} size={24} />
    )
  }},
  Pets: { screen: ClientPets,
  // individual tab options
  navigationOptions: {
    tabBarLabel: 'Pets',
    tabBarIcon: ({tintColor}) => (
      <Icon name="md-paw" color = {tintColor} size={24} />
    )
  }},
  Settings: { screen: Settings,
  // individual tab options
  navigationOptions: {
    tabBarLabel: 'Settings',
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-settings" color = {tintColor} size={24} />
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
    activeTintColor:'white',
    //inactiveTintColor:'white',
    activeBackgroundColor: '#101d26',
    inactiveBackgroundColor: '#101d26',
  } 
}
);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
  }
});