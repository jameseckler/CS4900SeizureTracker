import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, Picker, KeyboardAvoidingView, Alert } from 'react-native';
import 'firebase/firestore';
import * as firebase from 'firebase';
import {w, h, totalSize} from "../../../../../../../../../FirebaseLogin/api/Dimensions/";
import InputField from '../../../../../../../../../FirebaseLogin/components/InputField';
import SmallInputField from '../../../../../../../../../FirebaseLogin/components/SmallInputField';
import SubmitButton from '../../../LogType/components/SubmitButton';
import DatePicker from 'react-native-datepicker'
import { Header } from 'react-navigation';

const background = require('../../../../../../../../../assets/background.png')

export default class CreateMedLog extends Component{

    state = {
        isLogNameCorrect: false,
        isDosageCorrect: false,
        isFrequencyCorrect: false,
        isSideCorrect: false,
        isDescriptionCorrect: false,
        };

    constructor(props){
        super(props)

        var d = new Date();

        this.state = {
            petList: [],
            date: d,
            medDateStarted: new Date(),
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
            case 'Log Name':
            this.setState({ isLogNameCorrect: this.medLogName.getInputValue() === '' });
            this.breed.input.focus();
            break;
            case 'Dosage':
            this.setState({ isDosageCorrect: this.medDosage.getInputValue() === '' });
            this.age.input.focus();
            break;  
            case 'Frequency':
            this.setState({ isFrequencyCorrect: this.medFreq.getInputValue() === '' });
            this.weight.input.focus();
            break;
            case 'Side effects':
            this.setState({ isSideCorrect: this.medSide.getInputValue() === ''});
            this.description.input.focus();
            break;
            case 'Description (optional)':
            this.setState({ isDescriptionCorrect: this.description.getInputValue() === ''});
            break;
            default:
            this.setState({ isNameCorrect: this.medLogName.getInputValue() === '' });
        }
        };

    checkMyMed= () => {
        const medLogName = this.medLogName.getInputValue();
        const medDosage = this.medDosage.getInputValue();
        const medFreq = this.medFreq.getInputValue();
        const medStart = this.state.medDateStarted;
        const medSide = this.medSide.getInputValue();
        const date = this.state.date;
        const description = this.description.getInputValue();

        this.setState({
        isLogNameCorrect: medLogName === '',
        isDosageCorrect: medDosage === '',
        isFrequencyCorrect: medFreq === '',
        isSideCorrect: medSide === '',
        }, () => {
        if(medLogName !== '' && medDosage !== '' && medFreq !== '' && medSide !== ''  ){
            this.addMyPet(medLogName, medDosage, medFreq, medStart, medSide, date, description);
            this.props.navigation.navigate('ClientHome');
        } else {
            console.warn('Fill up all fields correctly');
        }
        })
    };

    addMyPet = (medLogName, medDosage, medFreq, medStart, medSide, date, description) => {
        const db = firebase.firestore();
        const curUser = firebase.auth().currentUser;
        const petRef = db.collection('users').doc(curUser.uid).collection('pets').doc(this.state.pet).collection('medLogs').doc(medLogName);
        petRef.set({
            medLogName,
            medDosage,
            medFreq,
            medStart,
            medSide,
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
                <Text style={{color:'white', fontSize: 18}}>Please select the pet being medicated: </Text>
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
                <Text style={{color:'white', fontSize: 15, marginTop: h(4)}}>What type of medication was given? </Text>
                <InputField
                    placeholder="Type"
                    autoCapitalize="words"
                    focus={this.changeInputFocus}
                    style={styles.input}
                    error={this.state.isLogNameCorrect}
                    ref={ref => this.medLogName = ref}
                />
                <Text style={{color:'white', fontSize: 15, marginTop: h(4)}}>What dosage was used (mg/ml)? </Text>
                <InputField
                    placeholder="Dosage (mg/ml)"
                    autoCapitalize="words"
                    style={styles.input}
                    error={this.state.isDosageCorrect}
                    focus={this.changeInputFocus}
                    ref={ref => this.medDosage = ref}
                />
                <Text style={{color:'white', fontSize: 15, marginTop: h(4)}}>How frequently is this medication given?</Text>
                <InputField
                    placeholder="Frequency"
                    autoCapitalize="words"
                    focus={this.changeInputFocus}
                    style={styles.input}
                    error={this.state.isFrequencyCorrect}
                    ref={ref => this.medFreq = ref}
                />
                <Text style={{color:'white', fontSize: 15, marginTop: h(4)}}>When was this medication started?</Text>
                <DatePicker
                        style={{width: 200, marginBottom: h(2)}}
                        date={this.state.medDateStarted}
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
                        onDateChange={(date) => {this.setState({medDateStarted: date})}}
                    />
                <Text style={{color:'white', fontSize: 15, marginTop: h(4)}}>Have any side effects appeared?</Text>
                <InputField
                    placeholder="Side effects"
                    autoCapitalize="words"
                    focus={this.changeInputFocus}
                    style={styles.input}
                    error={this.state.isSideCorrect}
                    ref={ref => this.medSide = ref}
                />
                <Text style={{color:'white', fontSize: 15, marginTop: h(4)}}>Additional information: </Text>
                <InputField
                    placeholder="Description (optional)"
                    style={styles.input}
                    focus={this.changeInputFocus}
                    ref={ref => this.description = ref}
                />
                <SubmitButton click={this.checkMyMed} />
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