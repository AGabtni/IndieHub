import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    //alignItems: "center"
  },
  coverContainer: {
    position: 'relative',
  },
  coverImage: {
    height: Dimensions.get('window').width * (3 / 4),
    width: Dimensions.get('window').width,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF',
  }
});

export default styles;
