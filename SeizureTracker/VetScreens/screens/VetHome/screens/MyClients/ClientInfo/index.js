import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {w, h, totalSize} from "../../../../../../FirebaseLogin/api/Dimensions";
import PetListItems from '../../MyPets';

const background = require('../../../../../../assets/background.png')
const placehold = require('../../../../../../assets/upload.png')

export default class PetInfo extends Component{

    constructor(props){
        super(props)
        // State contains a petList array containing all of the current user's pets
        this.state = ({
          petList: []
        });
        const { navigation } = this.props;
        // Get parameters from clients screen
        this.clientObj = navigation.getParam('clientObj', 'Error: no client found');
        // Gets reference to client's pets based off user uid
        this.ref = firebase.firestore().collection('users').doc(this.clientObj.id).collection('pets');
      }
    
      // On mount, gather all current user's pet's and their data
      componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot((querySnapshot) => {
          const pets = [];
          querySnapshot.forEach((doc) => {
              console.log(doc.data());
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
  
    render() {
        
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
                  <Text style={{ color:'white', fontSize: totalSize(3)}}>{this.clientObj.name}</Text>
                  <View style={{borderBottomColor: 'white', borderBottomWidth: 1, width: '100%', marginTop: h(2)}}/>
                  <View style={{ flex: 1, alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'flex-start', marginLeft: w(1.5),
                    marginTop: h(3)}}>
                    <View style={styles.row1}>
                      <Text style={styles.textField}>Name: <Text style={styles.textCus}>{this.clientObj.name}</Text> </Text>
                    </View>
                  </View>
                  <View style={{borderBottomColor: 'white', borderBottomWidth: 1, width: '100%', marginTop: h(12)}}/>
                  <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: w(1)}}>
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