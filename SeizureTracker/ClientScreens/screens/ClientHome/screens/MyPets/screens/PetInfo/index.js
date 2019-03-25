import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import 'firebase/firestore';
import {w, h, totalSize} from "../../../../../../../FirebaseLogin/api/Dimensions";
import CreateLogButton from '../../../../CreateLogButton';
import ViewLogsButton from '../../../../ViewLogsButton';

const background = require('../../../../../../../assets/background.png')
const placehold = require('../../../../../../../assets/upload.png')

export default class PetInfo extends Component{
  
    render() {
        const { navigation } = this.props;
        const petObj = navigation.getParam('petObj', 'Error: no pet found');


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
                <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'flex-end', marginTop: h(2)}}>
                    <CreateLogButton click={()=> this.props.navigation.navigate('CreateLog') } />
                    <ViewLogsButton click={()=> this.props.navigation.navigate('ViewLogs') } />
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
        flexDirection: 'row',
        paddingVertical: w(3.4),
        borderRadius: w(6),
        borderColor: 'white',
        borderWidth: 1,
        width: '93%',
        height: '93%'
    }
  });