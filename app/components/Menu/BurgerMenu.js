import styles from "./styles";
import React, { PureComponent } from "react";
import { Image, ScrollView, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { DrawerItems, SafeAreaView } from "react-navigation";
import deviceStorage from '../../services/deviceStorage.js';
import { withNavigation } from 'react-navigation';
import { StatusBar } from 'react-native';

class BurgerMenu extends PureComponent {

  constructor(){
    super();
    this.state = {
      username : '',
      email: '',
      loading: true
    };

    this.newHeaderInfo = this.newHeaderInfo.bind(this);
    this.deleteJWT = deviceStorage.deleteJWT.bind(this);

  }



  componentDidMount = (props) => {
    const { navigation } = this.props;

    const userData = navigation.getParam('userdata', 'NO-DATA');


    this.newHeaderInfo(userData);
  }
  //Store incoming user data
  newHeaderInfo(userData){
    var userName = '';
    const email = userData.email;

    if(!userData.username){
      userName = userData.email.slice(0,email.indexOf('@'));
    }
    this.setState({
      username : userName,
      email:  email,
      loading: false

    });


  }
  renderHeader(){

    if (!this.state.loading){

      return (

        <View style={styles.headerView}>
          <Image
            style={styles.userImage}
            source={require('../../images/avatars/abott@adorable.png')}
          />
          <Text
            style={styles.title}
          >{this.state.username}</Text>

        </View>

      );
    }
    else{

      <Image
        style={styles.userImage}
        source={require('../../images/avatars/unknown.png')}
      />


    }
  }

  render() {



    return (
      <SafeAreaView style={styles.container} /*forceInset={{ top: "always", horizontal: "never" }}*/>

        <View style={styles.headerContainer}>
        {this.renderHeader()}

        </View>
        <View style={styles.container}>

          <DrawerItems {...this.props}/>

        </View>
        <View style={styles.viewContainer}>
          <Button  icon={{ name: "md-log-out", type: "ionicon" }}
                    buttonStyle={styles.button}
                    title="Logout"
                    iconContainerStyle = {styles.icon}
                    onPress={() => {this.deleteJWT();this.props.navigation.navigate("LoadingScreen");}}
                    />
        </View>

      </SafeAreaView>

    );
  }
}

export default withNavigation(BurgerMenu);
