import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
import 'firebase/firestore';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from './screens/Home';

export default class ClientHome extends Component{
  
    render() {
      return(
          <AppContainer />
      );
    }
  }

const AppStackNavigator = createStackNavigator({
  Home:{
    screen: Home,
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