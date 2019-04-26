import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {w, h, totalSize} from "../../../../../FirebaseLogin/api/Dimensions";
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';
import { Icon } from 'react-native-elements';
import VetListItems from "./VetListItems.js";

const background = require('../../../../../assets/background.png');

export default class MyVets extends Component{

  constructor(props) {
    super(props)
    this.state = ({
      vetList: []
    });
    const curUser = firebase.auth().currentUser;
    this.ref = firebase.firestore().collection('users').doc(curUser.uid).collection('vets');
  }
  
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot((querySnapshot) => {
      const vets = [];
      querySnapshot.forEach((doc) => {
        data = doc.data();
        vets.push({
          vetName: data.firstName + " " + data.lastName,
          id: doc.id
        });
      });

      this.setState({
        vetList: vets,
        loading: false,
      })
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

    render() {
      return(
        <ImageBackground source={background} style={{width: '100%', height: '100%'}}> 

          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <FlatList
              data = {this.state.vetList}
              renderItem = {({ item, index }) => {
                return (
                  <VetListItems click={() => this.props.navigation.navigate('ClientHome')} text={item.vetName}/>
                )
              }}
              keyExtractor={(item, index) => index.toString()}
            />
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
    }
  });