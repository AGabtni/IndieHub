import styles from './styles';
import React, { Component } from 'react';
import { Text, View, ImageBackground, StatusBar } from 'react-native';
import { withNavigation } from 'react-navigation';
import theme from '../../styles/theme.style.js';
class DetailScreen extends Component {


  constructor(){
    super();
    this.state = {
      title : '',
      subtitle : '',
      illustration : '',
      loading: true
    };
    this.newEntry = this.newEntry.bind(this);


  }

  componentDidMount = (props) => {

    const { navigation } = this.props;

    const title = navigation.getParam('title', 'NO-DATA');
    const subtitle = navigation.getParam('subtitle', 'NO-DATA');
    const illustration = navigation.getParam('illustration', 'NO-DATA');

    const data = {title, subtitle, illustration};
    this.newEntry(data);



  }

  //Store incoming user data
  newEntry(data){


    this.setState({
      title : data.title,
      subtitle : data.subtitle,
      illustration : data.illustration,
      loading: false

    });


  }

  renderContactHeader = () => {
    const  img  = this.state.illustration;
    console.warn(img);
    return (
      <View style={styles.headerContainer}>
        <View style={styles.coverContainer}>
          <ImageBackground
            source={{
              uri: img,
            }}
            style={styles.coverImage}
          >
          </ImageBackground>
        </View>
      </View>
    )
  }


  render() {

    if(!this.state.loading){

        //console.warn(this.state.illustration);
        return (

          <View style={styles.container}>

            {this.renderContactHeader()}
          </View>
        );

    }

    return(

      <View style={styles.container}>

        <Text>Loading</Text>
      </View>

    );

  }
}

export default withNavigation(DetailScreen);
