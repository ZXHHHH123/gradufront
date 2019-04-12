/**
 * Created by admin-pc on 2019/4/12.
 */
import React, {Component} from 'react'
import {StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight, ScrollView} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {Button, Flex, WhiteSpace, WingBlank, Picker, List, Provider, Modal} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";

const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class industryType extends Component{
  constructor(props){
    super(props);
    this.state = {
    
    };
  };
  render() {
    return (
        <View>
          <Text>选择期望行业界面</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({

});

export default industryType;