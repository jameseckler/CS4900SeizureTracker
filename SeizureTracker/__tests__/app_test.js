import React from 'react';
<<<<<<< HEAD
import App from '../App';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
=======
import renderer from 'react-test-renderer';
import App from '../App';

it('App renders without crashing', () => {
    const rendered = renderer.create(<App />).toJSON();
    expect(rendered).toBeTruthy();
});

it('App test against snapshot', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
>>>>>>> master
});