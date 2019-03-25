import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, Picker, KeyboardAvoidingView } from 'react-native';
import 'firebase/firestore';
import {w, h, totalSize} from "../../../../../FirebaseLogin/api/Dimensions";
import InputField from '../../../../../FirebaseLogin/components/InputField';
import SmallInputField from '../../../../../FirebaseLogin/components/SmallInputField';
import SubmitPet from './SubmitLog';
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
      date: d,
      time: d.getTime()
    };

  }
  
<<<<<<< HEAD
  render() {
    return(
      <ImageBackground source={background} style={{width: '100%', height: '100%'}}> 
      <KeyboardAvoidingView 
      keyboardVerticalOffset = {Header.HEIGHT + 20} 
      style={{flex: 1}}
      behavior="padding">
      <ScrollView>
          <View style={styles.container}>
              <Text style={styles.create}>Please give the details of your pet's seizure: </Text>
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
                          onValueChange={(itemValue) => 
                              this.setState({sex: itemValue})
                          }>
                          <Picker.Item label="Male" value="male"  />
                          <Picker.Item label="Female" value="female" />
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
=======
    render() {
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
                      <Picker.Item label="Placeholder" value="placeholder" itemIndex="0" />
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
>>>>>>> 17e3b10c35b535c5547e25ce0a956db8ffcbb151
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