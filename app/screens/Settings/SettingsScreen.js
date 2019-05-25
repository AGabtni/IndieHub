import styles from './styles';
import React, { Component } from 'react';
import {Platform, Text, View } from 'react-native';
import { Icon, Button } from "react-native-elements";

class SettingsScreen extends Component {


    static navigationOptions = ({ navigation }: NavigationScreenProps) =>({
      //title: 'Settings',
      headerLeft: Platform.select({
      ios: (
        <Icon
          name="ios-log-out"
          type="ionicon"
          containerStyle={styles.icon}
          onPress={() => navigation.navigate("LoginScreen")}
        />
      ),
      android: (
        <Icon
          name="md-menu"
          type="ionicon"
          containerStyle={styles.icon}
          onPress={() => navigation.toggleDrawer()}
        />
      )
    }),
      headerTransparent : true,

      /*headerStyle: {
        backgroundColor: '#f45110',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },*/
    });
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Settings screen.</Text>
      </View>
    );
  }
}

export default SettingsScreen;
