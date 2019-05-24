/**
 * Created by admin-pc on 2019/4/10.
 */
import React, {Component} from 'react'
import {StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ToastAndroid, Dimensions, TouchableHighlight, ScrollView, FlatList} from 'react-native'
import axios from 'axios'
import axiosUtil from '../../config/system'


import {
  Button, Flex, WhiteSpace, WingBlank, Picker, ListView, List, Provider, InputItem, TextareaItem
} from '@ant-design/react-native';
import ImagePicker from 'react-native-image-crop-picker';

import {observer} from 'mobx-react';
import UserStore from './../../mobx/userStore'
import HeaderComp from './../../util/headerComp'


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

@observer
class complainDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complainAccount: ''
    };
    this.onChange = value =>{
      this.setState({
        complainAccount: value
      })
    }
  };
  
  pickSingleWithCamera(type) {
    console.log('pickSingleWithCamera start');
    console.log(type);
    
    console.log('22222');
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: false,
      mediaType: 'photo',
    }).then(image => {
      console.log('received image', image);
      if(type === 'complainImage') {
        let presentComplainImage = Array.from(UserStore.complainImage);
        let img = {uri: image.path, width: image.width, height: image.height, mime: image.mime};
        if(presentComplainImage.length == 5) {
          ToastAndroid.show('最多只可上传五张图片', ToastAndroid.SHORT);
        }
        if(!this.isExistChooseImage(presentComplainImage, img)){
          console.log('push----');
          presentComplainImage.push(img);
          UserStore.changeComplainImage(presentComplainImage);
        }
      }
    }).catch(e => {
      console.log('报错');
      console.log(e)
    });
  }
  
  isExistChooseImage(presentComplainImage, image) {
    let flag = 0;
    console.log('presentComplainImage---len' + presentComplainImage.length);
    console.log(presentComplainImage);
    console.log(image);
    for(let i = 0, len = presentComplainImage.length ;i < len; i++) {
      console.log(presentComplainImage[i].uri);
      console.log(image.uri);
      if(presentComplainImage[i].uri === image.uri) {
        flag = 1;
        break;
      }
    }
    console.log('flag========' + flag);
    return flag;
  }
  
  
  saveComplainIntro() {
    let jobId = UserStore.jobDetailItem._id;
    let url = axiosUtil.axiosUrl;
    let {complainAccount} = this.state;
    if(complainAccount.length === 0) {
      ToastAndroid.show('请填写具体投诉信息', ToastAndroid.SHORT);
      return
    }
    let complainImage = UserStore.complainImage;
    let formData = new FormData();
    for(let i = 0 , len = complainImage.length; i < len; i++) {
      console.log('imageFile'+i);
      let tempFile = 'imageFile'+i;
      let tempFileName = 'imageFile'+i;
      tempFile = {uri: complainImage[i].uri, type: 'multipart/form-data', name: 'image.png'};
      formData.append(tempFileName, tempFile);
    }
    formData.append('jobId', jobId);
    let promiseComplainImage = function () {
      axios.post(url + 'jobhunter/saveComplainImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + UserStore.userToken
        }
      }).then((res) => {
        console.log('上传投诉截屏接口所传res===');
      }).catch((err) => {
        console.log('上传投诉截屏接口报错===');
        console.log(err);
      })
    };
  
    let promiseComplainDetailInfo = function() {
      console.log('aaaaajobid========' + UserStore.jobDetailItem._id);
      let jobId = UserStore.jobDetailItem._id;
      axios.post(url + 'jobhunter/saveComplainDetailInfo', {complainAccount, jobId}, {
        headers: {
          'Authorization': 'Bearer ' + UserStore.userToken
        }
      }).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
        
        }
      }).catch((err) => {
        console.log(err);
      })
    };
  
    //, promiseComplainDetailInfo()
        Promise.all([promiseComplainImage(), promiseComplainDetailInfo()]).then((res) =>{
      console.log('成功');
      ToastAndroid.show('投诉信息待审核', ToastAndroid.SHORT);
      this.props.navigation.navigate('jobDetail');
    }).catch((err) => {
      console.log('promise_all 报错');
    });
  }
  
  render() {
    const {navigation} = this.props;
    return (
        <View>
          <HeaderComp navigation={navigation} title="提交举报证据" routeName='jobDetail'/>
     
          <View  style={styles.complainDetail_box}>
            <Text style={{fontSize: 18, paddingVertical: 5}}>请描述举报的具体原因</Text>
            <TextareaItem rows={6} defaultValue={this.state.workContent} placeholder="请简要描述你的问题和意见" count={500} onChange={this.onChange}
                          style={{paddingHorizontal: 15,}}/>
  
  
            <View>
              <Text>图片（提供证据截图）</Text>
              <ScrollView horizontal={true} style={{marginTop: 10,}}>
                {UserStore.complainImage.map((item, index) =>{
                  return (
                      <Flex key={index}>
                        <Image key={index} style={styles.complainDetail_main_complain_pic} source={{uri: item.uri}}/>
                      </Flex>
                  )
                })}
              </ScrollView>
              <TouchableOpacity onPress={this.pickSingleWithCamera.bind(this, 'complainImage')}>
                <Flex justify="center" align="center"><Text>上传投诉截屏（限五张）</Text></Flex>
              </TouchableOpacity>
            </View>
  
  
            <Flex justify="center" style={{marginTop: 30}}>
              <Flex justify="center" align="center" style={styles.complainDetail_box_info_save_button}
                    onPress={this.saveComplainIntro.bind(this)}>
                <Text style={styles.complainDetail_box_info_save_text}>完成</Text>
              </Flex>
            </Flex>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  complainDetail_box: {
    backgroundColor: '#f6f6f8',
    height: deviceH,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  complainDetail_box_info_save_button: {
    width: deviceW * 0.85,
    height: 50,
    backgroundColor: '#5dd5c8',
    borderRadius: 5,
  },
  complainDetail_box_info_save_text: {
    fontSize: 18,
    color: 'white',
  },
  complainDetail_main_complain_pic: {
    width: 240,
    height: 180,
    borderRadius: 10,
    marginRight: 10,
    
  },
});

export default complainDetail;