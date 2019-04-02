import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, TouchableOpacity } from 'react-native';
import 'firebase/firestore';
import firebase from "firebase";
import Logout from './Logout';
import { Header } from 'react-native-elements';

const background = require('../../../../assets/background.png');

export default class Settings extends Component{

    state = {
        isLoggingOut: true
    };

    logOut = () => {

      Alert.alert(
        'Logging Out',
        'Proceed?',
        [
          {text: 'No'},
          {text: 'Yes', onPress: () => {firebase.auth().signOut().then(
            () => {
                this.props.navigation.navigate('FirebaseLogin');
            },
            function(error){
            }
        )}}
        ]
      );

    };
  
    render() {
      return(
        <ImageBackground source={background} style={{width: '100%', height: '100%'}}> 
        <Header
          centerComponent={{ text: 'Settings', style: { color: 'white' } }}
          containerStyle={{
            backgroundColor: '#101d26',
            justifyContent: 'space-around',
          }}
        />
        <View style={styles.container}>
        
            <Logout isOut={this.state.isLoggingOut} click={this.logOut} />
        </View>
        </ImageBackground>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });