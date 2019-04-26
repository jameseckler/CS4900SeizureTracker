import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import 'firebase/firestore';
import {createBottomTabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Settings from './screens/ClientSettings/screens';
import {createStackNavigator} from 'react-navigation';
import MyPets from './screens/VetHome/screens/MyPets';
import MyClients from './screens/VetHome/screens/MyClients';
import Notifications from './screens/VetHome/screens/Notifications';
import Info from '../ClientScreens/screens/ClientHome/screens/Info';
import VetHome from './screens/VetHome/';
import CreateLog from './screens/VetHome/screens/CreateLog';
import ViewLogs from './screens/VetHome/screens/ViewLogs';
import {w, h, totalSize} from "../FirebaseLogin/api/Dimensions";
import AddClient from './screens/VetHome/screens/MyClients/AddClient';
import ClientInfo from './screens/VetHome/screens/MyClients/ClientInfo';
import PetInfo from '../ClientScreens/screens/ClientHome/screens/MyPets/screens/PetInfo';
import ClientSearch from './screens/VetHome';

const VetStackNavigator = createStackNavigator({
  VetHome:{
    screen: VetHome,
    navigationOptions: () => ({
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#101d26'
      },
      title: 'Home',
      headerLayoutPreset: 'center',
      }),
  },
  MyPets:{
    screen: MyPets,
    navigationOptions: () => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#101d26'
    },
    title: 'My Pets',
    headerLayoutPreset: 'center',
    }),
  },
  MyClients:{
    screen: MyClients,
    navigationOptions: () => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#101d26'
    },
    title: 'My Clients',
    headerLayoutPreset: 'center',
    }),
  },
  Notifications:{
    screen: Notifications,
    navigationOptions: () => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#101d26'
    },
    title: 'Client Calendar',
    headerLayoutPreset: 'center',
    }),
  },
  Info:{
    screen: Info,
    navigationOptions: () => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#101d26'
    },
    title: 'Epilepsy Information',
    headerLayoutPreset: 'center',
    }),
  },
  CreateLog:{
    screen: CreateLog,
    navigationOptions: () => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#101d26'
    },
    title: 'Log An Event ',
    headerLayoutPreset: 'center',
    }),
  },
  ViewLogs:{
    screen: ViewLogs,
    navigationOptions: () => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#101d26'
    },
    title: 'Log List',
    headerLayoutPreset: 'center',
    }),
  },
  AddClient:{
    screen: AddClient,
    navigationOptions: () => ({
      headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#101d26'
    },
    title: 'Add Client',
    headerLayoutPreset: 'center',
    })
  },
  ClientInfo:{
    screen: ClientInfo,
    navigationOptions: () => ({
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#101d26'
      },
      title: 'Client Info',
      headerLayoutPreset: 'center',
    }),
  },
  PetInfo:{
    screen: PetInfo,
    navigationOptions: () => ({
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#101d26'
      },
      title: 'Pet Info',
      headerLayoutPreset: 'center',
    }),
  },
  ClientSearch:{
    screen: ClientSearch,
    navigationOptions: () => ({
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#101d26'
      },
      title: 'Client Search',
      headerLayoutPreset: 'center',
    }),
  },
});

const ClientStackNavigator = createStackNavigator({
  MyPets:{
    screen: MyClients,
    navigationOptions: () => ({
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#101d26'
      },
      title: 'Client List',
      headerLayoutPreset: 'center',
      }),
  },
});

export default createBottomTabNavigator({
  VetStackNavigator: { screen: VetStackNavigator,
    // individual tab options
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) => (
        <Icon name="ios-home" color = {tintColor} size={24} />
      )
  }},
  ClientStackNavigator: { screen: ClientStackNavigator,
    // individual tab options
    navigationOptions: {
      tabBarLabel: 'Clients',
      tabBarIcon: ({tintColor}) => (
        <Icon name="ios-people" color = {tintColor} size={24} />
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
  initialRouteName: 'VetStackNavigator',
  order: ['VetStackNavigator', 'ClientStackNavigator', 'Settings'],
  //navigation options for complete tab navigator
  navigationOptions: {
    tabBarVisible: true
  },
  // all tab options
  tabBarOptions:{
    activeTintColor:'white',
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