import React, { Component } from "react";
import { StyleSheet, View , Text , Image } from "react-native";
import Provider from "./context/provider";
import { RootSiblingParent } from 'react-native-root-siblings';
import { NavigationContainer } from '@react-navigation/native';
import Stack from './stack'



export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <RootSiblingParent>
          <Provider>
            <Stack />
          </Provider>
        </RootSiblingParent>
    </NavigationContainer>
    );
  }
}

