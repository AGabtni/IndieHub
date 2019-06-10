import styles from './styles';
import theme from '../../styles/theme.style.js';

import React, { Component } from 'react';
import { Image, Platform, View, ScrollView, Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity } from 'react-native';
import { Card, Icon, Button } from "react-native-elements"
import { NavigationScreenProps } from "react-navigation";


//Carousel imports :
import Carousel, { Pagination } from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';

//Entries of images and labels for the carsouel items :
import  {ENTRIES1 ,ENTRIES2} from '../../src/static/entries'

//Entry component :
import SliderEntry from '../../components/Carousel/SliderEntry';
import { sliderWidth, itemWidth } from '../../components/Carousel/SliderEntry.style';


interface Props {
  navigator: NavigationScreenProp<any, any>;
}
const SLIDER_1_FIRST_ITEM = 1;

class HomeScreen extends Component {

  constructor(){
    super();
    this.state = {
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM
        };


  }

  componentDidMount = (props) => {

        const { navigation } = this.props ;
        //const userData = this.props.userData;


        //grab the data passed feteched throughout the loading screen
        const userData = navigation.getParam('userdata', 'NO-DATA');
        console.warn("FROM HOME USERDATA IS :"+userData);
  }

    //Slder entry renderer
    _renderItemWithParallax ({item, index}, parallaxProps) {
        return (
            <SliderEntry
              data={item}
              even={(index + 1) % 2 === 0}
              parallax={true}
              parallaxProps={parallaxProps}
            />
        );
    }


    //Carousel example
    mainExample (number, title) {
        const { slider1ActiveSlide } = this.state;

        return (
            <View style={styles.exampleContainer}>
                <Text style={styles.title}>{`Example ${number}`}</Text>
                <Text style={styles.subtitle}>{title}</Text>
                <Carousel
                  ref={c => this._slider1Ref = c}
                  data={ENTRIES1}
                  renderItem={this._renderItemWithParallax}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                  hasParallaxImages={true}
                  firstItem={SLIDER_1_FIRST_ITEM}
                  inactiveSlideScale={0.94}
                  inactiveSlideOpacity={0.7}
                  // inactiveSlideShift={20}
                  containerCustomStyle={styles.slider}
                  contentContainerCustomStyle={styles.sliderContentContainer}
                  loop={true}
                  loopClonesPerSide={2}
                  autoplay={true}
                  autoplayDelay={500}
                  autoplayInterval={3000}
                  onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                />
                <Pagination
                  dotsLength={ENTRIES1.length}
                  activeDotIndex={slider1ActiveSlide}
                  containerStyle={styles.paginationContainer}
                  dotColor={'rgba(255, 255, 255, 0.92)'}
                  dotStyle={styles.paginationDot}
                  inactiveDotColor={theme.black}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                  carouselRef={this._slider1Ref}
                  tappableDots={!!this._slider1Ref}
                />
            </View>
        );
    }


    //Background gradient
    get gradient () {
        return (
            <LinearGradient
              colors={[theme.background1, theme.background2]}
              startPoint={{ x: 1, y: 0 }}
              endPoint={{ x: 0, y: 1 }}
              style={styles.gradient}
            />
        );
    }


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
    headerRight: (

        <Icon
          name="md-contact"
          type="ionicon"
          containerStyle={styles.iconRight}
          onPress={() => {
              //grab the data passed feteched throughout the loading screen
              const userData = navigation.getParam('userdata', 'NO-DATA');
              console.warn("FROM HOME USERDATA IS :"+userData);
              navigation.navigate("ProfileScreen" ,{userdata: userData});


          }}
        />

    ),
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
    const { navigation } = this.props;
    const example1 = this.mainExample(1, 'Carousel example');

    return (

          <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>

                    <StatusBar
                      translucent={true}
                      backgroundColor={'rgba(0, 0, 0, 0.3)'}
                      barStyle={'light-content'}
                    />
                    { this.gradient }
                    <ScrollView
                      style={styles.scrollview}
                      scrollEventThrottle={200}
                      directionalLockEnabled={true}
                    >
                        { example1 }


                    </ScrollView>
                </View>
            </SafeAreaView>



    );
  }
}

export default HomeScreen; // e.g. DetailScreen
