import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import 'firebase/firestore';
import firebase from "firebase";
import Logout from './Logout';
import { Header } from 'react-native-elements';
import DisplayLink from '../../../components/DisplayLink/';

// Consistent background image for page
const background = require('../../../../assets/background.png');

/*
  Settings class containing the settings page
  Includes LinkUID display and Logout function
*/
export default class Settings extends Component{

  constructor(props) {
    super(props);

    // Acquires current logged in client user and acquires a reference to that user
    const curUser = firebase.auth().currentUser;
    this.ref = firebase.firestore().collection('users').doc(curUser.uid);

    // State contains user name and log out verification
    this.state = ({
      userName: `${curUser.firstName} ${curUser.lastName}`,
      isLoggingOut: true
    })
  }

  /*
    logOut function called from Logout button. Calls firebase API function
    .auth().signOut() to sign current user out. 2nd verification required.
  */
  logOut = () => {

    // Prompt to accept or decline log out
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
  
  /*
    Renders header for settings page and background/
    Provides DisplayLink component for showing LinkUID
    along with a Logout button component that calls logOut() 
    on press.
  */
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
        <Logout isOut={this.state.isLoggingOut} click={this.logOut} />
      </View>
      </ImageBackground>
    );
  }
}

// Styles grouped, names indicate usage
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});