import React from 'react';
import config from '../config';
import MyVets from '../ClientScreens/screens/ClientHome/screens/MyVets';
import * as firebase from 'firebase';
import renderer from 'react-test-renderer';
import { isExportDeclaration } from 'typescript';

firebase.initializeApp(config);

test ('MyVets renders correctly', () => {
    firebase.auth().signInWithEmailAndPassword("client@gmail.com", "client");
    console.log(firebase.auth().currentUser.uid);
    const tree = renderer.create(<MyVets/>).toJSON();
    expect(tree).toMatchSnapshot();
});