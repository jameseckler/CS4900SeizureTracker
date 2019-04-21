import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, Picker, KeyboardAvoidingView, Alert } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {w, h, totalSize} from "../../../../../FirebaseLogin/api/Dimensions";
import InputField from '../../../../../FirebaseLogin/components/InputField';
import DatePicker from 'react-native-datepicker'
import { Header } from 'react-navigation';
import SubmitLog from './SubmitLog';


const background = require('../../../../../assets/background.png');

export default class CreateLog extends Component{

  state = {

  };

  constructor(props) {
    super(props);

    var d = new Date();

    this.state = {
      petList: [],
      date: d,
      time: d.getTime()
    };
    
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
      });
      this.setState({
        petList: pets,
        loading: false,
      })
    })
  }
  
    render() {
      if (this.state.petName == null) {
        Alert.alert("WARNING: No Pets Found", "Please go to My Pets and add a pet to your account before creating a log",
        [
          {text: "OK", onPress: () => {this.props.navigation.goBack()}}
        ]);
      }
      return(
        
        <ImageBackground source={background} style={{width: '100%', height: '100%'}}>

          <KeyboardAvoidingView 
          keyboardVerticalOffset = {Header.HEIGHT + 20} 
          style={{flex: 1}}
          behavior="padding">

            <ScrollView>

              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>

                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>     
                  <Text style={{color:'white', fontSize: 15}}>Pet: </Text>
                  <Picker
                      selectedValue={this.state.pet}
                      style={{height: 50, width: 140, color: 'white'}}
                      onValueChange={(itemValue, itemIndex) => 
                          this.setState({pet: itemValue})
                      }>
                      {this.state.petList.map(element =>
                        <Picker.Item label={element.petName} value={element.petName} itemIndex="0" />
                      )}
                  </Picker>
                </View>

                <Text style={{marginLeft: 5, color:'white', fontSize: 15}}> Date of Seizure: </Text>
                    <DatePicker
                        style={{width: 200, marginBottom: h(2)}}
                        date={this.state.date}
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

                    <InputField
                        placeholder="Description of seizure"
                        style={styles.input}
                        error={this.state.isBreedCorrect}
                        focus={this.changeInputFocus}
                        ref={ref => this.description = ref}
                    />

                    <SubmitLog click={this.checkLog}/>

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