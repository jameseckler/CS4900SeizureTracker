import React from "react";
import { FlatList } from "react-native";
import { List, ListItem } from "react-native-elements";
import * as firebase from "firebase";

export default function getPetList (ownerID) {

    
    var fb = firebase.firestore();

    var pets = [];
    for (id in ownerID) {
        var users = fb.collection('users').where('userID', "==", id).get();

        for (user in users) {
            userPets = user.pets;

            for (pet in userPets) {
                pets.push({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    petName: pet.name
                });
            }
        }
    }

    return (
        <List>
            <FlatList
                data= { pets }
                renderItem = {({ pet }) => (
                    <ListItem
                        title = { pet.petName }
                        subtitle = {`${pet.firstName} ${pet.lastName}`}
                        keyExtractor = { pet.firstName }
                    />
                )}
            />
        </List>
    );

}
