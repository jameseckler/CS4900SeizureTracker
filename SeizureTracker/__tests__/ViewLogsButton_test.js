import React from 'react';
import renderer from 'react-test-renderer';
import ViewLogsButton from '../ClientScreens/screens/ClientHome/ViewLogsButton';

test ("View Logs Button renders properly", () => {
    
    const rendered = renderer.create(<ViewLogsButton click={()=> this.props.navigation.navigate('ViewLogs')} />).toJSON();
    expect(rendered).toBeTruthy();

});

it ("Test View Logs Button against snapshot", () => {

    const tree = renderer.create(<ViewLogsButton click={()=> this.props.navigation.navigate('ViewLogs')}/>).toJSON();
    expect(tree).toMatchSnapshot();

});