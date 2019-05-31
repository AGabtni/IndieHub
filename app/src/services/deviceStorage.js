import { AsyncStorage } from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';

const deviceStorage = {
    // our AsyncStorage functions will go here :)

    async saveItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  }
};

export default deviceStorage;
