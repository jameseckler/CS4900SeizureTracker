import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, Picker, KeyboardAvoidingView } from 'react-native';
import 'firebase/firestore';
import * as firebase from 'firebase';
import {w, h, totalSize} from "../../../../../../../FirebaseLogin/api/Dimensions";
import Icon from 'react-native-vector-icons/Ionicons';
import InputField from '../../../../../../../FirebaseLogin/components/InputField';
import SmallInputField from '../../../../../../../FirebaseLogin/components/SmallInputField';
import SubmitPet from './SubmitPet';
import DatePicker from 'react-native-datepicker'
import { Header } from 'react-navigation';

const background = require('../../../../../../../assets/background.png');

export default class AddPet extends Component{

    state = {
        sex: '',
        isNameCorrect: false,
        isBreedCorrect: false,
        isAgeCorrect: false,
        isWeightCorrect: false,
        isSymptomsCorrect: false,
        isDescriptionCorrect: false,
        };

    constructor(props){
        super(props)
        this.state = {date:new Date()}
        }

    changeInputFocus = name => () => {
        switch (name) {
            case 'Pet Name':
            this.setState({ isNameCorrect: this.petName.getInputValue() === '' });
            this.breed.input.focus();
            break;
            case 'Breed':
            this.setState({ isBreedCorrect: this.breed.getInputValue() === '' });
            this.age.input.focus();
            break;  
            case 'Age':
            this.setState({ isAgeCorrect: this.age.getInputValue() === '' });
            this.weight.input.focus();
            break;
            case 'Weight (lbs)':
            this.setState({ isWeightCorrect: this.weight.getInputValue() === ''});
            this.symptoms.input.focus();
            break;
            case 'Seizure Symptoms':
            this.setState({ isSymptomsCorrect: this.symptoms.getInputValue() === ''});
            this.description.input.focus();
            break;
            case 'Description (optional)':
            this.setState({ isDescriptionCorrect: this.description.getInputValue() === ''});
            break;
            default:
            this.setState({ isNameCorrect: this.petName.getInputValue() === '' });
        }
        };

    checkMyPet = () => {
        const petName = this.petName.getInputValue();
        const breed = this.breed.getInputValue();
        const sex = this.state.sex;
        const age = this.age.getInputValue();
        const weight= this.weight.getInputValue();
        const date = this.state.date;
        const symptoms = this.symptoms.getInputValue();
        const description = this.description.getInputValue();

        console.log('before addmypet: ', sex);
        console.log('state before addmypet: ', this.state.sex);
    
        this.setState({
        isNameCorrect: petName === '',
        isBreedCorrect: breed === '',
        isAgeCorrect: age === '',
        isWeightCorrect: weight === '',
        isSymptomsCorrect: symptoms === '',
        }, () => {
        if(petName !== '' && breed !== '' && age !== '' && weight !== '' && symptoms !== ''  ){
            this.addMyPet(petName, breed, sex, age, weight, date, symptoms, description);
            this.props.navigation.navigate('MyPets');
        } else {
            console.warn('Fill up all fields correctly');
        }
        })
    };

    addMyPet = (petName, breed, sex, age, weight, date, symptoms, description) => {
        const db = firebase.firestore();
        const curUser = firebase.auth().currentUser;
        const petRef = db.collection('users').doc(curUser.uid).collection('pets').doc(petName);
        console.log('after addmypet: ', sex);
        console.log('state after addmypet: ', this.state.sex);
        petRef.set({
            petName,
            breed,
            sex,
            age,
            weight,
            date,
            symptoms,
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
                <Text style={styles.create}>Please input your pet's details: </Text>
                    <InputField
                        placeholder="Pet Name"
                        autoCapitalize="words"
                        focus={this.changeInputFocus}
                        style={styles.input}
                        error={this.state.isNameCorrect}
                        ref={ref => this.petName = ref}
                    />
                    <InputField
                        placeholder="Breed"
                        autoCapitalize="words"
                        style={styles.input}
                        error={this.state.isBreedCorrect}
                        focus={this.changeInputFocus}
                        ref={ref => this.breed = ref}
                    />
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>     
                        <Text style={{color:'white', fontSize: 15}}>Sex: </Text>
                        <Picker
                            selectedValue={this.state.sex}
                            style={{height: 50, width: 140, color: 'white'}}
                            onValueChange={(itemValue, itemIndex) => 
                                this.setState({sex: itemValue})
                            }>
                            <Picker.Item label="Male" value="male" itemIndex="0" />
                            <Picker.Item label="Female" value="female" itemIndex="0"/>
                        </Picker>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <SmallInputField
                            placeholder="Age"
                            style={styles.inputL}
                            keyboardType="numeric"
                            error={this.state.isAgeCorrect}
                            focus={this.changeInputFocus}
                            ref={ref => this.age = ref}
                        />
                        <SmallInputField
                            placeholder="Weight (lbs)"
                            style={styles.inputR}
                            keyboardType="numeric"
                            error={this.state.isWeightCorrect}
                            focus={this.changeInputFocus}
                            ref={ref => this.weight = ref}
                        />
                    </View>
                    <Text style={{marginLeft: 5, color:'white', fontSize: 15}}> Date of First Seizure: </Text>
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
                        placeholder="Seizure Symptoms"
                        style={styles.input}
                        error={this.state.isSymptomsCorrect}
                        focus={this.changeInputFocus}
                        ref={ref => this.symptoms = ref}
                    />
                    <InputField
                        placeholder="Description (optional)"
                        style={styles.input}
                        focus={this.changeInputFocus}
                        ref={ref => this.description = ref}
                    />
                    <SubmitPet click={this.checkMyPet} />
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