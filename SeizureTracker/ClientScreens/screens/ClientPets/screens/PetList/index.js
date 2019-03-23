import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
import 'firebase/firestore';

const background = require('../../../../../assets/background.png');

export default class PetList extends Component{
  
    render() {
      return(
        <ImageBackground source={background} style={{width: '100%', height: '100%'}}> 
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Pet List</Text>
          </View>
        </ImageBackground>
      );
    }
  }