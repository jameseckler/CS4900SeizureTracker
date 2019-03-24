import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, TouchableOpacity, Image } from 'react-native';
import 'firebase/firestore';
import {w, h, totalSize} from "../../../FirebaseLogin/api/Dimensions";
import CreateLogButton from './CreateLogButton';
import ViewLogsButton from './ViewLogsButton';

const background = require('../../../assets/background.png');

export default class ClientHome extends Component{
  
  state = {
    isButton: true
};

  render() {
    return(
      <ImageBackground source={background} style={{width: '100%', height: '100%'}}> 

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
          <View style={{justifyContent:'center', alignItems: 'center', flexDirection: 'row', marginTop: h(2)}}>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('AddPet')} style={styles.leftTouchable}>
              <Image 
              source = {require('../../../assets/petsButton.png')}
              style={styles.imageStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('MyVets')} style={styles.rightTouchable}>
              <Image 
              source = {require('../../../assets/vetsButton.png')}
              style={styles.imageStyle}
              />
            </TouchableOpacity>
          </View>
          <View style={{justifyContent:'center', alignItems: 'center', flexDirection: 'row', marginTop: h(2)}}>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Notifications') } style={styles.leftTouchable} >
              <Image 
              source = {require('../../../assets/comButton.png')}
              style={styles.imageStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Info')} style={styles.rightTouchable}>
              <Image 
              source = {require('../../../assets/infoButton.png')}
              style={styles.imageStyle}
              />
            </TouchableOpacity>
          </View>
          <View style={{justifyContent:'center', alignItems: 'center', flexDirection: 'row', marginTop: h(2)}}>
            <CreateLogButton isOut={this.state.isButton} click={()=> this.props.navigation.navigate('CreateLog') } />
          </View>
          <View style={{justifyContent:'center', alignItems: 'center', flexDirection: 'row', marginTop: h(2)}}>
            <ViewLogsButton isOut={this.state.isButton} click={()=> this.props.navigation.navigate('ViewLogs') } />
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