/**
 * Created by admin-pc on 2019/4/9.
 */
import React, {Component} from 'react'
import {
  StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight, ScrollView
} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {Button, Flex, WhiteSpace, WingBlank, Picker, List, Provider, Modal} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";
import UserStore from './../../mobx/userStore'


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class JobDetaiHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
    };
    this.ModalClose = () => {
      this.setState({
        isShowModal: false,
      });
    };
  }
  
  backView() {
    this.props.navigation.navigate('Main');
  };
  
  collectJob() {
    this.props.navigation.navigate('Main');
    console.log('点击收藏该岗位');
  };
  
  // console.log('点击投诉该工作岗位');
  
  
  complainJob() {
    UserStore.changeIsShowcomplainModal(true);
  };
  
  render() {
    // const {navigation} = this.props;
    // const params = navigation.getParam('params');
    // console.log(params);
    return (
        <View style={styles.job_detail_header}>
          <Flex justify="between">
            <IconOutline name="left" style={styles.back_icon} onPress={this.backView.bind(this)}/>
            <Flex justify="between" style={styles.job_detail_header_right}>
              <IconOutline name="star" style={styles.back_icon} onPress={this.collectJob.bind(this)}/>
              <IconOutline name="warning" style={styles.back_icon} onPress={this.complainJob.bind(this)}/>
            </Flex>
          </Flex>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  job_detail_header: {
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  job_detail_header_right: {
    width: deviceW * 0.2,
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  back_icon: {
    fontSize: 24,
    color: 'black',
  }
});

export default JobDetaiHeader