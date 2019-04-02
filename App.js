/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import RootFront from './routeConfig/rootConfig';
import Root from './route'
import AllCompany from './src/company/allCompanys'
import Login from './src/account/login'

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';




export default class App extends Component<Props> {
  render() {
    return (
        <RootFront/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
