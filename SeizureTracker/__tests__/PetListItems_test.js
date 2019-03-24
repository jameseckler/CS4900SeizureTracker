import React from 'react';
import renderer from 'react-test-renderer';
import PetListItems from '../ClientScreens/screens/ClientHome/screens/MyPets/PetListItems';

test ("Pet List Items render properly", () => {
    
    const rendered = renderer.create(<PetListItems click={()=> this.props.navigation.navigate('ClientHome')} text='Test pet'/>).toJSON();
    expect(rendered).toBeTruthy();

});

it ("Test Pet List Items against snapshot", () => {

    const tree = renderer.create(<PetListItems click={()=> this.props.navigation.navigate('ClientHome')} text='Test pet'/>).toJSON();
    expect(tree).toMatchSnapshot();

});