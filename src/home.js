/**
 * Created by admin-pc on 2019/2/1.
 */

import React, {Component} from 'react'
import {StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ToastAndroid, Dimensions} from 'react-native'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeName: 'home',
      message: '首页'
    }
  };
  _showParams() {
    console.log(this.props.navigation.state);
    console.log(8888);
  }
  render() {
    return (
        <View>
          <Text>this.state.message</Text>
          <Button title='show params'
                  onPress={this._showParams.bind(this)}
                  color="#841584"
          />
        </View>
    )
  }
}
export default Home