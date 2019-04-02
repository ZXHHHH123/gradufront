/**
 * Created by admin-pc on 2019/3/29.
 */
import React, {Component} from 'react'
import {StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
// import Button from '@ant-design/react-native/lib/button';
import {Button, Flex, WhiteSpace, WingBlank } from '@ant-design/react-native';

class allCompanys extends Component {
  constructor(props) {
    super(props);
  }
  intoConpanyDetail() {
    console.log(axiosUtil);
    this.props.navigation.navigate('companyDetail');
  }
  render() {
    return(
        <View>
          <Text>显示所有公司界面</Text>
          <View>
            <Button onPress={this.intoConpanyDetail.bind(this)} color='red'>进入详情界面测试</Button>
          </View>
        </View>
    )
  }
}
export default allCompanys