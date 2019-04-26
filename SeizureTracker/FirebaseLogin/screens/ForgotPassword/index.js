import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { w, h, totalSize } from "../../api/Dimensions";
import InputField from '../../components/InputField';
import Firebase from '../../api/Firebase';

const email = require('../../assets/email.png');

export default class ForgotPassword extends Component {

  // State for checking if email is correct/verified
  state = {
    isEmailCorrect: false,
  };

  // Receives user's email as parameter and checks it
  // Proceeds to call Firebase API function to send email
  sendEmail = () => {
    // Assigns user email to const from InputField below
    const email = this.email.getInputValue();
    // Verifies email
    this.setState({
      isEmailCorrect: email === '',
    }, () => {
      // Checks for null
      if(email !== ''){
        this.sendEmailWithPassword(email);
      } else {
        console.warn('Enter correct e-mail address');
      }
    });
  };

  /*
    Calls Firebase API function to send recovery email to
    email indicated by user.
  */
  sendEmailWithPassword = (email) => {
    // Firebase API call to send email with recovery details.
    Firebase.sendEmailWithPassword(email)
      // Changes screen back to login page after email sends
      .then(result => {
        if(result) this.props.change('login')();
      });
  };

  // Ensures InputField has a value then updates it on focus change
  onFocusChanged = () => {
    this.setState({ isEmailCorrect: this.email.getInputValue() === '' });
  };

  // Renders InputField asking for an email to recover
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.forgot}>Forgot Your Password?</Text>
        <InputField
          placeholder="Email"
          keyboardType="email-address"
          error={this.state.isEmailCorrect}
          returnKeyType="done"
          blurOnSubmit={true}
          focus={this.changeInputFocus}
          ref={ref => this.email = ref}
          icon={email}
        />
        {/* Touchable button that calls sendEmail() when pressed, 
        also navigates to login page */}
        <TouchableOpacity onPress={this.sendEmail} activeOpacity={0.6} style={styles.button}>
          <Text style={styles.buttonText}>Send Email</Text>
        </TouchableOpacity>
         {/* Touchable back button allowing user to go back to login page*/}
        <TouchableOpacity onPress={this.props.change('login')} style={styles.touchable}>
          <Text style={styles.login}>{'<'} Back To Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

// Properties for class
ForgotPassword.propTypes = {
  change: PropTypes.func.isRequired,
};

// Styles grouped, names indicate usage
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgot: {
    color:'white',
    fontSize: totalSize(2.5),
    marginBottom: h(5),
    fontWeight: '700',
  },
  button: {
    width: w(85),
    marginTop: h(6),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingVertical: w(1.8),
    borderRadius: w(25),
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    paddingVertical: h(1),
    fontSize: totalSize(2),
  },
  login: {
    color:'#ffffffEE',
    fontSize: totalSize(2),
    fontWeight: '700',
  },
  touchable: {
    alignSelf: 'flex-start',
    marginLeft: w(8),
    marginTop: h(4),
  }
});