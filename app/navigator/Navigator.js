import BurgerMenu from '../components/Menu';
import DetailScreen from '../screens/Detail';
import HomeScreen from '../screens/Home';
import LoadingScreen from '../screens/Loading';
import OptionsScreen from '../screens/Options';
import SettingsScreen from '../screens/Settings';
import RegisterScreen from '../screens/Register';
import LoginScreen from '../screens/Login';


import React from "react";
import { Platform } from "react-native";
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

} from "react-navigation";

/*const IOS_MODAL_ROUTES = ["OptionsScreen"];

let dynamicModalTransition = (
  transitionProps: NavigationTransitionProps,
  prevTransitionProps: NavigationTransitionProps
): TransitionConfig => {
  return StackViewTransitionConfigs.defaultTransitionConfig(
    transitionProps,
    prevTransitionProps,
    IOS_MODAL_ROUTES.some(
      screenName =>
        screenName === transitionProps.scene.route.routeName ||
        (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)
    )
  );
};*/

const HomeStack = createStackNavigator(
  { DetailScreen, HomeScreen, OptionsScreen },
  //{ transitionConfig: dynamicModalTransition }
  {initialRouteName: "HomeScreen"}
);


const SettingsStack = createStackNavigator(
  { SettingsScreen }
  //{ transitionConfig: dynamicModalTransition }

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

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ tintColor }: TabScene) => <Icon name="ios-cog" type="ionicon" color={tintColor} />,
  drawerLabel: "Settings",
  drawerIcon: ({ tintColor }: TabScene) => <Icon name="md-cog" type="ionicon" color={tintColor} />
};


const AppStack = Platform.select({
  ios: createBottomTabNavigator({ HomeStack, SettingsStack }),
  android: createDrawerNavigator({ HomeStack, SettingsStack },  { contentComponent: BurgerMenu } ),

});

//Create a new auth Stack here :

const AuthStack = createStackNavigator({ SignIn: LoginScreen });


//Just add the authStack with the sign in screen inside of RootSwitch
const RootSwitch = createSwitchNavigator(
  { AuthLoading:LoadingScreen,
     App: AppStack,
    Auth: AuthStack,
   },
  { initialRouteName: "AuthLoading" }
);





export default RootSwitch;
