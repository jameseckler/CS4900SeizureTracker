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
    this.ref = firebase.firestore().collection('users').doc(curUser.uid).collection('pets');
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot((querySnapshot) => {
      const pets = [];
      querySnapshot.forEach((doc) => {
        pets.push({
          age: doc.data().age,
          breed: doc.data().breed,
          date: doc.data().date,
          description: doc.data().description,
          name: doc.data().petName,
          sex: doc.data().sex,
          symptoms: doc.data().symptoms,
          weight: doc.data().weight,
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
                    petObj: item
                  })} 
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

            <Icon
              name = 'add-circle-outline'
              color='white'
              onPress={() => this.props.navigation.navigate('AddPet')}
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