import React, {Component} from 'react';
import Orientation, { orientation } from "react-native-orientation";
import Navigator from "./navigator/Navigator";
import {createAppContainer } from 'react-navigation';


interface Props {}

export default createAppContainer(Navigator);


class App extends Component<Props> {
    componentDidMount = () => {
    Orientation.lockToPortrait();
  };

  render() {
    return <Navigator />;
  }

}
