import React, { Component } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import {w, h, totalSize} from "../../../../../FirebaseLogin/api/Dimensions";
import Icon from 'react-native-vector-icons/Ionicons';

/*
  Acts as a touchable button for displaying each pet in the PetList page.
  Displays a pet's name and passes properties through it to the function called
  onPress. Will link to Pet Info page with all pet properties passed to that page 
  for display.
*/
export default class CreateLogButton extends Component {

  // Renders Touchable Opacity button 
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={this.props.click}
        style={styles.button}>
        <Icon style={{marginLeft: w(3.5)}} name="md-paw" color = 'white' size={23} />
        <Text style={styles.text}>{this.props.name}</Text>
      </TouchableOpacity>
    );
  }
}

CreateLogButton.propTypes = {
  click: PropTypes.func.isRequired,
  age: PropTypes.string.isRequired,
  breed: PropTypes.string.isRequired,
  dateString: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  sex: PropTypes.string.isRequired,
  symptoms: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  button: {
    width: w(80),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#101d26',
    paddingVertical: w(2),
    borderRadius: w(0),
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginVertical: h(1),
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    marginLeft: w(3) 
  },
  spinner: {
    height: h(5),
  },
  text: {
    color: 'white',
    fontWeight: '500',
    paddingVertical: h(1),
    fontSize: totalSize(3.5),
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    marginLeft: w(5)
  }
});