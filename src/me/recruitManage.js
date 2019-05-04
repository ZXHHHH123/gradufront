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
      companyNameCode: '',
      place: '',
      companyStar: '',
      companyIntro: [],
    }
  };
  
  intoEditTypeView(type) {
    console.log('进入界面' + type);
    this.props.navigation.navigate(type, {routeName: 'recruitManage'})
  }

  componentWillMount() {
  

  
  }
  render() {
    const {navigation} = this.props;
    return (
        <Provider>
          <View>
            <HeaderComp navigation={navigation} title="个人信息" routeName="personCenter"  rightText="保存"/>
            <View style={styles.recruitManage_box}>
              <View style={styles.recruitManage_box_items}>
              <Flex justify="between">
                <Text style={styles.recruitManage_box_item_title}>头像</Text>
                <Image style={styles.recruitManage_box_titImg} source={require('./../image/userPhoto.jpg')}/>
              </Flex>
  
              <InputItem
                  defaultValue=""
                  clear
                  placeholder="请填写自己姓名"
                  value={this.state.nickName}
                  onChange={value => {
                    this.setState({
                      nickName: value
                    });
                  }}
              >
                姓名
              </InputItem>
              <InputItem
                  defaultValue=""
                  clear
                  placeholder="请填写自己性别"
                  value={this.state.gender}
                  onChange={value => {
                    this.setState({
                      gender: value
                    });
                  }}
              >
                性别
              </InputItem>
              <InputItem
                  defaultValue=""
                  clear
                  placeholder="请填写自己姓名"
                  value={this.state.nickName}
                  onChange={value => {
                    this.setState({
                      nickName: value
                    });
                  }}
              >
                姓名
              </InputItem>
              <InputItem
                  defaultValue=""
                  clear
                  placeholder="邮箱"
                  value={this.state.email}
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
                  defaultValue=""
                  clear
                  placeholder="公司名字"
                  value={this.state.companyName}
                  onChange={value => {
                    this.setState({
                      companyName: value
                    });
                  }}
              >
                所在公司
              </InputItem>
  
              <InputItem
                  defaultValue=""
                  clear
                  placeholder="所在公司机构代码"
                  value={this.state.companyNameCode}
                  onChange={value => {
                    this.setState({
                      companyNameCode: value
                    });
                  }}
              >
                公司代码
              </InputItem>
              </View>
              
              <View style={styles.recruitManage_box_items}>
                <InputItem
                    defaultValue=""
                    clear
                    placeholder="我的职务"
                    value={this.state.place}
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
    paddingLeft: 5,
    fontSize: 16,
    color: 'black',
  },
  recruitManage_box_intoView: {
    width: deviceW - 20,
    height: 40,
  }
});

export default recruitManage;
