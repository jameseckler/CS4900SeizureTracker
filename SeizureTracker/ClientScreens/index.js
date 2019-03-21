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
  // Pet List that routes to pet info screen

  // Add Pet Button
}

class AddPetScreen extends Component {
  // Fields for all pet info

  // Submit button
}

class PetInfoScreen extends Component {
  // Display pet info

  // List of logs for pet
}

class VetListScreen extends Component {
  // Vet List that routes to vet info

  // Add vet button
}

class CreateLogScreen extends Component {
  
}

class PetLogScreen extends Component {

}