/**
 * Created by admin-pc on 2019/5/8.
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
class companyProductIntro extends Component {
  _keyExtractor = (item, index) => item._id;
  constructor(props){
    super(props);
    this.state = {
      tempEditProduct: [],
      companyProductItems: [],
      companyProductImg: '',
      productName: '',
      productAccount: '',
    }
  };
  
  
  
  addNewCompanyProductInfo() {
    console.log('点击新增一个product');
    let tempEditProduct = Array.from(this.state.tempEditProduct);
    tempEditProduct.push({});
    this.setState({
      tempEditProduct: tempEditProduct,
    }, () => {
      console.log('len========' + this.state.tempEditProduct.length);
    })
  }
  
  
  
  saveCompanyProduct() {
    let url = axiosUtil.axiosUrl;
    console.log('保存公司产品信息');
    let {companyProductImg, productName, productAccount} = this.state;
    let productBasicInfo = {productName, productAccount};
    
    if(!(companyProductImg && productName && productAccount)) {
      ToastAndroid.show('请填写完整的高管信息', ToastAndroid.SHORT);
      return 0;
    }
    
    console.log('aaaaaaaaaaa' + companyProductImg);
    let formData = new FormData();
    let imageFile = {uri: this.state.companyProductImg.uri, type: 'multipart/form-data', name: 'image.png'};
    formData.append("imageFile", imageFile);
    let promiseProductImage = function () {
      axios.post(url + 'recruiter/saveCompanyProductImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + UserStore.userToken
        }
      }).then((res) => {
        console.log('上传公司产品信息接口所传res===');
      }).catch((err) => {
        console.log('上传公司产品信息接口所传报错===');
        console.log(err);
      })
    };
    
    let promiseProductInfo = function () {
      axios.post(url + 'recruiter/saveCompanyProductInfo', productBasicInfo, {
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
    Promise.all([promiseProductImage(), promiseProductInfo()]).then((res) =>{
      
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
  earnProductInfo() {
    console.log('获取leader信息');
    let url = axiosUtil.axiosUrl;
    axios.post(url + 'recruiter/earnProductInfo',{}, {
      headers: {
        'Authorization': 'Bearer ' + UserStore.userToken
      }
    }).then((res)=> {
      console.log(res);
      if(res.data.code === 200) {
        this.setState({
          companyProductItems: res.data.data
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  deleteProductInfo(index, _id) {
    console.log('点击删除按钮');
    console.log(_id);
    let url = axiosUtil.axiosUrl;
    axios.post(url + 'recruiter/deleteProductInfo',{_id}, {
      headers: {
        'Authorization': 'Bearer ' + UserStore.userToken
      }
    }).then((res)=> {
      console.log(res);
      if(res.data.code === 200) {
        ToastAndroid.show('删除成功', ToastAndroid.SHORT);
        this.setState({
          companyProductItems: res.data.data
        })
      }
    }).catch((err) => {
      console.log(err);
    })
    
  }
  
  
  componentWillMount() {
    this.earnProductInfo();
    
    
  }
  render() {
    const {navigation} = this.props;
    return (
        <Provider>
          <View>
            <HeaderComp navigation={navigation} title="编辑产品信息" routeName={this.props.navigation.state.params.routeName}/>
            
            <View style={styles.companyProductIntro_box}>
              
              <View>
                {this.state.companyProductItems.map((item, index) => {
                  return (
                      <View key={index} style={styles.companyProductIntro_box_companyLeaderItem}>
                        <Flex justify="between" style={{marginBottom: 5,}}>
                          <Text style={styles.companyProductIntro_box_title}>产品姓名</Text>
                          <Text style={styles.companyProductIntro_box_value}>{item.productName}</Text>
                        </Flex>
                        <Flex justify="between" align="start" direction="column" style={{marginBottom: 5,}}>
                          <Text  style={styles.companyProductIntro_box_title}>产品介绍：</Text>
                          <Text style={styles.companyProductIntro_box_value}>{item.productAccount}</Text>
                        </Flex>
                        <Flex justify="between" style={{marginBottom: 5,}}>
                          <Text  style={styles.companyProductIntro_box_title}>产品logo</Text>
                          <Image  style={styles.companyProductIntro_box_leaderImg} source={{uri: item.productImg}}/>
                        </Flex>
                        
                        <Flex justify="center" align="center" style={styles.companyProductIntro_box_add_item_button}
                              onPress={this.deleteProductInfo.bind(this,index, item._id)}>
                          <Text style={styles.companyProductIntro_box_add_item_button_text}>删除该条产品信息</Text>
                        </Flex>
                      </View>
                  )
                })}
              </View>
              <View>
                {this.state.tempEditProduct.map((item, index) => {
                  return (
                      <View key={index}>
                        <Flex justify="between" onPress={this.pickSingleWithCamera.bind(this, 'companyProductImg')}>
                          <Text style={styles.companyProductIntro_box_title}>产品logo</Text>
                          {this.state.companyProductImg ?  <Image style={styles.companyProductIntro_box_leaderImg} source={{uri: this.state.companyProductImg.uri}}/> :  <Image style={styles.companyProductIntro_box_leaderImg} source={require('./../image/userPhoto.jpg')}/>}
                        </Flex>
                        
                        <InputItem
                            defaultValue=""
                            placeholder="请输入产品名字"
                            onChange={value => {
                              this.setState({
                                productName: value
                              });
                            }}
                        >产品名字</InputItem>
                        <InputItem
                            defaultValue=""
                            placeholder="请介绍产品"
                            onChange={value => {
                              this.setState({
                                productAccount: value
                              });
                            }}
                        >产品介绍</InputItem>
                        
                        <Flex justify="center" align="center" style={styles.companyProductIntro_box_add_item_button} onPress={this.saveCompanyProduct.bind(this)}>
                          <Text style={styles.companyProductIntro_box_add_item_button_text}>确定</Text>
                        </Flex>
                      </View>
                  )
                })}
              
              </View>
              
              
              {this.state.tempEditProduct.length > 0 ? null :  <Flex justify="center" align="center" style={styles.companyProductIntro_box_add_item_button}
                                                                    onPress={this.addNewCompanyProductInfo.bind(this)}>
                <Text style={styles.companyProductIntro_box_add_item_button_text}>添加产品</Text>
              </Flex>}
            
            </View>
          </View>
        </Provider>
    )
  }
}

const styles = StyleSheet.create({
  companyProductIntro_box_leaderImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  
  companyProductIntro_box_companyLeaderItem: {
    padding: 5,
    borderColor: '#9b9b9c',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  companyProductIntro_box_title: {
    fontSize: 18,
    marginLeft:15,
    color: 'black'
  },
  companyProductIntro_box_value: {
    fontSize: 18,
    marginLeft:15,
    color: '#818182',
    marginHorizontal:15,
  },
  companyProductIntro_box_add_item_button: {
    width: deviceW * 0.9,
    height: 40,
    marginTop: 10,
    marginBottom: 15,
    marginLeft: deviceW * 0.05,
    backgroundColor: '#5dd5c8',
    borderRadius: 5,
  },
  companyProductIntro_box_add_item_button_text: {
    fontSize: 18,
    color: 'white'
  }
});

export default companyProductIntro;
