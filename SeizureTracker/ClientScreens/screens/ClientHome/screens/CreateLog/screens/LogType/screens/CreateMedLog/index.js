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
        isStartCorrect: false,
        isSideCorrect: false,
        isDescriptionCorrect: false,
        };

    constructor(props){
        super(props)

        var d = new Date();

        this.state = {
            petList: [],
            date: d,
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
            case 'Start':
            this.setState({ isStartCorrect: this.medStart.getInputValue() === ''});
            this.symptoms.input.focus();
            break;
            case 'Side effects':
            this.setState({ isSideCorrect: this.medSide.getInputValue() === ''});
            this.description.input.focus();
            break;
            case 'Description (optional)':
            this.setState({ isDescriptionCorrect: this.description.getInputValue() === ''});
            break;
        }
        };

    checkMyPet = () => {
        const medLogName = this.medLogName.getInputValue();
        const medDosage = this.medDosage.getInputValue();
        const medFreq = this.medFreq.getInputValue();
        const medStart = this.medStart.getInputValue();
        const medSide = this.medSide.getInputValue();
        const date = this.state.date;
        const description = this.description.getInputValue();

        this.setState({
        isLogNameCorrect: medLogName === '',
        isDosageCorrect: medDosage === '',
        isFrequencyCorrect: medFreq === '',
        isStartCorrect: medStart === '',
        isSideCorrect: medSide === '',
        }, () => {
        if(medLogName !== '' && medDosage !== '' && medFreq !== '' && medStart!== '' && medSide !== ''  ){
            this.addMyPet(medLogName, medDosage, medFreq, medStart, medSide, date, description);
            this.props.navigation.navigate('MyPets');
        } else {
            Alert.alert('Fill up all fields correctly');
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
                <InputField
                    placeholder="medLogName"
                    autoCapitalize="words"
                    focus={this.changeInputFocus}
                    style={styles.input}
                    error={this.state.isLogNameCorrect}
                    ref={ref => this.medLogName = ref}
                />
                <InputField
                    placeholder="medDosage"
                    autoCapitalize="words"
                    style={styles.input}
                    error={this.state.isDosageCorrect}
                    focus={this.changeInputFocus}
                    ref={ref => this.medDosage = ref}
                />
                <InputField
                    placeholder="medFreq"
                    autoCapitalize="words"
                    focus={this.changeInputFocus}
                    style={styles.input}
                    error={this.state.isFrequencyCorrect}
                    ref={ref => this.medFreq = ref}
                />
                <InputField
                    placeholder="medStart"
                    autoCapitalize="words"
                    style={styles.input}
                    error={this.state.isStartCorrect}
                    focus={this.changeInputFocus}
                    ref={ref => this.medStart = ref}
                />
                <InputField
                    placeholder="medSide"
                    autoCapitalize="words"
                    focus={this.changeInputFocus}
                    style={styles.input}
                    error={this.state.isSideCorrect}
                    ref={ref => this.medSide = ref}
                />
                <InputField
                    placeholder="Description (optional)"
                    style={styles.input}
                    focus={this.changeInputFocus}
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