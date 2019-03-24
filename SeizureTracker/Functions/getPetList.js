import React from "react";
import { FlatList } from "react-native";
import { List, ListItem } from "react-native-elements";
import * as firebase from "firebase";

function getPetList (ownerID) {

    
    var fb = firebase.firestore();

    var pets;
    var i = 0;
    for (id in ownerID) {
        var users = fb.collection('users').where('userID', "==", id).get();

        for (user in users) {
            var j = 0;
            while (j < user.pets.length) {
                pets[i] = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    petName: user.pets[j].doc                    
                };
                i++;
                j++;
            }
        }
    }

    return (
        <List>
            <FlatList
                data= { pets }
                renderItem = {({ pet }) => (
                    <ListItem
                        title = { user.petName }
                        subtitle = {`${user.firstName} ${user.lastName}`}
                        keyExtractor = { user }
                    />
                )}
            />
        </List>
    );

}

export default getPetList;
