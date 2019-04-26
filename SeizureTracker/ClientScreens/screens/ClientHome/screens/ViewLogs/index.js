import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Picker, TouchableOpacity, KeyboardAvoidingView, ScrollView, Image} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import 'firebase/firestore';
import {w, h, totalSize} from "../../../../../FirebaseLogin/api/Dimensions";
import SubmitButton from '../../screens/CreateLog/screens/LogType/components/SubmitButton';
import { Header } from 'react-navigation';

const background = require('../../../../../assets/background.png');


export default class ViewLogs extends Component{

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
      const buttons = ['Epilepsy', 'Seizures', 'Treatment'];
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