import React from 'react';
import renderer from 'react-test-renderer';
import CreateLogButton from '../ClientScreens/screens/ClientHome/CreateLogButton';

test ("Create Log Button renders properly", () => {
    
    const rendered = renderer.create(<CreateLogButton click={()=> this.props.navigation.navigate('LogType')} />).toJSON();
    expect(rendered).toBeTruthy();

});

it ("Test Create Log Button against snapshot", () => {

    const tree = renderer.create(<CreateLogButton click={()=> this.props.navigation.navigate('LogType')}/>).toJSON();
    expect(tree).toMatchSnapshot();

});