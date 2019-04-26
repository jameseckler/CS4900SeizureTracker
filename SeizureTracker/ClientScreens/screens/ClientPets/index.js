import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
import 'firebase/firestore';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import PetList from './screens/PetList';

/*
  Contains own AppContainer for TAB navigation.
  Pages include PetList that links to AddPet page
*/
export default class ClientPets extends Component{
  
    render() {
      return(
          <AppContainer />
      );
    }
  }

// StackNavigator contains only PetList page for this Tab
const AppStackNavigator = createStackNavigator({
  PetList:{
    screen: PetList,
    navigationOptions: () => ({
    headerTintColor: 'black',
    headerTransparent: true,
    }),
  }
});

// App container contains stack navigator
const AppContainer = createAppContainer(AppStackNavigator);

// Styles grouped, names indicate usage
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})