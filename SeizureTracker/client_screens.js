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

class PetListScreen extends Component {
  render() {
    return (
      // Pet List (Using ScrollView) that routes to pet info screen
    
      <Button title="+"/> // Add Pet Button
    );
  }
}

class AddPetScreen extends Component {
  render() {
    return (
      // Fields for all pet info
    
      <Button title="Submit"/> // Submit button
    );
  }
}

class PetInfoScreen extends Component {
  // Display pet info

  // List of logs for pet (ScrollView)
}

class VetListScreen extends Component {
  render() {
    return (
      // Vet List (ScrollView) that routes to vet info

      <Button title="+"/> // Add vet button
    );
  }
}

class VetInfoScreen extends Component {
  // List vet information

  // Unlink button
}

class CreateLogScreen extends Component {
  // Fields for log creation

  // Submit button
}

class PetLogScreen extends Component {
  // Display info for log
}

class CommunicationScreen extends Component {
  // List of veterinarians and recent messages
}
