import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import 'firebase/firestore';
import {createBottomTabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Settings from './screens/ClientSettings/screens';
import {createStackNavigator} from 'react-navigation';
import MyPets from './screens/ClientHome/screens/MyPets';
import MyVets from './screens/ClientHome/screens/MyVets';
import Notifications from './screens/ClientHome/screens/Notifications';
import Info from './screens/ClientHome/screens/Info';
import ClientHome from './screens/ClientHome/';
import CreateLog from './screens/ClientHome/screens/CreateLog';
import ViewLogs from './screens/ClientHome/screens/ViewLogs';
import DisplayLink from './components/DisplayLink';
import AddPet from './screens/ClientHome/screens/MyPets/screens/AddPet';
import PetInfo from './screens/ClientHome/screens/MyPets/screens/PetInfo';
import LogType from './screens/ClientHome/screens/CreateLog/screens/LogType/';
import CreateMedLog from './screens/ClientHome/screens/CreateLog/screens/LogType/screens/CreateMedLog/';
import CreateSeizureLog from './screens/ClientHome/screens/CreateLog/screens/LogType/screens/CreateSeizureLog/';
import CreateOtherLog from './screens/ClientHome/screens/CreateLog/screens/LogType/screens/CreateOtherLog/';
import LogLists from './screens/ClientHome/screens/ViewLogs/LogLists/';
import LogInfo from './screens/ClientHome/screens/ViewLogs/LogInfo/';
import OtherLogInfo from './screens/ClientHome/screens/ViewLogs/OtherLogInfo/';
import MedLogInfo from './screens/ClientHome/screens/ViewLogs/MedLogInfo/';

/*

@@MAIN NAVIGATOR PAGE FOR CLIENTS@@
@@ALL CLIENT PAGES MUST BE ADDED HERE FOR NAVIGATION@@
@@MUST INCLUDE IMPORTS FROM PAGES ABOVE@@
This page acts as the stack navigator for each page.
All variable clusters under HomeStackNavigator are pages within
the client overall system. 

Simply adding a variable and grouping with the same formatting as the others
will create another linkage to a page index.js as long as that page is imported above.

navigationOptions can be customized but should be left alone to maintain consistent style

*/
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
  },
  CreateMedLog:{
    screen: CreateMedLog,
    navigationOptions: () => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#101d26'
    },
    title: 'Create Medication Log',
    headerLayoutPreset: 'center',
    }),
  },
  CreateSeizureLog:{
    screen: CreateSeizureLog,
    navigationOptions: () => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#101d26'
    },
    title: 'Create Seizure Log',
    headerLayoutPreset: 'center',
    }),
  },
  CreateOtherLog:{
    screen: CreateOtherLog,
    navigationOptions: () => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#101d26'
    },
    title: 'Create Other Log',
    headerLayoutPreset: 'center',
    }),
  },
  LogType:{
    screen: LogType,
    navigationOptions: () => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#101d26'
    },
    title: 'Create a Log',
    headerLayoutPreset: 'center',
    }),
  },
  LogLists:{
    screen: LogLists,
    navigationOptions: () => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#101d26'
    },
    title: 'List of Logs',
    headerLayoutPreset: 'center',
    }),
  },
  LogInfo:{
    screen: LogInfo,
    navigationOptions: () => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#101d26'
    },
    title: 'Log Info',
    headerLayoutPreset: 'center',
    }),
  },
  MedLogInfo:{
    screen: MedLogInfo,
    navigationOptions: () => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#101d26'
    },
    title: 'Medical Log Info',
    headerLayoutPreset: 'center',
    }),
  },
  OtherLogInfo:{
    screen: OtherLogInfo,
    navigationOptions: () => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#101d26'
    },
    title: 'Other Log Info',
    headerLayoutPreset: 'center',
    }),
  }
});

// Stack navigator for the pet tab, only includes one page, the MyPets page.
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

/*
  Contains a stack navigator for maintaining a consistent tab at the bottom
  of the application including 3 tabs: Home, Pets, Settings

  Pets and settings include 1 page: PetStackNavigator and Settings
  Home includes many, all listed within HomeStackNavigator.
*/
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
}, {//routerconfig, initial route is HomeStackNavigator
  initialRouteName: 'HomeStackNavigator',
  order: ['HomeStackNavigator', 'PetStackNavigator', 'Settings'],
  //navigation options for complete tab navigator
  navigationOptions: {
    tabBarVisible: true
  },
  // all tab options and stylings
  tabBarOptions:{
    activeTintColor:'white',
    activeBackgroundColor: '#101d26',
    inactiveBackgroundColor: '#101d26',
  } 
}
);

// Styles grouped, names indicate usage
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