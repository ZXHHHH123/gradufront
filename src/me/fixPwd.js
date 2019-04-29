/**
 * Created by admin-pc on 2019/4/28.
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

class fixPwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pwd1: '',
      pwd2: '',
    };
  };
  
  changePwd() {
    let url = axiosUtil.axiosUrl;
    console.log('点击更改手机密码按钮');
    console.log(this.state.pwd1);
    if(this.state.pwd1 !== this.state.pwd2) {
      ToastAndroid.show('请确保二次输入的密码相同', ToastAndroid.SHORT);
      return;
    }
    let changePwdObj = {
      pwd: this.state.pwd1,
    };
    axios.post(url + 'user/personSettingFixPhone', changePwdObj, {
      headers: {
        'Authorization': 'Bearer ' + UserStore.userToken
      }
    }).then((res) => {
      if(res.data.code === 200) {
        ToastAndroid.show('更改手机密码成功', ToastAndroid.SHORT);
        this.props.navigation.navigate('personSetting');
      }else {
        ToastAndroid.show('更改手机密码失败---todo', ToastAndroid.SHORT);
      }
    }).catch((err) => {
      console.log('更改手机号码接口报错' + err);
    })
  }
  
  render() {
    const {navigation} = this.props;
    return (
        <View style={styles.fixPwd_box}>
          <HeaderComp navigation={navigation} title="设置密码" routeName="personSetting"/>
          <View style={{paddingHorizontal: 15}}>
            <View style={{marginTop: 15, backgroundColor: 'white'}}>
          <InputItem
              defaultValue=""
              placeholder="请设置新密码"
              onChange={value => {
                this.setState({
                  pwd1: value
                });
              }}
          ><IconOutline name="lock" style={{fontSize: 20}} color="gray"/></InputItem>
            </View>
            <View style={{marginTop: 15, backgroundColor: 'white'}}>
          <InputItem
              defaultValue=""
              placeholder="请再次输入新密码"
              onChange={value => {
                this.setState({
                  pwd2: value
                });
              }}
          ><IconOutline name="lock" style={{fontSize: 20}} color="gray"/></InputItem>
            </View>
          </View>
          
          
          <Flex justify="center" align="center" style={styles.fixPwd_box_button}
                onPress={this.changePwd.bind(this)}>
            <Text style={styles.fixPwd_box_button_text}>完成</Text>
          </Flex>
        </View>
    
    )
  }
}

const styles = StyleSheet.create({
  fixPwd_box: {
    width: deviceW,
    height: deviceH,
    backgroundColor: '#f6f6f8'
  },
  fixPwd_box_button: {
    width: deviceW * 0.8,
    height: 40,
    marginTop: 20,
    marginLeft: deviceW * 0.1,
    backgroundColor: "#5dd5c8"
  },
  fixPwd_box_button_text: {
    color: 'white',
    fontSize: 18,
  }
});

export default fixPwd;
