/**
 * Created by admin-pc on 2019/5/3.
 */
import React, {Component} from 'react'
import {
  StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight, FlatList,
  ScrollView
} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import {
  Button, Flex, WhiteSpace, WingBlank, Picker, ListView, List, Provider, InputItem, TextareaItem, DatePicker
} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";
import HeaderComp from './../../util/headerComp'
import UserStore from './../../mobx/userStore'


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class addWorkExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: '',
      startTime: '',
      endTime: '',
      workContent: '',
      presentIndex: '',
      isDeliverWorkExperience: false
    };
    this.onChange = value => {
      this.setState({
        workContent: value
      })
    };
    this.onChange1 = value => {
      this.setState({startTime: value});
    };
    this.onChange2 = value => {
      this.setState({endTime: value});
    };
  };
  
  saveWorkExpericence(data) {
    let url = axiosUtil.axiosUrl;
    console.log('执行保存工作经历方法');
    let workExperience = {
      companyName: this.state.companyName,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      workContent: this.state.workContent,
    };
    console.log(workExperience);
    if(this.state.isDeliverWorkExperience) {
      workExperience.isDeliverWorkExperience = 1;
      workExperience.index = this.state.presentIndex;
    }
    axios.post(url + 'jobhunter/saveWorkExpericence', workExperience, {
      headers: {
        'Authorization': 'Bearer ' + UserStore.userToken
      }
    }).then((res) => {
      console.log(res);
      if (res.data.code === 200) {
        ToastAndroid.show('存储工作经历成功', ToastAndroid.SHORT);
        let allWorkExperience = Array.from(UserStore.workExperience);
        if(this.state.isDeliverWorkExperience) {
          allWorkExperience.splice(this.state.presentIndex, 1, workExperience)
        }else {
          workExperience.index = allWorkExperience.length;
          allWorkExperience.push(workExperience);
          UserStore.changeWorkExperience(allWorkExperience);
        }
        this.props.navigation.navigate(this.props.navigation.state.params.routeName);
      } else {
        ToastAndroid.show('更改个人信息失败', ToastAndroid.SHORT);
      }
    }).catch((err) => {
      console.log(err);
    })
    
    
  }
  
  
  deletePresentWorkExperience() {
    let url = axiosUtil.axiosUrl;
    console.log('删除该条');
    axios.post(url + 'jobhunter/deleteSingleWorkExpericence', {index: this.state.presentIndex},  {
      headers: {
        'Authorization': 'Bearer ' + UserStore.userToken
      }
  }).then((res) =>{
      if(res.data.code === 200) {
        ToastAndroid.show('删除成功', ToastAndroid.SHORT);
        let allWorkExperience = Array.from(UserStore.workExperience);
        allWorkExperience.splice(this.state.presentIndex, 1);
        UserStore.changeWorkExperience(allWorkExperience);
        this.props.navigation.navigate(this.props.navigation.state.params.routeName);
  
  
      }
    })
    
    
  }
  componentWillMount() {
    console.log('aaaaa');
    console.log(this.props.navigation.state.params);
    if(this.props.navigation.state.params.presentWorkExperience) {
      console.log(this.props.navigation.state.params.presentWorkExperience.workContent);
      let presentWorkExperience = this.props.navigation.state.params.presentWorkExperience;
      this.setState({
        companyName: presentWorkExperience.companyName,
        startTime: new Date(presentWorkExperience.startTime),
        endTime: new Date(presentWorkExperience.endTime),
        workContent: presentWorkExperience.workContent,
        presentIndex: this.props.navigation.state.params.index,
        isDeliverWorkExperience: true,
      })
      
    }
  }

  
  render() {
    const {navigation} = this.props;
    return (
        <Provider>
          <View style={styles.addWorkExperience_box}>
            <HeaderComp navigation={navigation} title="工作经历" routeName={this.props.navigation.state.params.routeName}/>
            
            <InputItem
                defaultValue=""
                clear
                placeholder="请填写公司名称"
                value={this.state.companyName}
                onChange={value => {
                  this.setState({
                    companyName: value
                  });
                }}
            >
              公司名称
            </InputItem>
            
            <List>
              <DatePicker
                  value={this.state.startTime}
                  mode="month"
                  minDate={new Date(2000, 7)}
                  maxDate={new Date(2026, 11)}
                  onChange={this.onChange1}
                  format="YYYY-MM"
              >
                <List.Item arrow="horizontal">开始时间</List.Item>
              </DatePicker>
            </List>
            
            <List>
              <DatePicker
                  value={this.state.endTime}
                  mode="month"
                  minDate={new Date(2000, 7)}
                  maxDate={new Date(2026, 11)}
                  onChange={this.onChange2}
                  format="YYYY-MM"
              >
                <List.Item arrow="horizontal">结束时间</List.Item>
              </DatePicker>
            </List>
            
            <TextareaItem rows={6} defaultValue={this.state.workContent} placeholder="请阐述在该公司的工作内容" count={150} onChange={this.onChange}
                          style={{paddingHorizontal: 15,}}/>
            
            
            <Flex justify="center" align="center" style={styles.addWorkExperience_box_add_item_button}
                  onPress={this.saveWorkExpericence.bind(this)}>
              <Text style={styles.addWorkExperience_box_add_item_button_text}>保存</Text>
            </Flex>
  
            {this.props.navigation.state.params.presentWorkExperience ? <Flex justify="center" align="center" style={styles.addWorkExperience_box_add_item_button}
                                                                              onPress={this.deletePresentWorkExperience.bind(this)}>
              <Text style={styles.addWorkExperience_box_add_item_button_text}>删除该条</Text>
            </Flex> : null}
  
            
          </View>
        </Provider>
    
    )
  }
}

const styles = StyleSheet.create({
  addWorkExperience_box_add_item_button: {
    width: deviceW * 0.9,
    height: 40,
    marginTop: 10,
    marginLeft: deviceW * 0.05,
    borderRadius: 5,
    backgroundColor: '#5dd5c8'
  },
  addWorkExperience_box_add_item_button_text: {
    fontSize: 18,
    color: 'white'
  }
});

export default addWorkExperience;
