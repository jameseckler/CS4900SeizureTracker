import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet, ImageBackground } from 'react-native';
import Login from './screens/Login';
import Register from './screens/Register';
import ForgotPassword from './screens/ForgotPassword';
import { w } from './api/Dimensions';
import firebase from "firebase";

// Contains background image that is set for all login pages
const background = require('./assets/background.png');

/*
  FirebaseLogin class that controls the entire login/registration page process
  for users upon first opening the application. 
  Contains state for 'currentScreen' for navigation through the login process
*/
export default class FirebaseLogin extends Component {

  // States of class
  state = {
    // Indicates current screen, changing this state causes page change
    currentScreen: 'login', // can be: 'login' or 'register' or 'forgot'
  };

  /*
    Changes the screen state for the user, this causes page navigation.
  */
  changeScreen = screenName => () => {
    this.setState({ currentScreen: screenName });
  };

  /*
    Upon verifying successful login this method is called to
    set the current Firebase user for carrying user state to login.
    Proceeds to check account type and navigate to correct homepage for
    that user's account type.
    param: user 
  */
  userSuccessfullyLoggedIn = (user) => {

  // Authorizes current user based on Firebase user param passed
  const curUser = firebase.auth().currentUser;
  const fb = firebase.firestore();
  // Sets current user UID to userID for checking account type
  const userID = curUser.uid;

  // Checks if user is a vet or client based on isVet field for user in Firestore
  fb.collection('users').doc(userID).get()
    .then(doc => {
      const userData = doc.data();
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        console.log('Document data:', doc.data());
      }

      // If user isVet, navigate to vet home, else client home
      if(userData.isVet === false){
        this.props.navigation.navigate('HomeStackNavigator');
      }else{
        this.props.navigation.navigate('VetStackNavigator');
      }
      
    })
    .catch(err => {
      console.log('Error getting document', err);
    });

  };

  /*
    Contains rendered switch statement for showing proper screen based on currentScreen state
    Also sets image background based on background const for login pages.
  */
  render() {
    let screenToShow;

    switch(this.state.currentScreen) {
      case 'login':
        screenToShow = <Login change={this.changeScreen} success={this.userSuccessfullyLoggedIn}/>;
        break;
      case 'register':
        screenToShow = <Register change={this.changeScreen} />;
        break;
      case 'forgot':
        screenToShow = <ForgotPassword change={this.changeScreen}/>;
        break;
    }

    return (
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={-w(40)}
        style={styles.container}
      >
        <ImageBackground
          source={background}
          style={styles.background}
          resizeMode="stretch"

        >
          {screenToShow}
        </ImageBackground>
      </KeyboardAvoidingView>
    )
  }
}

// Property to hold background const
FirebaseLogin.defaultProps = {
  background: null,
};

// Styles grouped, names indicate usage
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#555',
  },
  background: {
    width: '100%',
    height: '100%',
  }
});
