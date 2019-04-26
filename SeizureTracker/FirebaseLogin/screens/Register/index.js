import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {w, h, totalSize} from '../../api/Dimensions';
import InputField from '../../components/InputField';
import Continue from './Continue';
import Firebase from "../../api/Firebase";
import { CheckBox } from 'react-native-elements'

const email = require('../../assets/email.png');
const password = require('../../assets/password.png');
const repeat = require('../../assets/repeat.png');
const person = require('../../assets/person.png');

export default class Register extends Component {
  // States for checking if input fields have been filled and verified
  state = {
    isNameCorrect: false,
    isEmailCorrect: false,
    isPasswordCorrect: false,
    isRepeatCorrect: false,
    isCreatingAccount: false,
    checked: false,
  };

  /*
    Create user account method that retrieves all input from InputFields 
    and assigns to consts for submission to authentication/registration
    and also Firestore user creation upon success.
  */
  createUserAccount = () => {
    // Sets variables to input provided by user
    const firstName = this.firstName.getInputValue();
    const lastName = this.lastName.getInputValue();
    const email = this.email.getInputValue();
    const password = this.password.getInputValue();
    const repeat = this.repeat.getInputValue();
    const isVet = this.state.checked;

    // Checks for valid input by comparing to null
    this.setState({
      isNameCorrect: firstName === '',
      isNameCorrect: lastName === '',
      isEmailCorrect: email === '',
      isPasswordCorrect: password === '',
      isRepeatCorrect: repeat === '' || repeat !== password,
    }, () => {
      /*
        Upon success, call createFireBaseAccount() method to submit to 
        Firebase API function, passes all inputted params
      */ 
      if(firstName !== '' && lastName !== '' && email !== '' && password !== '' && (repeat !== '' && repeat === password)){
        this.createFireBaseAccount(firstName, lastName, email, password, isVet);
      } else {
        console.warn('Fill up all fields correctly');
      }
    })
  };

  /*
    Function that calls Firebase API to create Firebase 
    account based on inputted user data. If successful the page
    navigates to the login screen for reauthentication.
    params: user first and last name, email, 
    encrypted password, and account type
  */
  createFireBaseAccount = (firstName, lastName, email, password, isVet) => {
    this.setState({ isCreatingAccount: true });
    /*
      Calls Firebase create account function with 
      extra user fields for user Firestore entry
    */ 
    Firebase.createFirebaseAccount(firstName, lastName, email, password, isVet)
      .then(result => {
        // On successful creation, returns user to login page
        if(result) this.props.change('login')();
        this.setState({ isCreatingAccount: false });
      });
  };

  /*
     Changes input focus to different input box 
     when user finishes entering input in each field
  */
  changeInputFocus = name => () => {
    switch (name) {
      case 'First Name':
        this.setState({ isNameCorrect: this.firstName.getInputValue() === '' });
        this.lastName.input.focus();
        break;
      case 'Last Name':
        this.setState({ isNameCorrect: this.lastName.getInputValue() === '' });
        this.email.input.focus();
        break;  
      case 'Email':
        this.setState({ isEmailCorrect: this.email.getInputValue() === '' });
        this.password.input.focus();
        break;
      case 'Password':
        this.setState({ isPasswordCorrect: this.password.getInputValue() === '',
          isRepeatCorrect: (this.repeat.getInputValue() !== ''
            && this.repeat.getInputValue() !== this.password.getInputValue()) });
        this.repeat.input.focus();
        break;
      default:
        this.setState({ isRepeatCorrect: (this.repeat.getInputValue() === ''
            || this.repeat.getInputValue() !== this.password.getInputValue()) });
    }
  };

  /*
    Renders the registration page includes:
    InputField components for: first name, last name, email,
    secure password, repeat password, and account type checkbox (Client/vet)
  */
  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.create}>CREATE ACCOUNT</Text>
        {/* InputField for user first name entry */}
        <InputField
          placeholder="First Name"
          autoCapitalize="words"
          error={this.state.isNameCorrect}
          style={styles.input}
          focus={this.changeInputFocus}
          ref={ref => this.firstName = ref}
          icon={person}
        />
        {/* InputField for user last name entry */}
        <InputField
          placeholder="Last Name"
          autoCapitalize="words"
          error={this.state.isNameCorrect}
          style={styles.input}
          focus={this.changeInputFocus}
          ref={ref => this.lastName = ref}
          icon={person}
        />
        {/* InputField for user email address entry */}
        <InputField
          placeholder="Email"
          keyboardType="email-address"
          error={this.state.isEmailCorrect}
          style={styles.input}
          focus={this.changeInputFocus}
          ref={ref => this.email = ref}
          icon={email}
        />
        {/* InputField for secure user password entry */}
        <InputField
          placeholder="Password"
          error={this.state.isPasswordCorrect}
          style={styles.input}
          focus={this.changeInputFocus}
          ref={ref => this.password = ref}
          secureTextEntry={true}
          icon={password}
        />
        {/* InputField for repeated secure user password entry */}
        <InputField
          placeholder="Repeat Password"
          error={this.state.isRepeatCorrect}
          style={styles.input}
          secureTextEntry={true}
          returnKeyType="done"
          blurOnSubmit={true}
          focus={this.changeInputFocus}
          ref={ref => this.repeat = ref}
          icon={repeat}
        />
        {/* 
          Checkbox to indicate if the user is a vet.
          Sets isVet state to true if checked.
        */}
        <CheckBox
          placeholder="Type"
          center
          title='I am a veterinarian'
          checked={this.state.checked}
          onPress={() => this.setState({checked: !this.state.checked})}
          containerStyle={styles.check}
          checkedColor='white'
          uncheckedColor='white'
          textStyle= {styles.checkText}
        />
        {/* 
          Continue button for submitting the input and 
          calling the create account function on press
        */}
        <Continue isCreating={this.state.isCreatingAccount} click={this.createUserAccount} />
        {/* Sign-in button for navigating back to login page, does not submit (back button) */}
        <TouchableOpacity onPress={this.props.change('login')} style={styles.touchable}>
          <Text style={styles.signIn}>{'<'} Sign In</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

// On change property for class
Register.propTypes = {
  change: PropTypes.func.isRequired,
};

// Styles grouped, names indicate usage
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  create: {
    color:'white',
    fontSize: totalSize(2.4),
    marginTop: h(7),
    marginBottom: h(4),
    fontWeight: '700',
  },
  signIn: {
    color:'#ffffffEE',
    fontSize: totalSize(2),
    fontWeight: '700',
  },
  touchable: {
    alignSelf: 'flex-start',
    marginLeft: w(8),
    marginTop: h(1),
  },
  input: {
    marginVertical: h(1),
  },
  check: {
    marginVertical: h(1),
    backgroundColor: 'transparent',
  },
  checkText: {
    color: 'white',
  }
});