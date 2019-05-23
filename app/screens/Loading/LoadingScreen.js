import styles from './styles';
import React, { Component } from 'react';
import {
    Text,
    View,
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
  } from 'react-native';

class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
_bootstrapAsync = async () => {
  const userToken = await AsyncStorage.getItem('userToken');

  // This will switch to the App screen or Auth screen and this loading
  // screen will be unmounted and thrown away.
  this.props.navigation.navigate(userToken ? 'App' : 'Auth');
};


  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }

}

export default LoadingScreen; // e.g. DetailScreen
