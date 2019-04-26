import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, Picker, KeyboardAvoidingView, TextInput } from 'react-native';
import 'firebase/firestore';
import * as firebase from 'firebase';
import {w, h, totalSize} from "../../../../../../../../../FirebaseLogin/api/Dimensions/";
import InputField from '../../../../../../../../../FirebaseLogin/components/InputField';
import SubmitButton from '../../../LogType/components/SubmitButton';
import DatePicker from 'react-native-datepicker'
import { Header } from 'react-navigation';

const background = require('../../../../../../../../../assets/background.png')

export default class CreateOtherLog extends Component{

  constructor(props){
    super(props)

    var d = new Date();

    this.state = {
        petList: [],
        date: d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate(),
        time: d.getTime(),
        pet: '',
        details: ''
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
        });
        this.setState({
            petList: pets,
            loading: false,
        })
    })
  };

  checkMyOther= () => {
    const logType = this.logType.getInputValue();
    const date = this.state.date;
    const time = this.state.time;
    const details = this.state.details;

    this.addMyOther(date, logType, time, details);
    this.props.navigation.navigate('ClientHome');

  };

  addMyOther = (logType, date, time, details) => {
      const db = firebase.firestore();
      const curUser = firebase.auth().currentUser;
      const petRef = db.collection('users').doc(curUser.uid).collection('pets').doc(this.state.pet).collection('otherLogs').doc(logType + ' - ' + date);
      petRef.set({
          logType,
          date,
          time,
          details,
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
                <Text style={{color:'white', fontSize: 18}}>Please select the pet being logged for: </Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#101d26', borderColor: 'white' }}>  
                    <Picker
                        selectedValue={this.state.pet}
                        style={{width: 170, color: 'white'}}
                        onValueChange={(itemValue, itemIndex) => 
                            this.setState({pet: itemValue})
                        }>
                        {this.state.petList.map(element =>
                            <Picker.Item label={element.petName} value={element.petName} itemIndex="0" />
                        )}
                    </Picker>
                </View>
                <Text style={{color:'white', fontSize: 15, marginTop: h(4)}}>What type of event is being logged? </Text>
                <InputField
                    placeholder="Type of event..."
                    autoCapitalize="words"
                    style={styles.input}
                    ref={ref => this.logType = ref}
                />
                <Text style={{color:'white', fontSize: 15, marginTop: h(4)}}>When did this event happen?</Text>
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
                <Text style={{color:'white', fontSize: 16, marginTop: h(3), marginBottom: h(1), 
                    marginLeft: w(2), marginRight: w(2)}}>
                    Details of log event: 
                </Text>
                <View style={{flexDirection: 'column', backgroundColor: '#101d26', 
                borderColor: 'white', borderWidth: 1, width: '93%', height: '15%'}}>  
                    <TextInput style={{ color: 'white', textAlignVertical: 'top'}}
                    multiline = {true} numberOfLines = {4} 
                    onChangeText={(details) => this.setState({details})} value={this.state.details} 
                    placeholderTextColor= {'white'} />
                </View>
                <SubmitButton click={this.checkMyOther} />
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
    icon2: {
        width: w(94),
        height: h(5),
        marginBottom: h(0),
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    iconFirst: {
        width: w(94),
        height: h(5),
        marginBottom: h(0),
        marginTop: h(3),
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    buttonGroup: {
        color:'white', 
        fontSize: 16, 
        marginTop: h(4), 
        marginBottom: h(1),       
        marginLeft: w(2), 
        marginRight: w(2), 
        textAlign: "center",
    }
  });