import React, { Component } from 'react';
import { StyleSheet, Button, View, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import 'firebase/firestore';
import * as firebase from 'firebase';
import {w, h, totalSize} from "../../../../../FirebaseLogin/api/Dimensions";
import { Icon } from 'react-native-elements';
import PetListItems from './PetListItems';

const background = require('../../../../../assets/background.png');


export default class MyPets extends Component{

  constructor(props){
    super(props)
    this.state = ({
      petList: []
    });
    const curUser = firebase.auth().currentUser;
    this.ref = firebase.firestore().collection('users').doc(curUser.uid).collection('clients');
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot((querySnapshot) => {
      const pets = [];
      querySnapshot.forEach((doc) => {
        firebase.firestore().collection('users').doc(doc.id).collection('pets').onSnapshot((snap) => {
          snap.forEach((d) => {
            
          pets.push({
            age: d.data().age,
              breed: d.data().breed,
              date: d.data().date,
              description: d.data().description,
              name: d.data().petName,
              sex: d.data().sex,
              symptoms: d.data().symptoms,
              weight: d.data().weight,
            owner: doc.data().firstName + " " + doc.data().lastName
          });
        });
        });
      });
      this.setState({
        petList: pets,
        loading: false,
      })
    })
  }

  componentWillUnmount(){
    this.unsubscribe();
  }
  
    render() {
      return(
        <ImageBackground source={background} style={{width: '100%', height: '100%'}}> 

          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: h(4)}}>
            <FlatList 
              data = {this.state.petList}
              renderItem = {({ item, index }) => {
                return (
                  <PetListItems click={()=> this.props.navigation.navigate('PetInfo', {
                    petObj: item // object contains pet fields
                  })} text= {item.name} 
                  age= {item.age}
                  breed= {item.breed}
                  dateString= {item.date}
                  description= {item.description}
                  name= {item.name}
                  sex= {item.sex}
                  symptoms= {item.symptoms}
                  weight= {item.weight}
                  />
                );
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