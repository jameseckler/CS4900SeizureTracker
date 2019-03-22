import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
import 'firebase/firestore';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Pets from './screens/Pets';

const background = require('./assets/background.png');

export default class ClientHome extends Component{
  
    render() {
      return(
        <ImageBackground
          source={background}
          style={styles.background}
          resizeMode="stretch"

        >
          <AppContainer />
        </ImageBackground>
      );
    }
  }

const AppStackNavigator = createStackNavigator({
  Login:{
    screen: Pets
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
  background: {
    width: '100%',
    height: '100%',
  },
})