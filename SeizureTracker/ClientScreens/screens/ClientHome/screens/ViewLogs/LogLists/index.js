import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, Picker, KeyboardAvoidingView, DatePickerAndroid } from 'react-native';
import 'firebase/firestore';
import * as firebase from 'firebase';
import {w, h, totalSize} from "../../../../../../FirebaseLogin/api/Dimensions/";
import { Header } from 'react-navigation';
import PetListItems from '../../MyPets/PetListItems';

const background = require('../../../../../../assets/background.png');


export default class LogLists extends Component{

    constructor () {

        super()
        this.state = {
            otherLogs: true,
            seizureLogs: false,
            medLogs: false,
            selectedIndex: 0,
            seizureList: [],
            petName: '',
            petObj: '',
        }
        this.updateIndex = this.updateIndex.bind(this)

        const { navigation } = this.props;
        const petObj = navigation.getParam('petObj', 'Error: no pet found');

        // Initiates current user to curUser using Firebase API call
        const curUser = firebase.auth().currentUser;
        // Gets reference to user's pet's logs based off user uid and pet name
        this.seizureRef = firebase.firestore().collection('users').doc(curUser.uid).collection('pets').doc(petObj.name);
      }
    
      // On mount, gather all current user's pet's and their data
      componentDidMount() {
        this.unsubscribe = this.seizureRef.onSnapshot((querySnapshot) => {
          const seizureList = [];
          querySnapshot.forEach((doc) => {
            seizureList.push({
              awakeBefore: doc.data().awakeBefore,
            });
          });
          this.setState({
            seizureList: seizureList,
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
                  this.state.epilepsyInfo ?  
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: h(4)}}>
                    <FlatList 
                      data = {this.state.petList}
                      // Renders each item in the petList state array by passing the pet object to PetListItems
                      renderItem = {({ item, index }) => {
                        // Returns PetListItems component which is a touchable button linking to each pet's info page
                        return (
                          <PetListItems click={()=> this.props.navigation.navigate('LogInfo', {
                            seizureLogObj: item // object contains pet fields
                          })} 
                          
                          />
                        );
                      }}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
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
                              
                          </View>
                      </ScrollView>
                  </KeyboardAvoidingView>
                  : null
              }
                              {
                  this.state.treatmentInfo ? 
                  <KeyboardAvoidingView 
                      keyboardVerticalOffset = {Header.HEIGHT + 20} 
                      style={{flex: 1}}
                      behavior="padding">
                      <ScrollView>
                          <View style={styles.container}>
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