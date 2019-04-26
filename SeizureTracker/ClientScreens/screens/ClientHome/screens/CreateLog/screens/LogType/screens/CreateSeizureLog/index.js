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
import SmallInputField from '../../../../../../../../../FirebaseLogin/components/SmallInputField';

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
            symptomsAfter: '',
            awakeIndex: 2,
            typeIndex: 2,
            severityIndex: 3,
            headIndex: 2,
            frontIndex: 2,
            bodyIndex: 2,
            sideIndex: 3,
            urineIndex: 2,
            defIndex: 2,
            droolIndex: 2,
            paddlingIndex: 2,
            petList: [],
            pet: '',
            before: true,
            after: false,
            during: false,
            isDateTimePickerVisible: false,
            timeOfSeizure: '',
        }

        this.updateAwake = this.updateAwake.bind(this);
        this.updateType = this.updateType.bind(this);
        this.updateSeverity = this.updateSeverity.bind(this);
        this.updateHead = this.updateHead.bind(this);
        this.updateFront = this.updateFront.bind(this);
        this.updateBody = this.updateBody.bind(this);
        this.updateSide = this.updateSide.bind(this);
        this.updateUrine = this.updateUrine.bind(this);
        this.updateDef = this.updateDef.bind(this);
        this.updateDrool = this.updateDrool.bind(this);
        this.updatePaddling = this.updatePaddling.bind(this);
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
    updateType (typeIndex) {
        this.setState({typeIndex})
    }
    updateSeverity (severityIndex) {
        this.setState({severityIndex})
    }
    updateHead (headIndex) {
        this.setState({headIndex})
    }
    updateFront (frontIndex) {
        this.setState({frontIndex})
    }
    updateBody (bodyIndex) {
        this.setState({bodyIndex})
    }
    updateSide (sideIndex) {
        this.setState({sideIndex})
    }
    updateUrine (urineIndex) {
        this.setState({urineIndex})
    }
    updateDef (defIndex) {
        this.setState({defIndex})
    }
    updateDrool (droolIndex) {
        this.setState({droolIndex})
    }
    updatePaddling (paddlingIndex) {
        this.setState({paddlingIndex})
    }


    checkMyLog= () => {
        const duration = this.duration.getInputValue();
        const medicationAfter = this.medicationAfter.getInputValue();
        const date = this.state.date;
        const symptomsBefore = this.state.symptomsBefore;
        const symptomsAfter = this.state.symptomsAfter;
        var awakeBefore = 'Unknown';
        var typeBefore = 'Unknown';
        var severityBefore = 'Unknown';
        var headBefore = 'Unknown';
        var frontBefore = 'Unknown';
        var bodyBefore = 'Unknown';
        var sideBefore = 'Unknown';
        var urineBefore = 'Unknown';
        var defBefore = 'Unknown';
        var droolBefore = 'Unknown';
        var paddlingBefore = 'Unknown';
        if(this.state.awakeIndex === 0){
            awakeBefore = 'Awake';
        }else if(this.state.awakeIndex === 1){
            awakeBefore = 'Asleep';
        };
        if(this.state.typeIndex === 0){
            typeBefore = 'Generalized';
        }else if(this.state.typeIndex === 1){
            typeBefore = 'Focal';
        };
        if(this.state.severityIndex === 0){
            severityBefore = 'Mild';
        }else if(this.state.severityIndex === 1){
            severityBefore = 'Moderate';
        }else if(this.state.severityIndex === 2){
            severityBefore = 'Severe';
        };
        if(this.state.headIndex === 0){
            headBefore = 'Yes';
        }else if(this.state.headIndex === 1){
            headBefore = 'No';
        };
        if(this.state.frontIndex === 0){
            frontBefore = 'Forelimbs';
        }else if(this.state.frontIndex === 1){
            frontBefore = 'Hindlimbs';
        };
        if(this.state.bodyIndex === 0){
            bodyBefore = 'Relaxed';
        }else if(this.state.bodyIndex === 1){
            bodyBefore = 'Stiff';
        };
        if(this.state.sideIndex === 0){
            sideBefore = 'Right';
        }else if(this.state.sideIndex === 1){
            sideBefore = 'Left';
        }else if(this.state.sideIndex === 2){
            sideBefore = 'Equal';
        };
        if(this.state.urineIndex === 0){
            urineBefore = 'Yes';
        }else if(this.state.urineIndex === 1){
            urineBefore = 'No';
        };
        if(this.state.defIndex === 0){
            defBefore = 'Yes';
        }else if(this.state.defIndex === 1){
            defBefore = 'No';
        };
        if(this.state.droolIndex === 0){
            droolBefore = 'Yes';
        }else if(this.state.droolIndex === 1){
            droolBefore = 'No';
        };
        if(this.state.paddlingIndex === 0){
            paddlingBefore = 'Yes';
        }else if(this.state.paddlingIndex === 1){
            paddlingBefore = 'No';
        };


        this.addMyLog(date, symptomsBefore, symptomsAfter, awakeBefore, typeBefore, severityBefore, headBefore, 
            frontBefore, bodyBefore, sideBefore, urineBefore, defBefore, droolBefore,
            paddlingBefore, duration, medicationAfter);
        this.props.navigation.navigate('ClientHome');

    };

    addMyLog = (date, symptomsBefore, symptomsAfter, awakeBefore, typeBefore, severityBefore, headBefore, frontBefore, bodyBefore, sideBefore, urineBefore, defBefore, droolBefore, paddlingBefore, duration, medicationAfter) => {
        const db = firebase.firestore();
        const curUser = firebase.auth().currentUser;

        const petRef = db.collection('users').doc(curUser.uid).collection('pets')
        .doc(this.state.pet).collection('seizureLogs').doc(date + ' Seizure Log');
        petRef.set({
            date,
            symptomsBefore,
            symptomsAfter,
            awakeBefore,
            typeBefore,
            severityBefore,
            headBefore,
            frontBefore,
            bodyBefore,
            sideBefore,
            urineBefore,
            defBefore,
            droolBefore,
            paddlingBefore,
            duration,
            medicationAfter,
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
        const awakeButtons = ['Awake', 'Asleep', 'Unknown'];
        const typeButtons = ['Generalized', 'Focal', 'Unknown'];
        const severityButtons = ['Mild', 'Moderate', 'Severe', 'Unknown'];
        const headButtons = ['Yes', 'No', 'Unknown'];
        const frontButtons = ['Forelimbs', 'Hindlimbs', 'Unknown'];
        const bodyButtons = ['Relaxed', 'Stiff', 'Unknown'];
        const sideButtons = ['Right', 'Left', 'Equal', 'Unknown'];
        const urineButtons = ['Yes', 'No', 'Unknown'];
        const defButtons = ['Yes', 'No', 'Unknown'];
        const droolButtons = ['Yes', 'No', 'Unknown'];
        const paddlingButtons = ['Yes', 'No', 'Unknown'];
        const { awakeIndex, typeIndex, severityIndex, headIndex, frontIndex
        , bodyIndex, sideIndex, urineIndex, defIndex, droolIndex, paddlingIndex } = this.state;
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
                                    buttons={awakeButtons}
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
                                    <Text style={styles.buttonGroup}>
                                        Please fill in all information regarding the seizure event you are able: </Text>
                                </View>
                                <View style={{marginTop: h(3), marginBottom: h(3)}}>
                                    <Button color='#101d26' title="What time did the seizure start?" onPress={this.showDateTimePicker} />
                                    <DateTimePicker
                                        isVisible={this.state.isDateTimePickerVisible}
                                        onConfirm={this.handleDatePicked}
                                        onCancel={this.hideDateTimePicker}
                                        mode='time'
                                    />
                                </View>
                                <Text style={styles.buttonGroup}>
                                    Type of seizure, generalzied (entire body) or partial (specific parts): </Text>
                                <ButtonGroup
                                    onPress={this.updateType}
                                    selectedIndex={typeIndex}
                                    buttons={typeButtons}
                                    containerStyle={{height: 40}}
                                />
                                <Text style={styles.buttonGroup}>
                                    Severity of seizure: </Text>
                                <ButtonGroup
                                    onPress={this.updateSeverity}
                                    selectedIndex={severityIndex}
                                    buttons={severityButtons}
                                    containerStyle={{height: 40}}
                                />
                                <Text style={styles.buttonGroup}>
                                    Head affected first: </Text>
                                <ButtonGroup
                                    onPress={this.updateHead}
                                    selectedIndex={headIndex}
                                    buttons={headButtons}
                                    containerStyle={{height: 40}}
                                />
                                <Text style={styles.buttonGroup}>
                                    Part of body affected first: </Text>
                                <ButtonGroup
                                    onPress={this.updateFront}
                                    selectedIndex={frontIndex}
                                    buttons={frontButtons}
                                    containerStyle={{height: 40}}
                                />
                                <Text style={styles.buttonGroup}>
                                    Dogs body state: </Text>
                                <ButtonGroup
                                    onPress={this.updateBody}
                                    selectedIndex={bodyIndex}
                                    buttons={bodyButtons}
                                    containerStyle={{height: 40}}
                                />
                                <Text style={styles.buttonGroup}>
                                    Side of the body affected first: </Text>
                                <ButtonGroup
                                    onPress={this.updateSide}
                                    selectedIndex={sideIndex}
                                    buttons={sideButtons}
                                    containerStyle={{height: 40}}
                                />
                                <Text style={styles.buttonGroup}>
                                    Urination present: </Text>
                                <ButtonGroup
                                    onPress={this.updateUrine}
                                    selectedIndex={urineIndex}
                                    buttons={urineButtons}
                                    containerStyle={{height: 40}}
                                />
                                <Text style={styles.buttonGroup}>
                                    Defecation present: </Text>
                                <ButtonGroup
                                    onPress={this.updateDef}
                                    selectedIndex={defIndex}
                                    buttons={defButtons}
                                    containerStyle={{height: 40}}
                                />
                                <Text style={styles.buttonGroup}>
                                    Drooling or foaming at mouth: </Text>
                                <ButtonGroup
                                    onPress={this.updateDrool}
                                    selectedIndex={droolIndex}
                                    buttons={droolButtons}
                                    containerStyle={{height: 40}}
                                />
                                <Text style={styles.buttonGroup}>
                                    Paddling of legs present: </Text>
                                <ButtonGroup
                                    onPress={this.updatePaddling}
                                    selectedIndex={paddlingIndex}
                                    buttons={paddlingButtons}
                                    containerStyle={{height: 40}}
                                />
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
                                <Text style={{color:'white', fontSize: 16, marginTop: h(3), marginBottom: h(1), 
                                    marginLeft: w(2), marginRight: w(2)}}>
                                    Duration of seizure (in minutes): 
                                </Text>
                                <SmallInputField
                                    placeholder="Duration"
                                    style={styles.inputL}
                                    keyboardType="numeric"
                                    focus={this.changeInputFocus}
                                    ref={ref => this.duration = ref}
                                />
                                <Text style={{color:'white', fontSize: 16, marginTop: h(3), marginBottom: h(1), 
                                    marginLeft: w(2), marginRight: w(2)}}>
                                    Symptoms shown after seizure: 
                                </Text>
                                <View style={{flexDirection: 'column', backgroundColor: '#101d26', 
                                    borderColor: 'white', borderWidth: 1, width: '93%', height: '15%'}}>  
                                    <TextInput style={{ color: 'white', textAlignVertical: 'top'}}
                                    multiline = {true} numberOfLines = {4} 
                                    onChangeText={(symptomsAfter) => this.setState({symptomsAfter})} value={this.state.symptomsAfter} 
                                    placeholderTextColor= {'white'} />
                                </View>
                                <Text style={{color:'white', fontSize: 15, marginTop: h(4)}}>Indicate any medications given during: </Text>
                                <InputField
                                    placeholder="Medication"
                                    autoCapitalize="words"
                                    focus={this.changeInputFocus}
                                    style={styles.input}
                                    ref={ref => this.medicationAfter = ref}
                                />
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