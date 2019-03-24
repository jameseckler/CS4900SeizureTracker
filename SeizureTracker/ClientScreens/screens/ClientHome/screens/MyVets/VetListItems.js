import React, { Component } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import {w, h, totalSize} from "../../../../../FirebaseLogin/api/Dimensions";
import Icon from 'react-native-vector-icons/Ionicons';

export default class CreateLogButton extends Component {

  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={this.props.click}
        style={styles.button}>
        <Icon style={{marginLeft: w(3.5)}} name="md-paw" color = 'white' size={26} />
        <Text style={styles.text}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

CreateLogButton.propTypes = {
  click: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  button: {
    width: w(90),
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
    marginLeft: w(5) 
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