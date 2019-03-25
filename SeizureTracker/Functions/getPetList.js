import React from "react";
import { FlatList } from "react-native";
import { List, ListItem } from "react-native-elements";
import * as firebase from "firebase";

export default function getPetList (ownerID) {

    var fb = firebase.firestore();

    this.state = ({
        pets: []
    });

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
