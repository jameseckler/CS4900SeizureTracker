import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, TouchableOpacity, Image } from 'react-native';
import 'firebase/firestore';
import {w, h, totalSize} from "../../../FirebaseLogin/api/Dimensions";
import InputField from '../../../FirebaseLogin/components/InputField';

const background = require('../../../assets/background.png');

export default class VetHome extends Component{
  
  render() {
    return(
      <ImageBackground source={background} style={{width: '100%', height: '100%'}}> 

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
          <View style={{justifyContent:'center', alignItems: 'center', flexDirection: 'row', marginTop: h(2)}}>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('MyPets')} style={styles.leftTouchable}>
              <Image 
              source = {require('../../../assets/logVetButton.png')}
              style={styles.imageStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity accessible={true} accessibilityLabel="My Clients" accessibilityHint="View your clients and link new clients to your account" onPress={()=> this.props.navigation.navigate('MyClients')} style={styles.rightTouchable}>
              <Image 
              source = {require('../../../assets/clientsButton.png')}
              style={styles.imageStyle}
              />
            </TouchableOpacity>
          </View>
          <View style={{justifyContent:'center', alignItems: 'center', flexDirection: 'row', marginTop: h(2)}}>
            
            <TouchableOpacity accessible={true} accessibilityLabel="Epilepsy Info" accessibilityHint="Papers and useful sources on animal epilepsy" onPress={()=> this.props.navigation.navigate('Info')} style={{alignSelf:'center'}}>
              <Image 
              source = {require('../../../assets/infoButton.png')}
              style={styles.imageStyle}
              />
            </TouchableOpacity>
          </View>
        </View>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkVet: {
    color:'#ffffffEE',
    fontSize: totalSize(2),
    fontWeight: '700',
  },
  leftTouchable: {
    alignSelf: 'center',
    marginRight: w(3),
    marginTop: h(1),
  },
  rightTouchable: {
    alignSelf: 'center',
    marginLeft: w(3),
    marginTop: h(1),
  },
  imageStyle:{
    height:130,
    width:130,
  }
});