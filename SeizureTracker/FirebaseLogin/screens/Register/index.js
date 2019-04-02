import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
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
  state = {
    isNameCorrect: false,
    isEmailCorrect: false,
    isPasswordCorrect: false,
    isRepeatCorrect: false,
    isCreatingAccount: false,
    checked: false,
  };

  createUserAccount = () => {
    const firstName = this.firstName.getInputValue();
    const lastName = this.lastName.getInputValue();
    const email = this.email.getInputValue();
    const password = this.password.getInputValue();
    const repeat = this.repeat.getInputValue();
    const isVet = this.state.checked;

    this.setState({
      isNameCorrect: firstName === '',
      isNameCorrect: lastName === '',
      isEmailCorrect: email === '',
      isPasswordCorrect: password === '',
      isRepeatCorrect: repeat === '' || repeat !== password,
    }, () => {
      if(firstName !== '' && lastName !== '' && email !== '' && password !== '' && (repeat !== '' && repeat === password)){
        this.createFireBaseAccount(firstName, lastName, email, password, isVet);
      } else {
        Alert.alert('All fields must be completed');
      }
    })
  };

  createFireBaseAccount = (firstName, lastName, email, password, isVet) => {
    this.setState({ isCreatingAccount: true });
    Firebase.createFirebaseAccount(firstName, lastName, email, password, isVet)
      .then(result => {
        if(result) this.props.change('login')();
        this.setState({ isCreatingAccount: false });
      });
  };

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

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.create}>CREATE ACCOUNT</Text>
        <InputField
          placeholder="First Name"
          autoCapitalize="words"
          error={this.state.isNameCorrect}
          style={styles.input}
          focus={this.changeInputFocus}
          ref={ref => this.firstName = ref}
          icon={person}
        />
        <InputField
          placeholder="Last Name"
          autoCapitalize="words"
          error={this.state.isNameCorrect}
          style={styles.input}
          focus={this.changeInputFocus}
          ref={ref => this.lastName = ref}
          icon={person}
        />
        <InputField
          placeholder="Email"
          keyboardType="email-address"
          error={this.state.isEmailCorrect}
          style={styles.input}
          focus={this.changeInputFocus}
          ref={ref => this.email = ref}
          icon={email}
        />
        <InputField
          placeholder="Password"
          error={this.state.isPasswordCorrect}
          style={styles.input}
          focus={this.changeInputFocus}
          ref={ref => this.password = ref}
          secureTextEntry={true}
          icon={password}
        />
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
        <Continue isCreating={this.state.isCreatingAccount} click={this.createUserAccount} />
        <TouchableOpacity onPress={this.props.change('login')} style={styles.touchable}>
          <Text style={styles.signIn}>{'<'} Sign In</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

Register.propTypes = {
  change: PropTypes.func.isRequired,
};

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