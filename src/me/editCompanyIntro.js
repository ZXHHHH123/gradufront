/**
 * Created by admin-pc on 2019/5/4.
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
class editCompanyIntro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyStar: ''
    };
    this.onChange = value =>{
      this.setState({
        companyStar: value
      })
    }
  }
  saveCompanyStar() {
    console.log('点击保存公司详情按钮');
    console.log(this.state.companyStar);
    
    this.props.navigation.navigate(this.navigation.state.params.routeName);
  }
  
  render() {
    const {navigation} = this.props;
    return (
        <View>
          <HeaderComp navigation={navigation} title="编辑公司介绍" routeName='recruitManage'/>
 
          
          <Flex justify="center" align="center" style={styles.editCompanyIntro_box_button}>
            <Text style={styles.editCompanyIntro_box_button_text}>保存</Text>
          </Flex>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  editCompanyIntro_box: {
  },
  editCompanyIntro_box_title: {
    fontSize: 18,
    color: 'black',
    paddingHorizontal: 15,
  },
  
  //宽度设置了就需要调整marginLeft的值，不然不能居中
  editCompanyIntro_box_button: {
    backgroundColor: '#5dd5c8',
    borderRadius: 5,
    width: deviceW* 0.8,
    height: 50,
    marginLeft: deviceW* 0.1,
    marginTop: 40,
  },
  editCompanyIntro_box_button_text: {
    color: 'white',
    fontSize: 16,
  }
});

export default editCompanyIntro;

