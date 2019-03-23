import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
import 'firebase/firestore';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import PetList from './screens/PetList';

export default class ClientPets extends Component{
  
    render() {
      return(
          <AppContainer />
      );
    }
  }

const AppStackNavigator = createStackNavigator({
  PetList:{
    screen: PetList,
    navigationOptions: () => ({
    headerTintColor: 'black',
    headerTransparent: true,
    }),
  }
});

const AppContainer = createAppContainer(AppStackNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})