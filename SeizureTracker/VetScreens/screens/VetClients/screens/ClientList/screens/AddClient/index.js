import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, Picker, KeyboardAvoidingView } from 'react-native';
import 'firebase/firestore';
import * as firebase from 'firebase';
import {w, h, totalSize} from "../../../../../../../FirebaseLogin/api/Dimensions";
import Icon from 'react-native-vector-icons/Ionicons';
import InputField from '../../../../../../../FirebaseLogin/components/InputField';
import SubmitClient from './SubmitClient';
import { Header } from 'react-navigation';

const background = require('../../../../../../../assets/background.png');

export default class AddClient extends Component{

    state = {
        isIdCorrect: false
        };

    constructor(props){

        super(props)

        }

    changeInputFocus = name => () => {
        switch (name) {
            case 'Unique Link ID':
            this.setState({ isIdCorrect: this.petName.getInputValue() === '' });
            this.linkID.input.focus();
            break;
        }
        };

    checkMyVet = () => {
        const linkID = this.linkID.getInputValue();
    
        this.setState({
        isIdCorrect: linkID === ''
        }, () => {
        if(linkID !== ''){

            if (this.addMyVet(linkID)) {
                this.props.navigation.navigate('MyVets');
            }

        } else {
            console.warn('Fill in all fields correctly');
        }
        })
    };

    addMyVet = (linkID) => {
        var success = true;
        const db = firebase.firestore();
        const curUser = firebase.auth().currentUser;



        return (success);
    };
  
    render() {
      return(
        <ImageBackground source={background} style={{width: '100%', height: '100%'}}> 
        <KeyboardAvoidingView 
        keyboardVerticalOffset = {Header.HEIGHT + 20} 
        style={{flex: 1}}
        behavior="padding">
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.create}>Please enter your client's unique identifier: </Text>
                <Text style={styles.create}>(Your client can find this on their home screen in the upper right corner)</Text>                
                    <InputField
                        placeholder="Unique Link ID"
                        focus={this.changeInputFocus}
                        style={styles.input}
                        error={this.state.isIdCorrect}
                        ref={ref => this.linkID = ref}
                    />
                    <SubmitVet click={this.checkMyVet} />
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
    },
    create: {
      color:'white',
      fontSize: totalSize(2.4),
      marginTop: h(7),
      marginBottom: h(4),
      fontWeight: '700',
    },
    signIn: {
      color:'#ffffffEE',
      fontSize: totalSize(2),
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