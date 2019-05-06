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
import {Button, Flex, WhiteSpace, WingBlank, Picker, ListView, List, Provider, InputItem} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";
import {observer} from 'mobx-react';
import HeaderComp from './../../util/headerComp'
import publishJob from "../publish/publishJob";
import PublishJobItemComp from './../component/PublishJobItemComp'
import UserStore from './../../mobx/userStore'


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

@observer
class recruitManage extends Component {
  _keyExtractor = (item, index) => item._id;
  constructor(props){
    super(props);
    this.state = {
      nickName: '',
      gender: '',
      email: '',
      companyName: '',
      companyCode: '',
      place: '',
      wxCode: '',
      companyStar: '',
      companyIntro: [],
    }
  };
  
  intoEditTypeView(type) {
    console.log('进入界面' + type);
    this.props.navigation.navigate(type, {routeName: 'recruitManage'})
  };
  
  /*保存所填写的公司信息*/
  saveCompanyInfo() {
    let url = axiosUtil.axiosUrl;
    let tianyanurl = axiosUtil.tianyanchaApi;
    console.log('点击保存公司信息按钮');
    console.log(this.state.companyName);
    
    let { nickName, gender, email, companyName, companyCode, place, wxCode} = this.state;
    if(!(companyName && companyCode &&email)) {
      ToastAndroid.show('请详细填写公司信息', ToastAndroid.SHORT);
      return false;
    }
    
    let obj = {
      nickName, gender, email, companyName, companyCode, place, wxCode
    };
    console.log(obj);
    // axios.post(url + 'recruiter/submitCompanyBasicInfo', obj, {
    //   headers: {
    //     'Authorization': 'Bearer ' + UserStore.userToken
    //   }
    // }).then((res) => {
    //   console.log(res);
    //   if(res.data.code === 200) {
    //    'UserStore.chamge........todo'
    // }
    
    // }).catch((err) => {
    //   console.log(err);
    // })
    
    
    
    //如果填了公司名称则应该先从天眼查获取公司信息看是否存在，如果不存在，则直接toast & return
  }

  componentWillMount() {
    this.setState({
      nickName: UserStore.nickName,
      gender: UserStore.gender,
      email: UserStore.email,
      companyName: UserStore.companyName,
      companyCode: UserStore.companyCode,
      place:UserStore.place,
      wxCode: UserStore.place
    })

  
  }
  render() {
    const {navigation} = this.props;
    return (
        <Provider>
          <View>
            <HeaderComp navigation={navigation} title="个人信息" routeName="personCenter"/>
            <View style={styles.recruitManage_box}>
              <View style={styles.recruitManage_box_items}>
              <Flex justify="between">
                <Text style={styles.recruitManage_box_item_title}>头像</Text>
                {UserStore.titImg ?                <Image style={styles.recruitManage_box_titImg} source={{uri: UserStore.titImg}}/>
                    :
                    <Image style={styles.recruitManage_box_titImg} source={require('./../image/userPhoto.jpg')}/>
  
                }
              </Flex>
  
              <InputItem
                  defaultValue={UserStore.nickName}
                  placeholder="请填写自己姓名"
                  onChange={value => {
                    this.setState({
                      nickName: value
                    });
                  }}
              >
                姓名
              </InputItem>
              <InputItem
                  defaultValue={UserStore.gender}
                  placeholder="请填写自己性别"
                  // value={this.state.gender}
                  onChange={value => {
                    this.setState({
                      gender: value
                    });
                  }}
              >
                性别
              </InputItem>
              <InputItem
                  defaultValue={UserStore.wxCode}
                  // clear
                  placeholder="请填写自己微信号码"
                  // value={this.state.wxCode}
                  onChange={value => {
                    this.setState({
                      wxCode: value
                    });
                  }}
              >
                微信号
              </InputItem>
              <InputItem
                  defaultValue=""
                  placeholder="邮箱"
                  onChange={value => {
                    this.setState({
                      email: value
                    });
                  }}
              >
                接收简历邮箱
              </InputItem>
              </View>
  
              <View style={styles.recruitManage_box_items}>
              <InputItem
                  defaultValue={UserStore.companyName}
                  placeholder="请准确填写公司名字"
                  onChange={value => {
                    this.setState({
                      companyName: value
                    });
                  }}
              >
                所在公司
              </InputItem>
  
              <InputItem
                  defaultValue={UserStore.companyCode}
                  placeholder="所在公司机构代码"
                  onChange={value => {
                    this.setState({
                      companyCode: value
                    });
                  }}
              >
                公司代码
              </InputItem>
              </View>
              
              <View style={styles.recruitManage_box_items}>
                <InputItem
                    defaultValue={UserStore.place}
                    placeholder="我的职务"
                    onChange={value => {
                      this.setState({
                        place: value
                      });
                    }}
                >
                  我的职务
                </InputItem>
                
                <Flex justify="between" align="center" style={styles.recruitManage_box_intoView} onPress={this.intoEditTypeView.bind(this, 'editCompanyStar')}>
                  <Text style={styles.recruitManage_box_item_title}>公司亮点</Text>
                  <IconOutline name="right"/>
                </Flex>
  
                <Flex justify="between" align="center" style={styles.recruitManage_box_intoView} onPress={this.intoEditTypeView.bind(this, 'editCompanyIntro')}>
                  <Text style={styles.recruitManage_box_item_title}>公司介绍</Text>
                  <IconOutline name="right"/>
                </Flex>
              </View>
              
              
              <Flex justify="center" align="center" style={styles.recruitManage_box_save_button} onPress={this.saveCompanyInfo.bind(this)}>
                <Text style={styles.recruitManage_box_save_button_text}>保存所填信息</Text>
              </Flex>



            </View>
          </View>
        </Provider>
    )
  }
}

const styles = StyleSheet.create({
  recruitManage_box: {
    paddingHorizontal: 10,
    width: deviceW,
    height: deviceH,
    backgroundColor: '#f6f6f8',
  },
  recruitManage_box_titImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  recruitManage_box_items: {
    backgroundColor: 'white',
    marginBottom: 5,
  },
  recruitManage_box_item_title: {
    paddingLeft: 14,
    fontSize: 18,
    color: 'black',
  },
  recruitManage_box_intoView: {
    width: deviceW - 20,
    height: 40,
  },
  
  
  recruitManage_box_save_button: {
    height: 40,
    width: deviceW * 0.8,
    marginLeft: deviceW * 0.1 - 10,
    backgroundColor: '#5dd5c8',
    borderRadius: 5,
  },
  recruitManage_box_save_button_text: {
    color: 'white',
    fontSize: 18,
  },
});

export default recruitManage;
