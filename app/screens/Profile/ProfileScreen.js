import styles from './styles';
import React, { Component } from 'react';
import { Text, View, Platform } from 'react-native';
import { Icon, Button } from "react-native-elements";

class ProfileScreen extends Component {

  static navigationOptions = ({ navigation }: NavigationScreenProps) =>({
    headerLeft:Platform.select({
      ios: (
        <Icon
          name="ios-arrow-round-back"
          type="ionicon"
          containerStyle={styles.icon}
          onPress={() => navigation.navigate("HomeScreen")}
        />
      ),
      android: (
        <Icon
          name="md-arrow-round-back"
          type="ionicon"
          containerStyle={styles.icon}
          onPress={() => navigation.navigate("HomeScreen")}
        />
      )
    }),

    headerTransparent : true,
  });

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Profile Screen.</Text>
      </View>
    );
  }
}

export default ProfileScreen; // e.g. DetailScreen
