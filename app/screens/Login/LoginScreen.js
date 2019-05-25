import styles from './styles';
import React, { Component } from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { NavigationScreenProp } from "react-navigation";
import LoginForm from "../../components/LoginForm";

interface Props {
  navigation: NavigationScreenProp<any, any>
}

class LoginScreen extends Component<Props, object> {
  static navigationOptions = {
      header : null
  };
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <LoginForm navigation={this.props.navigation} />
      </KeyboardAvoidingView>
    );
  }
}

export default LoginScreen; // e.g. DetailScreen
