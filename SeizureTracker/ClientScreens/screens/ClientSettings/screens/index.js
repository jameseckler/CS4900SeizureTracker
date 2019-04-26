import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import 'firebase/firestore';
import firebase from "firebase";
import Logout from './Logout';
import { Header } from 'react-native-elements';
import DisplayLink from '../../../components/DisplayLink/';

const background = require('../../../../assets/background.png');

export default class Settings extends Component{

  constructor(props) {
    super(props);
    const curUser = firebase.auth().currentUser;
    this.ref = firebase.firestore().collection('users').doc(curUser.uid);
    this.state = ({
      userName: `${curUser.firstName} ${curUser.lastName}`,
      isLoggingOut: true
    })
  }

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
          <DisplayLink/>
          <Logout accessible={true} accessibilityLabel="Log Out" accessibilityHint="Log out of account" isOut={this.state.isLoggingOut} click={this.logOut} />
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