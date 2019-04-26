import React, { Component } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import {w, h, totalSize} from "../../api/Dimensions";

/*
  Class component that contains the Registration submit button via TouchableOpacity
  Styled with ease of use and activity indicator
*/
export default class Continue extends Component {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={this.props.click}
        style={styles.button}>
        {/* Text within button along with activity indicator spinner when pressed */}
        {this.props.isCreating
        ? <ActivityIndicator size="large" style={styles.spinner} color='white' />
        : <Text style={styles.text}>Continue</Text>}
      </TouchableOpacity>
    );
  }
}

// Properties to indicate function on click and text displayed
Continue.propTypes = {
  click: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired,
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
