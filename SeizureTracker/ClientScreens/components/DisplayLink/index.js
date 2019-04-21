import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';
import {w, h, totalSize} from "../../../FirebaseLogin/api/Dimensions";

export default class DisplayLink extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      linkUID: ''
    };
  }

  componentDidMount = () => {
    this.displayUser();
  };
  

  displayUser = () => {

    const curUser = firebase.auth().currentUser;
    const fb = firebase.firestore();
    const userID = curUser.uid;
    var userData;
  
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

    return this.state.linkUID;
      
  };

    render() {
        return (
            <Text style={{ color: 'white', marginRight: w(2), }}>Unique Link ID: {this.state.linkUID}</Text>
        );
    }

  }