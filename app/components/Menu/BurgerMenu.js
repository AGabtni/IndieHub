import styles from "./styles";
import React, { PureComponent } from "react";
import { ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { DrawerItems, SafeAreaView } from "react-navigation";
import deviceStorage from '../../services/deviceStorage.js';

class BurgerMenu extends PureComponent {

  constructor(){
    super();

    this.deleteJWT = deviceStorage.deleteJWT.bind(this);

  }

  render() {

    return (
      <SafeAreaView style={styles.container} forceInset={{ top: "always", horizontal: "never" }}>
        <ScrollView style={styles.container}>
          <DrawerItems {...this.props} />
        </ScrollView>
        <Button icon={{ name: "md-log-out", type: "ionicon" }} title="Log Out" onPress={() => {this.deleteJWT();this.props.navigation.navigate("LoginScreen");}} />
      </SafeAreaView>
    );
  }
}

export default BurgerMenu;
