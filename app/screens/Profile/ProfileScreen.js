import styles from './styles';
import React, { Component } from 'react';
import {
  Image,
  ImageBackground,
  Linking,
  ListView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
 } from 'react-native';
import { Card, Icon, Button } from "react-native-elements";
import { NavigationScreenProps } from "react-navigation";
import PropTypes from 'prop-types';
import Stars from 'react-native-stars';
import {default as StarIcon} from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker'


import Email from './Email'
import Separator from './Separator'
import Tel from './Tel'


interface Props {
  navigator: NavigationScreenProp<any, any>;
}


class ProfileScreen extends Component<NavigationScreenProps> {


  constructor(){
    super();
    //Store jwt here
    this.state = {
      userid : '',
      username : '',
      firstname : '',
      lastname : '',
      email : '',
      createdat : '',
      photo: null,
      loading: true
    };
    this.newUser = this.newUser.bind(this);


  }


  //Start()
  componentDidMount = (props) => {


        const { navigation } = this.props;


        const userData = navigation.dangerouslyGetParent().getParam('userdata', 'NO-DATA');

        this.newUser(userData);
  }

  //Handler for incoming new user data
  newUser(userData){

    var userName = '';
    const email = userData.email;

    if(!userData.username){

      //Use what's before the @ in the email as a username
      userName = userData.email.slice(0,email.indexOf('@'));
    }
    this.setState({
      userid : userData.id,
      username : userName,
      firstname : userData.firstName,
      lastname : userData.lastname,
      email : userData.email,
      createdat : userData.createdAt,
      loading: false

    });


  }


  //Renders the 5 rating stars
  //TODO : disable modification
  renderStars = () => {


    return(

      <View style={{alignItems:'center'}}>
        <Stars
          //display={3.67}
          spacing={8}
          default={2.5}
          count={5}
          half={true}
          starSize={80}
          fullStar={
            <StarIcon name={'star'} style={[styles.myStarStyle]}/>
          }
          emptyStar={<StarIcon name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]}/>}
          halfStar={<StarIcon name={'star-half'} style={[styles.myStarStyle]}/>}
        />
      </View>

    );
  }

  renderAvatar = () =>{

    const { photo } = this.state

    if(this.state.photo){
      return(

        <Image
            style={styles.userImage}
            source={{uri:this.state.photo}}
        />
      );
    }else{


      return(

          <Image
              style={styles.userImage}
              source={require('../../images/avatars/abott@adorable.png')}
          />
      );
    }
  }
  renderHeader = () => {
    const {
      avatar,
      avatarBackground,
      firstName,
    } = this.props

    if(!this.state.loading){

      return (
        <View style={styles.headerContainer}>
          <ImageBackground
            style={styles.headerBackgroundImage}
            blurRadius={10}
            source={require('../../images/game_dev.png')}
            >
            {this.renderStars()}

            <View style={styles.headerColumn}>
              <TouchableHighlight style={styles.userImage} onPress={this.handleChoosePhoto}>
                {this.renderAvatar()}

              </TouchableHighlight>


              <Text style={styles.userNameText}>{this.state.username}</Text>
              <View style={styles.userAddressRow}>
                <View>
                  <Icon
                    name="place"
                    underlayColor="transparent"
                    iconStyle={styles.placeIcon}
                    onPress={this.onPressPlace}
                  />
                </View>
                <View style={styles.userCityRow}>
                  <Text style={styles.userCityText}>
                    {this.state.firstname}
                  </Text>

                </View>
                <View>

                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      );

    }

}


  //Handler to update avatar photo from device
  handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        const photo = response;

        //Change to a more convenient name for stored avataers
        const photoName = this.state.userid +  photo.fileName ;
        console.warn(response);
        const data = new FormData();
        data.append('userid', this.state.userid);
        data.append('file', {
         uri : photo.uri,
         type: photo.type,
         name: photoName,
        });
        const config = {
         method: 'POST',
         headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
         },
         body: data,
        };

        fetch("http://192.168.0.153:8000/api/user/upload", config)
        .then(response => response.json())
        .then(response => {
          alert("Upload success!");
          console.warn(response.link);
          this.setState({ photo: response.link });
        })
        .catch(error => {

          alert("Upload failed!");
        });

      }
    })
  }

  //Update()
  render() {

    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {this.renderHeader()}

            {Separator()}
          </Card>
        </View>
      </ScrollView>

    );
  }
}





export default ProfileScreen; // e.g. DetailScreen
