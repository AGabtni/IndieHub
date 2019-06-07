import { StyleSheet, Platform } from 'react-native';
import {mainColor} from './constants'
const styles = StyleSheet.create({

  icon:{
    padding : 10
  },

  cardContainer: {
  backgroundColor: '#FFF',
  borderWidth: 0,
  flex: 1,
  margin: 0,
  padding: 0,
},
container: {
  flex: 1,
},
emailContainer: {
  backgroundColor: '#FFF',
  flex: 1,
  paddingTop: 30,
},
headerBackgroundImage: {
  paddingBottom: 20,
  paddingTop: 35,
},
headerContainer: {},
headerColumn: {
  backgroundColor: 'transparent',
  ...Platform.select({
    ios: {
      alignItems: 'center',
      elevation: 1,
      marginTop: -1,
    },
    android: {
      alignItems: 'center',
    },
  }),
},
placeIcon: {
  color: 'white',
  fontSize: 26,
},
scroll: {
  backgroundColor: '#FFF',
},
telContainer: {
  backgroundColor: '#FFF',
  flex: 1,
  paddingTop: 30,
},
userAddressRow: {
  alignItems: 'center',
  flexDirection: 'row',
},
userCityRow: {
  backgroundColor: 'transparent',
},
userCityText: {
  color: '#A5A5A5',
  fontSize: 15,
  fontWeight: '600',
  textAlign: 'center',
},
userImage: {
  borderColor: mainColor,
  borderRadius: 85,
  borderWidth: 3,
  height: 170,
  marginBottom: 15,
  width: 170,
},
userNameText: {
  color: '#FFF',
  fontSize: 22,
  fontWeight: 'bold',
  paddingBottom: 8,
  textAlign: 'center',
},
myStarStyle: {
    color: 'yellow',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    //height : 80,
  },
  myEmptyStarStyle: {
    color: 'white',
  },


});

export default styles;
