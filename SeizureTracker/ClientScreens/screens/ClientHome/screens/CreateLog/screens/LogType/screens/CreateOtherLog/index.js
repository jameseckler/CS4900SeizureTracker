import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import 'firebase/firestore';
import {w, h, totalSize} from "../../../../../../../../../FirebaseLogin/api/Dimensions/";

const background = require('../../../../../../../../../assets/background.png')

export default class CreateOtherLog extends Component{
  
    render() {

      return(
        <ImageBackground source={background} style={{width: '100%', height: '100%'}}> 
            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'flex-start', marginTop: h(2)}}>
                <Text>Other Log</Text>
            </View>
        </ImageBackground>
      );
    }
  }