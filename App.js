/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import Root from './routeConfig/rootConfig';
import AllCompany from './src/company/allCompanys'
import Login from './src/account/login'

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import UserStore from './mobx/userStore'
import systemConfig from './config/system'





export default class App extends Component<Props> {
  render() {
    UserStore.changeApi(systemConfig.axiosUrl);
    return (
        <Root/>
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
