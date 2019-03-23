import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';
import FirebaseLogin from "./FirebaseLogin";
import ClientHome from "./ClientScreens";
import VetHome from "./VetScreens";
import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import * as ClientScreens from './client_screens.js';
import * as VetScreens from './vet_screens.js';
import getPetList from './Functions/getpetlist.js';

export default class App extends React.Component {

  componentWillMount() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDEnzKjgzPBggXBW7sRVYUhtyH4VzgsSWU",
      authDomain: "pet-seizure-tracker.firebaseapp.com",
      databaseURL: "https://pet-seizure-tracker.firebaseio.com",
      projectId: "pet-seizure-tracker",
      storageBucket: "pet-seizure-tracker.appspot.com",
      messagingSenderId: "934155972638"
    };
    firebase.initializeApp(config);
    const fb = firebase.firestore();
  }

  render() {
    return (
      <AppContainer />
    );
  }
}

class WelcomeScreen extends Component{

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate('Dashboard');
      }else{
        this.props.navigation.navigate('Welcome');
      }
    });
  };

  render() {
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Welcome</Text>
        <Button title="Test Sign In" onPress={() => this.checkIfLoggedIn()}/>
      </View>
    );
  }
}

class DashboardScreen extends Component{

  displayUser = () => {
  
    var uid, email;

    user = firebase.auth().currentUser;

    if (user != null) {
      email = user.email;
      uid = user.uid;
    }

    return <Text>{email}</Text>

  };

  render() {
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>{this.displayUser()}</Text>
      </View>
    );
  }
}

// add this code to your project to reset all timeouts
const highestTimeoutId = setTimeout(() => ';');
for (let i = 0; i < highestTimeoutId; i++) {
    clearTimeout(i); 
}

const AppSwitchNavigator = createSwitchNavigator({
  FirebaseLogin: { screen: FirebaseLogin},
  ClientHome: { screen: ClientHome },
  VetHome: { screen: VetHome }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
