import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, Picker, KeyboardAvoidingView, Alert } from 'react-native';
import 'firebase/firestore';
import * as firebase from 'firebase';
import {w, h, totalSize} from "../../../../../../FirebaseLogin/api/Dimensions";
import Icon from 'react-native-vector-icons/Ionicons';
import InputField from '../../../../../../FirebaseLogin/components/InputField';
import SmallInputField from '../../../../../../FirebaseLogin/components/SmallInputField';
import SubmitClient from './SubmitClient';

const background = require('../../../../../../assets/background.png');

export default class AddClient extends Component{

    state = {
        isIdCorrect: false
        };

    constructor(props){
        super(props)
        this.state = {
            id: ''
        }
        console.log(this.state.date);
        };

    checkClient = () => {
        const id = this.id.getInputValue();
    
        this.setState({
        isIdCorrect: id === ''
        }, () => {
        if(id !== ''){
            var client = this.addClient(id);
            if(client == undefined) {
                Alert.alert('Client ID ' + id + ' does not exist');
            }
            else {
                this.props.navigation.navigate('MyClients');
            }
        } else {
            Alert.alert('Fill up all fields correctly');
        }
        })
    };

    addClient = (id) => {
        const db = firebase.firestore();
        const curUser = firebase.auth().currentUser;

        const client = db.collection('users').where('linkID', '==', id).get();
        console.log(client);

        {/* Link ID exists */}
        if (client != undefined) {

          {/* Add client details to vet account */}
            const clientRef = db.collection('users').doc(curUser.uid).collection('clients').doc(client.uid);

            clientRef.set({
                linkID: id,
                uid: client.uid,
                firstName: client.firstName,
                lastName: client.lasName       
            });

            {/* Add vet details to client account */}
            const addToClient = db.collection('users').doc(client.uid).collection('vets').doc(curUser.uid);
            const myAccount = db.collection('users').doc(curUser.uid);

            addToClient.set({
              linkID: myAccount.linkID,
              firstName: myAccount.firstName,
              lastName: myAccount.lastName
            });

        }

        return client;
    };
  
    render() {
      return(
        <ImageBackground source={background} style={{width: '100%', height: '100%'}}> 
        <KeyboardAvoidingView 
        style={{flex: 1}}
        behavior="padding">
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.create}>Input your client's Unique Link ID{"\n"}(Located at the top right of their home screen): </Text>
                    <InputField
                        placeholder="Unique Link ID"
                        autoCapitalize="words"
                        style={styles.input}
                        error={this.state.isIdCorrect}
                        ref={ref => this.id = ref}
                    />
                    <SubmitClient click={this.checkClient} />
            </View>
          </ScrollView>
          </KeyboardAvoidingView>
        </ImageBackground>
      );
    }
  }

  const styles = StyleSheet.create({
    linkVet: {
        color:'#ffffffEE',
        fontSize: totalSize(2),
        fontWeight: '700',
    },
        touchable: {
        alignSelf: 'flex-start',
        marginLeft: w(8),
        marginTop: h(1),
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: w(0),
    },
    create: {
      color:'white',
      fontSize: totalSize(2.4),
      marginTop: h(7),
      marginBottom: h(4),
      fontWeight: '700',
    },
    touchable: {
      alignSelf: 'flex-start',
      marginLeft: w(8),
      marginTop: h(1),
    },
    input: {
      marginVertical: h(1),
    },
    inputL: {
        marginVertical: h(1),
        marginRight: w(2),
    },
    inputR: {
        marginVertical: h(1),
        marginLeft: w(2),
    },
    check: {
      marginVertical: h(1),
      backgroundColor: 'transparent',
    },
    checkText: {
      color: 'white',
    },
    itemStyle: {
        fontSize: 15,
        height: 75,
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold'
      },
    picker: {
        width: 100
      },
  });