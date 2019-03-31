/**
 * Created by admin-pc on 2019/2/1.
 */
import React, {Component} from 'react'
import {StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, Image} from 'react-native'
import {Button, Flex, WhiteSpace, WingBlank} from '@ant-design/react-native';


class AccountRegister extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      userName: '',
      pwd: '',
      smsCode: ''
    }
  }
  
  _test() {
    console.log(123);
  }
  
  _earnSmsCode(phone) {
    console.log('abc');
    
  }
  
  
  render() {
    return (
        <View style={styles.register_box}>
          
          <Image source={require('./../image/logo.png')}/>
          <Text style={styles.register_title}>人才招聘</Text>
          
          
          <Flex style={styles.register_main} direction="row">
            <View style={styles.register_item}>
              <TextInput
                  placeholder='请输入手机号'
                  maxLength = {13}
                  keyboardType='numeric'
                  value={this.state.phone}
                  onChangeText={(phone) => {
                    const newPhone = phone.replace(/[^\d]+/, '');
                    console.log(newPhone);
                    this.setState({
                      phone: newPhone
                    })
                  }}/>
              <Text style={styles.register_earn_smscode_text} onPress={this._earnSmsCode.bind(this)}>获取验证码</Text>
            </View>
            <View style={styles.register_item}>
              <TextInput
                  placeholder='请输入验证码'
                  
                  // style={styles.}
                  onChangeText={(phone) => {
                    this.setState({
                      phone: phone
                    })
                  }}/>
            </View>
          </Flex>
          
          
          <Button style={styles.earn_smsCode}>获取验证码</Button>
        </View>
    )
  }
  
}
const styles = StyleSheet.create({
  register_box: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
    // borderColor: 'red',
    // borderWidth: 5,
    // borderStyle: 'solid'
  },
  register_title: {
    fontSize: 25,
  },
  register_main: {
    backgroundColor: 'white',
    height: 300,
    width: 350,
    flexDirection: 'column',
    justifyContent: 'space-evenly'
    // borderColor: 'red',
    // borderWidth: 2,
    // borderStyle: 'solid'
  },
  register_item: {
    height: 50,
    width: 310,
    flexDirection: 'row',
    // borderBottomColor: 'red',
    // borderBottomWidth: 2,
    borderColor: 'red',
    borderWidth: 2,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  register_earn_smscode_text: {
    fontSize: 13,
    color: "#1ec959",
    marginRight: 20,
    
  },
  earn_smsCode: {
    backgroundColor: 'red'
  }
})

export default AccountRegister