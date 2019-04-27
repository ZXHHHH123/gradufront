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
  Button, Flex, WhiteSpace, WingBlank, Picker, ListView, List, Provider, InputItem
} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";
import HeaderComp from './../../util/headerComp'
import UserStore from './../../mobx/userStore'


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class fixPhone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      smsCode: '',
    };
    this.earnSmsCode = () => {
      let url = axiosUtil.axiosUrl;
      console.log('点击获取验证码');
      console.log(this.state.phone);
      axios.post(url + 'user/getVarifyCode', {phone: this.state.phone}).then(res => {
        console.log('获取验证码后端传回参数' + JSON.stringify(res));
        if (res.data.code === 200) {
          ToastAndroid.show('发送成功', ToastAndroid.SHORT);
        }
      }).catch(err => {
        console.log('接口报错' + err);
      })
    }
  };
  
  changePhone() {
    let url = axiosUtil.axiosUrl;
    console.log('点击更改手机号码按钮');
    console.log(this.state.phone);
    let changePhoneObj = {
      phone: this.state.phone,
      smsCode: this.state.smsCode,
    };
    axios.post(url + 'user/updatePhone', changePhoneObj, {
      headers: {
        'Authorization': 'Bearer ' + UserStore.userToken
      }
    }).then((res) => {
      if(res.data.code === 200) {
        ToastAndroid.show('更改手机号码成功', ToastAndroid.SHORT);
        this.props.navigation.navigate('personSetting');
      }else {
        ToastAndroid.show('更改手机号码失败---todo', ToastAndroid.SHORT);
      }
    }).catch((err) => {
      console.log('更改手机号码接口报错' + err);
    })
  }
  
  render() {
    const {navigation} = this.props;
    return (
        <View style={styles.fixPhone_box}>
          <HeaderComp navigation={navigation} title="修改手机号" routeName="personSetting"/>
          <Flex justify="center" direction="column">
            <Text style={styles.fixPhone_box_phone_text}>当前绑定的手机号</Text>
            <Text style={styles.fixPhone_box_phone_number}>13755038432</Text>
            {/*<Text style={styles.fixPhone_box_phone_number}>{UserStore.phone}</Text>*/}
          </Flex>
          
          <InputItem
              defaultValue=""
              placeholder="请输入手机号"
              onChange={value => {
                this.setState({
                  phone: value
                });
              }}
          >手机号</InputItem>
          
          <InputItem
              defaultValue=""
              placeholder="请输入验证码"
              extra="获取验证码"
              onExtraClick={this.earnSmsCode}
              onChange={value => {
                this.setState({
                  smsCode: value
                });
              }}
          >验证码</InputItem>
          
          
          <Flex justify="center" align="center" style={styles.fixPhone_box_button}
                onPress={this.changePhone.bind(this)}>
            <Text style={styles.fixPhone_box_button_text}>确定更改手机号码</Text>
          </Flex>
        </View>
    
    )
  }
}

const styles = StyleSheet.create({
  fixPhone_box: {
    width: deviceW,
    height: deviceH,
    backgroundColor: '#f6f6f8'
  },
  fixPhone_box_phone_text: {
    fontSize: 12,
    marginTop: 45,
    
  },
  fixPhone_box_phone_number: {
    marginTop: 15,
    fontSize: 16,
  },
  fixPhone_box_button: {
    width: deviceW * 0.8,
    height: 40,
    marginTop: 20,
    marginLeft: deviceW * 0.1,
    backgroundColor: "#5dd5c8"
  },
  fixPhone_box_button_text: {
    color: 'white',
    fontSize: 18,
  }
});

export default fixPhone;
