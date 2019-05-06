/**
 * Created by admin-pc on 2019/5/6.
 */
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
import ImagePicker from 'react-native-image-crop-picker';


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

@observer
class companyLeaderIntro extends Component {
  _keyExtractor = (item, index) => item._id;
  constructor(props){
    super(props);
    this.state = {
      tempEditLeader: [],
      companyLeaderItems: [],
      companyLeaderImg: '',
      leaderName: '',
      leaderPlace: '',
      leaderAccount: '',
    }
  };
  
  
  
  addNewCompanyLeaderInfo() {
    console.log('点击新增一个webleader');
    let tempEditLeader = Array.from(this.state.tempEditLeader);
    tempEditLeader.push({});
    this.setState({
      tempEditLeader: tempEditLeader,
    }, () => {
      console.log('len========' + this.state.tempEditLeader.length);
    })
  }
  
  
  
  saveCompanyLeader() {
    let url = axiosUtil.axiosUrl;
    console.log('保存公司高管信息');
    let {companyLeaderImg, leaderName, leaderPlace, leaderAccount} = this.state;
    let leaderBasicInfo = {leaderName, leaderPlace, leaderAccount};
    
    if(!(companyLeaderImg && leaderName && leaderPlace && leaderAccount)) {
      ToastAndroid.show('请填写完整的高管信息', ToastAndroid.SHORT);
      return 0;
    }
  
    console.log('aaaaaaaaaaa' + companyLeaderImg);
    let formData = new FormData();
    let imageFile = {uri: this.state.companyLeaderImg.uri, type: 'multipart/form-data', name: 'image.png'};
    formData.append("imageFile", imageFile);
    let promiseLeaderImage = function () {
      axios.post(url + 'recruiter/saveCompanyLeaderImage', formData, {
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
  
    let promiseLeaderInfo = function () {
      axios.post(url + 'recruiter/saveCompanyLeaderInfo', leaderBasicInfo, {
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
    Promise.all([promiseLeaderImage(), promiseLeaderInfo()]).then((res) =>{
      
      console.log('成功');
      ToastAndroid.show('保存成功', ToastAndroid.SHORT);
      this.props.navigation.navigate(this.props.navigation.state.params.routeName);
    }).catch((err) => {
      console.log('promise_all 报错');
    });
    
  }
  
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
      }, () => {
        console.log(this.state[type]);
      });
    }).catch(e => {
      console.log('报错');
      console.log(e)
    });
  }
  earnLeaderInfo() {
    console.log('获取leader信息');
    let url = axiosUtil.axiosUrl;
    axios.post(url + 'recruiter/earnLeaderInfo',{}, {
      headers: {
        'Authorization': 'Bearer ' + UserStore.userToken
      }
    }).then((res)=> {
      console.log(res);
      if(res.data.code === 200) {
        this.setState({
          companyLeaderItems: res.data.data
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  deleteLeaderInfo(index, _id) {
    console.log('点击删除按钮');
    console.log(_id);
    let url = axiosUtil.axiosUrl;
    axios.post(url + 'recruiter/deleteLeaderInfo',{_id}, {
      headers: {
        'Authorization': 'Bearer ' + UserStore.userToken
      }
    }).then((res)=> {
      console.log(res);
      if(res.data.code === 200) {
        ToastAndroid.show('删除成功', ToastAndroid.SHORT);
        this.setState({
          companyLeaderItems: res.data.data
        })
      }
    }).catch((err) => {
      console.log(err);
    })
    
  }

  
  componentWillMount() {
    this.earnLeaderInfo();
  
  
  }
  render() {
    const {navigation} = this.props;
    return (
        <Provider>
          <View>
            <HeaderComp navigation={navigation} title="编辑高管信息" routeName={this.props.navigation.state.params.routeName}/>
            
            <View style={styles.companyLeaderIntro_box}>
  
              <View>
                {this.state.companyLeaderItems.map((item, index) => {
                  return (
                      <View key={index} style={styles.companyLeaderIntro_box_companyLeaderItem}>
                        <Flex justify="between" style={{marginBottom: 5,}}>
                          <Text style={styles.companyLeaderIntro_box_title}>高管姓名</Text>
                          <Text style={styles.companyLeaderIntro_box_value}>{item.leaderName}</Text>
                        </Flex>
                        <Flex justify="between" style={{marginBottom: 5,}}>
                          <Text  style={styles.companyLeaderIntro_box_title}>高管职位</Text>
                          <Text style={styles.companyLeaderIntro_box_value}>{item.leaderPlace}</Text>
                        </Flex>
                        <Flex justify="between" align="start" direction="column" style={{marginBottom: 5,}}>
                          <Text  style={styles.companyLeaderIntro_box_title}>高管介绍</Text>
                          <Text style={styles.companyLeaderIntro_box_value}>{item.leaderAccount}</Text>
                        </Flex>
                        <Flex justify="between" style={{marginBottom: 5,}}>
                          <Text  style={styles.companyLeaderIntro_box_title}>高管头像</Text>
                          <Image  style={styles.companyLeaderIntro_box_leaderImg} source={{uri: item.leaderImg}}/>
                        </Flex>
  
                        <Flex justify="center" align="center" style={styles.companyLeaderIntro_box_add_item_button}
                              onPress={this.deleteLeaderInfo.bind(this,index,item._id)}>
                          <Text style={styles.companyLeaderIntro_box_add_item_button_text}>删除该条高管信息</Text>
                        </Flex>
                      </View>
                  )
                })}
              </View>
              <View>
                {this.state.tempEditLeader.map((item, index) => {
                  return (
                      <View key={index}>
                        <Flex justify="between" onPress={this.pickSingleWithCamera.bind(this, 'companyLeaderImg')}>
                          <Text style={styles.companyLeaderIntro_box_title}>高管头像</Text>
                          {this.state.companyLeaderImg ?  <Image style={styles.companyLeaderIntro_box_leaderImg} source={{uri: this.state.companyLeaderImg.uri}}/> :  <Image style={styles.companyLeaderIntro_box_leaderImg} source={require('./../image/userPhoto.jpg')}/>}
                        </Flex>
  
                        <InputItem
                            defaultValue=""
                            placeholder="请输入高管姓名"
                            onChange={value => {
                              this.setState({
                                leaderName: value
                              });
                            }}
                        >高管姓名</InputItem>
                        <InputItem
                            defaultValue=""
                            placeholder="请输入高管职位"
                            onChange={value => {
                              this.setState({
                                leaderPlace: value
                              });
                            }}
                        >高管职位</InputItem>
                        <InputItem
                            defaultValue=""
                            placeholder="请介绍高管"
                            onChange={value => {
                              this.setState({
                                leaderAccount: value
                              });
                            }}
                        >高管介绍</InputItem>
  
                        <Flex justify="center" align="center" style={styles.companyLeaderIntro_box_add_item_button} onPress={this.saveCompanyLeader.bind(this)}>
                          <Text style={styles.companyLeaderIntro_box_add_item_button_text}>确定</Text>
                        </Flex>
                      </View>
                  )
                })}
               
              </View>
  
  
              {this.state.tempEditLeader.length > 0 ? null :  <Flex justify="center" align="center" style={styles.companyLeaderIntro_box_add_item_button}
                                                                        onPress={this.addNewCompanyLeaderInfo.bind(this)}>
                <Text style={styles.companyLeaderIntro_box_add_item_button_text}>添加高管信息</Text>
              </Flex>}
             
            </View>
          </View>
        </Provider>
    )
  }
}

const styles = StyleSheet.create({
  companyLeaderIntro_box_leaderImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  
  companyLeaderIntro_box_companyLeaderItem: {
    padding: 5,
    borderColor: '#9b9b9c',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  companyLeaderIntro_box_title: {
    fontSize: 18,
    marginLeft:15,
    color: 'black'
  },
  companyLeaderIntro_box_value: {
    fontSize: 18,
    marginLeft:15,
    color: '#818182',
    marginHorizontal:15,
  },
  companyLeaderIntro_box_add_item_button: {
    width: deviceW * 0.9,
    height: 40,
    marginTop: 10,
    marginBottom: 15,
    marginLeft: deviceW * 0.05,
   backgroundColor: '#5dd5c8',
    borderRadius: 5,
  },
  companyLeaderIntro_box_add_item_button_text: {
    fontSize: 18,
    color: 'white'
  }
});

export default companyLeaderIntro;
