/**
 * Created by admin-pc on 2019/4/10.
 */
import React, {Component} from 'react'
import {StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight, ScrollView, FlatList} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {Button, Flex, WhiteSpace, WingBlank, Picker, List, Provider, Modal} from '@ant-design/react-native';
import {observer} from 'mobx-react';


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class complainDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    }
  };
  render() {
    return (
        <View>
          <Text>
            具体的投诉界面
          </Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({

});

export default complainDetail;