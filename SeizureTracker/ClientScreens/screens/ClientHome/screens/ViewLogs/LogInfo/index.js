import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import 'firebase/firestore';
import {w, h, totalSize} from "../../../../../../FirebaseLogin/api/Dimensions";

const background = require('../../../../../../assets/background.png');

export default class LogInfo extends Component{
  
    render() {
        const { navigation } = this.props;
        const seizureLogObj = navigation.getParam('seizureLogObj', 'Error: no log found');


        const shadowStyle={
            shadowOpacity:0.5,
            shadowRadius: 20,
            shadowColor: 'black',
            shadowOffset: {width:1,height:1}
        }
      return(
        <ImageBackground source={background} style={{width: '100%', height: '100%'}}> 

          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={[styles.viewStyle, shadowStyle]}>
              <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'flex-start', marginTop: h(.5)}}>
                  <Text style={{ color:'white', fontSize: totalSize(3)}}>{petObj.name}</Text>
                  <View style={{borderBottomColor: 'white', borderBottomWidth: 1, width: '100%', marginTop: h(2)}}/>
                  <View style={{ flex: 1, alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'flex-start', marginLeft: w(1.5),
                    marginTop: h(3)}}>
                    <View style={styles.row1}>
                      <Text style={styles.textField}>Awake before: <Text style={styles.textCus}>{seizureLogObj.awakeBefore}</Text> </Text>
                      <Text style={styles.textField}>Breed:  </Text>
                      <Text style={styles.textField}>1st Seizure:  </Text>
                    </View>
                    <View style={styles.row2}>
                      <Text style={styles.textField}>Sex:  </Text>
                      <Text style={styles.textField}>Age: </Text>
                      <Text style={styles.textField}>Weight:  </Text>
                    </View>
                  </View>
                  <View style={{borderBottomColor: 'white', borderBottomWidth: 1, width: '100%', marginTop: h(12)}}/>
                  <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: w(1)}}>
                    <Text style={styles.textField2}>Description:  </Text>
                    <Text style={styles.textField3}>Symptoms:  </Text>
                  </View>
              </View>
            </View>
          </View>

        </ImageBackground>
      );
    }
  }

  const styles = StyleSheet.create({
    viewStyle: {
        backgroundColor: '#101d26',
        flexDirection: 'column',
        paddingVertical: w(3.4),
        borderRadius: w(6),
        borderColor: 'white',
        borderWidth: 1,
        width: '93%',
        height: '93%'
    },
    row1: {
      flex: 1, 
      alignItems: 'flex-start', 
      flexDirection: 'column', 
      justifyContent: 'flex-start', 
      marginLeft: w(4),
      marginRight: w(3.8),
    },
    row2: {
      flex: 1, 
      alignItems: 'flex-start', 
      flexDirection: 'column', 
      justifyContent: 'flex-start', 
      marginLeft: w(3.8)
    },
    textField: {
      fontSize: totalSize(2.3),
      color: 'white',
      fontWeight: '400',
      marginBottom: h(1)
    },
    textField2: {
      fontSize: totalSize(2.1),
      color: 'white',
      fontWeight: '400',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      marginTop: h(1),
      marginBottom: h(3)
    },
    textField3: {
      fontSize: totalSize(2.1),
      color: 'white',
      fontWeight: '400',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    textCus: {
      fontSize: totalSize(2.1),
      color: 'white'
    },
    textBio: {
      fontSize: totalSize(1.7),
      color: 'white'
    }
  });