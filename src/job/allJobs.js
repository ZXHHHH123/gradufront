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

class allJobs extends Component {
  static navigationOptions = {
    title: 'alljobs',
  };
  constructor(props) {
    super(props);
    
  };
  intoJobDetail() {
    console.log('点击进入jobdetail按钮');
    this.props.navigation.navigate('jobDetail');
  }
  render() {
    const { navigation } = this.props;
    return (
        <View>
          <Text>allJobs界面</Text>
          <View>
            <Button onPress={this.intoJobDetail.bind(this)} color="#941584">进入详情界面测试</Button>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({

});
export default allJobs;