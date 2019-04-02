/**
 * Created by admin-pc on 2019/3/28.
 */
import React, {Component} from 'react'
import {StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {Button, Flex, WhiteSpace, WingBlank } from '@ant-design/react-native';

const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class jobDetail extends Component {
  constructor(props) {
    super(props);
    
  };

 
  render() {
    return (
        <View>
          <Text>jobDetail界面</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({

});
export default jobDetail;