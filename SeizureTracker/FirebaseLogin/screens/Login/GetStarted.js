import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import {w, h, totalSize} from '../../api/Dimensions';

/*
  Class component that contains the login button via TouchableOpacity
  Styled with ease of use and activity indicator
*/
export default class GetStarted extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.click}
        style={styles.button}
        activeOpacity={0.6}
      >
        {/* Text within button along with activity indicator spinner when pressed */}
        {this.props.isLogin
          ? <ActivityIndicator size="large" style={styles.spinner} color='white' />
          : <Text style={styles.text}>GET STARTED</Text>}
      </TouchableOpacity>
    );
  }
}

// Properties to indicate function on click and text displayed
GetStarted.propTypes = {
  click: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired,
};

// Styles grouped, names indicate usage
const styles = StyleSheet.create({
  button: {
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: w(2),
    backgroundColor: '#888',
    borderRadius: w(10),
    marginTop: h(8),
  },
  text: {
    color: 'white',
    fontWeight: '700',
    paddingVertical: h(1),
    fontSize: totalSize(2.1),
  },
  spinner: {
    height: h(5),
  },
});
