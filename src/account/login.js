/**
 * Created by admin-pc on 2019/2/1.
 */
import React, {Component} from 'react'
import {StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import Home from '../home'
import UserStore from './../../mobx/userStore'
// import Button from '@ant-design/react-native/lib/button';
import {Button, Flex, WhiteSpace, WingBlank } from '@ant-design/react-native';
import AsyncStorage from '@react-native-community/async-storage';







const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

const Circle = (props) => {
  const size = props.size || 20;
  const style = {
    borderRadius: size / 2,
    backgroundColor: '#527fe4',
    width: size,
    height: size,
    margin: 1,
  };
  return <View style={style} />;
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      pwd: '',
      smsCode: '',
      axiosUrl: axiosUtil.axiosUrl
    }
  };
  
  _getSmsCode() {
    console.log(1223);
  };
  

   _testInput() {
    console.log(`手机号码 === ${this.state.phone}`);
    const deviceW = Dimensions.get('window').width;
    console.log(deviceW);
    console.log(123);
    console.log(UserStore.changePhone(13755038432));
  };
  
  /*注册账号*/
  _registerAccount() {
    console.log('_registerAccount Start');
    this.props.navigation.navigate('AccountRegister', {
      testName: 'zchuhyy'
    })
  }
  /*修改密码*/
  _fixPwd() {
    console.log('修改密码');
    this.props.navigation.navigate('AccountFixPwd', {
      testName: 'zchuhyy'
    })
  }
  /*自动登录*/
  _autoLogin = async() => {
    console.log('自动登录获得本地存储的手机号码和密码');
    let phone = await AsyncStorage.getItem('phone');
    let pwd = await AsyncStorage.getItem('pwd');
    console.log(phone, pwd);
    this.setState({
      phone: phone,
      pwd: pwd,
    });
    if(phone && pwd) {
      this._pwdLogin();
    }
  };
  _storeUserData = async (obj) => {
    try {
      await AsyncStorage.setItem('phone', obj.phone);
      await AsyncStorage.setItem('pwd', obj.pwd);
    } catch (e) {
      // saving error
    }
  };
  /*登录*/
  _pwdLogin() {
    console.log('pwdlogin');
    let that = this;
    let url = axiosUtil.axiosUrl;
    console.log(this.state.phone);
    let pwdObj = {
      phone: this.state.phone,
      pwd: this.state.pwd,
    };
    axios.post(url + 'user/login', pwdObj).then(res => {
      console.log('拿到数据');
      if(res.data.code === 200) {
        ToastAndroid.show('登录成功', ToastAndroid.SHORT);
        let accountObj = pwdObj;
        this._storeUserData(accountObj);
        that.props.navigation.push('Main',  {
          itemId: 86,
          otherParam: 'anything you want here',
        });
        console.log(99999)
      }
    }).catch(err => {
      console.log('接口报错');
      console.log(err);
    })
  }
  
  componentWillMount() {
    console.log('进入login界面---等价于mounted');
    this._autoLogin();
  }
  
  render() {
    return (
        <View style={styles.login_box}>
          <View style={styles.login_top}>
            <View style={styles.login_logo_item}>
              <Image style={styles.login_logo} source={require('./../image/logo.png')} />
              <Text style={styles.login_name}>Boss直聘</Text>
            </View>
          </View>
          
          <View style={styles.login_main}>
          <View style={styles.login_item}>
            <View style={styles.login_item_textview}>
              <Text style={styles.login_box_span}>手机号:</Text>
            </View>
    
            <TextInput placeholder='请输入手机号'
                       multiline={false}
                       editable={true}
                       style={styles.test_textinput}
                       onChangeText={(text) => {
                         this.setState({
                           phone: text
                         })
                       }}
            />
          </View>
          <View style={styles.login_item}>
            <View style={styles.login_item_textview}>
              <Text style={styles.login_box_span}>密码:</Text>
            </View>
    
            <TextInput placeholder='请输入账号密码'
                       multiline={false}
                       editable={true}
                       style={styles.test_textinput}
                       onChangeText={(text) => {
                         this.setState({
                           pwd: text
                         })
                       }}
            />
          </View>
          <View style={styles.login_button}></View>
          <Button
              onPress={this._pwdLogin.bind(this)}
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
          >登录</Button>
          </View>
          
          <Button
              style={styles.test_button}
              onPress={this._testInput.bind(this)}
              color="black"
              accessibilityLabel="Learn more about this purple button"
          >测试setState</Button>
          <View style={styles.button_choose}>
            <Text style={styles.button_choose_text} onPress={this._registerAccount.bind(this)}>注册账号</Text>
            <Text style={styles.button_choose_text}>| </Text>
            <Text style={styles.button_choose_text} onPress={this._fixPwd.bind(this)}>修改密码</Text>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  login_box: {
    padding: 10,
    backgroundColor: 'white',
    borderColor: '#cceeff',
    borderWidth: 1,
    borderStyle: 'solid',
    width: deviceW,
    height: deviceH,
    flex: 1,
    paddingTop: 100,
  },
  login_top: {
    justifyContent: 'space-between',
    borderColor: '#ee282d',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  login_main: {
    borderColor: '#0b86ee',
    borderWidth: 1,
    borderStyle: 'solid',
    shadowColor:'green',
    shadowOffset:{h:10,w:10},
    shadowRadius:3,

  },
  login_logo_item:{
    alignItems: 'center',
  },
  login_logo:{
    width: 150,
    height: 150
  },
  login_name:{
    fontSize: 20,
  },
  login_item: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderColor: '#cceeff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
  },
  login_item_textview: {
    height: 40,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  login_box_span: {
    fontSize:16,
  },
  test_textinput: {
    width: deviceW - 105,
    fontSize: 15,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 20,
  },
  test_button: {
    height: 100,
    width: 100,
    backgroundColor: 'red',
  },
  login_button: {
    marginTop: 20,
  },
  button_choose:  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 40
  },
  button_choose_text: {
    fontSize: 16,
  }
});
export default Login;