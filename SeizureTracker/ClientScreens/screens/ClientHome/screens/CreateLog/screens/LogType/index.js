import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import 'firebase/firestore';
import {w, h, totalSize} from "../../../../../../../FirebaseLogin/api/Dimensions";
import SeizureButton from "../LogType/components/SeizureButton";
import MedButton from "../LogType/components/MedButton";
import OtherButton from "../LogType/components/OtherButton";

const background = require('../../../../../../../assets/background.png')

export default class LogType extends Component{
  
    render() {

      return(
        <ImageBackground source={background} style={{width: '100%', height: '100%'}}>
          <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'center', marginTop: h(2)}}>
            <SeizureButton click={()=> this.props.navigation.navigate('CreateSeizureLog') } />
            <MedButton click={()=> this.props.navigation.navigate('CreateMedLog') } />
            <OtherButton click={()=> this.props.navigation.navigate('CreateOtherLog') } />
          </View>
        </ImageBackground>
      );
    }
  }