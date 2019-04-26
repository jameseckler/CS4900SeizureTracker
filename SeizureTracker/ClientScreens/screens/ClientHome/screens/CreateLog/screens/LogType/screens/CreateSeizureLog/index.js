import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Picker, TouchableOpacity, KeyboardAvoidingView, ScrollView, Image} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import 'firebase/firestore';
import * as firebase from 'firebase';
import {w, h, totalSize} from "../../../../../../../../../FirebaseLogin/api/Dimensions/";
import InputField from '../../../../../../../../../FirebaseLogin/components/InputField';
import NextButton from '../../components/NextButton';
import SubmitButton from '../../components/SubmitButton';
import { Header } from 'react-navigation';

const background = require('../../../../../../../../../assets/background.png')
const before = require('../../../../../../../../../assets/before.png');
const during = require('../../../../../../../../../assets/during.png');
const after = require('../../../../../../../../../assets/after.png');

export default class CreateSeizureLog extends Component{

    constructor () {

        super()
        this.state = {
            petList: [],
            pet: '',
            before: true,
            after: false,
            during: false,
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

        return(
            <ImageBackground source={background} style={{width: '100%', height: '100%'}}> 
                <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'flex-start', marginTop: h(2)}}>
                {   
                    this.state.before ?  
                    <KeyboardAvoidingView 
                        keyboardVerticalOffset = {Header.HEIGHT + 20} 
                        style={{flex: 1}}
                        behavior="padding">
                        <ScrollView>
                            <View style={styles.container}>
                                <Image style={styles.icon2} resizeMode="contain" source={before}/>
                                <Text style={{color:'white', fontSize: 18, marginTop: h(2), marginBottom: h(2)}}>Select a pet: </Text>
                                <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#101d26', borderColor: 'white', 
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
                                <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#101d26', borderColor: 'white'}}>  
                                    <Text style={{color:'white', fontSize: 18, marginTop: h(2), marginBottom: h(2), textAlign: "center"}}>
                                            Please fill in all pre-seizure information you are able: </Text>
                                </View>
                                <NextButton click={ () => this.updateBefore()} />
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
                                <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#101d26', borderColor: 'white'}}>  
                                    <Text style={{color:'white', fontSize: 18, marginTop: h(2), marginBottom: h(2), textAlign: "center"}}>
                                        Please fill in all information regarding the seizure event you are able: </Text>
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
                                <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#101d26', borderColor: 'white'}}>  
                                    <Text style={{color:'white', fontSize: 18, marginTop: h(2), marginBottom: h(2), textAlign: "center"}}>
                                    Please fill in all post-seizure information you are able: </Text>
                                </View>
                                <SubmitButton click={() => this.submitAll()} />
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
        marginTop: h(0), 
        marginBottom: h(0),
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    }
  });