import React, { Component } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import {w, h, totalSize} from "../../../../FirebaseLogin/api/Dimensions";

/*
  Logout component that contains a button with Logout text
  Will be used to call logOut() function in ClientSettings
*/
export default class Logout extends Component {

  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={this.props.click}
        style={styles.button}>
        {this.props.isCreating
        ? <ActivityIndicator size="large" style={styles.spinner} color='white' />
        : <Text style={styles.text}>Logout</Text>}
      </TouchableOpacity>
    );
  }
}

// Properties to indicate function on click and check logout success
Logout.propTypes = {
  click: PropTypes.func.isRequired,
  isOut: PropTypes.bool.isRequired,
};


// Styles grouped, names indicate usage
const styles = StyleSheet.create({
  button: {
    width: w(85),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingVertical: w(2),
    borderRadius: w(10),
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginVertical: h(1),
  },
  spinner: {
    height: h(5),
  },
  text: {
    color: 'white',
    fontWeight: '600',
    paddingVertical: h(1),
    fontSize: totalSize(2.2),
  }
});
