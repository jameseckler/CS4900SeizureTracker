import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import InputField from "../../components/InputField";
import {w, h, totalSize} from '../../api/Dimensions';
import GetStarted from './GetStarted';
import Firebase from '../../api/Firebase';

// Main logo for login page
const logo = require('../../assets/logo1.png');
// Email InputField icon
const email = require('../../assets/email.png');
// Password InputField icon
const password = require('../../assets/password.png');

/*
  Login class for taking credential input and verifying with the backend
  Includes setting user state and authentication measures.
  Acts as start menu for application and allows navigation to
  registration and forgotten password pages.
*/
export default class Login extends Component {

  // States to verify and check against correct credentials
  state = {
    isEmailCorrect: false,
    isPasswordCorrect: false,
    isLogin: false,
  };

  /* Called when GetStarted button component is pressed
   Assigns user email and password input to const and passes
   them to
  */
  getStarted = () => {
    // Assigns user credentials with encrypted password to consts
    const email = this.email.getInputValue();
    const password = this.password.getInputValue();

    // Checks if either field is null
    this.setState({
      isEmailCorrect: email === '',
      isPasswordCorrect: password === '',
    }, () => {
      // If not null, sends credentials to login function for authentication
      if(email !== '' && password !== ''){
        this.loginToFireBase(email, password);
      } /* If null, warn */else {
        console.warn('Fill up all fields')
      }
    });
  };

  /*
    Changes focus of input upon submitting for one field
    params: name of email inputted by user
  */
  changeInputFocus = name => () => {
    // If email input is filled set email to state and continues user to password field
    if (name === 'Email') {
      this.setState({ isEmailCorrect: this.email.getInputValue() === '' });
      this.password.input.focus();
    } else {
      this.setState({ isPasswordCorrect: this.password.getInputValue() === '' });
    }
  };

  /*
    Calls Firebase API function to log user in with provided encrypted credentials.
    params: user submitted email and encrypted password
  */
  loginToFireBase = (email, password) => {
    this.setState({ isLogin: true });
    // Calls Firebase authentication and login method
    Firebase.userLogin(email, password)
      .then(user => {
        // Returns logged in user state if successful
        if(user) this.props.success(user);
        // Returns false login if failed
        this.setState({ isLogin: false });
      });
  };

  /*
    Renders two input fields for email and password.
    Password contains secure text entry.
    Includes Login button and navigation to registration and forgot password pages
  */
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.icon2} resizeMode="contain" source={logo}/>
        {/* Email input */}
        <InputField
          placeholder="Email"
          keyboardType="email-address"
          style={styles.email}
          error={this.state.isEmailCorrect}
          focus={this.changeInputFocus}
          ref={ref => this.email = ref}
          icon={email}
        />
        {/* Secure password input */}
        <InputField
          placeholder="Password"
          returnKeyType="done"
          secureTextEntry={true}
          blurOnSubmit={true}
          error={this.state.isPasswordCorrect}
          ref={ref => this.password = ref}
          focus={this.changeInputFocus}
          icon={password}
        />
        {/* Login button component, passes credentials to getStarted method */}
        <GetStarted
          click={this.getStarted}
          isLogin={this.state.isLogin}
        />
        <View style={styles.textContainer}>
          {/* Two buttons for navigating to creating account and password recovery respectively */}
          <TouchableOpacity onPress={this.props.change('register')} style={styles.touchable} activeOpacity={0.6}>
            <Text style={styles.createAccount}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.change('forgot')} style={styles.touchable} activeOpacity={0.6}>
            <Text style={styles.forgotPassword}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

// Styles grouped, names indicate usage
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    width: w(35),
    height: h(15),
  },
  icon2: {
    width: w(95),
    height: h(40),
    marginTop: h(5),
  },
  textContainer: {
    width: w(100),
    flexDirection: 'row',
    marginTop: h(5),
  },
  email: {
    marginBottom: h(4.5),
  },
  touchable: {
    flex: 1,
  },
  createAccount: {
    color:'#ffffffEE',
    textAlign: 'center',
    fontSize: totalSize(2),
    fontWeight: '600',
  },
  forgotPassword: {
    color:'#ffffffEE',
    textAlign: 'center',
    fontSize: totalSize(2),
    fontWeight: '600',
  },
});
