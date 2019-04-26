import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, TouchableOpacity, Image } from 'react-native';
import 'firebase/firestore';
import {w, h, totalSize} from "../../../FirebaseLogin/api/Dimensions";
import CreateLogButton from './CreateLogButton';
import ViewLogsButton from './ViewLogsButton';

const background = require('../../../assets/background.png');

export default class ClientHome extends Component{
  
  render() {
    return(
      <ImageBackground source={background} style={{width: '100%', height: '100%'}}> 

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
          <View style={{justifyContent:'center', alignItems: 'center', flexDirection: 'row', marginTop: h(2)}}>
            <TouchableOpacity accessible={true} accessibilityLabel="My Pets" accessibilityHint="View and add pets" onPress={()=> this.props.navigation.navigate('MyPets')} style={styles.leftTouchable}>
              <Image 
              source = {require('../../../assets/petsButton.png')}
              style={styles.imageStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity accessible={true} accessibilityLabel="My Vets" accessibilityHint="View vets linked to your account" onPress={()=> this.props.navigation.navigate('MyVets')} style={styles.rightTouchable}>
              <Image 
              source = {require('../../../assets/vetsButton.png')}
              style={styles.imageStyle}
              />
            </TouchableOpacity>
          </View>
          <View style={{justifyContent:'center', alignItems: 'center', flexDirection: 'row', marginTop: h(2)}}>
            <TouchableOpacity accessible={true} accessibilityLabel="Notifications" accessibilityHint="View notifications" onPress={()=> this.props.navigation.navigate('Notifications') } style={styles.leftTouchable} >
              <Image 
              source = {require('../../../assets/comButton.png')}
              style={styles.imageStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity accessible={true} accessibilityLabel="Epilepsy Info" accessibilityHint="Papers and useful sources on animal epilepsy" onPress={()=> this.props.navigation.navigate('Info')} style={styles.rightTouchable}>
              <Image 
              source = {require('../../../assets/infoButton.png')}
              style={styles.imageStyle}
              />
            </TouchableOpacity>
          </View>
          <View accessible={true} accessibilityLabel="Create a log" accessibilityHint="Takes you to log creation" style={{justifyContent:'center', alignItems: 'center', flexDirection: 'row', marginTop: h(2)}}>
            <CreateLogButton click={()=> this.props.navigation.navigate('LogType') } />
          </View>
          <View accessible={true} accessibilityLabel="View logs" accessibilityHint="Takes you to log view screen" style={{justifyContent:'center', alignItems: 'center', flexDirection: 'row', marginTop: h(2)}}>
            <ViewLogsButton click={()=> this.props.navigation.navigate('ViewLogs') } />
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