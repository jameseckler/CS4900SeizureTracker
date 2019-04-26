import React from "react";
import { FlatList } from "react-native";
import { List, ListItem } from "react-native-elements";
import * as firebase from "firebase";

/*
    Function for retrieving the pet list based on the owners unique ID
*/
export default function getPetList (ownerID) {

    // Initates firestore from firebase
    var fb = firebase.firestore();

    // One state including pets array that holds all pets of owner
    this.state = ({
        pets: []
    });

    // Retrieves pet information for each pet belonging to ownerID
    for (id in ownerID) {
        var user = fb.collection('users').doc(id);

        userPets = user.collection('pets');

        user = user.get();            

        userPets.onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                pets.push({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    petName: pet.get().name
                })
            })
        })
        
    };

    // Returns list items of each pet along with information to pass
    return (
        <List>
            <FlatList
                data= { this.state.pets }
                renderItem = {({ pet, index }) => (
                    <ListItem
                        title = { pet.petName }
                        subtitle = {`${pet.firstName} ${pet.lastName}`}
                        keyExtractor = {(item, index) => index.toString()}
                    />
                )}
            />
        </List>
    );

}
