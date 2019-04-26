import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';
import {w, h, totalSize} from "../../../FirebaseLogin/api/Dimensions";

/*
  Component for displaying the current logged in client user's
  unique link ID for display in Settings and the home header
*/
export default class DisplayLink extends React.Component {

  // Contains linkUID state for displaying linkID for current user
  constructor(props) {
    super(props);
    this.state = {
      linkUID: ''
    };
  }

  // Calls displayUser() function on mounting to load linkID instantly
  componentDidMount = () => {
    this.displayUser();
  };
  

  /*
    Gets current user and retrieves that users unique link ID
    from Firestore.
    returns user's linkID for displaying
  */
  displayUser = () => {

    // Retrieves current user from Firebase API
    const curUser = firebase.auth().currentUser;
    const fb = firebase.firestore();
    const userID = curUser.uid;
    var userData;
  
    // Gets unique link ID based on userID from curUser
    fb.collection('users').doc(userID).get()
      .then(doc => {
        userData = doc.data();
        linkTemp= userData.linkID;
        if (!doc.exists) {
          console.log('No such document!');
        }else{
          this.setState({linkUID: linkTemp})
        }
      })
      .catch(err => {
        console.log('Error getting link ID', err);
      });

    console.log('read');

    // Returns linkUID state
    return this.state.linkUID;
      
  };

    /*
      Simply renders the linkID state set by displayUser to display the link ID in plain text.
    */
    render() {
        return (
            <Text style={{ color: 'white', marginRight: w(2), }}>Unique Link ID: {this.state.linkUID}</Text>
        );
    }

  }