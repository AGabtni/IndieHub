import styles from "./styles";
import React, { Component } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import deviceStorage from '../../services/deviceStorage.js';


class LoadingScreen extends Component<NavigationScreenProps> {
  constructor(){
    super();
    //Store jwt here
    this.state = {
      jwt: '' ,
      loading : true,
      userdata : '',
      dataload : true
    };


      this.newJWT = this.newJWT.bind(this);


      this.loadJWT = deviceStorage.loadJWT.bind(this);
      this.loadJWT();


  }

  newJWT(jwt){
    this.setState({
      jwt: jwt
    });
  }

  componentDidMount = (props) => {


  }


  //ON CAMPUS USE : 192.168.43.73
  //FETCH user data and set states
  getUserInfo = () =>{
    fetch('http://192.168.0.153:8000/api/user',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token' : this.state.jwt,
        },

      }
    )
    .then((response) => response.json())
    .then((responseJson) => {

        const userData = responseJson.user
        this.setState({
          loading : true,
          userdata: userData,
          dataload : false,


        })
    })
    .catch((error) => {
      console.error(error);
    });


  }


  render() {
    //Check if we got the jwt
    if(!this.state.loading){
      console.warn("Loading token :" + this.state.jwt);
      if(!this.state.jwt ){

        setTimeout(() => {
          this.props.navigation.navigate("LoginScreen");
        }, 2000);
      }
      else if (this.state.jwt){
        this.getUserInfo();
      }
    }

    if(!this.state.dataload){

        setTimeout(() => {
          this.props.navigation.navigate("App",{
          userdata : this.state.userdata,
        });
      });


    }

    return (
      <View style={styles.container}>
        <Text style={{ paddingBottom: 20 }}>This is the LoadingScreen.</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

export default LoadingScreen;
