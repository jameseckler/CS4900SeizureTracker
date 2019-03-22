import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, TouchableOpacity } from 'react-native';
import 'firebase/firestore';
import firebase from "firebase";
import Logout from './Logout';

const background = require('../../../../assets/background.png');

export default class Settings extends Component{

    state = {
        isLoggingOut: true
    };

    logOut = () => {

        console.log('entered function');

        firebase.auth().signOut().then(
            () => {
                this.props.navigation.navigate('FirebaseLogin');
                console.log('supposed to navigate');
            },
            function(error){
                console.log("error: ", error);
            }
        )

    };
  
    render() {
      return(
        <ImageBackground source={background} style={{width: '100%', height: '100%'}}> 
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