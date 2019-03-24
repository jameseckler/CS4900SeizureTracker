import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';
import {w, h, totalSize} from "../../../FirebaseLogin/api/Dimensions";

export default class DisplayLink extends React.Component {

  displayUser = () => {

    const curUser = firebase.auth().currentUser;
    const fb = firebase.firestore();
    const userID = curUser.uid;
    var linkUID, linkString;
  
    fb.collection('users').doc(userID).get()
      .then(doc => {
        var userData = doc.data();
        if (!doc.exists) {
          console.log('No such document!');
        }else{
           linkUID = userData.linkID;
        }
      })
      .catch(err => {
        console.log('Error getting link ID', err);
      });

      
      return <Text>{linkUID}</Text>
      
  };

  displayUsers = () => {
  
    var uid, email;

    user = firebase.auth().currentUser;

    if (user != null) {
      email = user.email;
      uid = user.uid;
    }

    return <Text>{email}</Text>

  };

    render() {
        return (
            <Text style={{ color: 'white', marginRight: w(2), }}>Unique Link ID: {this.displayUser()}</Text>
        );
    }

  }