import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Picker, Button, TouchableOpacity, 
    KeyboardAvoidingView, ScrollView, Image, TextInput} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import 'firebase/firestore';
import * as firebase from 'firebase';
import {w, h, totalSize} from "../../../../../../../../../FirebaseLogin/api/Dimensions/";
import InputField from '../../../../../../../../../FirebaseLogin/components/InputField';
import NextButton from '../../components/NextButton';
import SubmitButton from '../../components/SubmitButton';
import { Header } from 'react-navigation';
import DatePicker from 'react-native-datepicker'
import DateTimePicker from "react-native-modal-datetime-picker";

const background = require('../../../../../../../../../assets/background.png')
const before = require('../../../../../../../../../assets/before.png');
const during = require('../../../../../../../../../assets/during.png');
const after = require('../../../../../../../../../assets/after.png');

export default class CreateSeizureLog extends Component{

    constructor () {

        super()

        var d = new Date();
        var t = new Date();

        this.state = {
            date: d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate(),
            symptomsBefore: '',
            awakeIndex: 2,
            petList: [],
            pet: '',
            before: true,
            after: false,
            during: false,
            isDateTimePickerVisible: false,
            timeOfSeizure: '',
        }

        this.updateAwake = this.updateAwake.bind(this);
        const curUser = firebase.auth().currentUser;
        this.ref = firebase.firestore().collection('users').doc(curUser.uid).collection('pets');

      }

    showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
    this.setState({timeOfSeizure: date});
    this.hideDateTimePicker();
    };

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

    updateAwake (awakeIndex) {
        this.setState({awakeIndex})
      }

    checkMyLog= () => {
        const date = this.state.date;
        const symptomsBefore = this.state.symptomsBefore;
        var awakeBefore = 'Unknown';
        if(this.state.awakeIndex === 0){
            awakeBefore = 'Awake';
        }else if(this.state.awakeIndex === 1){
            awakeBefore = 'Asleep';
        }

        this.addMyLog(date, symptomsBefore, awakeBefore);
        this.props.navigation.navigate('ClientHome');

    };

    addMyLog = (date, symptomsBefore, awakeBefore) => {
        const db = firebase.firestore();
        const curUser = firebase.auth().currentUser;

        const petRef = db.collection('users').doc(curUser.uid).collection('pets')
        .doc(this.state.pet).collection('seizureLogs').doc(date + ' Seizure Log');
        petRef.set({
            date,
            symptomsBefore,
            awakeBefore,
        });
    };

      updateBefore = () => {

        this.setState({before: false});
        this.setState({during: true});
        this.setState({after: false});

      };
      
      updateDuring = () => {

        this.setState({before: false});
        this.setState({during: false});
        this.setState({after: true});

      };

      submitAll = () => {
          
        this.props.navigation.navigate('ViewLogs');

      };
  
    render() {
        const buttons = ['Awake', 'Asleep', 'Unknown']
        const { awakeIndex } = this.state
        return(
            <ImageBackground source={background} style={{width: '100%', height: '100%'}}> 
                <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column', 
                justifyContent: 'flex-start', marginTop: h(2)}}>
                {   
                    this.state.before ?  
                    <KeyboardAvoidingView 
                        keyboardVerticalOffset = {Header.HEIGHT + 20} 
                        style={{flex: 1}}
                        behavior="padding">
                        <ScrollView>
                            <View style={styles.container}>
                                <Image style={styles.iconFirst} resizeMode="contain" source={before}/>
                                <Text style={{color:'white', fontSize: 18, marginTop: h(2), 
                                marginBottom: h(2)}}>Select a pet: </Text>
                                <View style={{flexDirection: 'column', alignItems: 'center', 
                                justifyContent: 'flex-start', backgroundColor: '#101d26', borderColor: 'white', 
                                    marginBottom: h(4)}}>  
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
                                <View style={{borderBottomColor: 'white', borderBottomWidth: 1, 
                                width: '100%', marginBottom: h(4)}}/>
                                <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', 
                                backgroundColor: '#101d26', borderColor: 'white'}}>  
                                    <Text style={{color:'white', fontSize: 18, marginTop: h(2), marginBottom: h(2), 
                                    textAlign: "center"}}>
                                            Please fill in all pre-seizure information you are able: </Text>
                                </View>
                                <Text style={{color:'white', fontSize: 16, marginTop: h(3), 
                                    marginLeft: w(2), marginRight: w(2)}}>
                                    Date of seizure: 
                                </Text>
                                <DatePicker
                                    style={{width: 200, marginBottom: h(2), marginTop: h(2)}}
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
                                    Symptoms shown before seizure: 
                                </Text>
                                <View style={{flexDirection: 'column', backgroundColor: '#101d26', 
                                borderColor: 'white', borderWidth: 1, width: '93%', height: '15%'}}>  
                                    <TextInput style={{ color: 'white', textAlignVertical: 'top'}}
                                    multiline = {true} numberOfLines = {4} 
                                    onChangeText={(symptomsBefore) => this.setState({symptomsBefore})} value={this.state.symptomsBefore} 
                                    placeholderTextColor= {'white'} />
                                </View>
                                <Text style={{color:'white', fontSize: 16, marginTop: h(4), marginBottom: h(1), 
                                    marginLeft: w(2), marginRight: w(2), textAlign: "center"}}>
                                    Was your pet awake or asleep when the seizure began?
                                </Text>
                                <ButtonGroup
                                    onPress={this.updateAwake}
                                    selectedIndex={awakeIndex}
                                    buttons={buttons}
                                    containerStyle={{height: 40}}
                                />
                                <View style ={{marginBottom: h(6), marginTop: h(2)}}>
                                    <NextButton click={ () => this.updateBefore()} />
                                </View>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                    : null
                }
                {
                    this.state.during ?  
                    <KeyboardAvoidingView 
                        keyboardVerticalOffset = {Header.HEIGHT + 20} 
                        style={{flex: 1}}
                        behavior="padding">
                        <ScrollView>
                            <View style={styles.container}>
                                <Image style={styles.icon2} resizeMode="contain" source={during}/>
                                <View style={{flexDirection: 'column', alignItems: 'center', 
                                justifyContent: 'flex-start', backgroundColor: '#101d26', borderColor: 'white'}}>  
                                    <Text style={{color:'white', fontSize: 18, marginTop: h(2), 
                                    marginBottom: h(2), textAlign: "center"}}>
                                        Please fill in all information regarding the seizure event you are able: </Text>
                                </View>
                                <View style={{marginTop: h(3), marginBottom: h(3)}}>
                                    <Text>{this.state.timeOfSeizure}</Text>
                                    <Button color='#101d26' title="What time did the seizure start?" onPress={this.showDateTimePicker} />
                                    <DateTimePicker
                                        isVisible={this.state.isDateTimePickerVisible}
                                        onConfirm={this.handleDatePicked}
                                        onCancel={this.hideDateTimePicker}
                                        mode='time'
                                    />
                                </View>
                                <NextButton click={() => this.updateDuring()} />
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                    : null
                }
                                {
                    this.state.after ? 
                    <KeyboardAvoidingView 
                        keyboardVerticalOffset = {Header.HEIGHT + 20} 
                        style={{flex: 1}}
                        behavior="padding">
                        <ScrollView>
                            <View style={styles.container}>
                                <Image style={styles.icon2} resizeMode="contain" source={after}/>
                                <View style={{flexDirection: 'column', alignItems: 'center', 
                                justifyContent: 'flex-start', backgroundColor: '#101d26', borderColor: 'white'}}>  
                                    <Text style={{color:'white', fontSize: 18, marginTop: h(2), 
                                    marginBottom: h(2), textAlign: "center"}}>
                                    Please fill in all post-seizure information you are able: </Text>
                                </View>
                                <SubmitButton click={() => this.checkMyLog()} />
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                    : null
                }
                </View>
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
    }
  });