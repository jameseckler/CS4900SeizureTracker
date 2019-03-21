import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';

class DashboardScreen extends Component{

    displayUser = () => {
    
      var uid, email, name;
  
      user = firebase.auth().currentUser;
  
      if (user != null) {
        email = user.email;
        uid = user.uid;
        name = user.displayName;
      }
  
    };
  
    render() {
      this.displayUser();
      return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Welcome, {name}!</Text>
          
          <Button title="Pet List"/>
          <Button title="Vet List"/>
          <Button title="Communications"/>
          <Button title="About Seizures"/>
          <Button title="Create Log"/>
          <Button title="View Logs"/>
        </View>
      );
    }
  }