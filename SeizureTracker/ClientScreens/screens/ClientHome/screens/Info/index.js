import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Picker, TouchableOpacity, KeyboardAvoidingView, ScrollView, Image} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import 'firebase/firestore';
import {w, h, totalSize} from "../../../../../FirebaseLogin/api/Dimensions";
import SubmitButton from '../../screens/CreateLog/screens/LogType/components/SubmitButton';
import { Header } from 'react-navigation';

const background = require('../../../../../assets/background.png');


export default class Info extends Component{

    constructor () {

        super()
        this.state = {
            epilepsyInfo: true,
            seizureInfo: false,
            treatmentInfo: false,
            selectedIndex: 0
        }
        this.updateIndex = this.updateIndex.bind(this)
      }

    updateIndex (selectedIndex) {
      this.setState({selectedIndex})

      if(selectedIndex === 0){
        this.setState({epilepsyInfo: true});
        this.setState({seizureInfo: false});
        this.setState({treatmentInfo: false});
      }else if(selectedIndex === 1){
        this.setState({epilepsyInfo: false});
        this.setState({seizureInfo: true});
        this.setState({treatmentInfo: false});
      }else if(selectedIndex === 2){
        this.setState({epilepsyInfo: false});
        this.setState({seizureInfo: false});
        this.setState({treatmentInfo: true});
      }

    }
  
    render() {
      const buttons = ['Epilepsy', 'Seizures'];
      const { selectedIndex } = this.state;
      return(
          <ImageBackground source={background} style={{width: '100%', height: '100%'}}> 
              <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column', 
              justifyContent: 'flex-start', marginTop: h(2)}}>
              <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{height: 20}}
              />
              {   
                  this.state.epilepsyInfo ?  
                  <KeyboardAvoidingView 
                      keyboardVerticalOffset = {Header.HEIGHT + 20} 
                      style={{flex: 1}}
                      behavior="padding">
                      <ScrollView>
                          <View style={styles.container}>
                            <Text style={styles.questionText}>
                              What are seizures?
                            </Text>
                            <Text style={styles.descriptionText}>
                              Seizures are one of the most frequently 
                              reported neurological conditions in dogs. 
                              A seizure may also be called a convulsion or fit, 
                              and is a temporary involuntary disturbance of 
                              normal brain function that is usually accompanied by 
                              uncontrollable muscle activity.
                            </Text>
                            <Text style={styles.questionText}>
                              What is Epilepsy?
                            </Text>
                            <Text style={styles.descriptionText}>
                              Epilepsy is a term used to describe 
                              repeated episodes of seizures. 
                              With epilepsy, the seizures can be single 
                              or may occur in clusters, 
                              and they can be infrequent and unpredictable 
                              or may occur at regular intervals.
                            </Text>
                          </View>
                      </ScrollView>
                  </KeyboardAvoidingView>
                  : null
              }
              {
                  this.state.seizureInfo ?  
                  <KeyboardAvoidingView 
                      keyboardVerticalOffset = {Header.HEIGHT + 20} 
                      style={{flex: 1}}
                      behavior="padding">
                      <ScrollView>
                          <View style={styles.container}>
                              <Text style={styles.questionText}>
                                What do I do if my pet has a seizure?
                              </Text>
                              <Text style={styles.descriptionText}>
                                Firstly, remain calm. Cats and dogs do not swallow their tongues, so you should not try to hold their tongue during the seizure. If the seizure 
                                occurs near a dangerous area such as stairs or a ledge, gently move them from the area.  
                                Know that your pet is not in pain or even conscious during the seizure, and that they may urinate or deficate.
                                </Text>
                                <Text style={styles.descriptionText}>
                                Try to commit to memory details such as the time of the seizure and how long it lasts. When creating logs in this application, you will 
                                be given a series of questions that your veterinarian can use to help create a treatment plan for your pet, so knowing the answers to these questions is helpful. 
                                You should create the seizure log as soon as you can, as details will be harder to remember the longer you wait.
                              </Text>
                              <Text style={styles.questionText}>
                                What should I do after the seizure?
                              </Text>
                              <Text style={styles.descriptionText}>
                                Contact your veterinarian as soon as possible. Seizures longer than 2-3 minutes may lead to hyperthermia, be ready with cold water or a wet towel 
                                and apply around your pet's body to help them cool down. If the seizure is longer than five minutes or if a second seizure occurs before complete 
                                consciousness, get emergency help for your pet immediately.
                              </Text>
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
    },
    questionText: {
      color:'white',
      fontSize: totalSize(2.5),
      marginTop: h(7),
      marginBottom: h(4),
      fontWeight: '700',
    },
    descriptionText: {
      color:'white',
      fontSize: totalSize(1.5),
    },
  });