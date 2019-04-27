/**
 * Created by admin-pc on 2019/4/27.
 */
import React, {Component} from 'react'
import {
  StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight, FlatList,
  ScrollView
} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {
  Button, Flex, WhiteSpace, WingBlank, Picker, ListView, List, Provider, InputItem, TextareaItem
} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";
import HeaderComp from './../../util/headerComp'
import JobBigType from './../../util/jobBigType'
import {observer} from 'mobx-react';
import UserStore from './../../mobx/userStore'
import allSalaryData from './../../util/salaryData';


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

@observer
class jobAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobaccount: ''
    };
    this.onChange = value =>{
      this.setState({
        jobaccount: value
      })
    }
  }
  saveJobAccount() {
    console.log('点击保存工作描述按钮');
    console.log(this.state.jobaccount);
    let jobaccount = this.state.jobaccount;
    UserStore.changeJobAccount(jobaccount);
    
    this.props.navigation.navigate('publishJob');
  }
  
  render() {
    const {navigation} = this.props;
    return (
        <View>
          <HeaderComp navigation={navigation} title="岗位描述" routeName='publishJob'/>
          <View style={styles.jobAccount_box}>
            <Text style={styles.jobAccount_box_title}>
              请详细阐述岗位需求
            </Text>
            <TextareaItem rows={4} placeholder="职位具体阐述" count={200} defaultValue={this.props.navigation.state.params.jobAccount} onChange={this.onChange} style={{    paddingHorizontal: 15,}} />
            
            <Flex justify="center" align="center" style={styles.jobAccount_box_button} onPress={this.saveJobAccount.bind(this)}>
              <Text style={styles.jobAccount_box_button_text}>确定</Text>
            </Flex>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  jobAccount_box: {
  },
  jobAccount_box_title: {
    fontSize: 18,
    color: 'black',
    paddingHorizontal: 15,
  },
  
  //宽度设置了就需要调整marginLeft的值，不然不能居中
  jobAccount_box_button: {
    backgroundColor: '#5dd5c8',
    borderRadius: 5,
    width: deviceW* 0.8,
    height: 50,
    marginLeft: deviceW* 0.1,
    marginTop: 40,
  },
  jobAccount_box_button_text: {
    color: 'white',
    fontSize: 16,
  }
});

export default jobAccount;

