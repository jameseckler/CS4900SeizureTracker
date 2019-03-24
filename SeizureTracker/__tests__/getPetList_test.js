import React from 'react';
import renderer from 'react-test-renderer';
import getPetList from "../Functions/getPetList";
import * as firebase from "firebase";
import config from '../config';

user = "C9lE9n3cQ5aiMfLLne6w4voa4bI3";
var IDs = ["C9lE9n3cQ5aiMfLLne6w4voa4bI3", "FyfHyE1duxWUCCKhwdxGgYaBvbA2"];

firebase.initializeApp(config);

it ("Retrieved list of pets from single ID", () => {

    const rendered = renderer.create(getPetList(user)).toJSON();
    expect(rendered).toBeTruthy();
    done();

});

it ("Test single ID against snapshot", () => {
    const tree = renderer.create(getPetList(user)).toJSON();
    expect(tree).toMatchSnapshot();
    done();
});

it ("Retrieved list of pets from array of IDs", () => {

    const rendered = renderer.create(getPetList(IDs)).toJSON();
    expect(rendered).toBeTruthy();
    done();

});

it ("Test multiple IDs against snapshot", () => {

    const tree = renderer.create(getPetList(IDs)).toJSON();
    expect(tree).toMatchSnapshot();
    done();

});