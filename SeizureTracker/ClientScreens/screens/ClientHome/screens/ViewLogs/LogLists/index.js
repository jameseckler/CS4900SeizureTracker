import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, Picker, KeyboardAvoidingView, FlatList  } from 'react-native';
import 'firebase/firestore';
import * as firebase from 'firebase';
import {w, h, totalSize} from "../../../../../../FirebaseLogin/api/Dimensions/";
import { Header } from 'react-navigation';
import PetListItems from '../../MyPets/PetListItems';
import { ButtonGroup } from 'react-native-elements';

const background = require('../../../../../../assets/background.png');


export default class LogLists extends Component{

    constructor () {

        super()
        this.state = {
            otherLogs: false,
            seizureLogs: true,
            medLogs: false,
            selectedIndex: 0,
            seizureList: [],
            medList: [],
            otherList: [],
            petName: '',
            petObj: '',
        }
        this.updateIndex = this.updateIndex.bind(this)


      }
    
      // On mount, gather all current user's pet's and their data
      componentDidMount() {

        const { navigation } = this.props;
        const petObj = navigation.getParam('petObj', 'Error: no pet found');

        // Initiates current user to curUser using Firebase API call
        const curUser = firebase.auth().currentUser;
        // Gets reference to user's pet's logs based off user uid and pet name
        this.seizureRef = firebase.firestore().collection('users').doc(curUser.uid).collection('pets').doc(petObj.name).collection('seizureLogs');

        this.unsubscribe = this.seizureRef.onSnapshot((querySnapshot) => {
          const seizureList = [];
          querySnapshot.forEach((doc) => {
            seizureList.push({
              awakeBefore: doc.data().awakeBefore,
              bodyBefore: doc.data().bodyBefore,
              defBefore: doc.data().defBefore,
              droolBefore: doc.data().droolBefore,
              duration: doc.data().duration,
              frontBefore: doc.data().frontBefore,
              headBefore: doc.data().headBefore,
              medicationAfter: doc.data().medicationAfter,
              paddlingBefore: doc.data().paddlingBefore,
              severityBefore: doc.data().severityBefore,
              sideBefore: doc.data().sideBefore,
              symptomsAfter: doc.data().symptomsAfter,
              symptomsBefore: doc.data().symptomsBefore,
              typeBefore: doc.data().typeBefore,
              urineBefore: doc.data().urineBefore,
              date: doc.data().date,
            });
          });
          this.setState({
            seizureList: seizureList,
            loading: false,
          })
        })

        
        // Gets reference to pet's med logs
        this.medRef = firebase.firestore().collection('users').doc(curUser.uid).collection('pets').doc(petObj.name).collection('medLogs');

        this.unsubscribe = this.medRef.onSnapshot((querySnapshot) => {
          const medList = [];
          querySnapshot.forEach((doc) => {
            medList.push({
              description: doc.data().description,
              date: doc.data().date,
              medDosage: doc.data().medDosage,
              medFreq: doc.data().medFreq,
              medLogName: doc.data().medLogName,
              medSide: doc.data().medSide,
            });
          });
          this.setState({
            medList: medList,
            loading: false,
          })
        })


        // Gets reference to pet's other logs
        this.otherRef = firebase.firestore().collection('users').doc(curUser.uid).collection('pets').doc(petObj.name).collection('otherLogs');

        this.unsubscribe = this.otherRef.onSnapshot((querySnapshot) => {
          const otherList = [];
          querySnapshot.forEach((doc) => {
            otherList.push({
              date: doc.data().date,
              details: doc.data().details,
              logType: doc.data().logType,
            });
          });
          this.setState({
            otherList: otherList,
            loading: false,
          })
        })


      }
    
      // Must unsubscribe upon unmounting
      componentWillUnmount(){
        this.unsubscribe();
      }

    updateIndex (selectedIndex) {
      this.setState({selectedIndex})

      if(selectedIndex === 0){
        this.setState({seizureLogs: true});
        this.setState({medLogs: false});
        this.setState({otherLogs: false});
      }else if(selectedIndex === 1){
        this.setState({seizureLogs: false});
        this.setState({medLogs: true});
        this.setState({otherLogs: false});
      }else if(selectedIndex === 2){
        this.setState({seizureLogs: false});
        this.setState({medLogs: false});
        this.setState({otherLogs: true});
      }

    }
  
    render() {
      const buttons = ['Seizure', 'Medication', 'Other'];
      const { selectedIndex } = this.state;
      return(
          <ImageBackground source={background} style={{width: '100%', height: '100%'}}> 
              <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column', 
              justifyContent: 'flex-start', marginTop: h(2)}}>
              <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{height: 30}}
              />
              {   
                  this.state.seizureLogs ?  
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: h(4)}}>
                    <FlatList 
                      data = {this.state.seizureList}
                      // Renders each item in the petList state array by passing the pet object to PetListItems
                      renderItem = {({ item, index }) => {
                        // Returns PetListItems component which is a touchable button linking to each pet's info page
                        return (
                          <PetListItems click={()=> this.props.navigation.navigate('LogInfo', {
                            seizureLogObj: item // object contains pet fields
                          })} 
                          name= {item.date}
                          awakeBefore = {item.awakeBefore}
                          date= {item.date}
                          bodyBefore = {item.bodyBefore}
                          defBefore = {item.defBefore}
                          droolBefore = {item.droolBefore}
                          duration = {item.duration}
                          frontBefore = {item.frontBefore}
                          headBefore = {item.headBefore}
                          medicationAfter = {item.medicationAfter}
                          paddlingBefore = {item.paddlingBefore}
                          severityBefore = {item.severityBefore}
                          sideBefore = {item.sideBefore}
                          symptomsAfter = {item.symptomsAfter}
                          symptomsBefore = {item.symptomsBefore}
                          typeBefore = {item.typeBefore}
                          urineBefore = {item.urineBefore}
                          />
                        );
                      }}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                  : null
              }
              {
                  this.state.medLogs ?  
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: h(4)}}>
                    <FlatList 
                      data = {this.state.medList}
                      // Renders each item in the petList state array by passing the pet object to PetListItems
                      renderItem = {({ item, index }) => {
                        // Returns PetListItems component which is a touchable button linking to each pet's info page
                        return (
                          <PetListItems click={()=> this.props.navigation.navigate('MedLogInfo', {
                            medLogObj: item // object contains pet fields
                          })} 
                          description= {item.description}
                          name= {item.date}
                          medDosage={item.medDosage}
                          medFreq={item.medFreq}
                          medLogName={item.medLogName}
                          medSide={item.medSide}
                          />
                        );
                      }}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                  : null
              }
                              {
                  this.state.otherLogs ? 
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: h(4)}}>
                    <FlatList 
                      data = {this.state.otherList}
                      // Renders each item in the petList state array by passing the pet object to PetListItems
                      renderItem = {({ item, index }) => {
                        // Returns PetListItems component which is a touchable button linking to each pet's info page
                        return (
                          <PetListItems click={()=> this.props.navigation.navigate('OtherLogInfo', {
                            otherLogObj: item // object contains pet fields
                          })} 
                          description= {item.description}
                          date ={item.date} 
                          details = {item.details}
                          logType = {item.logType}
                          name = {item.date}
                          />
                        );
                      }}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
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