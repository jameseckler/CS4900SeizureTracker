import React from 'react';
import renderer from 'react-test-renderer';
import Logout from '../ClientScreens/screens/ClientSettings/screens/Logout';

test ("Logout renders properly", () => {
    
    const rendered = renderer.create(<Logout click={function() {}} isOut={true}/>).toJSON();
    expect(rendered).toBeTruthy();

});

it ("Test Logout against snapshot", () => {

    const tree = renderer.create(<Logout click={function() {}} isOut={true}/>).toJSON();
    expect(tree).toMatchSnapshot();

});