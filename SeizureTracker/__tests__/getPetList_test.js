import renderer from 'react-test-renderer';
import getPetList from "../Functions/getPetList";
import * as firebase from "firebase";
import { isExportDeclaration } from 'typescript';

user = "C9lE9n3cQ5aiMfLLne6w4voa4bI3";
var IDs = ["C9lE9n3cQ5aiMfLLne6w4voa4bI3", "FyfHyE1duxWUCCKhwdxGgYaBvbA2"];

firebase.initializeApp({
    projectId: "pet-seizure-tracker"
});

it ("Retrieved list of pets from single ID", () => {

    const rendered = renderer.create(getPetList(user)).toJSON();
    expect(rendered).toBeTruthy();

});

it ("Test single ID against snapshot", () => {
    const tree = renderer.create(getPetList(user)).toJSON();
    expect(tree).toMatchSnapshot();
});

it ("Retrieved list of pets from array of IDs", () => {

    const rendered = renderer.create(getPetList(IDs)).toJSON();
    expect(rendered).toBeTruthy();

});

it ("Test multiple IDs against snapshot", () => {

    const tree = renderer.create(getPetList(IDs)).toJSON();
    expect(tree).toMatchSnapshot();
    
});