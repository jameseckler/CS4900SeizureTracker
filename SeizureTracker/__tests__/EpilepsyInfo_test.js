import React from 'react';
import renderer from 'react-test-renderer';
import Info from '../ClientScreens/screens/ClientHome/screens/Info';

test ("Create Log Button renders properly", () => {
    
    const rendered = renderer.create(<Info />).toJSON();
    expect(rendered).toBeTruthy();

});

it ("Test Create Log Button against snapshot", () => {

    const tree = renderer.create(<Info />).toJSON();
    expect(tree).toMatchSnapshot();

});