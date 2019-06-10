import styles from './styles';
import React, { Component } from 'react';
import { KeyboardAvoidingView, Platform, Text, View} from 'react-native';
import { TabScene,NavigationScreenProp } from "react-navigation";
import LoginForm from "../../components/LoginForm";
import { Icon } from "react-native-elements";

interface Props {
  navigation: NavigationScreenProp<any, any>
}

class LoginScreen extends Component<Props, object> {
  static navigationOptions = {
    //tabBarLabel: strings.registerTitle,
    tabBarIcon: ({ tintColor }: TabScene) => {
      let iconName = Platform.select({ ios: "ios-log-in", android: "md-log-in" });
      return <Icon name={iconName} type="ionicon" color={tintColor} />;
    }
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
