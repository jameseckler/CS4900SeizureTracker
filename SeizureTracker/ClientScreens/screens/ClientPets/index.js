import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import 'firebase/firestore';

export default class ClientPets extends Component{

render() {
    return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Client Pets</Text>
    </View>
    );
}
}