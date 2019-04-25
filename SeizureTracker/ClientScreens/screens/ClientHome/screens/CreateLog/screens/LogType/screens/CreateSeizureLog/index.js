import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, Picker, KeyboardAvoidingView, Alert } from 'react-native';
import 'firebase/firestore';
import * as firebase from 'firebase';
import {w, h, totalSize} from "../../../../../../../../../FirebaseLogin/api/Dimensions/";
import InputField from '../../../../../../../../../FirebaseLogin/components/InputField';
import SmallInputField from '../../../../../../../../../FirebaseLogin/components/SmallInputField';
import SubmitButton from '../../../LogType/components/SubmitButton';
import DatePicker from 'react-native-datepicker';
import { Header } from 'react-navigation';

const background = require('../../../../../../../../../assets/background.png')

export default class CreateSeizureLog extends Component{

    state = {
        isDescriptionCorrect: false
        };

    constructor(props){
        super(props)

        var d = new Date();

        this.state = {
            petList: [],
            date: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(),
            time: d.getTime(),
            pet: ''
        }

        const curUser = firebase.auth().currentUser;
        this.ref = firebase.firestore().collection('users').doc(curUser.uid).collection('pets');


        }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot((querySnapshot) => {
            const pets = [];
            querySnapshot.forEach((doc) => {
                pets.push({
                    petName: doc.data().petName
                });
                this.setState({pet: doc.data().petName})
            });
            this.setState({
                petList: pets,
                loading: false,
            })
        })
    }

    changeInputFocus = name => () => {
        switch (name) {
            default:
            this.setState({ isDescriptionCorrect: this.description.getInputValue() === '' });
        }
        };

    checkMyPet = () => {
        const date = this.state.date;
        const description = this.description.getInputValue();

        this.setState({
        isDescriptionCorrect: description === '',
        }, () => {
        if(description !== ''){
            this.addMyPet(date, description);
            this.props.navigation.navigate('MyPets');
        } else {
            Alert.alert('Fill up all fields correctly');
        }
        })
    };

    addMyPet = (date, description) => {
        const db = firebase.firestore();
        const curUser = firebase.auth().currentUser;
        const petRef = db.collection('users').doc(curUser.uid).collection('pets').doc(this.state.pet).collection('seizureLogs').doc(this.state.date);
        petRef.set({
            date,
            description,
        });
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

                {/* Pet selection */}
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>  
                    <Text style={{color:'white', fontSize: 21}}>Pet: </Text>
                    <Picker
                        selectedValue={this.state.pet}
                        style={{height: 90, width: 170, color: 'white'}}
                        onValueChange={(itemValue, itemIndex) => 
                            this.setState({pet: itemValue})
                        }>
                        {this.state.petList.map(element =>
                            <Picker.Item label={element.petName} value={element.petName} itemIndex="0" />
                        )}
                    </Picker>
                </View>

                <DatePicker
                        style={{width: 200, marginBottom: h(2)}}
                        date={new Date()}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="2014-01-01"
                        maxDate="2030-01-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36,
                        },
                        dateText:{
                            color: 'white',
                            justifyContent: 'flex-start'
                          }
                        }}
                        onDateChange={(date) => {this.setState({date: date})}}
                    />

                {/* Seizure information text input */}
                <InputField
                    placeholder="Description of seizure"
                    autoCapitalize="words"
                    focus={this.changeInputFocus}
                    style={styles.input}
                    error={this.state.isDescriptionCorrect}
                    ref={ref => this.description = ref}
                />
                <SubmitButton click={this.checkMyPet} />
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