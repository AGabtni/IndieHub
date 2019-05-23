import styles from './styles';
import React, { Component } from 'react';
import { Platform, Text, View, Image, TouchableOpacity } from 'react-native';
import { Card, Icon, Button } from "react-native-elements"
import { NavigationScreenProps } from "react-navigation";
;

interface Props {
  navigator: NavigationScreenProp<any, any>;
}

class HomeScreen extends Component {

  static navigationOptions = ({ navigation }: NavigationScreenProps) =>({
    title: 'Home',
    headerLeft: Platform.select({
      ios: null,
      android: (
        <Icon
          name="md-menu"
          type="ionicon"
          containerStyle={styles.icon}
          onPress={() => navigation.toggleDrawer()}
        />
      )
    }),

    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  });
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigate("DetailScreen")}>
            <Card>
                  <View>
                      <Image
                            style={styles.image}
                            resizeMode="cover"
                            source={require('../../images/game_dev.png')}
                          />
                  </View>
            </Card>
        </TouchableOpacity>

        <Button title="Details" onPress={() => navigate("DetailScreen")} />
        <Button title="Options" onPress={() => navigate("OptionsScreen")} />
      </View>
    );
  }
}

export default HomeScreen; // e.g. DetailScreen
