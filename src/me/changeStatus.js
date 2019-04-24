/**
 * Created by admin-pc on 2019/4/23.
 */
import React, {Component} from 'react'
import {
  StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight, FlatList,
  ScrollView
} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'
import UserStore from './../../mobx/userStore';
import {Button, Flex, WhiteSpace, WingBlank, Picker, ListView, List, Provider, Toast, Portal} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";
import HeaderComp from './../../util/headerComp'


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class changeStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      presentStatus: 0,
      /*0为牛人，1为BOSS*/
    }
  };
  
  changeStatusFunc() {
    console.log('点击切换身份');
    let url = axiosUtil.axiosUrl;
    /* 转换boss身份之后获取基本的boss信息，看是否存在boss信息，如果该用户已经填写了相关的boss信息则进入发布岗位界面，否则填写boss基本信息*/
    // setTimeout()
    let toastKey = Toast.loading('Loading...', 0, () => {
      console.log('Load complete !!!');
    });
    
    axios.post(url + 'user/userInfo',{}, {
      headers: {
        'Authorization': 'Bearer ' + UserStore.userToken
      }
    }).then((res) => {
      console.log(res);
      let user = res.data.user;
      let {unit, place, creditFrontSide, creditReverseSide, userCreditCode} = user;
    
      console.log('user===========');
      console.log(user);
      if(res.data.code === 200) {
        console.log('userinfo成功');
        Portal.remove(toastKey);
        let isBoss = unit&&place&&creditFrontSide&&creditReverseSide&&userCreditCode
        if(!isBoss) {
          this.props.navigation.navigate('bossInfoDetail');
        }else {
          this.props.navigation.navigate('publishJob', {routeName: 'changeStatus'});
        }
      }
      console.log(res)
    }).catch((err) => {
      console.log('userinfo报错');
      console.log(err);
    });
 
  
  
  };
  
  
  backView() {
    this.props.navigation.navigate('personSetting');
  }
  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
  render() {
    const {navigation} = this.props;
    console.log(123456);
    return (
        <Provider>
        <View style={styles.changeStatus_box}>
          <Flex direction="column" justify="center">
            <Text style={styles.changeStatus_box_title}>Boss直聘</Text>
            
            <Image style={styles.changeStatus_box_photo} source={require('./../image/changeStatus.png')}/>
            
            {this.state.presentStatus === 0 ?
                <Text style={styles.changeStatus_box_present_status}>您当前的身份是“牛人”</Text> :
                <Text style={styles.changeStatus_box_present_status}>您当前的身份是“BOSS”</Text>
            }
            
            
            <Flex justify="center" style={styles.changeStatus_box_change_button} onPress={this.changeStatusFunc.bind(this)}>
              {this.state.presentStatus === 0 ?
                  <Text style={styles.changeStatus_box_change_button_text}>切换为“BOSS”身份</Text> :
                  <Text style={styles.changeStatus_box_change_button_text}>切换为“牛人”身份</Text>
              }
            </Flex>
            <Flex justify="center" style={styles.changeStatus_box_back_button} onPress={this.backView.bind(this)}>
              <Text style={styles.changeStatus_box_button_back_text}>返回</Text>
            </Flex>
            {/*<HeaderComp navigation={navigation} title="沟通过的职位" routeName="personCenter"/>*/}
          </Flex>
        </View>
        </Provider>
    )
  }
}

const styles = StyleSheet.create({
  changeStatus_box: {
    height: deviceH,
    width: deviceW,
  },
  changeStatus_box_title: {
    fontSize: 26,
    fontWeight: '600',
    fontFamily: 'Georgia',
    color: '#5dd5c8',
    paddingTop: 20,
  },
  changeStatus_box_photo: {
    marginTop: 50,
    width: deviceW * 0.75,
    height: deviceH * 0.45,
  },
  changeStatus_box_present_status: {
    marginTop: 40,
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'Times New Roman',
    color: '#5dd5c8',
    paddingTop: 10,
  },
  changeStatus_box_change_button: {
    width: deviceW * 0.9,
    height: 40,
    borderRadius: 3,
    backgroundColor: '#5dd5c8',
    marginTop: 30,
  },
  changeStatus_box_change_button_text: {
    fontSize: 16,
    color: 'white'
  },
  changeStatus_box_back_button: {
    width: deviceW * 0.9,
    height: 40,
    borderRadius: 3,
    borderColor: '#5dd5c8',
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: 'white',
    marginTop: 20,
  },
  changeStatus_box_button_back_text: {
    fontSize: 16,
    color: '#5dd5c8',
  }
});

export default changeStatus;
