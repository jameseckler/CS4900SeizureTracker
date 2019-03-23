import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import 'firebase/firestore';
import {createBottomTabNavigator} from 'react-navigation';
import ClientPets from './screens/ClientPets';
import Icon from 'react-native-vector-icons/Ionicons';
import Settings from './screens/ClientSettings/screens';
import {createStackNavigator} from 'react-navigation';
import AddPet from './screens/ClientHome/screens/AddPet';
import PetList from './screens/ClientPets/screens/PetList';
import ClientHome from './screens/ClientHome/';

const HomeStackNavigator = createStackNavigator({
  ClientHome:{
    screen: ClientHome,
    navigationOptions: () => ({
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#101d26'
      },
      title: 'Home',
      headerLayoutPreset: 'center',
      }),
  },
  AddVet:{
    screen: AddPet,
    navigationOptions: () => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#101d26'
    },
    title: 'Add Pet',
    headerLayoutPreset: 'center',
    }),
  }
});

const PetStackNavigator = createStackNavigator({
  PetList:{
    screen: PetList,
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