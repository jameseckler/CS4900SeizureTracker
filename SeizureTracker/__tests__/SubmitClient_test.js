import React from 'react';
import renderer from 'react-test-renderer';
import SubmitClient from '../VetScreens/screens/VetHome/screens/MyClients/AddClient/SubmitClient';

test ("Submit Client renders properly", () => {
    
    const rendered = renderer.create(<SubmitClient click={function() {}}/>).toJSON();
    expect(rendered).toBeTruthy();

});

it ("Test Submit Client against snapshot", () => {

    const tree = renderer.create(<SubmitClient click={function() {}}/>).toJSON();
    expect(tree).toMatchSnapshot();

});