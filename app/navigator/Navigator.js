import BurgerMenu from '../components/Menu';

import DetailScreen from '../screens/Detail';
import HomeScreen from '../screens/Home';
import LoadingScreen from '../screens/Loading';
import OptionsScreen from '../screens/Options';
import SettingsScreen from '../screens/Settings';
import RegisterScreen from '../screens/Register';
import LoginScreen from '../screens/Login';
import ProfileScreen from '../screens/Profile';
import theme from '../styles/theme.style.js';


import { strings as loginStrings } from "../screens/Login";
import { fromRight, zoomIn, zoomOut } from 'react-navigation-transitions';


import React from "react";
import { Platform, StatusBar } from "react-native";
import { Icon } from "react-native-elements";

import {
  createBottomTabNavigator,
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  StackViewTransitionConfigs,
  TabScene,
  TransitionConfig,
  createMaterialTopTabNavigator,

} from "react-navigation";

const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];
  const stack = scenes;

  // Custom HomeStack transitions
  if (prevScene
    && prevScene.route.routeName === 'HomeScreen'
    && (nextScene.route.routeName === 'DetailScreen'|| nextScene.route.routeName === 'OptionsScreen')) {
    return zoomIn();
  } else if (prevScene
    && (prevScene.route.routeName === 'DetailScreen' || prevScene.route.routeName === 'OptionsScreen')
    && nextScene.route.routeName === 'HomeScreen') {
    return zoomOut();
  } else if (prevScene
    && prevScene.route.routeName === 'HomeScreen'
    && nextScene.route.routeName === 'LoadingScreen')
    {
      return zoomOut();
    }

  return fromRight();
}

const HomeStack = createStackNavigator(
  {
    DetailScreen,
    HomeScreen,
    OptionsScreen,
    ProfileScreen,
    LoadingScreen
    },
  {
    initialRouteName: "HomeScreen",
    transitionConfig: (nav) => handleCustomTransition(nav),
    //headerMode: 'none',

  },
);




HomeStack.navigationOptions = ({ navigation }: NavigationScreenProps) => {
  let drawerLockMode = "unlocked";
  //Lock navigator if not in main stack screen
  if (navigation.state.index > 0) {
    drawerLockMode = "locked-closed";
  }

  return {
    tabBarLabel: "Home",
    tabBarIcon: ({ tintColor }: TabScene) => (
      <Icon name="ios-home" type="ionicon" color={tintColor} />
    ),
    drawerLockMode,
    drawerLabel: "Home",
    drawerIcon: ({ tintColor }: TabScene) => (
      <Icon name="md-home" type="ionicon" color={tintColor} />
    )
  };
};

SettingsScreen.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ tintColor }: TabScene) => <Icon name="ios-cog" type="ionicon" color={tintColor} />,
  drawerLabel: "Settings",
  drawerIcon: ({ tintColor }: TabScene) => <Icon name="md-cog" type="ionicon" color={tintColor} />
};

/*
const AppStack = createStackNavigator(
  {
    HomeStack,
    SettingsScreen
  },
  {
    initialRouteName: "HomeStack",
    //transitionConfig: (nav) => handleCustomTransition(nav),
  },
);*/

export const MyDrawer = createDrawerNavigator({

  HomeStack,
  SettingsScreen


  },{
    initialRouteName: "HomeStack",
    contentComponent: BurgerMenu,

  }
);
/*
const AppStack = Platform.select({
  ios: createBottomTabNavigator({ HomeStack, SettingsScreen }),
  android: createDrawerNavigator({
    HomeStack, SettingsScreen },
      { contentComponent: BurgerMenu

      } ),

});*/



//TOP BAR
const AuthTabs = createMaterialTopTabNavigator(
  {
    LoginScreen,
    RegisterScreen,
  },
  {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#FFFFFF',
      inactiveTintColor: '#F8F8F8',
      showIcon: true,
      showLabel : false,
      style: {
        //backgroundColor: '#633689',
        backgroundColor: theme.background1,

      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: theme.background2,
        borderBottomWidth: 2,
      },
    },

  }
);

//Just add the authStack with the sign in screen inside of RootSwitch
const RootSwitch = createSwitchNavigator(
  {   AuthLoading : LoadingScreen,
      Auth : AuthTabs,
      App : MyDrawer
   }
);





export default RootSwitch;
