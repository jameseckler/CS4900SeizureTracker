import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import 'firebase/firestore';
import {createBottomTabNavigator} from 'react-navigation';
import ClientPets from './screens/ClientPets';
import Icon from 'react-native-vector-icons/Ionicons';
import Settings from './screens/ClientSettings/screens';
import {createStackNavigator} from 'react-navigation';
import MyPets from './screens/ClientHome/screens/MyPets';
import MyVets from './screens/ClientHome/screens/MyVets';
import Notifications from './screens/ClientHome/screens/Notifications';
import Info from './screens/ClientHome/screens/Info';
import PetList from './screens/ClientPets/screens/PetList';
import ClientHome from './screens/ClientHome/';
import CreateLog from './screens/ClientHome/screens/CreateLog';
import ViewLogs from './screens/ClientHome/screens/ViewLogs';
import {w, h, totalSize} from "../FirebaseLogin/api/Dimensions";
import DisplayLink from './components/DisplayLink';
import AddPet from './screens/ClientHome/screens/MyPets/screens/AddPet';
import PetInfo from './screens/ClientHome/screens/MyPets/screens/PetInfo';

const HomeStackNavigator = createStackNavigator({
  ClientHome:{
    screen: ClientHome,
    navigationOptions: () => ({
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#101d26'
      },
      title: 'Home',
      headerRight: <DisplayLink/>,
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
  MyVets:{
    screen: MyVets,
    navigationOptions: () => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#101d26'
    },
    title: 'My Vets',
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
    title: 'Notifications',
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
  AddPet:{
    screen: AddPet,
    navigationOptions: () => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#101d26'
    },
    title: 'Add Pet',
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
    title: 'Pet Information',
    headerLayoutPreset: 'center',
    }),
  }
});

const PetStackNavigator = createStackNavigator({
  MyPets:{
    screen: MyPets,
    navigationOptions: () => ({
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#101d26'
      },
      title: 'Pet List',
      headerLayoutPreset: 'center',
      }),
  },
});

export default createBottomTabNavigator({
  HomeStackNavigator: { screen: HomeStackNavigator,
    // individual tab options
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) => (
        <Icon name="ios-home" color = {tintColor} size={24} />
      )
  }},
  PetStackNavigator: { screen: PetStackNavigator,
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
  initialRouteName: 'HomeStackNavigator',
  order: ['HomeStackNavigator', 'PetStackNavigator', 'Settings'],
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