import React, { Component } from 'react';
import { StyleSheet, Button, View, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import 'firebase/firestore';
import * as firebase from 'firebase';
import {w, h, totalSize} from "../../../../../FirebaseLogin/api/Dimensions";
import { Icon } from 'react-native-elements';
import PetListItems from './PetListItems';

// Background image
const background = require('../../../../../assets/background.png');

/*
  MyPets contains a list of all the current client's pets 
  in alphabetical order. Gathers user pet data from FireStore on
  component mounting.
*/
export default class MyPets extends Component{

  constructor(props){
    super(props)
    // State contains a petList array containing all of the current user's pets
    this.state = ({
      petList: []
    });
    // Initiates current user to curUser using Firebase API call
    const curUser = firebase.auth().currentUser;
    // Gets reference to user's pets based off user uid
    this.ref = firebase.firestore().collection('users').doc(curUser.uid).collection('pets');
  }

  // On mount, gather all current user's pet's and their data
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

  // Must unsubscribe upon unmounting
  componentWillUnmount(){
    this.unsubscribe();
  }
    /*
      Renders a flat list containing a PetListItems component for each pet
      indicated in the state petList array. Passes all fields from that pet through
      an object called petObj which contains all pet fields.
    */
    render() {
      return(
        <ImageBackground source={background} style={{width: '100%', height: '100%'}}> 

          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: h(4)}}>
            <FlatList 
              data = {this.state.petList}
              // Renders each item in the petList state array by passing the pet object to PetListItems
              renderItem = {({ item, index }) => {
                // Returns PetListItems component which is a touchable button linking to each pet's info page
                return (
                  <PetListItems click={()=> this.props.navigation.navigate('PetInfo', {
                    petObj: item // object contains pet fields
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

            {/* Icon that appears at bottom of PetList and links to AddPet for adding more pets */}
            <Icon
              accessible={true} accessibilityLabel="Add a pet" accessibilityHint="Add a pet to your account"
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

  // Styles grouped, names indicate usage
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