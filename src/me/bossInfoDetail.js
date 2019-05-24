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
import {
  Button, Flex, WhiteSpace, WingBlank, Picker, ListView, List, Provider, InputItem
} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";
import UserStore from './../../mobx/userStore';
import HeaderComp from './../../util/headerComp';
import ImagePicker from 'react-native-image-crop-picker';

// const ImagePicker = NativeModules.ImageCropPicker;
const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

class bossInfoDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',//用户姓名，同上，必填项
      userCompany: '',//初始为空，saveBossInfo提交必填项
      userCompanyCode: '',//公司唯一认证码。初始为空，saveBossInfo提交必填项
      userPlace: '',//用户职务，saveBossInfo提交必填项
      userEmail: '',//选填项
      userCreditCode: '',//身份证号码
      creditFrontSide: '',
      creditReverseSide: '',
      
      image: '',//用户头像，进入界面获取用户基本信息然后得到用户的头像赋值给该变量，如果没有就默认一个头像
    }
  };
  
  componentWillMount() {
    /*转换boss身份之后获取基本的boss信息，看是否存在boss信息，如果该用户已经填写了相关的boss信息则进入发布岗位界面，否则填写boss基本信息*/
    console.log('bossinfodetail--------');
    console.log(this.props.navigation.state.params.userInfo);
    let userInfo = this.props.navigation.state.params.userInfo;
    // userCompanyCode: userInfo.companyCode,
        this.setState({
      userName: userInfo.nickName,
      userCompany: userInfo.unit,
      userPlace: userInfo.place,
      userEmail: userInfo.userEmail,
      userCreditCode: userInfo.userCreditCode,
      image: {uri: userInfo.image},
      creditFrontSide: {uri: userInfo.creditFrontSide},
      creditReverseSide: {uri: userInfo.creditReverseSide}
    }, () => {
      console.log(this.state.creditReverseSide)
    })
  };
  
  saveBossInfo() {
    console.log('点击保存按钮');
    let url = axiosUtil.axiosUrl;
    let isSave = this.state.image && this.state.userName && this.state.userCompany && this.state.userCompanyCode && this.state.userPlace && this.state.creditReverseSide && this.state.creditFrontSide && this.state.userCreditCode;
    if (!isSave) {
      ToastAndroid.show('请完整填写Boss相关信息', ToastAndroid.SHORT);
      return;
    }
    let formData = new FormData();//如果需要上传多张图片,需要遍历数组,把图片的路径数组放入formData中
    let imageFile = {uri: this.state.image.uri, type: 'multipart/form-data', name: 'image.png'};   //这里的key(uri和type和name)不能改变,
    let creditFrontSideFile = {uri: this.state.creditFrontSide.uri, type: 'multipart/form-data', name: 'image.png'};
    let creditReverseSideFile = {uri: this.state.creditReverseSide.uri, type: 'multipart/form-data', name: 'image.png'};
    formData.append("imageFile", imageFile);
    formData.append("creditFrontSideFile", creditFrontSideFile);
    formData.append("creditReverseSideFile", creditReverseSideFile);
    
    let userBossInfo = {
      unit: this.state.userCompany,
      companyCode: this.state.userCompanyCode,
      nickName: this.state.userName,
      place: this.state.userPlace,
      userEmail: this.state.userEmail,
      userCreditCode: this.state.userCreditCode
    };
    
    let promiseImage = function () {
      axios.post(url + 'user/submitBossInfImg', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + UserStore.userToken
        }
      }).then((res) => {
        console.log('上传boss信息接口所传res===');
      }).catch((err) => {
        console.log('上传boss信息接口所传报错===');
        console.log(err);
      })
    };
    let promiseBossInfo = function () {
      axios.post(url + 'user/submitBossInfoBasic', userBossInfo, {
            headers: {
              'Authorization': 'Bearer ' + UserStore.userToken
            }
          }
      ).then((res) => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    };
    Promise.all([promiseImage(), promiseBossInfo()]).then((res) =>{
      console.log('成功');
      ToastAndroid.show('信息提交成功，待系统审核', ToastAndroid.SHORT);
      // this.props.navigation.navigate('publishJob', {routeName: 'bossInfoDetail'});
    }).catch((err) => {
      console.log('promise_all 报错');
    });
  };
  
  pickSingleWithCamera(type) {
    console.log('pickSingleWithCamera start');
    console.log(type);
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: false,
      mediaType: 'photo',
    }).then(image => {
      console.log('received image', image);
      this.setState({
        [type]: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
        
      });
    }).catch(e => {
      console.log('报错');
      console.log(e)
    });
  }
  
  
  render() {
    const {navigation} = this.props;
    return (
        <View style={styles.bossInfoDetail_box}>
          <HeaderComp navigation={navigation} routeName="changeStatus"/>
          <Text style={styles.bossInfoDetail_box_header_title}>创建Boss名片</Text>
          <Text style={styles.bossInfoDetail_box_header_account}>展示你的基本信息</Text>
          <Flex justify="around" direction="column" style={{height: deviceH * 0.4}}>
            
            <Flex justify="between" style={{width: deviceW * 0.93}}>
              <Text style={{color: 'black', fontSize: 16}}>头像</Text>
              <TouchableOpacity onPress={this.pickSingleWithCamera.bind(this, 'image')} style={styles.button}>
                {this.state.image.uri.length === 0 ? <Text>请选择一张照片作为自己的头像</Text> :
                    <Image style={styles.bossInfoDetail_box_photo} source={{uri: this.state.image.uri}}/>}
              </TouchableOpacity>
            </Flex>
            
            <InputItem
                defaultValue=""
                clear
                placeholder="请填写自己姓名"
                value={this.state.userName}
                onChange={value => {
                  this.setState({
                    userName: value
                  });
                }}
            >
              姓名
            </InputItem>
  
           
            
            <InputItem
                defaultValue=""
                clear
                placeholder="请完整输入公司名称"
                value={this.state.userCompany}
                onChange={value => {
                  this.setState({
                    userCompany: value
                  });
                }}
            >
              公司名
            </InputItem>
  
            <InputItem
                defaultValue=""
                clear
                placeholder="请完整输入公司机构代码"
                value={this.state.userCompanyCode}
                onChange={value => {
                  this.setState({
                    userCompanyCode: value
                  });
                }}
            >
              公司代码
            </InputItem>
            <InputItem
                defaultValue=""
                clear
                placeholder="请完整自己职位"
                value={this.state.userPlace}
                onChange={value => {
                  this.setState({
                    userPlace: value
                  });
                }}
            >
              职位
            </InputItem>
            <InputItem
                defaultValue=""
                clear
                placeholder="请完整输入身份证号码"
                value={this.state.userCreditCode}
                onChange={value => {
                  this.setState({
                    userCreditCode: value
                  });
                }}
            >
              身份证号
            </InputItem>
            <InputItem
                defaultValue=""
                clear
                placeholder="去填写邮箱（选填）"
                value={this.state.userEmail}
                onChange={value => {
                  this.setState({
                    userEmail: value
                  });
                }}
            >
              我的邮箱
            </InputItem>
          
          
          </Flex>
          
          <Flex style={styles.bossInfoDetail_box_credit_items}>
            <Flex direction="column" style={styles.bossInfoDetail_box_credit_item}>
              <Text style={{fontSize: 16, marginTop: 10}}>身份证正面</Text>
              <TouchableOpacity onPress={this.pickSingleWithCamera.bind(this, 'creditFrontSide')}>
                {this.state.creditFrontSide.uri.length === 0 ?
                    <Flex justify="center" align="center" style={styles.bossInfoDetail_box_credit_item_photo}><Text>上传本人的身份证正面照</Text></Flex> :
                    <Image
                        style={styles.bossInfoDetail_box_credit_photo} source={{uri: this.state.creditFrontSide.uri}}/>
                }
              </TouchableOpacity>
            
            </Flex>
            <Flex direction="column" style={styles.bossInfoDetail_box_credit_item}>
              <Text style={{fontSize: 16, marginTop: 10}}>身份证反面</Text>
              <TouchableOpacity onPress={this.pickSingleWithCamera.bind(this, 'creditReverseSide')}>
                {this.state.creditReverseSide.uri.length === 0 ?
                    <Flex justify="center" align="center" style={styles.bossInfoDetail_box_credit_item_photo}><Text>上传本人的身份证反面照</Text></Flex> :
                    <Image
                        style={styles.bossInfoDetail_box_credit_photo}
                        source={{uri: this.state.creditReverseSide.uri}}/>
                }
              </TouchableOpacity>
            
            </Flex>
          </Flex>
          
          
          <Flex justify="center" style={{marginTop: 30}}>
            <Flex justify="center" align="center" style={styles.bossInfoDetail_box_info_save_button}
                  onPress={this.saveBossInfo.bind(this)}>
              <Text style={styles.bossInfoDetail_box_info_save_text}>完成</Text>
            </Flex>
          </Flex>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  bossInfoDetail_box: {},
  bossInfoDetail_box_header_title: {
    fontSize: 24,
    color: 'black',
    paddingLeft: 18,
  },
  bossInfoDetail_box_header_account: {
    fontSize: 14,
    color: '#818182',
    marginTop: 15,
    paddingLeft: 18,
  },
  bossInfoDetail_box_photo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  bossInfoDetail_box_InputItem: {},
  
  bossInfoDetail_box_credit_items: {
    width: deviceW,
    // borderColor: 'blue',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  bossInfoDetail_box_credit_item: {
    width: deviceW * 0.5,
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  bossInfoDetail_box_credit_item_photo: {
    height: 140,
    width: deviceW * 0.45,
    marginTop: 10,
    borderColor: '#9b9b9c',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  bossInfoDetail_box_credit_photo: {
    height: 140,
    width: deviceW * 0.45,
  },
  
  
  bossInfoDetail_box_info_save_button: {
    width: deviceW * 0.85,
    height: 50,
    backgroundColor: '#5dd5c8',
    borderRadius: 5,
  },
  bossInfoDetail_box_info_save_text: {
    fontSize: 18,
    color: 'white',
  }
});

export default bossInfoDetail;
