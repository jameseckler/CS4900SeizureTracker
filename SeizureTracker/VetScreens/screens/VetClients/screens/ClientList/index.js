import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, FlatList } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {w, h, totalSize} from "../../../../../FirebaseLogin/api/Dimensions";
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';
import { Icon } from 'react-native-elements';
import ClientListItems from "./ClientListItems.js";

const background = require('../../../../../assets/background.png');

export default class ClientList extends Component{
  
  constructor(props) {
    super(props)
    this.state = ({
      clientList: []
    });
    const curUser = firebase.auth().currentUser;
    this.ref = firebase.firestore().collection('users').doc(curUser.uid).collection('clients');
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot((querySnapshot) => {
      const clients = [];
      querySnapshot.forEach((doc) => {
        clients.push({
          clientName: doc.data().name
        });
      });

      this.setState({
        clientList: clients,
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
              data = {this.state.clientList}
              renderItem = {({ item, index }) => {
                return (
                  <ClientListItems click={() => this.props.navigation.navigate('VetHome')} text={item.clientName}/>
                )
              }}
              keyExtractor={(item, index) => index.toString()}
            />

            <Icon
              name = 'add-circle-outline'
              color='white'
              onPress={() => this.props.navigation.navigate('AddClient')}
              size={50}
              style={{marginTop:h(5), alignItems: 'flex-end', justifyContent: 'flex-end'}}
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